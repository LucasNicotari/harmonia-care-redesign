# Plano operacional — Home Harmonia Care

**Status:** especificação pronta para aplicação em staging  
**Produção:** não alterada  
**Tecnologia-alvo:** WordPress + Elementor  
**Página:** `https://harmoniacare.com.br/`  
**Última revisão:** 02/09/2026

## 1. Diagnóstico e decisão técnica

O material disponível neste projeto não contém WordPress, banco, tema filho, exportação do Elementor ou credenciais. Portanto, esta entrega não altera nem afirma ter alterado o site. Ela define, sem decisões pendentes de implementação, como otimizar a home existente assim que um staging válido for fornecido.

A abordagem escolhida é editar a página atual no Elementor. Reconstruir o site em outra tecnologia aumentaria custo, prazo, risco de regressão e esforço de publicação sem uma limitação técnica comprovada que justificasse a troca.

### Estado público observado

- WordPress com Elementor e tema Hello Biz.
- Home estimada em aproximadamente 5.400 px a 1366 px; confirmar em baseline controlado.
- Parceiros aparecem apenas perto de 70% da página.
- Seis blocos de serviços repetem estrutura, texto e CTA.
- O hero atual é emocional, mas não explica a oferta imediatamente.
- O texto “Ajudamos às famílias” deve ser corrigido para “Ajudamos as famílias”.
- O telefone deve aparecer como `+55 (34) 98838-8116` e apontar para `5534988388116`.
- Cores encontradas nos estilos públicos: roxos `#8632FA` e `#A66BFB`, verde `#5C8549`, texto `#353D62`, lavanda `#E7D9FF`. São referências do estado atual; o contraste deve ser validado antes de publicar.
- A resposta informal entre 9,8 e 10,8 segundos é somente um alerta. Não constitui baseline nem identifica causa.

## 2. Pré-requisitos obrigatórios

Antes de editar, obter:

- URL de staging protegida contra indexação e, preferencialmente, por autenticação.
- Usuário WordPress limitado ao staging, com acesso ao Elementor da home.
- Exportação JSON da home atual e backup verificável do staging.
- Confirmação de qual header e footer são usados: Theme Builder, tema ou plugin.
- Tema filho ativo ou autorização para criar um; nunca editar o core ou o tema-pai.
- Lista e versões de WordPress, Elementor, Elementor Pro, tema e plugins que afetam cache, SEO, formulário, imagens e GTM.
- Identificação do container do Google Tag Manager e acesso ao modo Preview; não incluir o ID ou credenciais neste repositório.
- Configuração atual de cache/CDN e confirmação de que o encurtador `harmoniacare.short.gy` pertence à empresa.
- Lista final de parceiros e convênios vigentes.
- Autorização documentada para cada depoimento mantido.

Não atualizar WordPress, tema ou plugins como parte deste trabalho.

## 3. Wireframe e estrutura exata do Elementor

Usar Containers Flexbox, largura total externa e container interno com `max-width: 1160px`. Adicionar as classes indicadas em **Avançado > Classes CSS**. Evitar containers aninhados sem função visual ou semântica.

```text
Header compacto
Hero (2 colunas no desktop; 1 no celular)
Parceiros
Serviços (3 cards)
Como funciona (3 passos)
Prova social (condicional)
Convênios (condicional até confirmação)
CTA final
Footer
```

### 3.1 Header compacto

**Container externo:** `hc-header`  
**Interno:** horizontal, alinhamento central, `justify-content: space-between`, largura 1160 px, padding 12 px 24 px.  
**Altura-alvo:** 72–80 px desktop; 64–72 px mobile.

Conteúdo:

1. Logotipo atual, com texto alternativo `Harmonia Care` e largura máxima aproximada de 160 px.
2. Menu: `Serviços`, `Como funciona`, `Parceiros`, `Convênios`.
3. Botão `Falar no WhatsApp`.

Links internos:

- Serviços → `#servicos`
- Como funciona → `#como-funciona`
- Parceiros → `#parceiros`
- Convênios → `#convenios`

