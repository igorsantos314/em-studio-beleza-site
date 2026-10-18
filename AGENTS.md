# AGENTS.md

Guia de contexto e boas práticas para agentes de IA (e pessoas) que trabalham neste repositório.

## 1. Visão geral

Site institucional do **EM Studio Beleza / Ellen Moraes (nail design)**. Aplicação **front-end estática (SPA)**, sem backend: os dados são mockados em memória e o contato real acontece por **WhatsApp / Instagram**.

Funcionalidades principais:
- Página inicial com seções (hero, sobre, procedimentos, políticas, pagamentos, cuidados, endereço).
- **Assistente de chat** (bot da Ellen) com fluxo de opções: agendamento, sugestão de cores, WhatsApp, Instagram.
- **Paleta de cores** interativa (`ColorPaletteModal`).
- **Pagamento PIX** (seção `#pix`) com QR Code / copia-e-cola e deep link para o app do banco.

## 2. Stack

| Item | Versão / observação |
| --- | --- |
| React | 19 (`react`, `react-dom`) |
| TypeScript | ~5.9 (strict) |
| Vite | 7 (`@vitejs/plugin-react`) |
| Tailwind CSS | **v4** via `@tailwindcss/vite` |
| React Router | 7 (`react-router-dom`) |
| TanStack Query | 5 (`@tanstack/react-query`) |
| Ícones | **Material Symbols Rounded** (Google Fonts) via componente `Icon` |
| QR Code | `qrcode.react` |
| Tema | `next-themes` (hoje fixo em light) |

> ⚠️ O `README.md` está desatualizado em alguns pontos (menciona Lucide React e PostCSS/Autoprefixer). **Não há mais `lucide-react` nem `postcss.config.js`.**

Recomendado: **Node 20+** (o Vite 7 exige Node 20.19+ / 22.12+).

## 3. Comandos

```bash
npm install        # instalar dependências
npm run dev        # dev server (Vite) — normalmente em http://localhost:5173
npm run build      # tsc -b && vite build (typecheck + build de produção)
npm run lint       # eslint .
npm run test       # vitest (watch)
npm run test:run   # vitest run (execução única, ideal para CI)
npm run preview    # serve a build de produção
```

Checklist antes de finalizar qualquer tarefa:

```bash
npm run build && npm run lint && npm run test:run
```

## 4. Estrutura de pastas

```
src/
├── App.tsx                 # providers + rotas (BrowserRouter/Routes)
├── main.tsx                # entrypoint
├── index.css               # Tailwind v4 (@import "tailwindcss" + @config)
├── assets/images/          # imagens importadas nos componentes
├── components/
│   ├── layout/             # Layout, Footer, Navbar, Sidebar, ScrollToTop, PageContainer
│   ├── modals/             # AppointmentModal, ColorPaletteModal
│   ├── sections/           # seções da home (+ procedures/ para cada procedimento)
│   ├── chatbot/            # ChatAssistant.tsx + chatFlow.ts
│   └── ui/                 # componentes genéricos (Icon)
├── constants/              # contacts.ts (WhatsApp/Instagram), pix.ts
├── contexts/               # ThemeContext
├── pages/                  # HomePage, NotFoundPage
├── repositories/           # camada de dados mockada (Appointment, Color)
├── types/                  # tipos TypeScript por domínio
└── utils/                  # utilitários puros (pix.ts)
```

## 5. Convenções de código

- **Importações relativas** (não há alias `@/`).
- **`import type`** é obrigatório para tipos (`verbatimModuleSyntax`). Ex.: `import type { ChatOption } from '../../types/Chat'`.
- **Sem `enum`/`namespace`** com comportamento em runtime (`erasableSyntaxOnly`) — use union types + `as const`.
- **Variáveis/parâmetros não usados quebram o build** (`noUnusedLocals`, `noUnusedParameters`).
- **Não adicione comentários** no código, salvo quando agregarem contexto não óbvio.
- **Sem emojis** em código/copy, exceto quando o solicitante pedir explicitamente (ex.: mensagens específicas do chatbot já usam 😊 por decisão de produto).
- Componentes: function components + hooks. Props tipadas por interface local. Export default para páginas/seções, export nomeado quando fizer sentido.
- Estilo: **Tailwind utility-first** direto no JSX. Evite CSS avulso; quando necessário, use `src/index.css` ou `App.css`.

