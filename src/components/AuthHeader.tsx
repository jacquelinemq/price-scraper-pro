import { useState } from 'react';
import { useStore } from '../store/useStore';
import { LogIn, LogOut, UserPlus, ShieldAlert, History } from 'lucide-react';

export function AuthHeader() {
  const { user, role, signIn, signUp, signOut, fetchHistory } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  if (user) {
    return (
      <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-emerald-400">{user.email}</span>
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            {role === 'admin' ? <><ShieldAlert className="h-3 w-3 text-red-400"/> Admin</> : 'User'}
          </span>
        </div>
        <button 
          onClick={fetchHistory} 
          className="p-2 hover:bg-zinc-800 rounded-md text-blue-400 transition" 
          title="Ver mi Historial"
        >
          <History className="h-5 w-5" />
        </button>
        <button 
          onClick={signOut} 
          className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 transition" 
          title="Cerrar Sesión"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-lg">
      <input 
        type="email" 
        placeholder="Email" 
        className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-md border border-zinc-700 focus:outline-none w-40"
        value={email} 
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-md border border-zinc-700 focus:outline-none w-32"
        value={password} 
        onChange={e => setPassword(e.target.value)}
      />
      {isLogin ? (
        <button 
          onClick={() => signIn(email, password)} 
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded-md flex items-center gap-1 text-sm px-3 transition"
        >
          <LogIn className="h-4 w-4" /> Entrar
        </button>
      ) : (
        <button 
          onClick={() => signUp(email, password)} 
          className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-md flex items-center gap-1 text-sm px-3 transition"
        >
          <UserPlus className="h-4 w-4" /> Registro
        </button>
      )}
      <button 
        onClick={() => setIsLogin(!isLogin)} 
        className="text-xs text-zinc-400 hover:text-white px-2 underline"
      >
        {isLogin ? '¿Crear cuenta?' : '¿Ya tienes cuenta?'}
      </button>
    </div>
  );
}
