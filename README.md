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

IAM Portfolio e reservas de salas estão implementados localmente, com imagens reais das interfaces e links de demonstração exibidos somente em localhost. Importador de dados, CRM com IA e plataforma de webhooks aparecem como planejados. O IAM é a base de identidade comum; reservas já o consome e os três próximos consumidores têm integração prevista. As traduções EN/PT/ES mantêm os mesmos cinco projetos e seus estados reais. O currículo em `public/documents/gabriel-nicholas-resume.pdf` permanece em português; os links internacionais informam PT-BR. A foto original fica em `public/images/gabriel-nicholas.jpg`, preservada; a página usa a versão retocada e otimizada `public/images/gabriel-nicholas-retouched.webp`. O favicon SVG/ICO usa o monograma gn. nas cores do portfólio.

O topo destaca disponibilidade, 4+ anos de desenvolvimento e o convite para trabalhar juntos em EN/PT/ES.

Os previews dos cinco projetos abrem um destaque abaixo da lista com imagem maior, problema, jornada e decisões técnicas. `?lang=pt-BR&project=reservas` é um exemplo de link direto. View Transitions conecta o preview à imagem ampliada; browsers sem a API usam a alternativa de rolagem/revelação, e movimento reduzido desabilita animações. Enter seleciona, Escape ou o botão de retorno fecha e restaura o foco. Projetos planejados continuam identificados e não recebem imagens fictícias.

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

Em 8 de outubro de 2026: build, oxlint, ESLint, 5 testes de contato e 5 cenários E2E Chromium aprovados. EN/PT/ES verificados em 320, 390, 1024 e 1440 px, sem overflow horizontal. Revisão visual no Chrome de hero e projetos desktop/mobile, imagens decodificadas, teclado, seleção/retorno, links diretos, alternativa sem View Transitions e movimento reduzido. Contraste do laranja sobre o fundo: 8,64:1. Auditoria aplicada pelas [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines). Capturas locais de revisão são ignoradas pelo Git. As imagens dos projetos vêm de testes com dados fictícios; não incluem tokens ou credenciais.

Após essa evolução, Lighthouse 12.8.2 no preview de produção, perfil mobile em PT-BR: desempenho 95, acessibilidade 100 e boas práticas 100; LCP 2,7 s, TBT 0 ms e CLS 0. São métricas de laboratório local. A foto tem versões WebP de 360, 720 e 1086 px; resultado em `.local/lighthouse-updated.json`, ignorado pelo Git.

## Deploy AWS

Domínio: `gabrielnicholas.site` e alias `www.gabrielnicholas.site`. DNS mantido na Namecheap. Pipeline escolhido pelo usuário: CodePipeline + CodeBuild, com GitHub `gabriel80n/portfolio-landing-page` na `main`. Não há GitHub Actions neste fluxo.

Terraform 1.16.5 e provider AWS 6.64.0 estão fixados. Buckets, pipeline, builds, logs e KMS ficam em `us-east-2`; CloudFront é global e seu certificado ACM usa `us-east-1`.

### Responsabilidades e states

| Configuração | Responsabilidade | State |
| --- | --- | --- |
| `infra/bootstrap` | Bucket privado de state, certificado não exportável e conexão GitHub | Inicialmente local; migrar após criação para `bootstrap/terraform.tfstate` |
| `infra/site` | Bucket privado com OAC, CloudFront, headers e roteamento | `production/site.tfstate` |
| `infra/release` | Artefatos em `releases/<commit-sha>/` | `production/releases/<sha>.tfstate` |
| `infra/pipeline` | Artefatos privados, roles, builds, logs criptografados e pipeline | `production/pipeline.tfstate` |

O bootstrap usa state local ignorado apenas até criar o backend; migrar com aprovação e cópia de recuperação antes de concluir a entrega. Backend S3 com criptografia, versionamento e `use_lockfile=true`. Não versionar planos, state, tfvars ou `.terraform/`.

Releases têm state separado e permanecem disponíveis para rollback. `infra/prepare-release.js` inclui o SHA nos links de JS/CSS do HTML. A CloudFront Function inclui a release na chave de cache, preserva links de releases anteriores e não transforma assets ausentes em HTML. HTML e arquivos públicos têm cache curto; assets com hash têm cache longo. Sem invalidação recorrente. Não excluir releases ou versões de state sem política de retenção aprovada.

### Pipeline

CodePipeline V2 em modo QUEUED:

1. CodeConnections obtém `main` do GitHub.
2. CodeBuild executa lint, testes unitários, build, E2E Chromium, validação e planos Terraform de release/site.
3. Aprovação manual obrigatória, com referência ao commit e aos planos privados.
4. Outro CodeBuild aplica exatamente os dois planos salvos: publica a release primeiro e depois promove o CloudFront; verifica página pública e asset ausente.

Planos e build ficam no bucket privado de artefatos. O resumo mostra endereços e ações, sem valores sensíveis. Exclusões/substituições interrompem o fluxo e exigem plano de manutenção próprio. SHA-256 e commit são conferidos antes da aplicação. Bootstrap e permissões do pipeline são administrados fora do deploy recorrente; a role de publicação pode enviar objetos, gravar state/locks e promover apenas a distribuição e função configuradas, sem poderes administrativos.

Scripts e buildspecs ficam em `infra/pipeline/`; a instalação do Terraform usa download oficial e confere SHA-256. Node 24 em CodeBuild Ubuntu standard:7.0. Não há VPC, NAT, backend ou banco para este frontend estático.

