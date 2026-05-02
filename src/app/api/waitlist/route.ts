import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Interface para resposta da API
 */
interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
  code?: string;
}

/**
 * Valida um endereço de email
 */
function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email é obrigatório' };
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length < 5 || trimmedEmail.length > 254) {
    return { valid: false, error: 'Email deve ter entre 5 e 254 caracteres' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Formato de email inválido' };
  }

  if (trimmedEmail.includes('..') || trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
    return { valid: false, error: 'Email contém caracteres inválidos' };
  }

  return { valid: true };
}

/**
 * Normaliza um email
 */
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Obtém o cliente Supabase do servidor
 */
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Obtém o IP do cliente
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip.trim();
}

/**
 * Simples rate limiting em memória (não persiste entre deploys)
 * Para produção, usar Redis ou similar
 */
const requestLog = new Map<string, number[]>();

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const windowMs = parseInt(process.env.WAITLIST_RATE_LIMIT_WINDOW_MS || '3600000', 10); // 1 hora
  const maxRequests = parseInt(process.env.WAITLIST_RATE_LIMIT_MAX_REQUESTS || '5', 10);

  const timestamps = requestLog.get(clientIp) || [];
  const recentRequests = timestamps.filter((ts) => now - ts < windowMs);

  if (recentRequests.length >= maxRequests) {
    return true;
  }

  recentRequests.push(now);
  requestLog.set(clientIp, recentRequests);

  return false;
}

/**
 * POST /api/waitlist
 * Adiciona um email à waitlist
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Verificar método
    if (request.method !== 'POST') {
      return NextResponse.json(
        {
          success: false,
          message: 'Método não permitido',
          code: 'METHOD_NOT_ALLOWED',
        },
        { status: 405 }
      );
    }

    // 2. Verificar rate limit
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Muitas tentativas. Tente novamente mais tarde.',
          code: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    // 3. Parsear corpo da requisição
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Corpo da requisição inválido',
          code: 'INVALID_BODY',
        },
        { status: 400 }
      );
    }

    const { email } = body;

    // 4. Validar email
    const validation = validateEmail(email);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error || 'Email inválido',
          code: 'INVALID_EMAIL',
        },
        { status: 400 }
      );
    }

    // 5. Normalizar email
    const normalizedEmail = normalizeEmail(email);

    // 6. Conectar ao Supabase
    const supabase = getSupabaseClient();

    // 7. Verificar se email já existe
    const { data: existingEmail, error: checkError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', normalizedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking email existence:', checkError);
      return NextResponse.json(
        {
          success: false,
          message: 'Erro ao verificar email',
          code: 'CHECK_ERROR',
        },
        { status: 500 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: 'Este email já está na waitlist 🎯',
          code: 'DUPLICATE_EMAIL',
        },
        { status: 409 }
      );
    }

    // 8. Inserir no Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: normalizedEmail,
          ip_address: clientIp,
          user_agent: request.headers.get('user-agent'),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);

      // Tratamento específico de erros
      if (error.code === '23505') {
        return NextResponse.json(
          {
            success: false,
            message: 'Este email já está na waitlist 🎯',
            code: 'DUPLICATE_EMAIL',
          },
          { status: 409 }
        );
      }

      if (error.code === '42P01') {
        return NextResponse.json(
          {
            success: false,
            message: 'Erro de configuração do servidor',
            code: 'TABLE_NOT_FOUND',
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Erro ao adicionar à waitlist',
          error: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Erro ao adicionar à waitlist',
          code: 'NO_DATA_RETURNED',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: '✓ Você entrou na waitlist do Forge! Fique atento ao seu email.',
      },
      { status: 201 }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('Unexpected error in POST /api/waitlist:', err);

    return NextResponse.json(
      {
        success: false,
        message: 'Erro de servidor. Por favor, tente novamente.',
        error: errorMessage,
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist
 * Retorna informações sobre a waitlist (apenas para debug/admin)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Apenas permitir em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { success: false, message: 'Not found' },
      { status: 404 }
    );
  }

  try {
    const supabase = getSupabaseClient();
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Erro ao contar registros', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Total de emails na waitlist: ${count}`,
        count,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Erro interno', error: String(err) },
      { status: 500 }
    );
  }
}
