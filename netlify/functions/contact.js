const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://nbusgqvotjwoclberoco.supabase.co',
  'sb_publishable_-QIqPuvF3gnLyLulRvSioA_BQumR4no'
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { error } = await supabase.from('wiadomosci').insert([{
      imie: data.imie || '',
      email: data.email || '',
      telefon: data.telefon || '',
      rodzaj_strony: data.rodzaj_strony || '',
      wiadomosc: data.wiadomosc || ''
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
