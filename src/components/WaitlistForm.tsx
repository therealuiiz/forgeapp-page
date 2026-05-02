'use client';

import { useState, useCallback } from 'react';
import { validateEmail } from '@/lib/supabase';

type FormStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

interface FormState {
  status: FormStatus;
  message: string;
  errorCode?: string;
}

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const isLoading = formState.status === 'validating' || formState.status === 'submitting';

  /**
   * Valida o email em tempo real
   */
  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);

    // Se houver mensagem de erro anterior, limpar
    if (formState.status === 'error') {
      setFormState({ status: 'idle', message: '' });
    }
  }, [formState.status]);

  /**
   * Submete o formulário via POST /api/waitlist
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação local antes de bater na API
    const validation = validateEmail(email);
    if (!validation.valid) {
      setFormState({
        status: 'error',
        message: validation.error || 'Email inválido',
        errorCode: 'INVALID_EMAIL',
      });
      return;
    }

    // Estado de submissão
    setFormState({ status: 'submitting', message: 'Processando...' });

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const result = await response.json();

      if (result.success) {
        setFormState({
          status: 'success',
          message: result.message,
        });
        setEmail('');

        // Limpar mensagem de sucesso após 6 segundos
        setTimeout(() => {
          setFormState({ status: 'idle', message: '' });
        }, 6000);
      } else {
        setFormState({
          status: 'error',
          message: result.message,
          errorCode: result.code,
        });
      }
    } catch (err) {
      setFormState({
        status: 'error',
        message: 'Erro ao processar sua solicitação. Tente novamente.',
        errorCode: 'NETWORK_ERROR',
      });
      console.error('Form submission error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-3">
        {/* Input e Button */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            disabled={isLoading}
            required
            autoComplete="email"
            aria-label="Email para waitlist"
            className={`flex-1 px-4 py-3 bg-zinc-900/50 border rounded-lg text-white placeholder-zinc-500 focus:outline-none transition-colors disabled:opacity-50 ${
              formState.status === 'error'
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-emerald-500/30 focus:border-emerald-500'
            }`}
          />
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            aria-busy={isLoading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {formState.status === 'submitting' ? 'Enviando...' : 'Entrar no beta'}
          </button>
        </div>

        {/* Mensagem de Sucesso */}
        {formState.status === 'success' && (
          <div
            className="p-3 bg-emerald-500/10 border border-emerald-500/50 rounded-lg text-emerald-400 text-sm"
            role="alert"
          >
            {formState.message}
          </div>
        )}

        {/* Mensagem de Erro */}
        {formState.status === 'error' && (
          <div
            className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
            role="alert"
          >
            {formState.message}
            {formState.errorCode === 'DUPLICATE_EMAIL' && (
              <p className="text-xs mt-1 opacity-75">
                Se acredita que é um erro, entre em contato conosco.
              </p>
            )}
          </div>
        )}

        {/* Dica de ajuda */}
        {formState.status === 'idle' && email && !validateEmail(email).valid && (
          <p className="text-xs text-zinc-400">
            {validateEmail(email).error}
          </p>
        )}
      </div>
    </form>
  );
}
