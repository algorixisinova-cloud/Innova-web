import type { APIRoute } from 'astro';

export const prerender = false;

const SYSTEM_PROMPT = `Eres JARVIS, el asistente virtual oficial de Algorixis Innova (INNOVA). 
Tu rol es atender clientes potenciales y responder consultas sobre nuestros servicios tecnológicos.

CONOCIMIENTO DE LA EMPRESA:
- Nombre: Algorixis Innova (INNOVA)
- Ubicación: Argentina y Latinoamérica
- Especialidad: Transformación Digital, Inteligencia Artificial y Automatización Empresarial.

SERVICIOS PRINCIPALES:
1. Agentes de IA & Automatización Cognitiva: Flujos autónomos con LLMs y MCP.
2. Transformación Digital & RPA: Integración de sistemas legacy + IA.
3. Lean Manufacturing & Calidad ISO 4.0: Tableros Kanban 3D y métricas OEE.
4. Data Intelligence & BI Predictivo: Dashboards interactivos y predicción con IA.
5. Chatbots & Asistentes Conversacionales: Atención y ventas 24/7 con voz natural.
6. Consultoría Estratégica & Scaling Tech: Diagnóstico de madurez tecnológica y roadmaps.

TONO Y ESTILO:
- Profesional, cercano y orientado a resultados.
- Responde siempre en español argentino.
- Si te preguntan precios, indica que dependen del alcance y ofrece agendar una consultoría gratuita.
- Sé conciso pero informativo.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { messages } = body;
    
    // FALLBACK ROBUSTO: Intenta import.meta.env, si falla usa process.env (estándar de Node/Netlify)
    const apiKey = import.meta.env.GROQ_API_KEY || process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('ERROR CRÍTICO: GROQ_API_KEY no está configurada en el entorno.');
      return new Response(JSON.stringify({ error: 'API key no configurada en el servidor' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', response.status, errorText);
      return new Response(JSON.stringify({ error: `Error de Groq (${response.status})` }), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Endpoint Error:', error.message);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
