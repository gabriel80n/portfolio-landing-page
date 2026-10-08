export type PortfolioLocale = 'en' | 'pt-BR' | 'es'

export const localeOptions: { value: PortfolioLocale; label: string; shortLabel: string }[] = [
  { value: 'en', label: 'English', shortLabel: 'EN' },
  { value: 'pt-BR', label: 'Português do Brasil', shortLabel: 'PT' },
  { value: 'es', label: 'Español', shortLabel: 'ES' },
]

export const profile = {
  name: 'Gabriel Nicholas',
  email: 'gabrielnpmoraes@hotmail.com',
  github: 'https://github.com/gabriel80n',
  linkedin: 'https://www.linkedin.com/in/gabriel80n',
  portrait: '/images/gabriel-nicholas-retouched.webp',
  portraitSrcset:
    '/images/gabriel-nicholas-retouched-360.webp 360w, /images/gabriel-nicholas-retouched-720.webp 720w, /images/gabriel-nicholas-retouched.webp 1086w',
  resume: '/documents/gabriel-nicholas-resume.pdf',
}

const english = {
  meta: {
    title: 'Gabriel Nicholas | Backend & Full Stack Developer',
    description:
      'Backend-focused developer working with TypeScript, Node.js, Vue and AWS. Meet Gabriel Nicholas, explore five connected projects, and get in touch.',
  },
  nav: {
    about: 'About',
    expertise: 'Expertise',
    projects: 'Projects',
    contact: 'Get in touch',
    language: 'Language',
    menu: 'Toggle navigation',
    skip: 'Skip to content',
    label: 'Main navigation',
  },
  hero: {
    availability: 'Open to work',
    cta: 'Let’s work together',
    experience: 'years building software',
    value: 'Turning client challenges into useful software.',

    role: 'Backend focused. Full stack minded.',
    firstLine: 'Engineering.',
    secondLine: 'With character.',
    description:
      "I'm Gabriel, a software developer building thoughtful APIs and cloud applications. A little frontend, too.",
    resume: 'Download CV (PT-BR)',
    portraitAlt: 'Gabriel Nicholas wearing a dark suit, smiling',
  },
  about: {
    title: 'An unexpected path.',
    titleAccent: 'A very real passion.',
    lead: "Software wasn't my first plan. It became the work I fell in love with.",
    story:
      'I started in Chemical Engineering. Somewhere along the way, curiosity led me to Computer Science and to the satisfaction of turning a complex problem into working software.',
    work: 'Today, I work across backend services, APIs and cloud applications, with Node.js, TypeScript, NestJS and AWS. I enjoy understanding the problem before choosing the tools.',
    objective:
      'I’m looking for backend and full stack opportunities, in Brazil and internationally, where I can build useful software and keep growing with a thoughtful team.',
    personality: 'Developer. Not a coffee person.',
    personalityNote: 'Curiosity does the heavy lifting.',
    journey: 'Chemical engineering',
    destination: 'Software engineering',
  },
  expertise: {
    title: 'Thoughtful systems.',
    titleAccent: 'From the inside out.',
    description: 'A backend foundation, an eye for the whole experience.',
    groups: [
      {
        title: 'Backend & APIs',
        description: 'Clear contracts, business rules and services that are easier to evolve.',
        technologies: ['TypeScript', 'Node.js', 'NestJS', 'Express', 'REST APIs'],
      },
      {
        title: 'Architecture & data',
        description: 'Responsibilities in the right place. Data models shaped around the problem.',
        technologies: ['DDD', 'Hexagonal architecture', 'PostgreSQL', 'DynamoDB'],
      },
      {
        title: 'Cloud & delivery',
        description: 'From asynchronous workloads to repeatable delivery and cloud infrastructure.',
        technologies: ['AWS', 'Lambda', 'SQS', 'Docker', 'CI/CD', 'Redis / BullMQ'],
      },
      {
        title: 'Frontend & integrations',
        description:
          'Interfaces that make the backend useful, and integrations that connect the pieces.',
        technologies: ['Vue', 'React', 'LLM integrations'],
      },
    ],
  },
  projects: {
    explore: 'Explore project',
    selected: 'Selected project',
    close: 'Back to projects',
    problemLabel: 'The problem',
    workflowLabel: 'How it works',
    plannedNote: 'Proposed workflow. This project is still planned.',

    title: 'Five projects.',
    titleAccent: 'One connected portfolio.',
    description:
      'Working applications and the next builds, with business rules, integrations and a shared identity foundation.',
    details: 'Engineering decisions',
    focus: 'What this project demonstrates',
    implemented: 'Implemented locally',
    planned: 'Planned',
    demo: 'Open local demo',
    foundationTitle: 'IAM Portfolio connects the projects.',
    foundationDescription:
      'One account, single sign-on and separate permissions for every application. Room reservations is integrated; the importer, CRM and webhooks will use the same IAM.',
    authIntegrated: 'Authentication by IAM Portfolio',
    authPlanned: 'Planned authentication by IAM Portfolio',
    items: [
      {
        id: 'iam',
        status: 'implemented',
        image: '/images/iam-portfolio.png',
        demoUrl: 'http://localhost:5174',
        stack: ['Vue', 'NestJS', 'OIDC / PKCE', 'DynamoDB'],
        name: 'IAM Portfolio',
        category: 'The identity foundation',
        description:
          'A central account for the portfolio. Google sign-in, single sign-on and access managed independently for each project.',
        problem:
          'Repeated sign-ins and permissions scattered across applications make access difficult to manage.',
        workflow:
          'One account signs into multiple applications. Administrators manage each application’s access independently, while PKCE and audience checks protect the session.',
        focus:
          'OIDC / OAuth 2.0 with PKCE, rotating refresh tokens, audience isolation and transactional identity records in DynamoDB.',
        imageAlt:
          'IAM Portfolio account and project permissions, using fictitious demonstration data',
      },
      {
        id: 'reservas',
        status: 'implemented',
        image: '/images/room-reservations.png',
        demoUrl: 'http://localhost:5175',
        stack: ['Vue', 'NestJS', 'DynamoDB', 'SMTP'],
        name: 'Room reservations',
        category: 'Availability becomes a real booking',
        description:
          'Choose a room and a time, invite your team and follow the reservation. SMTP notifications complete the workflow.',
        problem:
          'Teams need to see available rooms and reserve a time without double bookings, even when requests arrive together.',
        workflow:
          'Choose a room, select a free interval and invite participants by email. Confirm or cancel the reservation, then follow SMTP delivery status and retry failures without losing the booking.',
        focus:
          'DynamoDB transactions protect concurrent bookings. Idempotency and a durable outbox make retries safe. Authentication comes from IAM Portfolio.',
        imageAlt: 'Room reservations interface with availability slots and an optional guest form',
      },
      {
        id: 'importador',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['TypeScript', 'S3 / SQS', 'DynamoDB'],
        name: 'Data importer',
        category: 'Files into useful data',
        description:
          'A planned CSV import workflow with validation per row, background processing and actionable error reports.',
        problem:
          'Large CSV files can contain invalid rows, and a slow import should not block the person uploading them.',
        workflow:
          'The planned flow uploads a file, validates rows and processes batches in the background. A report shows what succeeded and which rows need correction.',
        focus:
          'Idempotent processing, retries and a traceable import history. Authentication will use IAM Portfolio.',
        imageAlt: '',
      },
      {
        id: 'crm',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['Vue', 'NestJS', 'MCP'],
        name: 'CRM with AI',
        category: 'Through an interface or an agent',
        description:
          'A planned CRM for customers, opportunities and follow-ups, with MCP tools for an AI agent.',
        problem:
          'Customer information and follow-ups need a consistent workflow, whether a person uses the interface or an AI agent.',
        workflow:
          'The planned CRM organizes customers, opportunities and tasks. HTTP and MCP entry points use the same business rules and permissions, with confirmation for writes and an audit trail.',
        focus:
          'The same rules and authorization through HTTP and MCP, with confirmed writes and an audit trail. Identity will come from IAM Portfolio.',
        imageAlt: '',
      },
      {
        id: 'webhooks',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['TypeScript', 'SQS', 'HMAC'],
        name: 'Webhook platform',
        category: 'Deliveries you can follow',
        description:
          'A planned platform for signed events, visible delivery attempts and recovery when a destination fails.',
        problem:
          'Integrations fail when destinations are unavailable or events arrive more than once.',
        workflow:
          'The planned platform signs events, records delivery attempts and schedules bounded retries. Authorized replay lets operators recover failed deliveries with a visible history.',
        focus:
          'HMAC signatures, bounded retries, duplicate handling and authorized replay. Authentication will use IAM Portfolio.',
        imageAlt: '',
      },
    ],
  },
  contact: {
    title: 'Good software starts',
    titleAccent: 'with a conversation.',
    description:
      'A backend opportunity, a full stack challenge, or an interesting idea. Tell me about it.',
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    namePlaceholder: 'How should I call you…',
    emailPlaceholder: 'you@example.com…',
    messagePlaceholder: 'A little about the opportunity or idea…',
    submit: 'Send message',
    sending: 'Sending…',
    required: 'Please complete this field.',
    invalidEmail: 'Please enter a valid email address.',
    tooShort: 'Tell me a little more. At least 10 characters, please.',
    success: 'Message sent. Thanks for getting in touch!',
    error: 'Your message could not be sent. Please try again or use the email link.',
    unavailable: 'The form is not accepting messages yet. You can reach me directly by email.',
    privacy: 'Your name, email and message are sent through Formspree to my inbox.',
    emailLink: 'Prefer email?',
    honeypot: 'Leave this field empty',
  },
  footer: {
    note: 'Built with intention. Powered by curiosity.',
    top: 'Back to top',
    rights: 'Gabriel Nicholas',
  },
}

