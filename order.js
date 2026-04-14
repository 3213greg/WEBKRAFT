const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://nbusgqvotjwoclberoco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idWVjZ3ZvdGp3ZG9pYnNycW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTU4MDUsImV4cCI6MjA5MTczMTgwNX0.snV2cxx8yySw0QjqI7DEW_1c2Ga_en4mmVWBpZaqKp8'
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { error } = await supabase.from('zamowienia').insert([{
      imie: data.imie || '',
      email: data.email || '',
      telefon: data.telefon || '',
      zamowienie: data.zamowienie || '',
      uwagi: data.uwagi || ''
    }]);

    if (error) throw error;

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
