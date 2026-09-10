# Harmonia Care — protótipo local

Protótipo navegável da proposta de otimização da home. É uma demonstração front-end independente e não altera o WordPress publicado.

A versão atual apresenta a Home com fotografias em tela ampla, cabeçalho transparente, degradê lateral roxo para leitura e carrossel automático com cinco cenas de cuidado, sem controles visíveis. Os parceiros ficam em um painel compacto dentro da própria abertura, à direita do conteúdo principal. A proposta inclui ainda uma vitrine compacta com nove serviços e páginas internas para conteúdo institucional, especialidades e serviços.

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
- `sobre.html`: página institucional aprimorada, com propósito, princípios expansíveis, prática de cuidado e parceiros.
- `especialidades.html`: orientação por necessidade, conectando situações de cuidado aos serviços correspondentes.
- `styles.css`: identidade visual e responsividade.
- `script.js`: menu acessível, carrosséis automáticos, popup e eventos de WhatsApp.
- `assets/images/`: assets públicos autorizados da Harmonia Care.
- `PLANO-ELEMENTOR-HARMONIA-CARE.md`: especificação para implementação posterior no Elementor.
- `ANALISE-BENCHMARK.md`: referências, padrões comparados e decisões aplicadas.

## Limites

- Parceiros e convênios devem ser confirmados antes de uma publicação real.
- Depoimentos não foram incluídos por falta de autorização verificável.
- Não foram criados nomes, avaliações ou relatos fictícios. A faixa de experiência da home apresenta compromissos da marca e está identificada como não sendo composta por depoimentos.
- O protótipo não contém backend, WordPress, Elementor ou banco de dados.
- Nenhum dado de formulário ou dado de saúde é coletado.

## Validação local — 03/09/2026

- Lighthouse móvel da home após a simplificação: Performance 97, Acessibilidade 100, Boas Práticas 100 e SEO 100.
- Home: LCP 2,4 s; CLS 0; Total Blocking Time 0 ms.
- Página de serviços: Performance 99, Acessibilidade 100, Boas Práticas 100 e SEO 100; LCP 2,0 s, CLS 0 e Total Blocking Time 0 ms.
- Página Sobre: Performance 99, Acessibilidade 100, Boas Práticas 100 e SEO 100; LCP 2,1 s, CLS 0,001 e Total Blocking Time 0 ms.
- Página Especialidades: Performance 99, Acessibilidade 100, Boas Práticas 100 e SEO 100; LCP 1,8 s e CLS 0,003.
- Sem overflow horizontal em 1440, 1280, 768 e 390 px.
- Parceiros: início em aproximadamente 686 px no desktop Full HD e 559 px no teste de notebook, permanecendo visíveis já na primeira tela em ambos os cenários medidos.
- Altura desktop da home: 3.670 px em 1.440 px, aproximadamente 32,0% menor que a referência pública estimada de 5.400 px. A comparação definitiva exige baseline equivalente do WordPress em staging.
- Menu móvel validado para abertura, fechamento e tecla `Escape`.
- Imagens, console e evento `whatsapp_click` validados no Chrome automatizado.
- Recursos iniciais servidos no Lighthouse: aproximadamente 361 KiB. As duas novas imagens WebP somam 79,6 KB e são carregadas progressivamente apenas quando se aproximam da exibição.
- JavaScript total: aproximadamente 9,5 KB, sem bibliotecas externas. Heap observado na rodada anterior: aproximadamente 2 MB após interação e rolagem completa no desktop.
- Carrossel com cinco cenas validado em rotação automática a cada 5,5 segundos, com apenas duas setas laterais, teclado e preferência por movimento reduzido.
- Nove serviços validados em cards compactos com descrições individuais e links para a seção correspondente em `servicos.html`. A vitrine avança a cada 6,5 segundos somente quando está visível e oferece apenas setas anterior/próximo.
- A página de serviços possui resumo operacional no primeiro bloco, processo em quatro etapas, nove explicações detalhadas e CTAs de WhatsApp segmentados.
- Contato geral do WhatsApp posicionado no cabeçalho como CTA textual e rastreado por página; o ícone flutuante foi removido.
- CTAs genéricos de WhatsApp removidos do hero e de “Como funciona”. Permanecem o contato do cabeçalho, a consulta específica de convênios e um lembrete contextual transitório.
- Lembrete contextual liberado após 6 segundos e 38% de rolagem, com fallback aos 18 segundos. Nunca aparece junto ao popup de parceiros, fecha sozinho após 10 segundos e respeita o descarte durante a sessão.
- Manifesto “Nossa forma de cuidar” incluído com três princípios derivados do conteúdo institucional público: pessoa antes do padrão, técnica com presença humana e família integrada.
- Representatividade visual ampliada com pessoas negras e asiáticas, usando exclusivamente imagens já publicadas no acervo autorizado da Harmonia Care.
- Popup validado com fechamento por “X” e persistência do descarte durante a sessão.

Os relatórios e screenshots técnicos estão em `.preview/` e não representam métricas do servidor WordPress de produção.
