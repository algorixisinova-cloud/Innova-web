import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  text: string;
}

export default function JarvisCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hola, soy JARVIS. ¿En qué puedo ayudarte sobre Algorixis Innova?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // FUNCIÓN CLAVE: Limpia Markdown SOLO para la voz
  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/#{1,6}\s/g, '')       // Elimina #, ##, ###
      .replace(/\*\*/g, '')           // Elimina negritas **
      .replace(/\*/g, '')             // Elimina cursivas *
      .replace(/-\s/g, 'Punto. ')     // Convierte viñetas en pausas naturales
      .replace(/\d+\.\s/g, 'Punto. ') // Convierte números de lista en pausas
      .replace(/\n+/g, '. ')          // Convierte saltos de línea en puntos
      .replace(/\s+/g, ' ')           // Limpia espacios dobles
      .trim();
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(text)); // <-- AQUÍ SE LIMPIA
      utterance.lang = 'es-AR';
      utterance.rate = 0.95; // Ligeramente más rápido para sonar más natural
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.text
      }));
      apiMessages.push({ role: 'user', content: input });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error?.message || 'Error en la API');

      const reply = data.choices?.[0]?.message?.content || 'Disculpa, tuve un error técnico.';
      
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      speak(reply); // La voz ahora será limpia y profesional
    } catch (error: any) {
      console.error('Error:', error.message);
      setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
          border: 'none', boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'
        }}
      >
        🤖
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '100px', right: '24px', zIndex: 9999,
          width: '350px', height: '500px', background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px', padding: '20px', color: 'white', fontFamily: 'Inter, sans-serif',
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', color: '#00d4ff' }}>JARVIS Copilot</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '18px' }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', paddingRight: '5px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '10px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: '14px', fontSize: '14px', lineHeight: '1.5',
                  background: msg.role === 'user' ? '#0066ff' : 'rgba(255,255,255,0.1)',
                  color: msg.role === 'user' ? 'white' : '#e5e7eb',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '14px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '14px',
                  whiteSpace: 'pre-wrap' // Mantiene el formato visual en pantalla
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div style={{ fontSize: '14px', color: '#00d4ff', fontStyle: 'italic' }}>JARVIS está pensando...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', fontSize: '14px'
              }}
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              style={{
                width: '40px', height: '40px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: (isLoading || !input.trim()) ? '#4b5563' : '#0066ff', 
                color: 'white', fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (isLoading || !input.trim()) ? 0.5 : 1
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
