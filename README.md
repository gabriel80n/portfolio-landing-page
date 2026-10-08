# portfolio-landing-page — portfólio de Gabriel Nicholas

Frontend Vue 3 + TypeScript + Vite. A primeira versão é estática: apresentação, objetivo profissional, sobre, habilidades, cinco projetos conectados ao IAM Portfolio, download do currículo e contato por Formspree. Não depende da aplicação NestJS.

## Desenvolvimento

Use Node conforme `engines` do package.json e instale as dependências com `npm ci`.

```sh
npm run dev
npm run build
npm run preview
```

No PowerShell com scripts bloqueados, use `npm.cmd`. O build gera `dist/`.

## Conteúdo e idiomas

Edite `src/features/portfolio/portfolio.content.ts`: perfil, links, textos e projetos nos três idiomas. Inglês é o padrão inicial; a escolha EN/PT/ES é persistida no navegador. `?lang=en`, `?lang=pt-BR` e `?lang=es` permitem links diretos e prevalecem sobre a preferência salva. Título, descrição e atributo HTML de idioma acompanham a seleção.

IAM Portfolio e reservas de salas estão implementados localmente, com imagens reais das interfaces e links de demonstração exibidos somente em localhost. Importador de dados, CRM com IA e plataforma de webhooks aparecem como planejados. O IAM é a base de identidade comum; reservas já o consome e os três próximos consumidores têm integração prevista. As traduções EN/PT/ES mantêm os mesmos cinco projetos e seus estados reais. O currículo em `public/documents/gabriel-nicholas-resume.pdf` permanece em português; os links internacionais informam PT-BR. A foto fornecida fica em `public/images/gabriel-nicholas.jpg`.

A fonte Manrope é servida localmente; sua licença está em `public/fonts/manrope-license.txt`.

`src/styles/portfolio.css` é a entrada de estilos, apenas com imports. A paleta grafite com destaque laranja fica em `theme.css`; as demais folhas têm responsabilidade explícita (`navigation.css`, `hero.css`, `about.css`, `expertise.css`, `projects.css`, `contact.css`, `motion.css` e `print.css`, além de base/layout/controles). Breakpoints permanecem junto da funcionalidade. A view está em `src/views/portfolio-page.view.vue`; o formulário em `src/components/contact-form.component.vue` e a integração em `src/services/contact.service.ts`.

## Formulário de contato

O usuário escolheu Formspree. Crie um formulário no [painel do serviço](https://formspree.io/), configure e confirme o e-mail destinatário e copie seu endpoint público. Configure proteção contra spam e restrição de domínio conforme as opções disponíveis no serviço. A implementação usa POST JSON, seguindo a [documentação de AJAX](https://help.formspree.io/pt-br/articles/building-your-form/submit-forms-with-javascript-ajax/).

| Variável                     | Finalidade e formato                                          | Obrigatoriedade                               |
| ---------------------------- | ------------------------------------------------------------- | --------------------------------------------- |
| `VITE_CONTACT_FORM_ENDPOINT` | Endpoint público `https://formspree.io/f/<form-id>`; frontend | Obrigatória apenas para envio pelo formulário |

Em desenvolvimento, configure no ambiente que inicia o Vite ou em .env.local administrado por você, e reinicie o servidor. Em produção, forneça a variável no job de build; ela é incorporada ao bundle, portanto mudar seu valor exige novo build e deploy. Esse endpoint é público: não coloque API keys, tokens ou credenciais em variáveis VITE. O agente não acessa arquivos .env.

Sem endpoint válido, a página informa indisponibilidade e oferece contato por e-mail. Há validação, foco no primeiro campo inválido, bloqueio de envio duplicado, timeout e feedback acessível. Falhas preservam o texto para tentar novamente. Sucesso significa aceitação pelo serviço; confirmar entrega na caixa de entrada é uma verificação separada.

Os testes simulam respostas e não enviam mensagens reais. Após configurar o formulário, faça um envio controlado e confirme recebimento, spam e comportamento de erro. CAPTCHA interativo, se exigido por configuração do provedor, precisa de integração adicional; não habilite um fluxo obrigatório sem validá-lo.

## Verificação

```sh
npm run lint
npm run test:unit -- --run
npm run build
npm run test:e2e -- --project=chromium
```

Instale previamente os browsers do Playwright com `npx playwright install chromium`. Os testes E2E verificam idiomas, preservação de rascunho, validação, apresentação dos cinco projetos, responsividade e navegação mobile. Vitest verifica integração de contato com respostas simuladas.

## Publicação

S3 privado + CloudFront é o destino planejado. Não há infraestrutura ou pipeline ativado nesta etapa. Siga [as diretrizes AWS](../../docs/aws-infrastructure-guidelines.md) para Terraform, custos, permissões e aprovação.

## Organização do workspace

Este é o repositório do frontend. O backend separado está em `../portfolio-landing-page-backend/`. Consulte [definições da landing page](../definicoes-do-projeto.md), [instruções locais](../AGENTS.md) e [diretrizes comuns](../../docs/architecture.md). Para montar o ambiente a partir de um clone isolado, obtenha também o [repositório compartilhado](../../README.md) e mantenha esta aplicação em `portfolio-page/portfolio-landing-page/`.

Repositório GitHub: [gabriel80n/portfolio-landing-page](https://github.com/gabriel80n/portfolio-landing-page). O nome foi corrigido preservando seu histórico, e o origin local já aponta para essa URL. A correção de nomes preservou o histórico. As entregas posteriores são publicadas por commits convencionais, mantendo o repositório independente.

## Template de ambiente

O [`.env.example`](.env.example) contém todas as variáveis desta aplicação, com comentários, defaults públicos e integrações opcionais desabilitadas. No seu terminal, copie somente se o arquivo local ainda não existir:

```powershell
if (-not (Test-Path -LiteralPath .env)) { Copy-Item -LiteralPath .env.example -Destination .env }
```

Preencha os valores privados apenas no seu editor/terminal e reinicie a aplicação. Nunca envie o arquivo real pelo chat ou Git. Os comandos de backend carregam o `.env` local com Node; Vite faz isso nos frontends. Variáveis já definidas no processo têm precedência. O agente pode manter somente o template público e deve atualizá-lo quando a configuração mudar.

## Estado verificado

Em 8 de outubro de 2026: build, oxlint, ESLint, 5 testes de contato e 3 cenários E2E Chromium aprovados. EN/PT/ES verificados em 320, 390, 1024 e 1440 px, sem overflow horizontal. Revisão visual no Chrome de hero e projetos desktop/mobile, imagens decodificadas, teclado e movimento reduzido. Contraste do laranja sobre o fundo: 8,64:1. Auditoria aplicada pelas [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines). Capturas locais de revisão são ignoradas pelo Git. As imagens dos projetos vêm de testes com dados fictícios; não incluem tokens ou credenciais.
