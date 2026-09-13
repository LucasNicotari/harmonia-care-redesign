# Harmonia Care — protótipo local

Protótipo navegável da proposta de otimização da home. É uma demonstração front-end independente e não altera o WordPress publicado.

A versão atual apresenta a Home com fotografias em tela ampla, cabeçalho fixo que muda de transparente para branco durante a rolagem, degradê lateral roxo e carrossel automático com cinco cenas de cuidado, sem controles visíveis. Os parceiros ficam em um painel compacto na abertura. A proposta inclui ainda uma grade estática com oito serviços, avaliações públicas, perguntas frequentes, contato contextual e páginas internas para conteúdo institucional, especialidades, serviços e cadastro profissional.

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
- `trabalhe-conosco.html`: página de cadastro de currículos e apresentação das áreas profissionais.
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

## Validação local

- Lighthouse móvel da home após a simplificação: Performance 97, Acessibilidade 100, Boas Práticas 100 e SEO 100.
- Home: LCP 2,4 s; CLS 0; Total Blocking Time 0 ms.
- Página de serviços: Performance 99, Acessibilidade 100, Boas Práticas 100 e SEO 100; LCP 2,0 s, CLS 0 e Total Blocking Time 0 ms.
- Página Sobre: Performance 99, Acessibilidade 100, Boas Práticas 100 e SEO 100; LCP 2,1 s, CLS 0,001 e Total Blocking Time 0 ms.
- Página Especialidades: Performance 99, Acessibilidade 100, Boas Práticas 100 e SEO 100; LCP 1,8 s e CLS 0,003.
- Sem overflow horizontal em 1440, 1280, 768 e 390 px.
- Parceiros: início em aproximadamente 686 px no desktop Full HD e 559 px no teste de notebook, permanecendo visíveis já na primeira tela em ambos os cenários medidos.
- Altura desktop da home: 3.687 px em 1.440 px. A comparação definitiva exige baseline equivalente do WordPress em staging.
- Menu móvel validado para abertura, fechamento e tecla `Escape`.
- Imagens, console e evento `whatsapp_click` validados no Chrome automatizado.
- Recursos iniciais servidos no Lighthouse: aproximadamente 361 KiB. As duas novas imagens WebP somam 79,6 KB e são carregadas progressivamente apenas quando se aproximam da exibição.
- JavaScript total: aproximadamente 5,8 KB, sem bibliotecas externas.
- Carrossel principal com cinco cenas validado em rotação automática a cada 5,5 segundos, sem botões ou indicadores visíveis e com respeito à preferência por movimento reduzido.
- Oito serviços validados em grade estática, sem carrossel ou controles, com descrições individuais e links para a seção correspondente em `servicos.html`.
- A página de serviços possui resumo operacional no primeiro bloco, oito explicações detalhadas, processo em quatro etapas e CTAs de WhatsApp segmentados.
- Contato geral do WhatsApp posicionado no cabeçalho como CTA textual e rastreado por página; um atalho flutuante discreto permanece disponível.
- O contato permanece disponível no cabeçalho, nos serviços e em um lembrete contextual transitório.
- A orientação compacta aparece uma única vez na página de entrada, após 12 segundos nos últimos 15% da página ou 120 segundos de permanência com a aba visível. Respeita 45 segundos após o fechamento de outro popup e permanece aberta até fechar ou clicar no contato.
- O popup de parceiros aparece uma vez na página de entrada, após 30 a 50 segundos de tempo ativo. Contém links diretos para os sites dos parceiros e fecha após 18 segundos sem interação. Um marcador em sessionStorage impede novas exibições ao navegar entre páginas na mesma aba. Atualizar a página libera uma nova sequência; voltar pelo histórico não. Os dois popups não se sobrepõem.
- Manifesto “Nossa forma de cuidar” incluído com três princípios derivados do conteúdo institucional público: pessoa antes do padrão, técnica com presença humana e família integrada.
- Representatividade visual ampliada com pessoas negras e asiáticas, usando exclusivamente imagens já publicadas no acervo autorizado da Harmonia Care.
- Popups validados com fechamento por “X” ou Escape, bloqueio de repetição ao retornar ao final e ao navegar internamente, e reinício ao atualizar a página.

Os relatórios e screenshots técnicos estão em `.preview/` e não representam métricas do servidor WordPress de produção.
