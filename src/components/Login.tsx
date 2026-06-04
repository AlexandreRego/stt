/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Mail, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { AllowedEmail } from '../types';

interface LoginModalProps {
  allowedEmails: AllowedEmail[];
  onLoginSuccess: (email: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ allowedEmails, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'colaborador' | 'admin'>('colaborador');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingUser, setPendingUser] = useState<AllowedEmail | null>(null);

  const fillColaborador = () => {
    setActiveTab('colaborador');
    setEmailInput('alexandrencrego@gmail.com');
    setPasswordInput('');
    setErrorMsg('');
    setPendingUser(null);
  };

  const fillAdmin = () => {
    setActiveTab('admin');
    setEmailInput('admin@pneubras.com.br');
    setPasswordInput('admin');
    setErrorMsg('');
    setPendingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const formattedEmail = emailInput.trim().toLowerCase();

    if (!formattedEmail) {
      setErrorMsg('Por favor, informe seu e-mail.');
      return;
    }

    if (activeTab === 'admin') {
      // Admin validation with password requirement
      if (!passwordInput) {
        setErrorMsg('Por favor, informe a senha do Administrador.');
        return;
      }
      
      const user = allowedEmails.find(
        (item) => item.email.toLowerCase() === formattedEmail
      );

      if (!user) {
        setErrorMsg('Usuário administrativo não cadastrado na base.');
        return;
      }

      if (user.role !== 'admin') {
        setErrorMsg('Este e-mail não possui privilégios de Administrador.');
        return;
      }

      // Allow 'admin' as password for demonstration, or check match
      if (passwordInput !== 'admin') {
        setErrorMsg('Senha incorreta. Utilize a senha fornecida para homologação ("admin").');
        return;
      }

      // Successful admin login
      onLoginSuccess(user.email);
    } else {
      // Colaborador flow (no password, check if exists in allowed list, can be admin or user role)
      const user = allowedEmails.find(
        (item) => item.email.toLowerCase() === formattedEmail
      );

      if (user) {
        setPendingUser(user);
      } else {
        setErrorMsg('E-mail não cadastrado na base de colaboradores.');
      }
    }
  };

