export const onRequestPost = async (context: { request: Request }) => {
  try {
    const data = await context.request.json() as { email?: string };
    if (!data.email || !data.email.includes('@')) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscribed to Élan Privé Club successfully',
        voucher: 'ELAN20'
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
