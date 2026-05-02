-- ============================================================================
-- CREATE WAITLIST TABLE
-- ============================================================================
-- Este arquivo contém o SQL para criar a tabela waitlist no Supabase
-- Execute este código no SQL Editor do Supabase
-- ============================================================================

-- 1. Criar tabela waitlist
CREATE TABLE IF NOT EXISTS public.waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- 3. Habilitar RLS (Row Level Security)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 4. Política de leitura (apenas para usuários autenticados)
CREATE POLICY IF NOT EXISTS "Allow read for authenticated users"
  ON public.waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. Política de inserção (qualquer um pode inserir)
CREATE POLICY IF NOT EXISTS "Allow insert for anonymous users"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

-- 6. Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Criar trigger para atualizar updated_at
CREATE TRIGGER update_waitlist_updated_at
BEFORE UPDATE ON public.waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- VERIFICAÇÃO
-- ============================================================================
-- Execute estas queries para verificar se tudo foi criado corretamente:

-- Ver estrutura da tabela
-- SELECT * FROM information_schema.columns WHERE table_name = 'waitlist';

-- Ver índices
-- SELECT * FROM pg_indexes WHERE tablename = 'waitlist';

-- Ver políticas RLS
-- SELECT * FROM pg_policies WHERE tablename = 'waitlist';

-- Ver total de emails na waitlist
-- SELECT COUNT(*) as total_emails FROM public.waitlist;

-- Ver últimos 10 emails
-- SELECT email, created_at FROM public.waitlist ORDER BY created_at DESC LIMIT 10;
