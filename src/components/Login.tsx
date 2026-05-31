import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Perfil Administrador (Acesso ao Painel Gerencial)
    if (email === 'admin@pneubras.com' && senha === '123456') {
      onLoginSuccess({
        nome: 'Administrador SST',
        email: 'admin@pneubras.com',
        empresa: 'Grupo PneuBras',
        isAdmin: true
      });
    } 
    // Perfil Colaborador (Acesso à Área Operacional/DDS)
    else if (email === 'colaborador@pneubras.com' && senha === '123456') {
      onLoginSuccess({
        nome: 'Operador Padrão',
        email: 'colaborador@pneubras.com',
        empresa: 'Grupo PneuBras',
        isAdmin: false
      });
    } 
    // Tratamento de erro
    else {
      setErro('Credenciais inválidas. Para testar, use admin@pneubras.com e senha 123456.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 selection:bg-emerald-200 selection:text-emerald-900">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Cabeçalho do Login */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500 rounded-full opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-emerald-500 rounded-full opacity-10 blur-xl"></div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-emerald-500/30 mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Portal SST</h2>
          <p className="text-slate-400 text-sm mt-1">Acesso corporativo seguro</p>
        </div>

        {/* Formulário */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="font-medium">{erro}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-mail Corporativo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  placeholder="admin@pneubras.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 group mt-2"
            >
              <span>Entrar no Sistema</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500">
            <p>Demonstração • Teste na Vercel</p>
          </div>
        </div>
      </div>
    </div>
  );
}