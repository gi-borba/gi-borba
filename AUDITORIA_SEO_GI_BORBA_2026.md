# Auditoria SEO do Site Público Gi Borba

Base de análise:
- Código local do site em `giborbayoga.com.br`
- Guia [Estrategia_SEO_Yoga_NeilPatel_2026.md](./Estrategia_SEO_Yoga_NeilPatel_2026.md)
- Escopo auditado: `index.html`, `politica-de-privacidade/politica-de-privacidade.html`, `termos-de-uso/termos-de-uso.html`

Limitações desta auditoria:
- Não usa dados reais de Search Console, GA4, Ahrefs, SEMrush ou SERP live.
- Onde não há dado externo, as conclusões abaixo são inferências técnicas e estratégicas a partir do código e da estrutura atual do site.

## Nota Geral

### Home
**7,2/10 em amigabilidade SEO**

### Site público como um todo
**6,8/10 em amigabilidade SEO**

Leitura direta:
- A home está acima da média em conteúdo, profundidade semântica e cobertura de FAQ.
- O site está abaixo do potencial real por falta de arquitetura SEO, discoverability técnica e foco de intenção por URL.
- Hoje ele funciona melhor como uma landing page rica do que como um ativo orgânico preparado para dominar clusters.

## Resumo Executivo

O site já tem três ativos raros para um projeto novo:
- volume textual forte;
- FAQ amplo com boa cobertura de PAA;
- sinais de E-E-A-T razoáveis para uma professora real com oferta clara.

O problema é estrutural: quase toda a estratégia de SEO está comprimida dentro da home. Isso cria três perdas:
- dilui a intenção comercial principal da página;
- impede ranqueamento consistente para long tails específicas;
- reduz a capacidade de construir autoridade temática por cluster.

Em linguagem Neil Patel: a página tem muita munição, mas ainda não tem um sistema de distribuição de autoridade.

## Diagnóstico por Camada

## 1. SEO Técnico

### Pontos fortes
- Há `title`, `meta description`, `canonical` e `robots` nas 3 páginas públicas.
- A home já inclui `FAQPage` schema e `Person` schema.
- Há páginas institucionais de privacidade e termos, o que reforça confiança.
- O HTML é server-rendered estático. Isso é bom para crawl e indexação.

### Problemas críticos

#### 1. Ausência de `robots.txt`
Severidade: `crítico`

Impacto:
- reduz clareza de rastreamento para crawlers;
- não informa a existência de sitemap;
- perde uma camada básica de governança técnica.

#### 2. Ausência de `sitemap.xml`
Severidade: `crítico`

Impacto:
- páginas existentes dependem só de descoberta por link;
- futuras cluster pages terão indexação mais lenta;
- piora governança de crescimento orgânico.

### Problemas altos

#### 3. Open Graph incompleto
Severidade: `alto`

