const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://nbusgqvotjwoclberoco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idWVjZ3ZvdGp3ZG9pYnNycW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTU4MDUsImV4cCI6MjA5MTczMTgwNX0.snV2cxx8yySw0QjqI7DEW_1c2Ga_en4mmVWBpZaqKp8'
);

exports.handler = async (event) => {
  const headers = { 'Access-Control-Allow-Origin': '*' };

  // GET — pobierz ustawienia (publiczne, używa index.html)
  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase.from('ustawienia').select('*');
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    const result = {};
    data.forEach(row => result[row.klucz] = row.wartosc);
    return { statusCode: 200, headers, body: JSON.stringify(result) };
  }

  // POST — zapisz ustawienia (tylko admin)
  if (event.httpMethod === 'POST') {
    const token = event.headers['x-admin-token'];
    if (token !== 'webcrafft_admin_ok') {
      return { statusCode: 401, body: JSON.stringify({ error: 'Brak dostępu' }) };
    }
    const updates = JSON.parse(event.body);
    for (const [klucz, wartosc] of Object.entries(updates)) {
      await supabase.from('ustawienia').upsert({ klucz, wartosc });
    }
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
