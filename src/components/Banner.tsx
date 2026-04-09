import { Info } from 'lucide-react';

export function Banner() {
  return (
    <div className="bg-blue-900/30 border border-blue-800 rounded-xl p-4 mb-6 flex gap-4 items-start shadow-lg">
      <Info className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
      <div className="text-sm text-blue-100">
        <h3 className="font-bold text-blue-300 text-base mb-1">Aviso Importante sobre Datos Reales</h3>
        <p className="mb-2 text-zinc-300">
          Para extraer datos reales de plataformas como Instagram, X, LinkedIn o Telegram, el scraper requiere acceso autenticado. 
          Si vas a ejecutar este proyecto localmente, debes <b>iniciar sesión en cada servicio</b> en tu navegador (Playwright) para evitar bloqueos.
        </p>
        <p className="text-zinc-300">
          <i>Nota de demostración:</i> En el entorno de nube de <b>Vercel</b>, utilizamos nuestro motor de datos de prueba para evitar timeouts y problemas de autenticación. 
          ¡Regístrate con tu cuenta para guardar el historial en tu Supabase!
        </p>
      </div>
    </div>
  );
}
