# Setup Supabase - Waitlist Forge

Guia completo para configurar o Supabase e a waitlist do Forge.

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Name**: forge-landing
   - **Database Password**: Gere uma senha forte
   - **Region**: Escolha a mais próxima (ex: South America - São Paulo)
4. Aguarde a criação (2-3 minutos)

## 2. Criar Tabela `waitlist`

No painel do Supabase, vá para **SQL Editor** e execute:

```sql
-- Criar tabela waitlist
CREATE TABLE public.waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance
CREATE INDEX idx_waitlist_email ON public.waitlist(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Política de leitura (apenas para admin)
CREATE POLICY "Allow read for authenticated users"
  ON public.waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Política de inserção (qualquer um pode inserir)
CREATE POLICY "Allow insert for anonymous users"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);
```

## 3. Obter Credenciais

1. No painel do Supabase, vá para **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.local.example` para `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Preencha com suas credenciais:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```

## 5. Instalar Dependências e Testar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` e teste o formulário.

## 6. Verificar Dados

No painel do Supabase, vá para **Table Editor** → **waitlist** para ver os emails cadastrados.

## Tratamento de Erros Implementado

### Validação de Email
- ✓ Formato válido (RFC 5322 simplificado)
- ✓ Comprimento entre 5 e 254 caracteres
- ✓ Sem caracteres inválidos
- ✓ Normalização (trim + lowercase)

### Duplicatas
- ✓ Verificação antes de inserir
- ✓ Tratamento de erro `23505` (unique constraint)
- ✓ Mensagem amigável ao usuário

### Rate Limiting
- ✓ Limite de 5 requisições por IP por hora
- ✓ Retorna erro 429 quando excedido
- ✓ Configurável via variáveis de ambiente

### Erros de Banco de Dados
- ✓ Tratamento de erro `23505` (duplicate)
- ✓ Tratamento de erro `23502` (not null)
- ✓ Tratamento de erro `42P01` (table not found)
- ✓ Logs detalhados para debug

## Fluxo de Submissão

```
1. Usuário digita email
2. Validação local (cliente)
3. Submissão para /api/waitlist (POST)
4. Validação no servidor
5. Verificação de duplicata
6. Inserção no Supabase
7. Resposta com sucesso ou erro
8. Feedback visual ao usuário
```

## Recursos Adicionais

### Monitorar Waitlist
```bash
# Em desenvolvimento, acesse:
curl http://localhost:3000/api/waitlist
```

### Exportar Dados
No painel do Supabase:
1. Vá para **Table Editor** → **waitlist**
2. Clique em **⋮** → **Export as CSV**

### Webhooks
Para integrar com ferramentas como Zapier, Slack, etc:
1. No Supabase, vá para **Database** → **Webhooks**
2. Crie um novo webhook para a tabela `waitlist`
3. Configure o evento `INSERT`
4. Adicione a URL do seu webhook

## Segurança

- ✓ RLS (Row Level Security) habilitado
- ✓ Validação no cliente e servidor
- ✓ Rate limiting implementado
- ✓ IP e User-Agent registrados
- ✓ Variáveis de ambiente protegidas

## Troubleshooting

### "Missing Supabase environment variables"
- Verifique se `.env.local` existe
- Confirme se as variáveis estão preenchidas corretamente

### "Table doesn't exist"
- Execute o SQL de criação da tabela no Supabase

### "Unique constraint violation"
- O email já existe na waitlist
- Implementação trata isso corretamente

### Rate limit atingido
- Aguarde 1 hora ou altere `WAITLIST_RATE_LIMIT_WINDOW_MS`

## Próximos Passos

1. **Email de Confirmação**: Integrar com Resend, SendGrid ou similar
2. **Dashboard Admin**: Criar página para visualizar e gerenciar waitlist
3. **Analytics**: Rastrear origem dos usuários
4. **Automação**: Enviar emails quando o app lançar
