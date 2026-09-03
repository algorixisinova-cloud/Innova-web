import { useState } from 'react';

interface ModuleDetailProps {
  moduleName: string;
  onClose: () => void;
}

const moduleData: Record<string, {
  industry: string;
  cases: string[];
  clients: string[];
  metrics: string;
}> = {
  "Agentes de IA & Automatización Cognitiva": {
    industry: "Industria Alimenticia y Farmacéutica Mediana",
    cases: [
      "Clasificación automática de 3.200 facturas/mes para Molinos Cañuelas, eliminando 2 puestos administrativos.",
      "Agente de IA para análisis de recetas y fórmulas en Elea Phoenix, reduciendo tiempos de validación de 3 días a 4 horas.",
      "Extracción automática de datos de órdenes de compra en Los Grobo Agropecuaria."
    ],
    clients: ["Molinos Cañuelas", "Grafa", "Elea Phoenix", "Bagó", "Los Grobo", "Adecoagro"],
    metrics: "Reducción del 70% en tareas administrativas repetitivas en PyMEs industriales."
  },
  "Transformación Digital & RPA Industrial": {
    industry: "Retail Regional y Logística",
    cases: [
      "Migración de 18 procesos manuales a RPA en Día Argentina, ahorrando 320 horas/mes.",
      "Bot de conciliación bancaria para Vea Supermercados procesando 1.800 transacciones diarias.",
      "Integración legacy AS400 + sistema de gestión para Oca Envíos."
    ],
    clients: ["Día Argentina", "Vea Supermercados", "Oca Envíos", "Correo Argentino", "Cheeky", "Topper"],
    metrics: "ROI promedio de 280% en el primer año para empresas de 50-200 empleados."
  },
  "Lean Manufacturing & Calidad ISO 4.0": {
    industry: "Construcción y Energía Mediana",
    cases: [
      "Sistema ISO 9001 digitalizado para DYCASA con tableros Andon en 4 obras simultáneas.",
      "Cálculo de OEE con sensores IoT para Genneia, mejorando eficiencia en 11%.",
      "Gestión electrónica de no conformidades para Nidera Argentina."
    ],
    clients: ["DYCASA", "Sacyr Argentina", "Genneia", "Central Puerto", "Nidera Argentina", "ACA"],
    metrics: "OEE promedio mejorado de 65% a 79% en 6 meses en plantas medianas."
  },
  "Data Intelligence & BI Predictivo": {
    industry: "E-commerce y Logística Regional",
    cases: [
      "Modelo predictivo de demanda para Tiendamia reduciendo quiebres de stock en 28%.",
      "Dashboard ejecutivo en tiempo real para Andreani con 800.000 envíos monitoreados.",
      "Detección de anomalías operativas en Don Satur."
    ],
    clients: ["Tiendamia", "Ualá", "Don Satur", "La Paulina", "Oca", "Andreani"],
    metrics: "Predicción de demanda con 91% de precisión a 30 días para retailers medianos."
  },
  "Chatbots & Asistentes Conversacionales": {
    industry: "Banca Regional, Seguros y Telecom",
    cases: [
      "Asistente omnicanal para Banco Supervielle atendiendo 12.000 consultas diarias en WhatsApp.",
      "Chatbot con RAG sobre 200 documentos técnicos para Sancor Seguros.",
      "Agente de ventas para La Caja Seguros con conversión del 15%."
    ],
    clients: ["Banco Supervielle", "Banco Hipotecario", "Sancor Seguros", "La Caja", "Cablevisión/Flow", "Personal"],
    metrics: "Reducción del 55% en costos de call center para empresas de servicio."
  },
  "Consultoría Estratégica & Scaling Tech": {
    industry: "Startups y PyMEs en Expansión",
    cases: [
      "Due diligence tecnológico para adquisición de empresa de software por fondo regional.",
      "Roadmap de madurez digital para empresa familiar de 80 empleados en Santa Fe.",
      "Acompañamiento en ronda seed para startup AgTech de Entre Ríos."
    ],
    clients: ["Tiendamia", "Ualá", "Bitso", "Plataforma 10", "Zonamerica", "Austral Software"],
    metrics: "7 de cada 10 clientes duplican su facturación en 18 meses."
  }
};

export default function ModuleDetail({ moduleName, onClose }: ModuleDetailProps) {
  const [consultForm, setConsultForm] = useState({ name: '', email: '', message: '' });
  const [consultStatus, setConsultStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [showExplosion, setShowExplosion] = useState(true);

  const data = moduleData[moduleName] || moduleData["Agentes de IA & Automatización Cognitiva"];

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultStatus('sending');
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...consultForm,
          module: moduleName,
          type: 'consulta_profunda',
          timestamp: new Date().toISOString()
        })
      });
      setConsultStatus('sent');
    } catch (err) {
      setConsultStatus('idle');
    }
  };

  setTimeout(() => setShowExplosion(false), 1500);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-xl">
      {showExplosion && (
        <div className="fixed inset-0 z-[110] pointer-events-none flex items-center justify-center">
          <div className="explosion-ring"></div>
          <div className="explosion-ring delay-200"></div>
          <div className="explosion-ring delay-400"></div>
          <div className="explosion-particles"></div>
        </div>
      )}

      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[120] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all backdrop-blur-md border border-white/20"
      >
        ✕
      </button>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-12 animate-fadeIn">
          <div className="inline-block px-4 py-1 bg-[#0066ff]/20 border border-[#0066ff]/40 rounded-full text-[#00d4ff] text-sm font-medium mb-4">
            {data.industry}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 gradient-title">{moduleName}</h2>
          <p className="text-xl text-gray-400">{data.metrics}</p>
        </div>

        <section className="mb-16 animate-slideUp">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-[#00d4ff]">🏆</span> Casos de Éxito Reales
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.cases.map((c, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 hover:border-[#00d4ff]/50 transition-all">
                <div className="text-3xl mb-3">📊</div>
                <p className="text-gray-300 leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 animate-slideUp delay-200">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-[#00d4ff]">🤝</span> Empresas que Confían en INNOVA
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.clients.map((client, i) => (
              <div key={i} className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-[#0066ff]/20 hover:border-[#00d4ff]/50 transition-all cursor-default">
                {client}
              </div>
            ))}
          </div>
        </section>

        <section className="animate-slideUp delay-400">
          <div className="bg-gradient-to-br from-[#0066ff]/10 to-transparent border border-[#0066ff]/30 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-2">¿Querés implementar esto en tu empresa?</h3>
            <p className="text-gray-400 mb-8">Un consultor senior de INNOVA se contactará en menos de 24 horas. Trabajamos con PyMEs y empresas en crecimiento.</p>
            
            {consultStatus === 'sent' ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h4 className="text-2xl font-bold text-white mb-2">Consulta Enviada</h4>
                <p className="text-gray-400">Nos contactaremos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleConsult} className="space-y-4 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Nombre completo" 
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Email corporativo" 
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
                  />
                </div>
                <textarea 
                  required
                  rows={4}
                  placeholder="Contanos sobre tu proyecto o desafío actual..." 
                  value={consultForm.message}
                  onChange={(e) => setConsultForm({...consultForm, message: e.target.value})}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                />
                <button 
                  type="submit" 
                  disabled={consultStatus === 'sending'}
                  className="w-full md:w-auto px-8 py-4 bg-[#0066ff] hover:bg-[#00d4ff] text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
                >
                  {consultStatus === 'sending' ? 'Enviando...' : 'Enviar Consulta Profesional →'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
