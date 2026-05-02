# Testes da Integração Supabase - Waitlist Forge

Guia para testar a integração da waitlist.

## Testes Manuais

### 1. Teste de Email Válido

**Cenário**: Adicionar um email válido à waitlist

```
Email: usuario@example.com
Resultado esperado: ✓ Você entrou na waitlist do Forge! Fique atento ao seu email.
```

**Verificação**:
- [ ] Mensagem de sucesso aparece
- [ ] Email desaparece do input
- [ ] Email aparece na tabela `waitlist` do Supabase

### 2. Teste de Email Duplicado

**Cenário**: Tentar adicionar o mesmo email duas vezes

```
Primeira tentativa: usuario@example.com → Sucesso
Segunda tentativa: usuario@example.com → Erro
Resultado esperado: Este email já está na waitlist 🎯
```

**Verificação**:
- [ ] Primeira submissão sucede
- [ ] Segunda submissão retorna erro de duplicata
- [ ] Apenas um registro na tabela Supabase

### 3. Teste de Email Inválido

**Cenários**:

| Email | Resultado Esperado |
|---|---|
| `usuario` | Formato de email inválido |
| `usuario@` | Formato de email inválido |
| `@example.com` | Formato de email inválido |
| `usuario@example` | Formato de email inválido |
| `usuario..name@example.com` | Email contém caracteres inválidos |
| `.usuario@example.com` | Email contém caracteres inválidos |
| `usuario@example.com.` | Email contém caracteres inválidos |
| ` ` (vazio) | Email é obrigatório |

### 4. Teste de Normalização

**Cenário**: Verificar se emails com variações são tratados como duplicatas

```
Primeira tentativa: Usuario@Example.COM → Sucesso
Segunda tentativa: usuario@example.com → Erro de duplicata
```

**Verificação**:
- [ ] Ambos são normalizados para `usuario@example.com`
- [ ] Sistema detecta duplicata corretamente

### 5. Teste de Comprimento de Email

| Email | Caracteres | Resultado |
|---|---|---|
| `a@b.c` | 5 | ✓ Válido |
| `a@b` | 3 | ✗ Inválido |
| `x` * 250 + `@example.com` | 265 | ✗ Inválido (> 254) |

### 6. Teste de Rate Limiting

**Cenário**: Enviar múltiplas requisições do mesmo IP

```
Requisição 1: ✓ Sucesso
Requisição 2: ✓ Sucesso
Requisição 3: ✓ Sucesso
Requisição 4: ✓ Sucesso
Requisição 5: ✓ Sucesso
Requisição 6: ✗ Muitas tentativas. Tente novamente mais tarde.
```

**Verificação**:
- [ ] Primeiras 5 requisições funcionam
- [ ] 6ª requisição retorna erro 429
- [ ] Aguardar 1 hora (ou alterar `WAITLIST_RATE_LIMIT_WINDOW_MS`)

### 7. Teste de Feedback Visual

**Verificações**:
- [ ] Input desabilitado durante submissão
- [ ] Botão mostra "Enviando..." durante submissão
- [ ] Mensagem de sucesso em verde
- [ ] Mensagem de erro em vermelho
- [ ] Mensagem desaparece após 6 segundos (sucesso)
- [ ] Mensagem de erro persiste até nova tentativa

### 8. Teste de Responsividade

**Verificações**:
- [ ] Funciona em desktop (flex-row)
- [ ] Funciona em mobile (flex-col)
- [ ] Input e botão se redimensionam corretamente
- [ ] Mensagens são legíveis em ambos os tamanhos

## Testes Automatizados (Exemplo com cURL)

### Email Válido
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com"}'
```

**Resposta esperada**:
```json
{
  "success": true,
  "message": "✓ Você entrou na waitlist do Forge! Fique atento ao seu email."
}
```

### Email Duplicado
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com"}'
```

**Resposta esperada**:
```json
{
  "success": false,
  "message": "Este email já está na waitlist 🎯",
  "code": "DUPLICATE_EMAIL"
}
```

### Email Inválido
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"invalido"}'
```

**Resposta esperada**:
```json
{
  "success": false,
  "message": "Formato de email inválido",
  "code": "INVALID_EMAIL"
}
```

### Verificar Contagem (Desenvolvimento)
```bash
curl http://localhost:3000/api/waitlist
```

**Resposta esperada**:
```json
{
  "success": true,
  "message": "Total de emails na waitlist: 3",
  "count": 3
}
```

## Checklist de Validação

- [ ] Validação de email funciona
- [ ] Duplicatas são detectadas
- [ ] Normalização (lowercase + trim) funciona
- [ ] Rate limiting funciona
- [ ] Dados são salvos no Supabase
- [ ] Mensagens de erro são claras
- [ ] Feedback visual é apropriado
- [ ] Responsividade em mobile
- [ ] Sem erros no console
- [ ] Sem erros no servidor

## Debugging

### Ver Logs do Servidor
```bash
npm run dev
# Observar output no terminal
```

### Ver Requisições de Rede
1. Abrir DevTools (F12)
2. Ir para aba **Network**
3. Submeter formulário
4. Verificar requisição para `/api/waitlist`

### Ver Dados no Supabase
1. Acessar painel Supabase
2. Ir para **Table Editor**
3. Selecionar tabela **waitlist**
4. Verificar registros

### Limpar Dados de Teste
```sql
-- No SQL Editor do Supabase
DELETE FROM public.waitlist WHERE email LIKE '%@example.com';
```

## Casos de Erro Esperados

| Código | Significado | Ação |
|---|---|---|
| `INVALID_EMAIL` | Email não passa na validação | Corrigir formato |
| `DUPLICATE_EMAIL` | Email já existe | Usar outro email |
| `RATE_LIMITED` | Muitas requisições | Aguardar 1 hora |
| `SERVER_ENVIRONMENT` | Variáveis de ambiente faltando | Configurar `.env.local` |
| `TABLE_NOT_FOUND` | Tabela não existe no Supabase | Criar tabela |
| `INTERNAL_SERVER_ERROR` | Erro inesperado | Verificar logs |

## Performance

- Validação local: < 5ms
- Requisição API: < 500ms (incluindo Supabase)
- Inserção no Supabase: < 200ms
- Verificação de duplicata: < 100ms

## Segurança

- [ ] RLS habilitado no Supabase
- [ ] Rate limiting implementado
- [ ] Validação no cliente e servidor
- [ ] Sem exposição de dados sensíveis
- [ ] CORS configurado corretamente