### Tailwind v4 — atenção
- Config do Tailwind é carregada via `@config "../tailwind.config.js"` no `src/index.css`. O plugin está em `vite.config.ts` (`tailwindcss()`), **não** em PostCSS.
- Sintaxe v4: `@import "tailwindcss";` (não usar `@tailwind base/components/utilities`).
- Utilitários removidos no v4 que ainda podem existir em código antigo: `bg-opacity-*`/`text-opacity-*` → use `bg-black/50`; `flex-shrink-*`/`flex-grow-*` → `shrink-*`/`grow-*`.
- Cores da marca normalmente são usadas como **valores arbitrários** (ex.: `bg-[#2C2420]`), embora existam tokens `studio-*` no `tailwind.config.js` (pouco usados).

### Ícones (Material Symbols)
- Sempre renderize ícones pelo componente `src/components/ui/Icon.tsx`: `<Icon name="favorite" size={20} filled />`.
- A fonte é subsetada no `index.html` via `&icon_names=...`. **Ao usar um ícone novo, adicione o nome à lista** (ordem alfabética) — senão ele aparece como texto.
- Confira se o nome existe: `qr_code_2` existe; `pix` **não** existe (usamos `qr_code_2`).

## 6. Design system

- **Cores**: marrom escuro `#2C2420`, marrom `#3D342D`, bege `#E8DDD3`, tan `#C8B8A8`, marrom claro `#5C4F45`. Fundos bege/marrom, cards brancos, tipografia escura.
- **Fontes**: títulos em `font-serif` (Playfair Display); corpo em Montserrat (definido no `index.css`).
- **Tons de destaque**: WhatsApp `#25D366`, Instagram (gradiente), PIX/rosa nos modais (`rose-*`).
- Padrão de seção: `<section>` com `py-20 px-6`, título central `font-serif`, divisor `w-24 h-1 bg-[#2C2420]`.

## 7. Arquitetura de features

### Chatbot (`src/components/chatbot/`)
- **Fluxo declarativo** em `chatFlow.ts`: um mapa `Record<string, ChatNode>` com `messages` e `options`.
- Cada `ChatOption` tem `next` (vai para outro nó) e/ou `action`.
- Ações suportadas (`src/types/Chat.ts`): `whatsapp`, `whatsappProcedure`, `whatsappColor`, `instagram`, `maps`, `openPalette`, `openPix`, `schedule`, `scheduleWithColor`, `selectProcedure`, `selectColorSuggestion`, `randomColor`.
- Interpolação de mensagens: use tokens como `{procedureLabel}`/`{colorSuggestion}` no texto; o valor vem do `ChatContext` preenchido ao escolher um procedimento ou uma sugestão de cor.
- `ChatAssistant.tsx` renderiza o launcher + janela e **executa** cada ação. O fluxo é 100% por **respostas rápidas** (botões) — **não há campo de digitação**.
- `validateChatFlow()` roda em `DEV` e loga no console se algum `next` não existir, se uma opção não tiver `next`/`action` ou se um nó ficar sem opções.
- **Regra de ouro:** o fluxo **nunca termina**. Todo nó precisa de opções e, ao final de qualquer ação, as **opções iniciais** (`rootOptions`, via nó `menu`) são reexibidas. Coberto por testes em `chatFlow.test.ts` (grafo) e `ChatAssistant.test.tsx` (comportamento, incluindo "Pagar com PIX").
- Mensagens de WhatsApp são pré-codificadas em `src/constants/contacts.ts` (`WHATSAPP_MESSAGES`).
- Para adicionar um passo: crie o nó em `chatFlow.ts` e, se precisar de comportamento novo, adicione a ação no tipo + trate em `handleOption`.