export type PortfolioCopy = typeof english

const portuguese: PortfolioCopy = {
  meta: {
    title: 'Gabriel Nicholas | Desenvolvedor Backend & Full Stack',
    description:
      'Desenvolvedor com foco em backend, TypeScript, Node.js, Vue e AWS. Conheça Gabriel Nicholas, explore cinco projetos conectados e entre em contato.',
  },
  nav: {
    about: 'Sobre',
    expertise: 'Habilidades',
    projects: 'Projetos',
    contact: 'Entre em contato',
    language: 'Idioma',
    menu: 'Abrir ou fechar navegação',
    skip: 'Pular para o conteúdo',
    label: 'Navegação principal',
  },
  hero: {
    availability: 'Aberto a oportunidades',
    cta: 'Vamos trabalhar juntos',
    experience: 'anos desenvolvendo software',
    value: 'Transformando desafios de clientes em software que resolve.',

    role: 'Foco em backend. Visão full stack.',
    firstLine: 'Engenharia.',
    secondLine: 'Com personalidade.',
    description:
      'Sou Gabriel, desenvolvedor de software. Construo APIs e aplicações cloud com cuidado. Também me aventuro no frontend.',
    resume: 'Baixar currículo',
    portraitAlt: 'Gabriel Nicholas sorrindo, vestindo um terno escuro',
  },
  about: {
    title: 'Um caminho inesperado.',
    titleAccent: 'Uma paixão de verdade.',
    lead: 'Software não foi meu primeiro plano. Foi o trabalho pelo qual me apaixonei.',
    story:
      'Comecei na Engenharia Química. No caminho, a curiosidade me levou à Ciência da Computação e à satisfação de transformar um problema complexo em software que funciona.',
    work: 'Hoje, trabalho com serviços backend, APIs e aplicações cloud, usando Node.js, TypeScript, NestJS e AWS. Gosto de entender o problema antes de escolher as ferramentas.',
    objective:
      'Busco oportunidades de backend e full stack, no Brasil e no exterior, para construir software útil e continuar crescendo com uma equipe que valorize boas decisões.',
    personality: 'Sou dev. Mas não gosto de café.',
    personalityNote: 'A curiosidade faz o trabalho pesado.',
    journey: 'Engenharia Química',
    destination: 'Engenharia de software',
  },
  expertise: {
    title: 'Sistemas bem pensados.',
    titleAccent: 'De dentro para fora.',
    description: 'Uma base em backend, com atenção à experiência completa.',
    groups: [
      {
        title: 'Backend & APIs',
        description: 'Contratos claros, regras de negócio e serviços mais fáceis de evoluir.',
        technologies: ['TypeScript', 'Node.js', 'NestJS', 'Express', 'APIs REST'],
      },
      {
        title: 'Arquitetura & dados',
        description: 'Responsabilidades no lugar certo. Modelos de dados guiados pelo problema.',
        technologies: ['DDD', 'Arquitetura hexagonal', 'PostgreSQL', 'DynamoDB'],
      },
      {
        title: 'Cloud & entrega',
        description: 'De tarefas assíncronas à entrega reproduzível e à infraestrutura cloud.',
        technologies: ['AWS', 'Lambda', 'SQS', 'Docker', 'CI/CD', 'Redis / BullMQ'],
      },
      {
        title: 'Frontend & integrações',
        description: 'Interfaces que tornam o backend útil e integrações que conectam as partes.',
        technologies: ['Vue', 'React', 'Integrações com LLMs'],
      },
    ],
  },
  projects: {
    explore: 'Explorar projeto',
    selected: 'Projeto selecionado',
    close: 'Voltar aos projetos',
    problemLabel: 'O problema',
    workflowLabel: 'Como funciona',
    plannedNote: 'Jornada proposta. Este projeto ainda está planejado.',

    title: 'Cinco projetos.',
    titleAccent: 'Um portfólio conectado.',
    description:
      'Aplicações funcionando e próximos projetos, com regras de negócio, integrações e uma base comum de identidade.',
    details: 'Decisões de engenharia',
    focus: 'O que este projeto demonstra',
    implemented: 'Implementado localmente',
    planned: 'Planejado',
    demo: 'Abrir demonstração local',
    foundationTitle: 'O IAM Portfolio conecta os projetos.',
    foundationDescription:
      'Uma conta, login único e permissões próprias em cada aplicação. Reservas já está integrado; importador, CRM e webhooks usarão o mesmo IAM.',
    authIntegrated: 'Autenticação pelo IAM Portfolio',
    authPlanned: 'Autenticação prevista pelo IAM Portfolio',
    items: [
      {
        id: 'iam',
        status: 'implemented',
        image: '/images/iam-portfolio.png',
        demoUrl: 'http://localhost:5174',
        stack: ['Vue', 'NestJS', 'OIDC / PKCE', 'DynamoDB'],
        name: 'IAM Portfolio',
        category: 'A base de identidade do portfólio',
        description:
          'Uma conta central para os projetos. Login com Google, sessão SSO e acesso administrado de forma independente em cada aplicação.',
        problem:
          'Logins repetidos e permissões espalhadas entre aplicações dificultam a gestão de acesso.',
        workflow:
          'Uma conta acessa vários projetos com sessão SSO. Administradores controlam o acesso de cada aplicação de forma independente, enquanto PKCE e validação de audiência protegem a sessão.',
        focus:
          'OIDC / OAuth 2.0 com PKCE, refresh tokens rotativos, isolamento de audiência e identidades transacionais no DynamoDB.',
        imageAlt:
          'Conta e permissões por projeto no IAM Portfolio, com dados fictícios de demonstração',
      },
      {
        id: 'reservas',
        status: 'implemented',
        image: '/images/room-reservations.png',
        demoUrl: 'http://localhost:5175',
        stack: ['Vue', 'NestJS', 'DynamoDB', 'SMTP'],
        name: 'Reservas de salas',
        category: 'Da disponibilidade à reunião marcada',
        description:
          'Escolha sala e horário, convide sua equipe e acompanhe a reserva. Notificações SMTP completam a jornada.',
        problem:
          'Equipes precisam encontrar salas livres e reservar horários sem duplicidade, mesmo com pedidos simultâneos.',
        workflow:
          'Escolha uma sala, selecione um intervalo livre e informe convidados por e-mail. Confirme ou cancele a reserva, acompanhe as notificações SMTP e retome falhas sem perder a reserva.',
        focus:
          'Transações DynamoDB impedem conflitos, idempotência protege repetições e a outbox permite retomar entregas. A autenticação vem do IAM Portfolio.',
        imageAlt:
          'Interface de reservas com horários disponíveis e formulário opcional de convidados',
      },
      {
        id: 'importador',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['TypeScript', 'S3 / SQS', 'DynamoDB'],
        name: 'Importador de dados',
        category: 'Arquivos que viram dados úteis',
        description:
          'Importação CSV planejada com validação por linha, processamento em segundo plano e relatórios de erro acionáveis.',
        problem:
          'Arquivos CSV grandes podem conter linhas inválidas, e uma importação demorada não deve bloquear quem envia o arquivo.',
        workflow:
          'O fluxo previsto recebe o arquivo, valida linhas e processa lotes em segundo plano. Um relatório mostra o que foi importado e quais linhas precisam de correção.',
        focus:
          'Processamento idempotente, novas tentativas e histórico rastreável de importação. A autenticação usará o IAM Portfolio.',
        imageAlt: '',
      },
      {
        id: 'crm',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['Vue', 'NestJS', 'MCP'],
        name: 'CRM com IA',
        category: 'Pela interface ou por um agente',
        description:
          'CRM planejado para clientes, oportunidades e tarefas de acompanhamento, com ferramentas MCP para um agente de IA.',
        problem:
          'Dados de clientes e tarefas de acompanhamento precisam seguir as mesmas regras pela interface e por um agente de IA.',
        workflow:
          'O CRM previsto organiza clientes, oportunidades e tarefas. Entradas HTTP e MCP usam as mesmas regras e permissões, com confirmação para escritas e histórico de autoria.',
        focus:
          'As mesmas regras e permissões nas entradas HTTP e MCP, com confirmação de escritas e histórico de autoria. A identidade virá do IAM Portfolio.',
        imageAlt: '',
      },
      {
        id: 'webhooks',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['TypeScript', 'SQS', 'HMAC'],
        name: 'Plataforma de webhooks',
        category: 'Entregas que você consegue acompanhar',
        description:
          'Plataforma planejada para eventos assinados, histórico de tentativas e recuperação quando um destino falha.',
        problem:
          'Integrações falham quando o destino fica indisponível ou recebe o mesmo evento mais de uma vez.',
        workflow:
          'A plataforma prevista assina eventos, registra tentativas e agenda reenvios limitados. Um replay autorizado permite recuperar entregas com histórico visível.',
        focus:
          'Assinatura HMAC, tentativas limitadas, tratamento de duplicatas e reenvio autorizado. A autenticação usará o IAM Portfolio.',
        imageAlt: '',
      },
    ],
  },
  contact: {
    title: 'Bom software começa',
    titleAccent: 'com uma conversa.',
    description:
      'Uma oportunidade de backend, um desafio full stack ou uma ideia interessante. Me conte.',
    name: 'Seu nome',
    email: 'Seu e-mail',
    message: 'Sua mensagem',
    namePlaceholder: 'Como posso te chamar…',
    emailPlaceholder: 'voce@exemplo.com…',
    messagePlaceholder: 'Um pouco sobre a oportunidade ou ideia…',
    submit: 'Enviar mensagem',
    sending: 'Enviando…',
    required: 'Preencha este campo.',
    invalidEmail: 'Informe um endereço de e-mail válido.',
    tooShort: 'Me conte um pouco mais. Pelo menos 10 caracteres.',
    success: 'Mensagem enviada. Obrigado pelo contato!',
    error: 'Não foi possível enviar. Tente novamente ou use o link de e-mail.',
    unavailable:
      'O formulário ainda não está recebendo mensagens. Você pode falar comigo diretamente por e-mail.',
    privacy: 'Seu nome, e-mail e mensagem são enviados pelo Formspree para minha caixa de entrada.',
    emailLink: 'Prefere e-mail?',
    honeypot: 'Deixe este campo vazio',
  },
  footer: {
    note: 'Feito com intenção. Movido pela curiosidade.',
    top: 'Voltar ao início',
    rights: 'Gabriel Nicholas',
  },
}

