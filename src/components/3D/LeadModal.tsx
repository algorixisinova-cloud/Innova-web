import { useState } from 'react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleName: string;
  onSuccess: () => void;
}

export default function LeadModal({ isOpen, onClose, moduleName, onSuccess }: LeadModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, module: moduleName, type: 'acceso_modulo', timestamp: new Date().toISOString() })
      });
      if (response.ok) {
        setStatus('success');
        setTimeout(() => { setStatus('idle'); setFormData({ name: '', email: '', company: '', phone: '' }); onSuccess(); }, 1500);
      } else { setStatus('error'); }
    } catch (error) { setStatus('error'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-2">Acceso Concedido</h3>
            <p className="text-gray-400">Preparando tu experiencia...</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-white mb-2">Acceso Profesional a {moduleName}</h3>
            <p className="text-sm text-gray-400 mb-6">Completá tus datos para acceder al análisis detallado, casos de éxito y consultoría inicial gratuita.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Nombre completo *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
              <input required type="email" placeholder="Email corporativo *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
              <input type="text" placeholder="Empresa" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
              <input type="tel" placeholder="Teléfono (Opcional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
              <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-[#0066ff] hover:bg-[#00d4ff] text-white rounded-lg font-semibold transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Procesando...' : 'Solicitar Acceso y Consultoría'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
