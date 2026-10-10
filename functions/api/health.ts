interface Env {
  // Free Cloudflare environment bindings if needed
}

export const onRequestGet = async () => {
  return new Response(
    JSON.stringify({
      status: 'online',
      brand: 'ÉLAN JEWELS',
      platform: 'Cloudflare Pages & Workers',
      timestamp: new Date().toISOString()
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
};
