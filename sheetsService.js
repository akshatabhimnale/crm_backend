//sheetService.js
// This module fetches data from a Google Sheets document using the Google Sheets API.
const { google } = require('googleapis');
const sheets = google.sheets('v4');

const auth = new google.auth.GoogleAuth({
  keyFile: './service-account.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const SPREADSHEET_ID = '1vlk913CO1sn6cny2UuLwS88nfkPS4t5aWttTQGR5uYU';
const RANGE = 'Sheet1!A1:AE'; // Include headers

async function getSheetData() {
  const client = await auth.getClient();
  const response = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const [headers, ...rows] = response.data.values;
  const data = rows.map(row =>
    headers.reduce((obj, header, i) => {
      obj[header] = row[i] || '';
      return obj;
    }, {})
  );

  return data;
}

module.exports = { getSheetData };