No mobile, usar menu acessível com nome `Abrir menu`, estado `aria-expanded` correto e fechamento por `Esc`. Só manter header fixo se a altura final não exceder 72 px e não cobrir o destino das âncoras.

### 3.2 Hero

**Container externo:** `hc-hero`  
**Interno:** duas colunas 56/44, gap 48 px, alinhamento central, padding 64 px 24 px 56 px.  
**Mobile:** imagem abaixo do texto, gap 28 px, padding 40 px 20 px.

Texto final:

- Sobretítulo: **Atendimento domiciliar em Uberlândia e região**
- H1: **Cuidado profissional para quem você ama, no conforto de casa.**
- Complemento: **Enfermagem, cuidadores, fisioterapia, fonoaudiologia, nutrição e babysitter, com atendimento humano e personalizado.**
- CTA principal: **Falar com a equipe agora**
- CTA secundário: **Conhecer os serviços** → `#servicos`
- Sinal de confiança: **Atendimento particular e por convênios.** Exibir somente após confirmação de que continua verdadeiro.

Usar a imagem humana atual do hero se licença, resolução e enquadramento forem adequados. Exportar em WebP/AVIF com fallback, `width` e `height`, `object-fit: cover`, sem lazy loading e com `fetchpriority="high"` apenas se ela for o elemento LCP. O texto do hero contém menos de 65 palavras.

### 3.3 Parceiros

**Âncora:** `parceiros`  
**Classes:** `hc-section hc-partners`  
**Posição:** imediatamente após o hero; início da seção antes de 1.000 px em desktop e até a segunda tela em 390 px.

- H2: **Parceiros que fortalecem nosso cuidado**
- Mostrar somente logos atuais confirmados. Referências pendentes: Soma Neuromodulação e Cirúrgica Uberlândia.
- Layout: grid estático, duas colunas no desktop e duas ou uma no mobile conforme legibilidade.
- Área visual de cada logo: até 180 × 72 px, mantendo proporção e sem carrossel automático.
- `alt`: nome real da organização; links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- Não incluir descrição longa nesta faixa.

### 3.4 Serviços

**Âncora:** `servicos`  
**Classes:** `hc-section hc-services`  
**Layout:** H2 e introdução curta, grid com três cards de mesma altura, CTA único ao final.

- H2: **Cuidado completo para cada momento**
- Introdução: **Escolha o tipo de apoio que sua família procura. Nossa equipe orienta o atendimento mais adequado.**

Cards:

1. **Equipe multidisciplinar**  
   Enfermagem 24h, fisioterapia, fonoaudiologia e nutrição trabalhando de forma integrada para atender cada necessidade.
2. **Cuidadores**  
   Apoio a idosos, crianças e pessoas com necessidades especiais, respeitando a rotina e a autonomia de cada família.
3. **Babysitter**  
   Babás para períodos pontuais, diárias ou apoio recorrente, mediante disponibilidade e alinhamento prévio com a família.

Usar três ícones SVG da mesma família, decorativos quando o título já transmitir a informação. O CTA geral `Ver todos os serviços` deve apontar para a página atual de serviços. Os cards Cuidadores e Babysitter também podem ser clicáveis somente se receberem destinos corretos; Babysitter usa o WhatsApp segmentado enquanto não houver página própria.

### 3.5 Como funciona

**Âncora:** `como-funciona`  
**Classes:** `hc-section hc-process`  
**Layout:** três passos horizontais no desktop e verticais no mobile.

- H2: **Como funciona**
- **1. Conte sua necessidade** — Entre em contato pelo WhatsApp e indique o serviço de interesse.
- **2. Definimos o atendimento** — A equipe avalia a demanda e orienta a escolha do profissional adequado.
- **3. Comece com acompanhamento** — O cuidado é iniciado conforme o combinado, com suporte da equipe.

Não solicitar diagnóstico, medicação, laudo ou qualquer dado médico na mensagem pública inicial.

### 3.6 Prova social

