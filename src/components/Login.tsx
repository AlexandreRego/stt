import React, { useState } from 'react';
import { Shovel, LogIn, ShieldAlert, Mail, Lock, Fingerprint, Info, CheckCircle, ChevronRight } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Clear or reset fields on admin checkbox switch
  const handleAdminCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdminMode(e.target.checked);
    setErrorMsg(null);
    setPassword('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Por favor, preencha o seu e-mail corporativo.");
      return;
    }
    if (isAdminMode && !password.trim()) {
      setErrorMsg("O acesso Administrativo requer a confirmação da senha.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          isAdminMode
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess(data.user);
      } else {
        setErrorMsg(data.message || "E-mail não autorizado para acesso corporativo ou senha inválida.");
      }
    } catch (err) {
      setErrorMsg("Erro de conexão com o servidor SST PneuBras.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4 md:px-0 relative overflow-hidden py-12">
      {/* Decorative backdrop subtle blurs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-slate-900 text-white rounded-xl shadow-sm transition-transform duration-200">
            <Fingerprint className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-base font-bold tracking-tight text-slate-900 uppercase">
              PneuBras • Portal SST
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Segurança e Saúde Ocupacional Integrada nas Portarias
            </p>
          </div>
        </div>

        {/* Informational helpful credentials list for seamless interactive testing */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-[11px] leading-relaxed text-slate-705 text-slate-700 space-y-2">
          <p className="font-bold flex items-center text-slate-800">
            <Info className="w-4 h-4 mr-1 text-slate-600" />
            Guia de Credenciais do Testador:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
            <li>
              <strong>Para entrar como Colaborador:</strong> Use e-mails cadastrados. Ex:<br />
              <code className="bg-white/90 px-1 py-0.5 rounded border border-slate-200 font-mono font-medium">alexandrencrego@gmail.com</code> (Layout 3 - Matriz)<br />
              <code className="bg-white/90 px-1 py-0.5 rounded border border-slate-200 font-mono font-medium">silva@pneubras.com.br</code> (Layout 2 - Vendas)
            </li>
            <li>
              <strong>Para entrar como Administrador:</strong> Ative a seleção abaixo e use:<br />
              E-mail: <code className="bg-white/90 px-1 py-0.5 rounded border border-slate-200 font-mono font-medium">admin@pneubras.com.br</code><br />
              Senha: <code className="bg-white/90 px-1 py-0.5 rounded border border-slate-200 font-mono font-medium">admin123</code>
            </li>
          </ul>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Email block */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">E-mail Corporativo</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                id="login-email-input"
                placeholder="nome@pneubras.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-800 transition-all font-medium"
              />
            </div>
          </div>

          {/* Admin Switch selection */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="space-y-0.5">
              <label htmlFor="login-admin-checkbox" className="block text-xs font-bold text-slate-700 cursor-pointer">
                Entrar como Administrador
              </label>
              <span className="block text-[10px] text-slate-400 font-medium">Acesso restrito para gestores</span>
            </div>
            <input
              type="checkbox"
              id="login-admin-checkbox"
              checked={isAdminMode}
              onChange={handleAdminCheckboxChange}
              className="w-4 h-4 text-slate-900 focus:ring-slate-800 border-slate-300 rounded cursor-pointer"
            />
          </div>

          {/* Password block if AdminMode triggered */}
          {isAdminMode && (
            <div className="space-y-1.5 animate-fade-in">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Senha do Painel</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  id="login-password-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-800 transition-all font-medium"
                />
              </div>
            </div>
          )}

          {/* Error display notifications */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 mt-0.5 text-rose-500 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 cursor-pointer transition disabled:opacity-50 text-xs flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Validando Credenciais...' : 'Acessar Canal SST'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">
            SST SECURITY PROTOCOL V1.0 • PNEUBRAS
          </p>
        </div>
      </div>
    </div>
  );
}
