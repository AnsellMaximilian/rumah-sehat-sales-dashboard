import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { google } from 'googleapis';

export type SuppliersData = Array<string>;

interface Result {
  error: null | undefined | string;
  values: Array<SuppliersData>;
}

export default async function getSuppliersData() {
  const session = await getServerSession(authOptions);
  const isPublic = process.env.APP_MODE === 'public';

  const allowedEmails = JSON.parse(
    process.env.ALLOWED_EMAILS as string
  ) as Array<string>;

  const isEmailAllowed = session?.user?.email
    ? allowedEmails.includes(session?.user?.email)
    : false;
  const res: Result = { error: null, values: [] };
  if (isEmailAllowed || isPublic) {
    // Signed in
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.JSON_SECRET as string),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const {
      data: { values }
    } = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: `suppliers!A2:B`
    });
    res.values = values as Array<SuppliersData>;
  } else {
    res.error = 'Unauthorized';
  }
  return res;
}