### Parâmetros

Fornecer estes parâmetros públicos ao Terraform, pelo ambiente local (`TF_VAR_<nome>`) ou configuração administrativa. Nunca colocar credenciais em tfvars ou variáveis VITE.

| Nome | Aplicação |
| --- | --- |
| `state_bucket` | Bootstrap e pipeline; backend S3 |
| `bucket_name` | Site e release; bucket do frontend |
| `release_id` | Site e release; SHA completo do commit |
| `site_bucket` | Pipeline; nome do bucket criado pelo site |
| `certificate_arn` | Site e pipeline; ACM emitido em us-east-1 |
| `distribution_arn`, `function_arn` | Pipeline; recursos exatos que a role pode promover |
| `connection_arn` | Pipeline; conexão GitHub autorizada |
| `artifact_bucket` | Pipeline; bucket privado separado de artefatos |
| `formspree_endpoint` | Pipeline; endpoint público repassado ao build como `VITE_CONTACT_FORM_ENDPOINT` |

Credenciais locais vêm do perfil AWS `portfolio`; CodeBuild/CodePipeline usam roles de serviço, sem access keys ou login humano no CI.

### Ativação e DNS

- Primeiro plano salvo: 7 criações (bucket state e proteções, certificado, conexão), sem alterações ou exclusões. Ainda não aplicado.
- Autorizar conexão PENDING no console AWS Developer Tools > Connections, selecionando somente este repositório no GitHub App. Essa autorização não pode ser concluída por API.
- Adicionar na Namecheap os CNAMEs de validação emitidos pelo ACM. Preservar MX/TXT.
- Após emissão do certificado, aplicar os planos aprovados de site, release e pipeline; migrar o state de bootstrap para o backend remoto.
- Após CloudFront e conteúdo verificados, configurar ALIAS `@` e CNAME `www` para o hostname real da distribuição. Ainda não há hostname emitido.
- Se Formspree usa restrição de domínio, permitir `gabrielnicholas.site` e `www.gabrielnicholas.site`; verificar recebimento com envio controlado.

Rollback promove um SHA já publicado, via novo plano aprovado de site, sem excluir dados. Infraestrutura e artefatos anteriores permanecem. Remoção de recursos exige autorização específica.

### Estado e custos

Em 8 de outubro de 2026: sessão AWS renovada, projeto `052229332886`, região `us-east-2`, plano Free ACTIVE e US$100 de créditos consultados. Não houve mudança para plano pago ou ativação de recursos avançados. OIDC GitHub é bloqueado pela SCP gerenciada; não contornar com access keys.

Preparação local validada: Terraform bootstrap/site/release/pipeline, formatação, lint, build, 5 unitários e 5 E2E Chromium. O pipeline AWS e o domínio ainda não foram ativados/testados. Valores e ARNs restantes serão obtidos após provisionamento aprovado; não usar identificadores fictícios para ativar o pipeline.

Estimativa de planejamento para baixo tráfego e cerca de 20 deploys/mês: aproximadamente US$2-5/mês antes de créditos/impostos, dependendo de duração dos builds, tráfego e armazenamento. Não é limite de cobrança. Uma chave KMS para logs custa inicialmente US$1/mês, com custo adicional em futuras rotações; CodeBuild/CodePipeline têm cobrança por uso e franquias. Certificado ACM público não exportável não tem custo de emissão. O primeiro bootstrap isolado tem apenas custos mínimos por armazenamento/operações S3; a estimativa total inclui etapas posteriores.

Referências de preço: [CodeBuild](https://aws.amazon.com/codebuild/pricing/), [CodePipeline](https://aws.amazon.com/codepipeline/pricing/), [KMS](https://aws.amazon.com/kms/pricing/), [S3](https://aws.amazon.com/s3/pricing/), [CloudFront](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/) e [ACM](https://aws.amazon.com/certificate-manager/pricing/).

### Recursos de produ??o e opera??o

| Recurso | Identificador |
| --- | --- |
| Site | https://gabrielnicholas.site |
| Alias | https://www.gabrielnicholas.site |
| CloudFront | `E1WQ8HLGQ5B5U8` / `d2vitzk931hule.cloudfront.net` |
| Bucket site | `portfolio-landing-page-site-052229332886` |
| Bucket state | `portfolio-landing-page-state-052229332886` |
| Bucket artefatos | `portfolio-landing-page-artifacts-052229332886` |
| Certificado ACM (us-east-1) | `379f6447-6116-4be5-a44c-5404bcb1ef59` |
| Conex?o GitHub (us-east-2) | `c323a6be-600f-432d-8135-05548d8cff36` |

[Pipeline no console AWS](https://us-east-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/portfolio-landing-page/view?region=us-east-2). Cada push em main inicia Source e ValidateAndPlan. Na etapa Approve, confira o commit e os resumos de release/site nos logs privados ou BuildOutput antes de aprovar. Deploy aplica os planos salvos e verifica o dom?nio. A autoriza??o de ativa??o inicial n?o dispensa a aprova??o dos pr?ximos planos.

O pipeline administra somente releases e promo??o do site. Altera??es em bootstrap, permiss?es ou pipeline devem passar por planejamento administrativo Terraform e aprova??o pr?pria. Para rollback, use um commit j? publicado como release_id no state de site, gere e confira o plano, aprove e aplique o plano salvo. N?o reaplique o state de uma release anterior com arquivos de outro commit.
