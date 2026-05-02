# Forge Landing Page

Landing page moderna e responsiva para o **Forge**, um app de corrida e treino com gamificação, rankings, medalhas, streaks e histórico de evolução.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js App Router |
| Estilização | Tailwind CSS |
| Linguagem | TypeScript |
| Deploy | Pronto para Vercel |

## Como rodar

```bash
npm install
npm run dev
```

Depois, acesse `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura principal

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    AppPreview.tsx
    ButtonLink.tsx
    Features.tsx
    FinalCTA.tsx
    Footer.tsx
    Hero.tsx
    Icons.tsx
    Navbar.tsx
    PhoneMockup.tsx
    ProblemSolution.tsx
    data.ts
```

## Direção visual

A landing segue a identidade **dark mode atlético com acentos verde-neon**, inspirada na referência do app Forge. A interface usa fundo OLED, cartões técnicos, grids sutis, brilho verde controlado, tipografia forte e composição assimétrica para transmitir disciplina, performance e progressão.

## Seções implementadas

| Seção | Objetivo |
|---|---|
| Hero | Apresentar o Forge, slogan, CTA principal e mock visual do app. |
| Problema | Explicar a falta de consistência, motivação e engajamento nos apps atuais. |
| Solução | Posicionar o Forge como sistema de progressão gamificado. |
| Features | Mostrar rankings, medalhas, histórico, treinos estruturados e streaks. |
| Preview do app | Reforçar a percepção de produto real com mock e métricas visuais. |
| CTA final | Converter visitantes para o beta fechado. |

## Observação

O formulário de beta está estruturado visualmente para conversão. Para captar emails em produção, conecte o formulário a uma API, ferramenta de waitlist ou serviço de automação de sua preferência.
