import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import ical from 'node-ical';
import { google } from 'googleapis';

const ICS_URLS: Record<string, string> = {
  A: 'https://calendar.google.com/calendar/ical/fd303ac1e216b9750168d5bae02ef9151ecdae70a6aca6a6951ee9ee61e232fe%40group.calendar.google.com/private-ca0b0aa6ccf6ef1e6f35e0c302f48791/basic.ics',
  B: 'https://calendar.google.com/calendar/ical/e0ff8671d2d9e24fdea6e2f9bf5098680335b22cf01b62b7435ebffc3d51062b%40group.calendar.google.com/private-3cde0be17d267c9eebfdece97c8c6fdb/basic.ics'
};

const CALENDAR_IDS: Record<string, string> = {
  A: 'fd303ac1e216b9750168d5bae02ef9151ecdae70a6aca6a6951ee9ee61e232fe@group.calendar.google.com',
  B: 'e0ff8671d2d9e24fdea6e2f9bf5098680335b22cf01b62b7435ebffc3d51062b@group.calendar.google.com'
};

const SPREADSHEET_ID = '1PuoMZ2Y4gMWS3rs-o6ZooxteWLBeIZHMaRYcluyF1Sw';

const getAuthClient = () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!clientEmail || !privateKey) {
    throw new Error("伺服器缺少 Google 服務帳號環境變數設定。");
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/spreadsheets']
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  app.get('/api/availability', async (req, res) => {
    try {
      const studio = req.query.studio as string;
      const url = ICS_URLS[studio];
      if (!url) {
        res.status(400).json({ error: 'Invalid studio' });
        return;
      }

      const events = await ical.async.fromURL(url);
      
      const busySlots = [];
      for (const k in events) {
        if (events.hasOwnProperty(k)) {
          const ev = events[k] as any;
          if (ev.type === 'VEVENT' && ev.start && ev.end) {
            busySlots.push({
              start: ev.start.toISOString(),
              end: ev.end.toISOString()
            });
          }
        }
      }
      
      res.json(busySlots);
    } catch (err) {
      console.error('Failed to fetch calendar:', err);
      res.status(500).json({ error: 'Failed to fetch calendar' });
    }
  });

  app.post('/api/book', async (req, res) => {
    try {
      const auth = getAuthClient();
      const authClient = await auth.getClient();
      const { date, start, end, name, phone, email, studio, plan, people, invoice, company, taxId, note, studioName, planName, total } = req.body;
      
      const displayInvoice = invoice === 'duplicate' ? '二聯式' : (invoice === 'triplicate' ? '三聯式' : invoice);
      const displayCompany = company ? company.trim() : '';
      const displayTaxId = taxId ? taxId.trim() : '';
      const displayNote = note ? note.trim() : '';

      const sheets = google.sheets({ version: 'v4', auth: authClient as any });
      const row = [
        date, `${start}-${end}`, name, phone, email, studioName || studio, planName || plan, people, displayInvoice, displayCompany, displayTaxId, displayNote, new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }), total ? `NT$ ${total}` : ''
      ];
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'A:N',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [row] }
      });

      const calendarId = CALENDAR_IDS[studio];
      if (calendarId) {
        const calendar = google.calendar({ version: 'v3', auth: authClient as any });
        const startTime = new Date(`${date}T${start}:00+08:00`);
        const endTime = new Date(`${date}T${end}:00+08:00`);

        let descriptionText = `方案: ${planName || plan}\n電話: ${phone}\n信箱: ${email}\n人數: ${people}\n發票: ${displayInvoice}`;
        if (total) descriptionText += `\n預估費用: NT$ ${total.toLocaleString()}`;
        if (displayCompany) descriptionText += `\n抬頭: ${displayCompany}`;
        if (displayTaxId) descriptionText += `\n統編: ${displayTaxId}`;
        if (displayNote) descriptionText += `\n備註: ${displayNote}`;

        await calendar.events.insert({
          calendarId,
          requestBody: {
            summary: `[預約] ${studioName || studio} - ${name}`,
            description: descriptionText,
            start: { dateTime: startTime.toISOString(), timeZone: 'Asia/Taipei' },
            end: { dateTime: endTime.toISOString(), timeZone: 'Asia/Taipei' }
          }
        });
      }

      res.json({ success: true });
    } catch (err: any) {
      console.error('Failed to save booking:', err);
      res.status(500).json({ error: err.message || 'Failed to save booking' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
