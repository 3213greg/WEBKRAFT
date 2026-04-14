exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { login, password } = JSON.parse(event.body);

  if (login === 'kuba1234' && password === '1234') {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true, token: 'webcrafft_admin_ok' })
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false, message: 'Błędny login lub hasło' })
  };
};
