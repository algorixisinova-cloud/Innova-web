import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { b as createAstro, d as maybeRenderHead, f as renderHead, i as renderComponent, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_BQWEtzXP.mjs";
import { t as createComponent } from "./compiler_ObhKNFB4.mjs";
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, description = "Algorixis Innova - Transformación Digital e Inteligencia Artificial" } = Astro.props;
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/svg+xml" href="/logo.svg"><title>${title}</title><!-- Fuentes --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="bg-innova-dark text-white font-sans antialiased overflow-x-hidden min-h-screen relative"><!-- Canvas para la escena de partículas --><canvas id="core-canvas" class="fixed inset-0 z-0 pointer-events-none"></canvas>${renderSlot($$result, $$slots["default"])}<!-- Cargar script de partículas al final del body --><script src="/js/digital-core.js"><\/script></body></html>`;
}, "/workspaces/Innova-web/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/modules/ModuleGrid.astro
var $$ModuleGrid = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="modulos" class="relative z-10 py-24"><!-- Título de Sección --><div class="text-center mb-16 px-6"><h2 class="text-4xl md:text-5xl font-bold mb-4 gradient-title">Centro de Comando INNOVA</h2><p class="text-gray-400 text-lg max-w-2xl mx-auto">Selecciona un módulo para explorar nuestras soluciones tecnológicas</p></div><!-- Grilla de Módulos con CSS Nativo --><div class="module-grid">${[
		{
			id: 1,
			title: "Agentes de IA & Automatización Cognitiva",
			desc: "Flujos autónomos con LLMs, MCP y procesamiento inteligente de datos.",
			icon: "🧠",
			from: "#8b5cf6",
			to: "#3b82f6"
		},
		{
			id: 2,
			title: "Transformación Digital & RPA",
			desc: "Integración de sistemas legacy + IA para eliminar cuellos de botella.",
			icon: "⚙️",
			from: "#3b82f6",
			to: "#06b6d4"
		},
		{
			id: 3,
			title: "Lean Manufacturing & Calidad ISO 4.0",
			desc: "Tableros Kanban 3D, métricas OEE en tiempo real y mejora continua digital.",
			icon: "📊",
			from: "#06b6d4",
			to: "#14b8a6"
		},
		{
			id: 4,
			title: "Data Intelligence & BI Predictivo",
			desc: "Dashboards interactivos, predicción con IA y análisis avanzado de KPIs.",
			icon: "📈",
			from: "#14b8a6",
			to: "#10b981"
		},
		{
			id: 5,
			title: "Chatbots & Asistentes Conversacionales",
			desc: "Atención, ventas y soporte 24/7 con voz y texto natural.",
			icon: "💬",
			from: "#10b981",
			to: "#22c55e"
		},
		{
			id: 6,
			title: "Consultoría Estratégica & Scaling Tech",
			desc: "Diagnóstico de madurez tecnológica, roadmaps digitales e implementación.",
			icon: "🚀",
			from: "#22c55e",
			to: "#84cc16"
		}
	].map((module) => renderTemplate`<div class="module-card"${addAttribute(`--icon-from: ${module.from}; --icon-to: ${module.to}`, "style")}><div class="status-dot"></div><div class="module-icon">${module.icon}</div><h3 class="module-title">${module.title}</h3><p class="module-desc">${module.desc}</p></div>`)}</div></section>`;
}, "/workspaces/Innova-web/src/components/modules/ModuleGrid.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Algorixis Innova | Transformación Digital e IA" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"><div class="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 shadow-[0_0_40px_rgba(0,102,255,0.15)]"><img src="/logo.svg" alt="Algorixis Innova" class="h-24 w-24 md:h-28 md:w-28"></div><h1 class="text-5xl md:text-7xl font-bold text-center mb-6 gradient-title">Algorixis Innova</h1><p class="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-4 font-light tracking-wide">Transformación Digital e Inteligencia Artificial</p><p class="text-base text-gray-400 text-center max-w-xl leading-relaxed">Automatización de procesos, agentes de IA, desarrollo tecnológico y optimización empresarial para Argentina y Latinoamérica.</p><div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"><svg class="w-6 h-6 text-[#00d4ff]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div></main>${renderComponent($$result, "ModuleGrid", $$ModuleGrid, {})}<footer class="relative z-10 py-12 px-6 border-t border-white/5 text-center"><p class="text-gray-500 text-sm">© 2026 Algorixis Innova. Todos los derechos reservados.</p></footer>${renderComponent($$result, "JarvisCopilot", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "/workspaces/Innova-web/src/components/copilot/JarvisCopilot.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/workspaces/Innova-web/src/pages/index.astro", void 0);
var $$file = "/workspaces/Innova-web/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