Estado atual:
- há `og:title`, `og:description`, `og:type`, `og:locale`;
- não há `og:image`;
- não há `og:url`;
- não há `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

Impacto:
- compartilhamento social e em mensageria fica fraco;
- CTR indireto pode cair;
- o site perde consistência de marca fora da busca orgânica.

#### 4. Ausência de favicon e manifest
Severidade: `alto`

Impacto:
- experiência de marca mais fraca em navegador e mobile;
- perda de sinal básico de acabamento técnico.

#### 5. Peso excessivo de mídia
Severidade: `alto`

Achados objetivos:
- `vsl-gi-borba-yoga-mae.mp4`: **8,18 MB**
- `gi-borba-depoimento-2.mp4`: **8,57 MB**
- `gi-borba-depoimento-3.mp4`: **7,66 MB**
- `gi-borba-depoimento-1.mp4`: **6,97 MB**
- hero em PNG: **1,43 MB**
- blocos visuais principais em PNG entre **1,32 MB** e **1,81 MB**
- vários avatares com peso alto para uso secundário

Impacto:
- risco de LCP pior;
- risco de queda de Core Web Vitals em conexões móveis;
- aumento do custo de crawl/render;
- piora da primeira experiência orgânica.

#### 6. Dependência de PNG onde WebP/AVIF seria mais adequado
Severidade: `alto`

Impacto:
- página paga caro em bytes por assets decorativos e editoriais;
- oportunidade clara de redução sem perda visual relevante.

### Problemas médios

#### 7. Ausência de `LocalBusiness` ou `ProfessionalService` schema
Severidade: `médio`

Hoje existe `Person`, mas a oferta também é um serviço. Falta estruturar melhor:
- modalidade do serviço;
- área atendida;
- canais de contato;
- oferta principal;
- possíveis reviews/aggregate signals no futuro.

#### 8. Ausência de breadcrumb strategy
Severidade: `médio`

Hoje não dói porque quase não há arquitetura de conteúdo. Vai doer assim que surgirem páginas satélite.

#### 9. Font Awesome via CDN para um site essencialmente estático
Severidade: `baixo`

Não é um problema SEO central, mas adiciona dependência externa evitável.

## 2. SEO On-Page

## Forças reais da home
- `title` e `description` já falam com intenção comercial clara: aulas de yoga online ao vivo.
- O H1 comunica proposta de valor e posicionamento emocional.
- Há cobertura textual de termos prioritários do guia: `yoga online ao vivo`, `yoga para ansiedade`, `yoga para insônia`, `yoga para menopausa`, `yoga para dor lombar`, `yoga para iniciantes`.
- O FAQ é extenso e semanticamente rico.
- O glossário reforça vocabulário temático e amplitude semântica.

## Problema central de on-page

### A home está tentando ranquear para intenções demais ao mesmo tempo
Severidade: `alto`

Hoje a página mistura:
- landing comercial;
- hub informacional;
- FAQ massivo;
- glossário;
- conteúdo de comparação;
- conteúdo quase de pillar page.

Consequência:
- a intenção principal da URL fica menos nítida;
- o Google pode entender a página como ampla, mas não necessariamente como a melhor resposta para long tails específicas;
- várias oportunidades de cluster ficam “presas” na home sem gerar URLs ranqueáveis próprias.

### O H1 é bom para marca e conversão, mas não maximiza foco de keyword
Severidade: `médio`

O H1 atual é emocional. Isso ajuda branding, mas poderia sinalizar melhor a categoria principal. A página ainda depende de outros blocos para deixar explícito o termo comercial principal.

### `meta keywords` não agrega valor
Severidade: `baixo`

Não é fator relevante de ranqueamento. Pode permanecer, mas não contribui.

### Home sem `og:image` perde potência de distribuição
Severidade: `alto`

Isso é técnico e on-page ao mesmo tempo porque afeta CTR de compartilhamento.

## 3. Arquitetura de Informação

## Estado atual
Arquitetura efetiva hoje:
- home
- política de privacidade
- termos de uso

Diagnóstico:
- existe profundidade de conteúdo;
- não existe profundidade de URLs.

### Falta estrutura de cluster pages
Severidade: `crítico`

O guia SEO 2026 pede explicitamente:
- pages pilar;
- páginas satélite;
- interlinking bilateral.

Hoje quase tudo está concentrado na home, então o site não executa a estratégia de cluster. Ele apenas a ensaia dentro de uma única URL.

### O FAQ rico ajuda, mas já começou a canibalizar o plano editorial
Severidade: `alto`

Várias perguntas do FAQ têm densidade suficiente para virar páginas próprias:
- yoga ajuda na ansiedade;
- yoga melhora a insônia;
- yoga é bom para a coluna;
- yoga para burnout;
- yoga para menopausa;
- o que é yoga nidra;
- o que é neuroyoga;
- posso fazer yoga todos os dias;
- como fazer yoga em casa para iniciantes.

Se tudo continuar só na home:
- a home captura amplitude;
- mas o domínio perde foco por intenção;
- a estratégia de long tail não amadurece.

### O glossário agrega topical authority, mas hoje ocupa espaço que deveria apontar para URLs próprias
Severidade: `médio`

Leitura correta:
- o glossário não é inútil;
- ele ajuda o campo semântico;
- mas, sozinho, não substitui páginas satélite.

Melhor uso:
- manter glossário resumido;
- transformar termos críticos em portas para conteúdo dedicado.

## 4. Conteúdo e Intenção de Busca

## Aderência ao guia 2026

### O que já está bem representado
- `yoga online ao vivo`
- `yoga para ansiedade`
- `yoga para insônia`
- `yoga para dor lombar`
- `yoga para menopausa`
- `yoga para iniciantes`
- `yoga nidra`
- `yin yoga`
- `neuroyoga`
- `yoga sem religião`
- `posso fazer yoga todos os dias`

### O que tem base, mas ainda não tem URL forte própria
- `como fazer yoga em casa para iniciantes`
- `yoga pode substituir musculação`
- `yoga ou pilates`
- `yoga para burnout`
- `yoga para TPM`
- `yoga para idosos`
- `yoga para gestantes`
- `yoga online funciona tanto quanto presencial`
- `qual tipo de yoga é melhor para iniciantes`

### O que ainda exige URL dedicada
- guia pilar de yoga para iniciantes;
- guia pilar de yoga e saúde mental;
- guia pilar de tipos/modalidades de yoga;
- comparativo yoga vs pilates;
- artigo específico sobre yoga para ansiedade com viés de evidência;
- artigo específico sobre yoga para insônia;
- artigo específico sobre yoga para menopausa;
- artigo específico sobre yoga para dor lombar;
- página transacional para `aulas de yoga online ao vivo`.

### Local SEO está praticamente ausente
Severidade: `alto`

Mesmo com operação online, o guia 2026 sugere presença local. Hoje faltam:
- cidade-base explícita na proposta;
- páginas locais;
- sinais locais estruturados;
- Google Business Profile citado como parte do ecossistema.

Isso é especialmente relevante se a Gi atender ou vender também:
- aulas particulares;
- retiros;
- yoga personal;
- ações presenciais em São Paulo ou região.

## 5. Conversão Orgânica

## Pontos fortes
- CTA muito claro;
- prova social forte;
- proposta de valor humana;
- boa percepção de confiança;
- oferta experimental reduz atrito.

## Risco estratégico

### Conversão está forte; segmentação SEO ainda não
Severidade: `alto`

A página foi pensada primeiro como conversão, depois como ecossistema de busca. Isso não é erro. Mas limita crescimento orgânico.

Em resumo:
- para tráfego quente, ela funciona;
- para dominar tópicos e capturar topo/meio de funil, ainda não.

## Achados Prioritários por Severidade

## Críticos
- Ausência de `robots.txt`
- Ausência de `sitemap.xml`
- Ausência de arquitetura de cluster pages

## Altos
- Home tentando ranquear para intenções demais
- FAQ massivo canibalizando futuras páginas satélite
- Open Graph e Twitter Cards incompletos
- Peso excessivo de vídeos e PNGs
- Local SEO fraco
- Falta de `og:image`
- Ausência de páginas dedicadas para termos prioritários já maduros

## Médios
- H1 pouco orientado à keyword principal
- Falta de schema mais próximo do serviço prestado
- Glossário útil, mas ainda isolado da arquitetura editorial
- Falta de breadcrumb strategy para crescimento futuro

## Baixos
- `meta keywords`
- dependência pequena de asset/CDN não essencial

## O que Está Bom e Deve Ser Preservado

- Tom humano e diferenciado do copy.
- Profundidade do FAQ.
- Prova social com depoimentos.
- Páginas legais bem acima da média de sites pequenos.
- Presença real de credenciais e contexto da professora.
- Oferta principal clara: aulas de yoga online ao vivo.

## O que Está Travando Ranqueamento

- Poucas URLs públicas para muita ambição semântica.
- Home com excesso de responsabilidade editorial.
- Descoberta técnica insuficiente.
- Peso de mídia acima do ideal.
- Distribuição social incompleta.

## O que É Oportunidade Clara

- Transformar a home em página comercial principal.
- Tirar da home os grandes tópicos que merecem URL própria.
- Usar o FAQ atual como matéria-prima para cluster pages.
- Criar um sistema de interlinking entre home, pilares e satélites.
- Ativar camada técnica mínima de indexação e compartilhamento.

## Roadmap Prioritário

## Fase 1. Quick Wins Técnicos e de Metadata

Prioridade: `máxima`

Objetivo:
melhorar indexação, compartilhamento e preparo técnico sem mudar a estratégia editorial inteira.

Ações:
- criar `robots.txt`;
- criar `sitemap.xml`;
- adicionar `og:image` em todas as páginas públicas;
- adicionar `og:url`;
- adicionar `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`;
- adicionar favicon;
- adicionar `manifest` se houver interesse em acabamento mobile;
- revisar imagens principais e converter hero/cards/depoimentos para WebP ou AVIF quando possível;
- revisar compressão dos vídeos e thumbnails.

Impacto esperado:
- melhora imediata de discoverability;
- melhor compartilhamento;
- melhor base para Core Web Vitals.

## Fase 2. Reposicionar a Home

Prioridade: `alta`

Objetivo:
fazer a home ranquear com mais clareza para intenção comercial.

Ações:
- tratar a home como principal URL transacional para `aulas de yoga online ao vivo`;
- reduzir a função de “mini blog enciclopédico” da home;
- manter FAQ e glossário, mas de forma mais estratégica;
- introduzir links contextuais para futuras páginas satélite;
- deixar mais explícita a keyword comercial principal em heading e blocos de apoio.

Impacto esperado:
- maior coerência semântica;
- menor confusão de intenção;
- mais força para palavra-chave comercial.

## Fase 3. Expansão Editorial por Clusters

Prioridade: `alta`

Objetivo:
executar de fato a estratégia Neil Patel 2026.

Primeiras URLs recomendadas:
- `aulas-de-yoga-online`
- `yoga-para-iniciantes`
- `yoga-para-ansiedade`
- `yoga-para-insonia`
- `yoga-para-menopausa`
- `yoga-para-dor-lombar`
- `o-que-e-yoga-nidra`
- `o-que-e-neuroyoga`
- `yoga-ou-pilates`
- `posso-fazer-yoga-todos-os-dias`

Lógica:
- 1 página comercial principal;
- 2 a 3 pilares;
- 6 a 10 satélites com interlinking.

Impacto esperado:
- ganho real de long tail;
- aumento de topical authority;
- melhor chance de snippet e PAA.

## Fase 4. Autoridade, Interlinking e Rich Results

Prioridade: `média-alta`

Objetivo:
transformar o site de “landing rica” em “domínio temático confiável”.

Ações:
- adicionar schema adicional de serviço/profissional;
- estruturar interlinks entre home, FAQ, glossário e artigos;
- usar provas sociais com estratégia de marcação futura quando houver base segura;
- considerar páginas locais se houver operação presencial, retiros ou yoga personal por região;
- alinhar YouTube e Instagram com páginas-alvo do site.

Impacto esperado:
- domínio mais robusto;
- mais chance de ranqueamento composto;
- maior reaproveitamento do conteúdo omnichannel.

## Priorização Executiva

Se fosse para fazer só o que mais mexe a agulha:

1. Criar `robots.txt` e `sitemap.xml`
2. Completar Open Graph/Twitter metadata
3. Otimizar hero, cards e vídeos pesados
4. Reposicionar a home para intenção comercial principal
5. Publicar as primeiras 5 a 8 URLs satélite derivadas do FAQ atual

## Veredito Final

O site não está fraco em SEO. Ele está mal distribuído em SEO.

Hoje existe conteúdo suficiente para parecer autoridade, mas ainda não existe arquitetura suficiente para o Google tratar o domínio como autoridade temática completa.

Se a prioridade for conversão de tráfego quente, a base já é boa.
Se a prioridade for crescimento orgânico sustentável em 2026, a principal mudança não é “escrever melhor”. É separar intenção por URL, limpar a função da home e transformar o FAQ atual em motor de cluster.

## Próximo Passo Recomendado

Executar nesta ordem:
- infraestrutura mínima de indexação;
- metadados de compartilhamento;
- otimização de mídia;
- revisão estratégica da home;
- publicação das primeiras páginas satélite.
