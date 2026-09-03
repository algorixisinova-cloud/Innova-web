import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    if (!data.email || !data.name) {
      return new Response(JSON.stringify({ error: 'Datos incompletos' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Este log aparecerá en los "Function Logs" de Netlify cuando alguien se registre
    console.log('🚀 NUEVO LEAD CAPTURADO:', JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Lead registrado correctamente' 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error en /api/lead:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