  return (
    <div id="login-outer-container" className="min-h-screen w-full flex flex-col lg:flex-row bg-[#080d1a] animate-fade-in">
      
      {/* Left Section (Visual Brand Showcase Pane) */}
      <div 
        id="login-left-panel" 
        className="flex-1 flex flex-col justify-between p-8 sm:p-12 md:p-16 text-white bg-[#0a0f24] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] lg:min-h-screen relative overflow-hidden"
      >
        {/* Top Branding Section */}
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 rounded-xl shadow-xs flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight">PneuBras</span>
              <span className="font-sans font-semibold text-[10px] sm:text-[10px] text-emerald-400 uppercase tracking-widest px-1.5 py-0.5 bg-emerald-950/40 border border-emerald-500/15 rounded-md">SST PORTAL</span>
            </div>
            <p className="font-sans text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-bold mt-1">
              Saúde, Segurança e Higiene Ocupacional
            </p>
          </div>
        </div>

        {/* Center Main Message */}
        <div className="max-w-xl my-auto py-12 lg:py-0">
          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-[42px] leading-[1.12] text-white tracking-tight mb-6">
            Padrão corporativo de excelência em segurança e risco zero.
          </h1>
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Bem-vindo ao Portal de SST integrado da PneuBras e Oficinas PneuDrive. Utilize suas credenciais cadastradas na base colaboradora para relatar inspeções físicas, realizar treinamentos de conformidade regulatória nas filiais e acompanhar as metas internas.
          </p>
        </div>

        {/* Bottom subtle specs info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-[9px] text-slate-500 uppercase tracking-wider pt-6 border-t border-slate-800/50">
          <span>Portabilidade Vercel</span>
          <span className="text-slate-700">•</span>
          <span>GSuite GDrive Sincronizado</span>
          <span className="text-slate-700">•</span>
          <span>NR-01 Regulamentação</span>
        </div>
      </div>

      {/* Right Section (Authentication Panel Column) */}
      <div className="w-full lg:w-[480px] bg-white flex flex-col justify-between py-12 px-6 sm:px-12 md:px-14 lg:p-14 xl:p-16 shadow-2xl border-l border-slate-100 flex-shrink-0 relative overflow-y-auto min-h-[600px] lg:min-h-screen">
        
        {/* Top Header details */}
        <div className="space-y-2">
          <span className="inline-flex bg-emerald-50 text-emerald-700 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-2 border border-emerald-100/50 shadow-3xs">
            SST Corporativo
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900 leading-tight">
            Autenticação de Usuário
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Informe suas credenciais para acessar os formulários técnicos ou painel executivo de indicadores.
          </p>
        </div>

        {/* Dynamic Authenticator Area */}
        <div className="my-8">
          
          {pendingUser ? (
            /* Multi-step Confirm Form block */
            <div id="login-confirmation-modal" className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <UserCheck className="w-5 h-5 text-emerald-600 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900 font-sans">Confirmar Identificação</h3>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Por favor, confirme se seus dados cadastrados na nossa base corporativa PneuBras estão corretos para iniciar:
              </p>

              <div className="text-xs text-slate-700 space-y-2.5 bg-slate-50/50 border border-slate-200/60 p-4 rounded-2xl font-mono shadow-3xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">NOME:</span>
                  <span className="font-bold text-slate-800">{pendingUser.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">MATRÍCULA:</span>
                  <span className="font-bold text-slate-800">{pendingUser.employeeId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">EMPRESA:</span>
                  <span className="font-bold text-slate-800">{pendingUser.company}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">TIPO:</span>
                  <span className="font-bold text-slate-800 uppercase">{pendingUser.companyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">CÓDIGO:</span>
                  <span className="font-bold text-slate-800 font-mono">{pendingUser.companyCode}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onLoginSuccess(pendingUser.email)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-xs transition duration-150 cursor-pointer active:scale-95 text-center"
                >
                  Sim, meus dados estão corretos
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `mailto:admin@ssma.com.br?subject=Solicitação de correção de dados - ${pendingUser.name}`;
                    alert('E-mail para solicitação de correção aberto com suporte corporativo.');
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-850 font-sans font-bold text-xs text-center py-2.5 px-4 rounded-xl transition duration-150 cursor-pointer"
                >
                  Solicitar Correção
                </button>
                <button
                  type="button"
                  onClick={() => setPendingUser(null)}
                  className="w-full text-center text-[10px] font-sans text-slate-400 hover:text-slate-600 cursor-pointer pt-2 uppercase tracking-wider font-semibold"
                >
                  ← Alterar E-mail Informado
                </button>
              </div>
            </div>
          ) : (
            /* Switch Tab mode and standard inputs */
            <div className="space-y-6">
              {/* Custom Selector Tabs */}
              <div className="bg-slate-100/80 p-1 rounded-xl flex gap-1 border border-slate-200/40 shadow-3xs">
                <button
                  type="button"
                  onClick={() => { setActiveTab('colaborador'); setErrorMsg(''); }}
                  className={`flex-1 py-2.5 px-3.5 text-center rounded-lg text-xs font-bold font-sans transition-all duration-150 cursor-pointer ${
                    activeTab === 'colaborador'
                      ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Acesso Colaborador
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
                  className={`flex-1 py-2.5 px-3.5 text-center rounded-lg text-xs font-bold font-sans transition-all duration-150 cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Modo Administrador
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                    {activeTab === 'colaborador' ? 'E-MAIL CORPORATIVO DO COLABORADOR' : 'E-MAIL CORPORATIVO DO ADMINISTRADOR'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      id="input-login-email"
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="seu.nome@pneubras.com.br / @pneudrive..."
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/10 rounded-xl py-3 pl-11 pr-4 text-xs font-sans placeholder-slate-400 outline-none transition-all shadow-3xs"
                    />
                  </div>
                </div>

                {activeTab === 'admin' && (
                  <div className="space-y-1.5 animate-slide-up">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                      SENHA DE ACESSO DO ADMINISTRADOR
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        id="input-login-password"
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Digite sua senha"
                        className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/10 rounded-xl py-3 pl-11 pr-4 text-xs font-sans placeholder-slate-400 outline-none transition-all shadow-3xs"
                      />
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div id="login-error-alert" className="p-3 bg-rose-50 border border-rose-100/70 rounded-xl flex gap-2 sm:gap-2.5 items-start text-xs text-rose-805 animate-fade-in shadow-3xs">
                    <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="font-sans font-medium leading-relaxed">{errorMsg}</span>
                  </div>
                )}

                <button
                  id="btn-login-submit"
                  type="submit"
                  className="w-full bg-[#080d1a] hover:bg-slate-900 border-none text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-md inline-flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>{activeTab === 'colaborador' ? 'Entrar como Colaborador' : 'Entrar como Administrador'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Homologation Shortcuts / Demonstrations inside white panel bottom */}
        <div className="border-t border-slate-100 pt-6 mt-2 space-y-4">
          <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl border-dashed shadow-3xs">
            <span className="block text-[9px] uppercase font-mono tracking-widest font-bold text-slate-400 mb-3">
              Credenciais de Demonstração / Homologação:
            </span>
            <div className="space-y-2 font-sans text-xs">
              <button
                type="button"
                onClick={fillColaborador}
                className="w-full text-left p-2.5 hover:bg-emerald-50/50 rounded-xl group transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
              >
                <div className="text-emerald-500 font-bold group-hover:translate-x-0.5 transition-transform">➔</div>
                <div>
                  <p className="font-bold text-slate-800 text-[11px] leading-tight">Colaborador Ativo (Matriz)</p>
                  <p className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-800 transition-colors mt-0.5">
                    alexandrencrego@gmail.com
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={fillAdmin}
                className="w-full text-left p-2.5 hover:bg-emerald-50/50 rounded-xl group transition-all duration-150 flex items-start gap-2.5 cursor-pointer"
              >
                <div className="text-emerald-500 font-bold group-hover:translate-x-0.5 transition-transform">➔</div>
                <div>
                  <p className="font-bold text-slate-800 text-[11px] leading-tight">Administrador</p>
                  <p className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-800 transition-colors mt-0.5">
                    admin@pneubras.com.br <span className="text-slate-300 mx-1">/</span> <span className="font-bold">senha: admin</span>
                  </p>
                </div>
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-slate-400 tracking-tight font-sans">
            Acesso garantido para colaboradores cadastrados na Base de Colaboradores.
          </p>
        </div>

      </div>

    </div>
  );
};
