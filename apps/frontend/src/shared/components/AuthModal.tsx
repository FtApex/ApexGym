"use client";

import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { User } from '@/shared/types';
import { useAuth } from '../providers/AuthProvider';
import { SubmitButton } from './ActionButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

/** Cuentas de demostración cargadas por el seeder, para agilizar las pruebas. */
const DEMO_ACCOUNTS: { email: string; label: string }[] = [
  { email: 'superadmin@apexgym.pe', label: 'Super Admin' },
  { email: 'admin.sanmiguel@apexgym.pe', label: 'Admin Sede' },
  { email: 'recepcion.surco@apexgym.pe', label: 'Recepción' },
  { email: 'carlos.trainer@apexgym.pe', label: 'Entrenador' },
  { email: 'mariana.gomez@gmail.com', label: 'Cliente' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('superadmin@apexgym.pe');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Guarda contra reenvío mientras la petición anterior sigue en curso.
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);
    try {
      const user = await login(email, password);
      onLogin(user);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl text-neutral-100 max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Acceso al Sistema</span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight mb-1">
          Iniciar Sesión BackOffice
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          Ingresa con tus credenciales. Los permisos se determinan por el rol de tu cuenta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white focus:border-brand-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white focus:border-brand-primary focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-brand-primary-alpha border border-brand-primary-alpha rounded-xl text-brand-primary text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <SubmitButton
            isBusy={isSubmitting}
            busyLabel="Verificando..."
            icon={<ArrowRight className="w-4 h-4 order-2" />}
            className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-contrast font-bold text-sm rounded-xl shadow-brand-glow flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            Ingresar
          </SubmitButton>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-800">
          <p className="text-[11px] text-neutral-500 font-medium mb-2">
            Cuentas de demostración (usa la contraseña definida en el seed):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_ACCOUNTS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => setEmail(account.email)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  email === account.email
                    ? 'bg-brand-primary-alpha text-brand-primary border border-brand-primary-alpha'
                    : 'bg-neutral-800/60 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {account.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