**Classes:** `hc-section hc-testimonials`  
**Regra de publicação:** condicional.

- H2: **O que as famílias dizem sobre o cuidado**
- Manter no front-end apenas depoimentos reais com autorização verificável.
- Se a autorização não estiver disponível, ocultar toda a seção no staging público. Um placeholder pode existir apenas no editor com o rótulo explícito `[PENDENTE — DEPOIMENTO AUTORIZADO]`.
- Não criar nomes, fotos, notas, avaliações, cargos ou histórias clínicas.
- Sem carrossel automático; um a três depoimentos curtos em grid.

### 3.7 Convênios

**Âncora:** `convenios`  
**Classes:** `hc-section hc-insurance`  
**Regra de publicação:** lista pendente de confirmação.

- H2: **Atendimento particular e por convênios**
- Texto: **Consulte a equipe para verificar cobertura e condições do atendimento.**
- Grid estático de logos, com dimensões consistentes e sem rotação automática.
- CTA: **Consultar cobertura**.
- Até a confirmação, usar somente no editor o marcador `[PENDENTE — CONFIRMAR CONVÊNIOS VIGENTES]`; não expor logos não confirmados no staging compartilhado.

### 3.8 CTA final

**Classes:** `hc-final-cta`  
**Layout:** bloco compacto, centralizado, sem imagem pesada de fundo.

- H2: **Encontre o cuidado certo para sua família.**
- Texto: **Fale com a equipe e explique o tipo de atendimento que você procura.**
- Botão: **Conversar no WhatsApp**.

### 3.9 Footer

Manter logotipo, telefone formatado, localidades confirmadas, links institucionais e política de privacidade. Remover `Desenvolvido pelo Elementor` se não houver obrigação contratual. Não adicionar redes sociais, endereço, e-mail ou registro profissional sem confirmação.

## 4. Direção visual e responsividade

- Largura de conteúdo: 1160 px; padding lateral de 24 px desktop/tablet e 20 px mobile.
- Espaçamento vertical: 72–88 px desktop, 56–64 px tablet, 44–56 px mobile.
- H1: `clamp(2.125rem, 4vw, 3.5rem)`; H2: `clamp(1.75rem, 3vw, 2.5rem)`; texto: 17–18 px, entrelinha mínima 1.55.
- Cards: três colunas ≥1024 px, duas em 768 px quando couberem sem compressão, uma em 390 px.
- Área de toque mínima: 44 × 44 px; foco visível em todos os controles.
- Preservar roxo como marca e usar verde como ação somente quando o contraste calculado for WCAG AA. Não usar texto branco sobre `#5C8549` sem validação; ajustar a tonalidade se necessário.
- Fundos majoritariamente claros, lavanda apenas em blocos delimitados, sem grandes áreas roxas vazias.
- Evitar animações de entrada, parallax, carrosséis automáticos, sombras excessivas e alturas mínimas rígidas.

### CSS proposto

Aplicar no child theme ou em CSS exportável e versionado. Confirmar as variáveis globais do Elementor antes de substituir valores. As classes são deliberadamente prefixadas com `hc-`.

