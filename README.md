# Harmonia Care — protótipo local

Protótipo navegável da proposta de otimização da home. É uma demonstração front-end independente e não altera o WordPress publicado.

A versão atual apresenta a página inicial com fotografias em tela ampla, cabeçalho fixo que muda de transparente para branco durante a rolagem, degradê lateral roxo e carrossel automático com quatro cenas de cuidado, sem controles visíveis. A proposta inclui ainda uma grade estática com oito serviços, perguntas frequentes, contato contextual e páginas internas para conteúdo institucional, especialidades e serviços.

## Executar

No PowerShell, dentro desta pasta:

```powershell
npx --yes serve .
```

Abra a URL local informada pelo comando, normalmente `http://localhost:3000`.

Alternativa com Python:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

As páginas públicas usam rotas em diretórios (`/sobre/`, `/especialidades/` e `/servicos/`), compatíveis com hospedagem estática. Os arquivos `.html` antigos encaminham o navegador para essas rotas; `index.html` continua como página de entrada na raiz do domínio.

## Arquivos

- `index.html`: estrutura e conteúdo da home.
- `servicos/index.html`: página de serviços em `/servicos/`; `servicos.html` redireciona para a rota limpa.
- `sobre/index.html`: página institucional em `/sobre/`; `sobre.html` redireciona para a rota limpa.
- `especialidades/index.html`: orientação por necessidade em `/especialidades/`; `especialidades.html` redireciona para a rota limpa.
- `styles.css`: identidade visual e responsividade.
- `script.js`: menu acessível, carrosséis automáticos, orientação contextual e eventos de WhatsApp.
- `assets/images/`: assets públicos autorizados da Harmonia Care.
- `PLANO-ELEMENTOR-HARMONIA-CARE.md`: especificação para implementação posterior no Elementor.
- `ANALISE-BENCHMARK.md`: referências, padrões comparados e decisões aplicadas.

## Limites

- O protótipo não contém backend, WordPress, Elementor ou banco de dados.
- Nenhum dado de formulário ou dado de saúde é coletado.

## Revisão local — 15/09/2026

- Revisão editorial das quatro páginas: regência, clareza, repetições, menus, perguntas frequentes, rodapés e orientação contextual.
- Quatro imagens do carrossel convertidas para WebP com perdas leves: o total caiu de 4.104.845 para 501.010 bytes (87,8%); originais mantidos e qualidade comparada visualmente.
- Removidas 129 regras de estilo obsoletas e referências sem uso em três regras compartilhadas. O CSS ficou aproximadamente 18,7% menor. Nenhuma seção ativa foi removida.
- Quatro páginas verificadas em 375, 768 e 1440 px: sem rolagem horizontal indevida, imagens quebradas ou erros no console. Foram verificados 19 destinos internos, incluindo âncoras, além da proteção dos links que abrem em nova aba.
- Os estilos calculados dos elementos foram comparados antes e depois da limpeza do CSS nas 12 combinações de página e largura, sem diferenças visuais nas propriedades verificadas.
- Menu móvel verificado para abertura e fechamento com `Escape`.
- Os relatórios Lighthouse antigos correspondem a versões anteriores, não à versão atual. Não foi feita nova medição de Lighthouse nesta revisão; a redução em bytes não equivale a uma promessa de tempo de carregamento.

## Revisão local — 15/10/2026

- O espaço da seção foi eliminado do fluxo da página; home verificada em 375, 768 e 1440 px, sem erros de navegador, imagens quebradas ou rolagem horizontal.

## Comportamentos mantidos

- Carrossel principal com quatro cenas e intervalo de 5,5 segundos, respeitando a preferência por movimento reduzido.
- Oito serviços em grade estática, com descrições e links para seções correspondentes em `/servicos/`.
- A página de serviços possui resumo operacional, oito explicações detalhadas, processo em quatro etapas e contatos de WhatsApp por serviço.
- WhatsApp do cabeçalho sempre verde. Outros botões de WhatsApp em lilás, com mudança para verde ao passar o mouse ou receber foco.
- A orientação contextual pode aparecer após 12 segundos nos últimos 15% da página ou após 120 segundos com a aba visível. Pode ser fechada pelo botão, por `Escape` ou ao abrir o contato.
- A página Sobre apresenta três princípios: “Seu jeito de viver importa”, “Profissionais escolhidos com cuidado” e “Sua família participa”. Os títulos das quatro páginas foram revisados para priorizar clareza e proximidade com as famílias, mantendo os nomes das especialidades.
- A orientação contextual fecha pelo botão ou por `Escape`; o botão flutuante de WhatsApp permanece disponível.

Os relatórios e as capturas de tela locais estão em `.preview/` (pasta não versionada) e não representam métricas do servidor WordPress de produção. Os indicadores de famílias e profissionais são informados pelo responsável. Veja as fontes e limitações em `IMAGE-SOURCES.md`.
