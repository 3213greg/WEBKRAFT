const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://nbusgqvotjwoclberoco.supabase.co',
  'sb_publishable_-QIqPuvF3gnLyLulRvSioA_BQumR4no'
);

exports.handler = async (event) => {
  const token = event.headers['x-admin-token'];
  if (token !== 'webcrafft_admin_ok') {
    return { statusCode: 401, body: JSON.stringify({ error: 'Brak dostępu' }) };
  }

  const { data: zamowienia } = await supabase
    .from('zamowienia')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: wiadomosci } = await supabase
    .from('wiadomosci')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ zamowienia, wiadomosci })
  };
};
