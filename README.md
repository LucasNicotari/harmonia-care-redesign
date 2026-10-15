# Harmonia Care — protótipo local

Protótipo navegável da proposta de otimização da home. É uma demonstração front-end independente e não altera o WordPress publicado.

A versão atual apresenta a página inicial com fotografias em tela ampla, cabeçalho fixo que muda de transparente para branco durante a rolagem, degradê lateral roxo e carrossel automático com quatro cenas de cuidado, sem controles visíveis. Os parceiros ficam em um painel compacto na abertura. A proposta inclui ainda uma grade estática com oito serviços, avaliações públicas, perguntas frequentes, contato contextual e páginas internas para conteúdo institucional, especialidades e serviços.

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

## Arquivos

- `index.html`: estrutura e conteúdo da home.
- `servicos.html`: página local detalhada de serviços e fluxo de contratação.
- `sobre.html`: página institucional com apresentação, princípios de atendimento e áreas de atuação.
- `especialidades.html`: orientação por necessidade, conectando situações de cuidado aos serviços correspondentes.
- `styles.css`: identidade visual e responsividade.
- `script.js`: menu acessível, carrosséis automáticos, popup e eventos de WhatsApp.
- `assets/images/`: assets públicos autorizados da Harmonia Care.
- `PLANO-ELEMENTOR-HARMONIA-CARE.md`: especificação para implementação posterior no Elementor.
- `ANALISE-BENCHMARK.md`: referências, padrões comparados e decisões aplicadas.

## Limites

### Texto das avaliações

- Nove textos completos foram transcritos dos prints enviados pelo responsável: Larissa Carneiro, Luan Farley, Jaqueline de Souza, Denys Veiga, Alberto Nehmad, Raimunda Brenda Dias Pereira, Diego Moraes, Rute Faria e Valeria Lopes. As palavras dos clientes foram mantidas, inclusive construções informais. O HTML contém o conteúdo integral disponível; o JavaScript mede e apresenta até quatro linhas sem alterar a fonte.
- Para Ronie Ferreira, Weslley Barbosa Dias e Bibiane Fernandes, só há o texto já cadastrado no projeto. A integralidade desses três relatos não está confirmada; não foram completados ou reescritos. Marcados no HTML como `data-review-source="existing-excerpt"`.
- Nenhum link individual de avaliação está disponível. Todos os links inline “mais” abrem o endereço real do perfil da Harmonia Care no Google Maps, já existente no projeto, em nova aba. Não levam ao formulário de escrever uma avaliação.
- O corte é recalculado após carregar as fontes e redimensionar a tela. A última palavra, as reticências (somente se houver corte) e “mais” ficam unidos para evitar um link órfão. Em textos completos, “mais” permanece após um pequeno espaço, sem acrescentar reticências.

- Os parceiros devem ser confirmados antes de uma publicação real.
- Os depoimentos são trechos de avaliações públicas fornecidas e verificadas durante a construção do protótipo; nenhum relato foi inventado.
- O protótipo não contém backend, WordPress, Elementor ou banco de dados.
- Nenhum dado de formulário ou dado de saúde é coletado.

## Revisão local — 15/09/2026

- Revisão editorial das quatro páginas: regência, clareza, repetições, menus, perguntas frequentes, rodapés e popups. Os depoimentos foram preservados palavra por palavra, inclusive construções informais dos clientes.
- Convite às avaliações: “Ajude-nos a cuidar cada vez melhor. Deixe a sua avaliação!”, com o link na sequência do texto.
- Três imagens PNG substituídas na abertura por WebP sem perda: de 5.892.095 para 3.314.964 bytes (43,7% a menos). A primeira imagem passou de 1.293.020 para 445.868 bytes (65,5% a menos). Dimensões e pixels RGBA foram comparados e são idênticos. Os originais permanecem disponíveis no repositório, mas não são solicitados pela página.
- Removidas 129 regras de estilo obsoletas e referências sem uso em três regras compartilhadas. O CSS ficou aproximadamente 18,7% menor. Nenhuma seção ativa foi removida.
- Quatro páginas verificadas em 375, 768 e 1440 px: sem rolagem horizontal indevida, imagens quebradas ou erros no console. Foram verificados 19 destinos internos, incluindo âncoras, além da proteção dos links que abrem em nova aba.
- Os estilos calculados dos elementos foram comparados antes e depois da limpeza do CSS nas 12 combinações de página e largura, sem diferenças visuais nas propriedades verificadas.
- Menu móvel verificado para abertura e fechamento com `Escape`; depoimentos limitados a quatro linhas e textos originais comparados com a versão anterior.
- JavaScript de aproximadamente 12,2 kB, sem bibliotecas externas no site. A primeira imagem tem carregamento prioritário; as demais são carregadas progressivamente.
- Os relatórios Lighthouse antigos correspondem a versões anteriores, não à versão atual. Não foi feita nova medição de Lighthouse nesta revisão; a redução em bytes não equivale a uma promessa de tempo de carregamento.

## Comportamentos mantidos

- Carrossel principal com quatro cenas e intervalo de 5,5 segundos; avaliações com intervalo de 5 segundos e pausa durante interação. Ambos respeitam a preferência por movimento reduzido.
- Oito serviços em grade estática, com descrições e links para a seção correspondente em `servicos.html`.
- A página de serviços possui resumo operacional, oito explicações detalhadas, processo em quatro etapas e contatos de WhatsApp por serviço.
- WhatsApp do cabeçalho sempre verde. Outros botões de WhatsApp em lilás, com mudança para verde ao passar o mouse ou receber foco.
- A orientação compacta aparece uma única vez na página de entrada, após 12 segundos nos últimos 15% da página ou 120 segundos de permanência com a aba visível. Respeita 45 segundos após o fechamento de outro popup e permanece aberta até fechar ou clicar no contato.
- O popup de parceiros aparece uma vez na página de entrada, após 30 a 50 segundos de tempo ativo. Contém links diretos para os sites dos parceiros e fecha após 18 segundos sem interação. Um marcador em sessionStorage impede novas exibições ao navegar entre páginas na mesma aba. Atualizar a página libera uma nova sequência; voltar pelo histórico não. Os dois popups não se sobrepõem.
- A página Sobre apresenta três princípios: “Seu jeito de viver importa”, “Profissionais escolhidos com cuidado” e “Sua família participa”. Os títulos das quatro páginas foram revisados para priorizar clareza e proximidade com as famílias, mantendo os nomes das especialidades.
- Popups com fechamento por “X” ou `Escape`, bloqueio de repetição ao retornar ao final e ao navegar internamente, e reinício ao atualizar a página.

Os relatórios e as capturas de tela locais estão em `.preview/` (pasta não versionada) e não representam métricas do servidor WordPress de produção. Os indicadores de famílias e profissionais são informados pelo responsável, não calculados a partir de avaliações do Google. Veja as fontes e limitações em `IMAGE-SOURCES.md`.