### PIX (`src/components/sections/PixPaymentSection.tsx`)
- Seção **contraída por padrão**, é a **última seção** da home, com `id="pix"`.
- Abre ao clicar no header, ao clicar no card PIX (`PaymentMethodsSection`) ou ao acessar a URL com `#pix` (listener de `hashchange` + evento custom `pix:open`).
- `src/utils/pix.ts`: monta o **BR Code (EMV)** e o **CRC16-CCITT-FALSE**; gera `pix://?qr=<copia-e-cola>` para abrir o app do banco (padrão BCB — funciona quando o banco registra o esquema; sempre mantenha o fallback de copiar o código).
- `src/constants/pix.ts`: chave, recebedor, cidade e valores rápidos. **A chave PIX é pública** — não trate como segredo, mas confirme antes de alterar.

### Dados / repositórios
- `src/repositories/*` simulam API com `Promise` + `setTimeout`. Não há persistência.
- React Query está configurado em `App.tsx`, mas a maioria dos dados ainda vem direto dos repositórios.

## 8. Git e commits

- Branches: `main` (produção) e `develop` (integração). Trabalhe em `develop`/feature branches.
- Commits seguem **Conventional Commits** no estilo do histórico: `feat: ...`, `fix: ...`, `chore: ...`.
- **Nunca commite sem pedido explícito.** Nunca commite segredos/`node_modules`/`dist` (já no `.gitignore`).

## 9. Testes

**Configuração atual:** `vitest` + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`.

- Config em `vite.config.ts` (`test.environment = 'jsdom'`, `setupFiles: ['./src/test/setup.ts']`).
- `src/test/setup.ts` registra os matchers do `jest-dom` e mocka `scrollIntoView` (jsdom não implementa).
- Convenção: arquivos `*.test.ts` / `*.test.tsx` ao lado do código.

```bash
npm run test       # watch
npm run test:run   # execução única (CI)
```

**Cobertura atual**
- `src/utils/pix.test.ts` — CRC16 (`crc16("123456789") === "29B1"`), payload do BR Code (campos 00/26/53/54/58/59/60/62/63, valor em `54`) e a URI `pix://`.
- `src/components/chatbot/chatFlow.test.ts` — integridade do grafo: todo `next` existe, toda opção tem `next`/`action`, todo nó tem opções (sem becos sem saída), toda ação é conhecida e o nó `menu` reexibe as opções iniciais.
- `src/components/chatbot/ChatAssistant.test.tsx` — comportamento: abertura, sugestão de cores (evento/roupa/sentimento/aleatória, até as opções de agendar com a cor ou enviar ao WhatsApp), agendamento (com confirmação) e a **invariante de que nenhum fluxo termina sem reexibir as opções iniciais** (inclui "Pagar com PIX").

**Ao escrever testes**
- Use `vi.useFakeTimers()` e avance o tempo: o bot responde com um pequeno delay (`pushBotMessages`, ~650ms).
- Mocke efeitos colaterais: `window.open`, `window.dispatchEvent`.
- Prefira testar **comportamento** (o que aparece na tela) em vez de implementação.
- Ao corrigir um bug, adicione um teste que falharia antes da correção.

## 10. Regras rápidas (Do / Don't)

- ✅ Rode `npm run build` e `npm run lint` antes de concluir.
- ✅ Ao criar ícone, registre o nome no subset do `index.html` e use o componente `Icon`.
- ✅ Mantenha o padrão de cores/tipografia das seções existentes.
- ✅ Prefira tipos explícitos e `import type`.
- ❌ Não reintroduza `lucide-react`, `postcss.config.js` nem diretivas `@tailwind` v3.
- ❌ Não use `enum`, variáveis não usadas ou comentários supérfluos.
- ❌ Não adicione emojis sem pedido.
- ❌ Não altere a chave/valores do PIX nem mensagens de contato sem confirmação do responsável.
