# Benchmark e decisões — Harmonia Care

**Data:** 03/09/2026  
**Objetivo:** elevar percepção visual, clareza comercial e confiança sem aumentar consumo de memória ou inventar provas.

## Referências analisadas

- Harmonia Care atual: `https://harmoniacare.com.br/`
- Casa e Saúde Home Care: `https://www.casaesaudehc.com.br/`
- Home Doctor: `https://homedoctor.com.br/`
- Inside Home Care: `https://www.insidehomecare.com.br/`
- Coopassist Uberlândia: `https://www.coopassist.com.br/`
- Grupo Acolher e Cuidar Uberlândia: `https://www.grupoacolherecuidar.com.br/uberlandia`
- Home Doctor Uberlândia: `https://homedoctor.com.br/unidades/uberlandia-mg/`
- eCare: `https://dna.ecarehome.com.br/`
- Med Care MG: `https://medcaremg.com.br/`
- Central da Saúde: `https://centraldasaude.com.br/`
- Soma Neuromodulação: `https://somaneuromodulacao.com.br/`
- Cirúrgica Uberlândia: `https://cirurgicauberlandia.com.br/`

## Padrões encontrados

### O que funciona

- Proposta clara de atendimento domiciliar e localidade logo no início.
- Caminho de contratação explicado em poucos passos.
- Diferenciais concretos próximos dos serviços.
- Contato comercial visível e contextualizado.
- Informações institucionais verificáveis: endereço, horário, responsável técnico, políticas e canais.
- Prova social real e identificável quando existe autorização.
- Uso de imagens humanas para comunicar públicos diferentes sem exigir leitura longa.

### O que deve ser evitado

- Catálogos extensos de serviços repetitivos na home.
- Afirmações genéricas de excelência sem prova.
- Números animados que carregam como zero ou não possuem fonte.
- Muitos CTAs iguais e sem identificação da origem.
- Formulários que pedem dados clínicos no primeiro contato.
- Carrosséis sem pausa, sem controles ou que escondem a proposta de valor.
- Excesso de barras, botões flutuantes, popups e avisos competindo pela atenção.

## Decisões aplicadas nesta versão

- Arquitetura HTML/CSS/JS puro, sem framework, biblioteca visual ou gerenciador de estado.
- Fontes e imagens críticas locais; primeira imagem do hero em WebP de 1.200 px e aproximadamente 43 KB.
- Hero roxo alinhado à identidade oficial, com cinco cenas de idosos, cuidado infantil, enfermagem, reabilitação e acolhimento familiar.
- Carrossel em JavaScript puro, com rotação automática de 5,5 segundos, sem controles visíveis e com respeito a `prefers-reduced-motion`.
- Oito serviços apresentados individualmente em grade estática: atendimento domiciliar, enfermagem domiciliar, cuidadores, fonoaudiologia, fisioterapia, nutrição, terapia ocupacional e babysitter.
- Cada serviço tem título, descrição curta e “Saiba mais”, sem carrossel ou controles para acessar o conteúdo.
- Parceiros atuais posicionados depois do hero em cards de alto contraste, com descrições curtas.
- Popup de parceiros não modal, dispensável pelo botão “X” e ocultado pelo restante da sessão após o fechamento.
- Nenhuma avaliação, nota, estatística, certificação ou disponibilidade foi criada.
- Mensagens de WhatsApp segmentadas sem dados de saúde.
- CTA textual do cabeçalho substituído por um ícone flutuante de WhatsApp disponível durante toda a rolagem.
- Setas e paginação dos carrosséis removidas. Foi preservado somente um botão mínimo de pausa para cumprir o requisito de controle sobre movimento automático.
- Manifesto próprio da Harmonia inserido sem números promocionais: cuidado adaptado à pessoa, integração entre técnica e acolhimento e participação da família.
- Página local de serviços criada com resumo operacional no primeiro bloco, fluxo em quatro etapas e nove modalidades detalhadas. A Terapia Ocupacional foi incluída porque aparece no catálogo público atual.
- Os “Saiba mais” da home agora levam diretamente ao serviço correspondente na página local, evitando o destino genérico anterior.
- Depoimentos fictícios com nomes foram rejeitados como prova social enganosa. A home usa uma faixa de compromissos de experiência explicitamente identificada como não sendo composta por relatos de clientes.

## Revisão macro da home

- O hero concentra proposta de valor e um único próximo passo: conhecer os serviços. O contato permanece disponível pelo ícone flutuante, sem competir com a leitura inicial.
- “Como funciona” mantém somente a explicação em três etapas; o botão genérico de contato foi removido.
- O lembrete de WhatsApp é contextual, não modal e transitório. Só aparece após sinal de interesse ou tempo de leitura, fecha automaticamente e não disputa atenção com o popup de parceiros.
- A hierarquia atual segue: proposta de valor, parceiros, serviços, mentalidade da marca, funcionamento, perguntas frequentes e rodapé.
- Após a simplificação, a home mede 3.687 px no desktop de 1.440 px. A comparação definitiva exige baseline equivalente do WordPress em staging.

## Comparação específica com a Soma Neuromodulação

- A Soma usa um hero em carrossel com fundo roxo e composição fotográfica em camadas. A Harmonia preserva o impacto, mas utiliza uma composição mais limpa, texto comercial estável e cinco cenas inclusivas em rotação automática.
- A seção de tratamentos da Soma apresenta cinco cards simultâneos com fotografia, descrição extensa e botão. O padrão comunica variedade, porém cria cards muito altos e leitura densa.
- Na medição visual deste ambiente, a home da Soma apresentou aproximadamente 7.136 px de altura em 1.440 px. Este número é apenas comparativo e pode variar conforme conteúdo dinâmico e viewport.
- A solução da Harmonia reduz o conteúdo de cada card para aproximadamente duas ou três linhas, dispensa oito novas fotografias e mantém todos os serviços em um trilho único. Isso reduz peso, repetição e altura sem esconder a oferta.
- O menu público da Soma inclui “Cuidadores” com link para a Harmonia Care. Essa conexão confirma a relação digital atual, mas qualquer texto promocional adicional sobre a parceria continua condicionado à aprovação formal antes da publicação.

## Pendências de alto impacto

1. Confirmar CNPJ, endereço, horário comercial, responsável técnico e registros profissionais antes de estruturar dados `Organization`/`LocalBusiness`.
2. Confirmar parceiros, cidades e disponibilidade operacional.
3. Obter depoimentos reais com autorização e origem verificável.
4. Confirmar processo de seleção, supervisão e área de atendimento para transformar promessas institucionais em prova concreta.
5. Definir política de privacidade e consentimento antes de ativar cookies não essenciais, GTM ou mídia paga.

## Boas práticas adotadas

- WCAG 2.2: foco visível, navegação por teclado, contraste, semântica e alvos de toque adequados.
- Core Web Vitals: LCP priorizado, dimensões de imagem definidas, WebP, fontes locais e JavaScript mínimo.
- SEO local: um H1, hierarquia H2/H3, localidade e oferta sem repetição artificial.
- LGPD: minimização de dados e ausência de captura de dados clínicos no primeiro contato.
- Dados estruturados serão adicionados somente quando os dados empresariais forem confirmados.
