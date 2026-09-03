import { useState } from 'react';
import Module3DCard from './Module3DCard';
import LeadModal from './LeadModal';
import ModuleDetail from './ModuleDetail';

const modules = [
  { id: 1, title: "Agentes de IA & Automatización Cognitiva", desc: "Implementación de agentes autónomos con arquitectura MCP. Integración de LLMs para procesamiento de documentos, extracción de entidades y toma de decisiones semiautomáticas.", color: "#8b5cf6" },
  { id: 2, title: "Transformación Digital & RPA Industrial", desc: "Diseño de bots RPA integrados a sistemas legacy (SAP, Oracle). Migración de procesos manuales a flujos digitales con validación humana (HITL).", color: "#3b82f6" },
  { id: 3, title: "Lean Manufacturing & Calidad ISO 4.0", desc: "Digitalización de sistemas ISO 9001/14001. Tableros Andon, gestión de no conformidades y cálculo en tiempo real de OEE con sensores IoT.", color: "#06b6d4" },
  { id: 4, title: "Data Intelligence & BI Predictivo", desc: "Arquitectura lakehouse. Dashboards ejecutivos en tiempo real y modelos predictivos para demanda, mantenimiento preventivo y anomalías.", color: "#14b8a6" },
  { id: 5, title: "Chatbots & Asistentes Conversacionales", desc: "Asistentes con RAG sobre bases documentales privadas. Integración omnicanal (WhatsApp, Teams) y fine-tuning de modelos open-source.", color: "#10b981" },
  { id: 6, title: "Consultoría Estratégica & Scaling Tech", desc: "Diagnóstico de madurez digital, roadmaps tecnológicos alineados a negocio y due diligence para M&A.", color: "#22c55e" }
];

export default function ModuleGrid() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [openedModule, setOpenedModule] = useState<string | null>(null);

  return (
    <>
      <section id="modulos" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-title">Centro de Comando INNOVA</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Soluciones tecnológicas diseñadas para resultados medibles. Selecciona un módulo para explorar.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod) => (
            <Module3DCard key={mod.id} title={mod.title} description={mod.desc} color={mod.color} onExplore={() => setSelectedModule(mod.title)} />
          ))}
        </div>
      </section>
      <LeadModal isOpen={!!selectedModule} onClose={() => setSelectedModule(null)} moduleName={selectedModule || ''} onSuccess={() => { setSelectedModule(null); setOpenedModule(selectedModule); }} />
      {openedModule && <ModuleDetail moduleName={openedModule} onClose={() => setOpenedModule(null)} />}
    </>
  );
}