```css
:root {
  --hc-brand: #8632fa;
  --hc-brand-soft: #e7d9ff;
  --hc-action: #5c8549;
  --hc-text: #353d62;
  --hc-surface: #ffffff;
  --hc-border: #e9e9e9;
  --hc-radius: 16px;
  --hc-content: 1160px;
}

html { scroll-behavior: smooth; }
[id] { scroll-margin-top: 88px; }

.hc-section,
.hc-hero,
.hc-final-cta { padding: 80px 24px; }

.hc-section > .e-con-inner,
.hc-hero > .e-con-inner,
.hc-final-cta > .e-con-inner {
  width: min(100%, var(--hc-content));
  margin-inline: auto;
}

.hc-services .elementor-widget-container,
.hc-process .elementor-widget-container {
  height: 100%;
}

.hc-card {
  height: 100%;
  padding: 28px;
  background: var(--hc-surface);
  border: 1px solid var(--hc-border);
  border-radius: var(--hc-radius);
}

.hc-button .elementor-button {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.hc-button .elementor-button:focus-visible,
.hc-header a:focus-visible {
  outline: 3px solid var(--hc-brand);
  outline-offset: 3px;
}

.hc-partners img,
.hc-insurance img {
  display: block;
  width: auto;
  max-width: 180px;
  height: 72px;
  object-fit: contain;
}

@media (max-width: 1024px) {
  .hc-section,
  .hc-hero,
  .hc-final-cta { padding: 60px 24px; }
}

@media (max-width: 767px) {
  [id] { scroll-margin-top: 76px; }
  .hc-section,
  .hc-hero,
  .hc-final-cta { padding: 48px 20px; }
  .hc-header { min-height: 64px; }
  .hc-card { padding: 24px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 5. WhatsApp e mensuração

Usar o endpoint `wa.me`, o número `5534988388116` e o parâmetro `text` em UTF-8 codificado. URLs finais:

- Hero/header/CTA final: `https://wa.me/5534988388116?text=Ol%C3%A1%2C%20gostaria%20de%20entender%20qual%20atendimento%20%C3%A9%20mais%20adequado%20para%20minha%20fam%C3%ADlia.`
- Cuidadores: `https://wa.me/5534988388116?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20cuidadores.`
- Babysitter: `https://wa.me/5534988388116?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20disponibilidade%20do%20servi%C3%A7o%20de%20babysitter.`
- Convênios: `https://wa.me/5534988388116?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20cobertura%20por%20conv%C3%AAnio.`

Adicionar a classe `js-whatsapp` e os atributos `data-section` e `data-service-interest` em cada botão. Valores permitidos:

| Origem | `data-section` | `data-service-interest` |
|---|---|---|
| Header | `header` | `general` |
| Hero | `hero` | `general` |
| Card Cuidadores | `services` | `cuidadores` |
| Card Babysitter | `services` | `babysitter` |
| Convênios | `insurance` | `convenios` |
| CTA final | `final_cta` | `general` |

Configurar no GTM um trigger de clique limitado a `.js-whatsapp` e enviar:

```javascript
dataLayer.push({
  event: 'whatsapp_click',
  section: '<data-section>',
  service_interest: '<data-service-interest>'
});
```

Não enviar texto digitado, URL com parâmetros pessoais, telefone do visitante, diagnóstico ou qualquer dado de saúde. Preservar eventos atuais e evitar disparo duplicado; validar no GTM Preview antes da publicação.

## 6. SEO, acessibilidade e performance

### SEO

- Um único H1, no hero; títulos de seção em H2; títulos de cards/passos em H3.
- Proposta de title: `Atendimento domiciliar e cuidadores em Uberlândia | Harmonia Care`.
- Proposta de meta description: `Cuidadores, enfermagem, fisioterapia, fonoaudiologia, nutrição e babysitter em Uberlândia e região. Fale com a Harmonia Care.`
- Validar localidades e oferta antes de aplicar title e description.
- Preservar URL, canonical, dados estruturados válidos e configurações do plugin de SEO existente.
- Não criar marcação de avaliações, LocalBusiness, profissionais ou serviços sem dados verificáveis.

### Acessibilidade

- Validar contraste AA em texto, botões, links, foco e estados hover.
- Usar landmarks reais de header, nav, main e footer quando a configuração do tema permitir.
- Garantir ordem de foco igual à ordem visual, skip link funcional e menu operável por teclado.
- Logos informativos recebem `alt` com o nome; ícones redundantes recebem `alt=""`/ocultação semântica.
- Não codificar informação apenas por cor; respeitar `prefers-reduced-motion`.

### Performance

- Não lazy-load no LCP; lazy-load para imagens abaixo da dobra.
- Definir dimensões e `srcset/sizes` em todas as imagens.
- Converter imagens pesadas para WebP/AVIF após comparação visual; manter original/backup.
- Reduzir widgets, motion effects, fontes, ícones e scripts não usados somente após teste de regressão.
- Não remover dependências globais do Elementor sem confirmar uso nas demais páginas.
- Verificar cache de página, Brotli/Gzip, CDN/Cloudflare, fontes locais/preload seletivo e TTFB no ambiente correto.

