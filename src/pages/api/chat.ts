import type { APIRoute } from 'astro';

export const prerender = false;

const SYSTEM_PROMPT = `Eres JARVIS, el asistente virtual oficial de Algorixis Innova (INNOVA). 
Tu rol es atender clientes potenciales, resolver dudas técnicas y calificar leads usando la metodología BANT (Presupuesto, Autoridad, Necesidad, Tiempo).

CONOCIMIENTO DE LA EMPRESA:
- Nombre: Algorixis Innova (INNOVA)
- Ubicación: Argentina y Latinoamérica
- Especialidad: Transformación Digital, IA y Automatización para PyMEs y empresas medianas.

TUS OBJETIVOS:
1. Responder consultas sobre nuestros 6 módulos (Agentes IA, RPA, Lean ISO 4.0, BI Predictivo, Chatbots, Consultoría).
2. Mantener memoria de la conversación (usa el historial de mensajes).
3. Calificar al lead sutilmente: si detectas interés real, haz 1 o 2 preguntas clave para entender su presupuesto aproximado, si es el tomador de decisiones, qué problema urgente tiene y en qué plazo quiere solucionarlo.
4. Si el lead está calificado (BANT positivo), invítalo a completar el formulario de contacto para agendar una consultoría gratuita con un consultor senior.

TONO Y ESTILO:
- Profesional, cercano, en español argentino (usá "vos", "tenés", "querés").
- Sé conciso (máximo 3-4 oraciones por respuesta).
- NO uses asteriscos ni markdown complejo. Responde en texto plano limpio para que el sintetizador de voz lo lea perfecto.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { messages } = body;
    
    const apiKey = import.meta.env.GROQ_API_KEY || process.env.GROQ_API_KEY;
    if (!apiKey) return new Response(JSON.stringify({ error: 'API key missing' }), { status: 500 });

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
};
