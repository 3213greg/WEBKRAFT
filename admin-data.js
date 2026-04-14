const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://nbusgqvotjwoclberoco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idWVjZ3ZvdGp3ZG9pYnNycW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTU4MDUsImV4cCI6MjA5MTczMTgwNX0.snV2cxx8yySw0QjqI7DEW_1c2Ga_en4mmVWBpZaqKp8'
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