## 7. Baseline, testes e aceite

Executar o baseline no staging antes da edição e repetir depois com mesma URL, dispositivo, rede e versão do Lighthouse. Registrar data, ferramenta, modo e três execuções; reportar mediana.

| Métrica | Antes | Depois | Meta |
|---|---:|---:|---:|
| Altura a 1366 px | pendente | pendente | redução ≥30% |
| Performance mobile | pendente | pendente | ≥85 |
| Acessibilidade | pendente | pendente | ≥95 |
| Boas práticas | pendente | pendente | ≥95 |
| SEO | pendente | pendente | ≥95 |
| LCP | pendente | pendente | ≤2,5 s |
| CLS | pendente | pendente | ≤0,1 |

Testar 1440, 1280, 768 e 390 px e registrar evidência de:

- Oferta, localidade e CTA identificáveis sem rolagem.
- Parceiros antes de 1.000 px no desktop e até a segunda tela no mobile.
- Redução mínima de 30% na altura total, sem perda de informação essencial.
- Três categorias visualmente distintas e texto correto de Babysitter.
- Nenhum overflow horizontal, imagem quebrada, erro de console ou link morto.
- Navegação completa por teclado, foco visível, menu acessível e toque mínimo de 44 px.
- Links do WhatsApp com número, mensagem e origem corretos.
- Um evento `whatsapp_click` por clique, com parâmetros válidos e sem dados sensíveis.
- Header, footer, páginas internas, formulários e integrações não relacionados à home sem regressão.

Se uma meta não for atingida, informar o valor real, evidência, causa comprovada e correção seguinte de maior impacto. Não inventar métricas.

## 8. Sequência de aplicação e publicação

1. Confirmar que a URL é staging e bloquear indexação.
2. Exportar a home atual e verificar o backup.
3. Registrar screenshots, altura e Lighthouse baseline.
4. Duplicar a página/template dentro do staging e aplicar a nova estrutura na cópia.
5. Aplicar CSS no child theme ou mecanismo exportável documentado.
6. Configurar links segmentados e eventos do GTM sem publicar o container.
7. Validar conteúdo, responsividade, acessibilidade, performance e regressão.
8. Enviar URL protegida e comparação antes/depois ao cliente.
9. Obter aprovação escrita da home, parceiros, convênios e depoimentos.
10. Gerar nova exportação/backup e preparar janela de publicação com rollback.
11. Publicar somente após autorização explícita; limpar cache de forma controlada e executar smoke test.

Rollback: restaurar o template exportado anterior e limpar somente os caches relacionados. Não alterar DNS nem restaurar todo o banco quando a reversão do template for suficiente.

## 9. Pendências bloqueadoras de implementação/publicação

### Para implementar

- Staging, usuário Elementor, exportação da home e backup.
- Inventário de plugins, tema/child theme, GTM e cache/CDN.

### Para publicar

- Confirmação da lista de parceiros e convênios.
- Autorização dos depoimentos.
- Confirmação de localidades e da frase “Atendimento particular e por convênios”.
- Aprovação formal do cliente e plano de rollback validado.

Babysitter está aprovado para inclusão, sempre com “mediante disponibilidade e alinhamento prévio com a família”. Textos, marca e imagens públicas atuais estão autorizados para reaproveitamento, sujeitos à validação técnica de qualidade e acessibilidade.

## 10. Resultado desta entrega

- Arquivo criado: `PLANO-ELEMENTOR-HARMONIA-CARE.md`.
- Site, WordPress, DNS, banco, plugins e produção: não alterados.
- Métricas antes/depois: ainda não disponíveis porque não existe staging ou exportação executável.
- Próximo insumo necessário: acesso ao staging ou exportação completa do template Elementor da home.
