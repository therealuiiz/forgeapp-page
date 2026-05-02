import { createClient } from '@supabase/supabase-js';

export interface WaitlistEntry {
  id?: number;
  email: string;
  created_at?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  error?: string;
  code?: string;
}

let supabaseInstance: any = null;

/**
 * Obtém a instância do cliente Supabase (apenas no lado do cliente)
 */
function getSupabaseClient() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseInstance;
}

/**
 * Valida um endereço de email usando regex mais robusto (RFC 5322 simplificado)
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email é obrigatório' };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Verificar comprimento
  if (trimmedEmail.length < 5 || trimmedEmail.length > 254) {
    return { valid: false, error: 'Email deve ter entre 5 e 254 caracteres' };
  }

  // Regex mais robusto para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Formato de email inválido' };
  }

  // Verificar padrões inválidos comuns
  if (trimmedEmail.includes('..') || trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
    return { valid: false, error: 'Email contém caracteres inválidos' };
  }

  return { valid: true };
}

/**
 * Normaliza um email (trim e lowercase)
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Verifica se um email já existe na waitlist
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return false;
    }

    const normalizedEmail = normalizeEmail(email);
    const { data, error } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', normalizedEmail)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found (esperado)
      console.error('Error checking email existence:', error);
    }

    return !!data;
  } catch (err) {
    console.error('Error in checkEmailExists:', err);
    return false;
  }
}

/**
 * Adiciona um email à waitlist do Forge
 * Valida, normaliza, verifica duplicatas e salva no Supabase
 */
export async function addToWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // 1. Validar email
    const validation = validateEmail(email);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.error || 'Email inválido',
        error: 'invalid_email',
        code: 'INVALID_EMAIL',
      };
    }

    // 2. Normalizar email
    const normalizedEmail = normalizeEmail(email);

    // 3. Verificar se cliente Supabase está disponível
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        message: 'Erro de conexão (ambiente servidor)',
        error: 'server_environment',
        code: 'SERVER_ENVIRONMENT',
      };
    }

    // 4. Verificar duplicata
    const exists = await checkEmailExists(normalizedEmail);
    if (exists) {
      return {
        success: false,
        message: 'Este email já está na waitlist 🎯',
        error: 'duplicate_email',
        code: 'DUPLICATE_EMAIL',
      };
    }

    // 5. Inserir no Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: normalizedEmail }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);

      // Tratamento específico de erros
      if (error.code === '23505') {
        // Unique constraint violation
        return {
          success: false,
          message: 'Este email já está na waitlist 🎯',
          error: 'duplicate_email',
          code: 'DUPLICATE_EMAIL',
        };
      }

      if (error.code === '23502') {
        // Not null violation
        return {
          success: false,
          message: 'Email é obrigatório',
          error: 'missing_email',
          code: 'MISSING_EMAIL',
        };
      }

      if (error.code === '42P01') {
        // Table doesn't exist
        return {
          success: false,
          message: 'Erro de configuração do servidor',
          error: 'table_not_found',
          code: 'TABLE_NOT_FOUND',
        };
      }

      return {
        success: false,
        message: 'Erro ao adicionar à waitlist. Tente novamente.',
        error: error.message,
        code: error.code,
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        message: 'Erro ao adicionar à waitlist',
        error: 'no_data_returned',
        code: 'NO_DATA_RETURNED',
      };
    }

    return {
      success: true,
      message: '✓ Você entrou na waitlist do Forge! Fique atento ao seu email.',
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('Unexpected error in addToWaitlist:', err);

    return {
      success: false,
      message: 'Erro de conexão. Por favor, tente novamente.',
      error: errorMessage,
      code: 'UNEXPECTED_ERROR',
    };
  }
}
