import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

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

    // Inicializar cliente de Supabase con las variables de entorno
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    // Insertar el lead en la base de datos
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          name: data.name,
          email: data.email,
          company: data.company || null,
          phone: data.phone || null,
          module: data.module || 'General'
        }
      ]);

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      return new Response(JSON.stringify({ error: 'Error al guardar el registro' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ NUEVO LEAD GUARDADO EN SUPABASE:', data.email);

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