const spanish: PortfolioCopy = {
  meta: {
    title: 'Gabriel Nicholas | Desarrollador Backend & Full Stack',
    description:
      'Desarrollador enfocado en backend, TypeScript, Node.js, Vue y AWS. Conoce a Gabriel Nicholas, explora cinco proyectos conectados y ponte en contacto.',
  },
  nav: {
    about: 'Sobre mí',
    expertise: 'Habilidades',
    projects: 'Proyectos',
    contact: 'Hablemos',
    language: 'Idioma',
    menu: 'Abrir o cerrar navegación',
    skip: 'Saltar al contenido',
    label: 'Navegación principal',
  },
  hero: {
    availability: 'Disponible para oportunidades',
    cta: 'Trabajemos juntos',
    experience: 'años desarrollando software',
    value: 'Convirtiendo desafíos de clientes en software útil.',

    role: 'Enfoque backend. Visión full stack.',
    firstLine: 'Ingeniería.',
    secondLine: 'Con personalidad.',
    description:
      'Soy Gabriel, desarrollador de software. Construyo APIs y aplicaciones cloud con atención al detalle. También trabajo en frontend.',
    resume: 'Descargar CV (PT-BR)',
    portraitAlt: 'Gabriel Nicholas sonriendo, con un traje oscuro',
  },
  about: {
    title: 'Un camino inesperado.',
    titleAccent: 'Una pasión de verdad.',
    lead: 'El software no fue mi primer plan. Se convirtió en el trabajo que me apasiona.',
    story:
      'Empecé en Ingeniería Química. En el camino, la curiosidad me llevó a las Ciencias de la Computación y a la satisfacción de convertir un problema complejo en software que funciona.',
    work: 'Hoy trabajo con servicios backend, APIs y aplicaciones cloud, utilizando Node.js, TypeScript, NestJS y AWS. Me gusta entender el problema antes de elegir las herramientas.',
    objective:
      'Busco oportunidades de backend y full stack, en Brasil y a nivel internacional, para construir software útil y seguir creciendo con un equipo que valore las buenas decisiones.',
    personality: 'Soy dev. Pero no me gusta el café.',
    personalityNote: 'La curiosidad hace el trabajo pesado.',
    journey: 'Ingeniería Química',
    destination: 'Ingeniería de software',
  },
  expertise: {
    title: 'Sistemas bien pensados.',
    titleAccent: 'De dentro hacia fuera.',
    description: 'Una base en backend, con atención a la experiencia completa.',
    groups: [
      {
        title: 'Backend & APIs',
        description: 'Contratos claros, reglas de negocio y servicios más fáciles de evolucionar.',
        technologies: ['TypeScript', 'Node.js', 'NestJS', 'Express', 'APIs REST'],
      },
      {
        title: 'Arquitectura & datos',
        description:
          'Responsabilidades en el lugar correcto. Modelos de datos guiados por el problema.',
        technologies: ['DDD', 'Arquitectura hexagonal', 'PostgreSQL', 'DynamoDB'],
      },
      {
        title: 'Cloud & entrega',
        description:
          'Desde tareas asíncronas hasta entregas reproducibles e infraestructura cloud.',
        technologies: ['AWS', 'Lambda', 'SQS', 'Docker', 'CI/CD', 'Redis / BullMQ'],
      },
      {
        title: 'Frontend & integraciones',
        description:
          'Interfaces que hacen útil el backend e integraciones que conectan las piezas.',
        technologies: ['Vue', 'React', 'Integraciones con LLMs'],
      },
    ],
  },
  projects: {
    explore: 'Explorar proyecto',
    selected: 'Proyecto seleccionado',
    close: 'Volver a proyectos',
    problemLabel: 'El problema',
    workflowLabel: 'Cómo funciona',
    plannedNote: 'Flujo propuesto. Este proyecto sigue planificado.',

    title: 'Cinco proyectos.',
    titleAccent: 'Un portfolio conectado.',
    description:
      'Aplicaciones funcionando y próximos proyectos, con reglas de negocio, integraciones y una base común de identidad.',
    details: 'Decisiones de ingeniería',
    focus: 'Lo que demuestra este proyecto',
    implemented: 'Implementado localmente',
    planned: 'Planificado',
    demo: 'Abrir demostración local',
    foundationTitle: 'IAM Portfolio conecta los proyectos.',
    foundationDescription:
      'Una cuenta, inicio de sesión único y permisos propios en cada aplicación. Reservas ya está integrado; el importador, CRM y webhooks usarán el mismo IAM.',
    authIntegrated: 'Autenticación mediante IAM Portfolio',
    authPlanned: 'Autenticación prevista mediante IAM Portfolio',
    items: [
      {
        id: 'iam',
        status: 'implemented',
        image: '/images/iam-portfolio.png',
        demoUrl: 'http://localhost:5174',
        stack: ['Vue', 'NestJS', 'OIDC / PKCE', 'DynamoDB'],
        name: 'IAM Portfolio',
        category: 'La base de identidad del portfolio',
        description:
          'Una cuenta central para los proyectos. Acceso con Google, sesión SSO y permisos administrados de forma independiente en cada aplicación.',
        problem:
          'Los accesos repetidos y los permisos repartidos entre aplicaciones dificultan la gestión de identidad.',
        workflow:
          'Una cuenta accede a varios proyectos con SSO. Los administradores gestionan cada aplicación de forma independiente; PKCE y la validación de audiencia protegen la sesión.',
        focus:
          'OIDC / OAuth 2.0 con PKCE, refresh tokens rotativos, aislamiento de audiencia e identidades transaccionales en DynamoDB.',
        imageAlt:
          'Cuenta y permisos por proyecto en IAM Portfolio, con datos ficticios de demostración',
      },
      {
        id: 'reservas',
        status: 'implemented',
        image: '/images/room-reservations.png',
        demoUrl: 'http://localhost:5175',
        stack: ['Vue', 'NestJS', 'DynamoDB', 'SMTP'],
        name: 'Reservas de salas',
        category: 'De la disponibilidad a la reunión',
        description:
          'Elige sala y horario, invita a tu equipo y sigue la reserva. Notificaciones SMTP completan el flujo.',
        problem:
          'Los equipos necesitan encontrar salas libres y reservar horarios sin duplicados, incluso con solicitudes simultáneas.',
        workflow:
          'Elige una sala, selecciona un intervalo libre e invita participantes por correo. Confirma o cancela la reserva, consulta las notificaciones SMTP y reintenta fallos sin perder la reserva.',
        focus:
          'Transacciones DynamoDB evitan conflictos, la idempotencia protege repeticiones y el outbox permite retomar entregas. La autenticación viene de IAM Portfolio.',
        imageAlt:
          'Interfaz de reservas con horarios disponibles y formulario opcional de invitados',
      },
      {
        id: 'importador',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['TypeScript', 'S3 / SQS', 'DynamoDB'],
        name: 'Importador de datos',
        category: 'Archivos que se convierten en datos útiles',
        description:
          'Importación CSV planificada con validación por fila, procesamiento en segundo plano e informes de errores claros.',
        problem:
          'Los CSV grandes pueden contener filas inválidas, y una importación lenta no debe bloquear a quien envía el archivo.',
        workflow:
          'El flujo previsto recibe el archivo, valida filas y procesa lotes en segundo plano. Un informe muestra lo importado y las filas que necesitan corrección.',
        focus:
          'Procesamiento idempotente, reintentos e historial de importación trazable. La autenticación usará IAM Portfolio.',
        imageAlt: '',
      },
      {
        id: 'crm',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['Vue', 'NestJS', 'MCP'],
        name: 'CRM con IA',
        category: 'Por la interfaz o mediante un agente',
        description:
          'CRM planificado para clientes, oportunidades y tareas de seguimiento, con herramientas MCP para un agente de IA.',
        problem:
          'Los datos de clientes y los seguimientos necesitan las mismas reglas desde la interfaz y desde un agente de IA.',
        workflow:
          'El CRM previsto organiza clientes, oportunidades y tareas. HTTP y MCP utilizan las mismas reglas y permisos, con confirmación de escrituras y registro de autoría.',
        focus:
          'Las mismas reglas y permisos por HTTP y MCP, con confirmación de escrituras e historial de autoría. La identidad vendrá de IAM Portfolio.',
        imageAlt: '',
      },
      {
        id: 'webhooks',
        status: 'planned',
        image: '',
        demoUrl: '',
        stack: ['TypeScript', 'SQS', 'HMAC'],
        name: 'Plataforma de webhooks',
        category: 'Entregas que puedes seguir',
        description:
          'Plataforma planificada para eventos firmados, historial de intentos y recuperación cuando un destino falla.',
        problem:
          'Las integraciones fallan cuando un destino no está disponible o recibe un evento más de una vez.',
        workflow:
          'La plataforma prevista firma eventos, registra intentos y programa reintentos limitados. La reproducción autorizada permite recuperar entregas con un historial visible.',
        focus:
          'Firmas HMAC, reintentos limitados, manejo de duplicados y reenvío autorizado. La autenticación usará IAM Portfolio.',
        imageAlt: '',
      },
    ],
  },
  contact: {
    title: 'El buen software empieza',
    titleAccent: 'con una conversación.',
    description: 'Una oportunidad de backend, un reto full stack o una idea interesante. Cuéntame.',
    name: 'Tu nombre',
    email: 'Tu correo',
    message: 'Tu mensaje',
    namePlaceholder: 'Cómo puedo llamarte…',
    emailPlaceholder: 'tu@ejemplo.com…',
    messagePlaceholder: 'Un poco sobre la oportunidad o idea…',
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
    required: 'Completa este campo.',
    invalidEmail: 'Introduce un correo electrónico válido.',
    tooShort: 'Cuéntame un poco más. Al menos 10 caracteres.',
    success: 'Mensaje enviado. ¡Gracias por contactar!',
    error: 'No se pudo enviar. Inténtalo de nuevo o usa el enlace de correo.',
    unavailable: 'El formulario aún no recibe mensajes. Puedes escribirme directamente por correo.',
    privacy: 'Tu nombre, correo y mensaje se envían a través de Formspree a mi bandeja de entrada.',
    emailLink: '¿Prefieres correo?',
    honeypot: 'Deja este campo vacío',
  },
  footer: {
    note: 'Hecho con intención. Impulsado por la curiosidad.',
    top: 'Volver al inicio',
    rights: 'Gabriel Nicholas',
  },
}

export const portfolioContent: Record<PortfolioLocale, PortfolioCopy> = {
  en: english,
  'pt-BR': portuguese,
  es: spanish,
}

export function isPortfolioLocale(value: unknown): value is PortfolioLocale {
  return value === 'en' || value === 'pt-BR' || value === 'es'
}
