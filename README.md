# Operação Praça PMPE + Operação Distintivo PCPE — venda direta ao checkout

Landing de **venda direta** das duas mentorias completas do Prof. Everton
Mota. Uma página só, com um **portal de entrada** onde o visitante escolhe a
corporação antes de ver qualquer oferta.

| | Checkout |
|---|---|
| **Operação Praça PMPE** — Polícia Militar de Pernambuco | `.../pay/operacao-praca-pmpe` |
| **Operação Distintivo PCPE** — Polícia Civil de Pernambuco | `.../pay/operacao-distintivo-pcpe` |

Página estática: `index.html` + `styles.css` + `script.js`, no sistema visual
de [`../unificados`](../unificados) e [`../livepmpe`](../livepmpe) — Oxanium +
Rajdhani, ouro `#AF9256` sobre preto `#0A0A0B`, cantos chanfrados de operação,
grão de impressão e brasas subindo pela viewport.

---

## ⚠️ Pendências antes de publicar

### 1. Imagem de compartilhamento

Falta gerar `public/og-operacao.jpg` em **1200×630**. Sem ele, o preview no
WhatsApp e no Instagram sai sem imagem — e é por aí que a maior parte deste
tráfego chega. O molde de [`../livepmpe/og.html`](../livepmpe/og.html) serve de
ponto de partida.

### 2. Domínio

`<link rel="canonical">` e `og:url` estão em `https://operacao.cppem.com.br/`.
Confirme o endereço final — os dois precisam apontar para o **mesmo** lugar.

### 3. Número de vagas

`1.320` (PMPE) e `1.315` (PCPE) vieram de [`../unificados`](../unificados) e
somam as 2.635 que a página do [`../livepmpe`](../livepmpe) anuncia. Se o
número mudou desde então, ele mora em **um lugar só**: `CONFIG.ops.*.vagas` e
`CONFIG.ops.*.tag` no [script.js](script.js) (mais os dois `.portao__vagas` e
o `.portal__nota` no [index.html](index.html), que são o portal e não passam
pelo CONFIG).

---

## Por que uma página, e não duas

Os dois produtos entregam **exatamente a mesma coisa**. O que muda entre eles é
o nome, o brasão, a corporação e a URL de checkout — os nove entregáveis e os
quatro extras são idênticos.

Dois HTMLs seriam duas cópias do mesmo texto, e a segunda começaria a divergir
da primeira no primeiro ajuste de copy que alguém fizesse com pressa. Aqui há
um documento só, e **tudo que muda entre as operações mora no `CONFIG.ops`** do
[script.js](script.js).

> Se você precisar escrever "PMPE" ou "PCPE" em qualquer outro ponto do
> `script.js`, é sinal de que falta um slot.

### Como o conteúdo troca de lado

Quatro variáveis CSS redefinidas em `[data-op]` no `<html>` — e nada além
disso:

| Token | PMPE | PCPE |
|---|---|---|
| `--op-accent` | `--ember` `#C4703F` | `--steel` `#5B8CB8` |
| `--op-halo` | o mesmo tom em halo | idem |
| `--op-marca` | `marca-pmpe.webp` | `marca-pcpe.webp` |
| `--op-brasao` | `brasao-pmpe.webp` | `brasao-pcpe.webp` |

Os dois acentos são os mesmos do `../unificados`, onde já separavam o combo
militar do civil. Eles são de **sussurro**: entram em halo, clarão e fio, nunca
em texto ou botão. O sistema continua sendo o ouro, e é ele que segura a marca
de pé nas duas versões.

O texto que muda carrega `data-slot` e é escrito pelo `aplicar()`. O HTML nasce
com o conteúdo da **PMPE**, então a página continua coerente se o JS não rodar.

> **Não crie um seletor `.is-pmpe` / `.is-pcpe` por componente.** É assim que
> uma variante começa a divergir da outra sem ninguém perceber. Se algo precisa
> mudar de lado, ou vira token acima, ou vira slot no CONFIG.

---

## O preço

**R$ 637,00**, igual nas duas operações. O bloco `#preco` é uma `<table>` que
repete o checkout **linha por linha, na mesma ordem e com os mesmos valores**:

| Linha | Valor |
|---|---|
| Produto `−56%` | ~~R$ 1.654,00~~ |
| Com o desconto | R$ 732,36 |
| Desconto adicional | − R$ 95,36 |
| **Total** | **R$ 637,00** |

Não é excesso de zelo. Quem clica no CTA cai numa tela que mostra exatamente
isso, e qualquer arredondamento diferente aqui vira desconfiança no momento em
que a pessoa vai digitar o cartão. É também por isso que a página **não**
anuncia um percentual próprio: 1.654 → 637 dá 61,5% de abatimento total, mas o
checkout estampa `−56%` na linha do produto, e a página que diz "61% off" ao
lado de um checkout que diz "−56%" contradiz a si mesma. A economia aparece em
reais — **R$ 1.017,00** — que é o número que fecha nas duas contas.

Nada de parcelamento está escrito aqui: as condições não foram definidas, e a
nota abaixo do CTA remete à tela do checkout, onde elas aparecem.

Os valores vivem no `CONFIG.ops` como todo o resto. Se um mudar no checkout,
mudam **três** lugares: o `CONFIG`, o texto estático da `<table>` no
[index.html](index.html) (que existe para a página funcionar sem JS) e o
`offers.price` do JSON-LD no `<head>` — onde vai o **total**, nunca o valor
cheio nem o de uma parcela.

---

## O bônus dos 10 primeiros

Bloco `#bonus`, entre os entregáveis e o preço. É a última coisa que a pessoa
lê antes do número, e a única razão da página para agir hoje em vez de semana
que vem: dez vagas de teste da nova plataforma, por ordem de entrada, valendo
para as duas operações somadas.

Aparece em cinco pontos, e os cinco são de propósito: etiqueta na hero (quem
sai na primeira tela precisa ter visto), a seção inteira, uma etiqueta abaixo
da conta, o CTA final e duas perguntas no FAQ.

### As três camadas de movimento

Cada uma faz um trabalho, e é por isso que são três e não uma:

- **a varredura de radar** (`.bonus__radar`) dá "operação em curso" ao fundo;
- **a luz correndo na moldura** diz "isto está aberto agora";
- **os dez pips acendendo em fila** dizem "são dez, e acabam".

A moldura animada usa o mesmo princípio do aro dos medalhões — recorte parado
no pai, rampa cônica girando num filho maior — porque `border-image` não aceita
`clip-path`, e o bloco tem canto chanfrado como todo o resto da página. O
núcleo escuro entra por cima recuado 3px; o que sobra nas beiradas é a luz.

O ciclo dos pips é longo (5s) com a onda ocupando pouco dele: dez luzes
piscando sem folga viram alarme, e alarme numa página de venda lê como pop-up.

### ⚠️ Os pips não são um contador de vagas restantes

Eles mostram o **tamanho do lote** — dez — e não quantas sobraram. Não existe
"faltam 3" nesta página, e não deve passar a existir sem um número que venha de
algum lugar de verdade: este é o bloco onde o comprador mais confia no que lê, e
escassez inventada aqui contamina tudo que a página diz sobre preço logo abaixo.

Pelo mesmo motivo o texto diz "por ordem de entrada · encerra quando as dez
saírem", e não um relógio regressivo: a regra é verdadeira e verificável, o
relógio seria cenário.

### Quando as dez acabarem

O bloco sai em quatro cortes — a `<section id="bonus">`, as duas
`.flag-bonus` (hero e preço), o link `Bônus` da navbar e o
`.flag-bonus` do CTA final — mais as duas perguntas do FAQ. Nenhum outro
componente da página depende dele.

---

## O portal

A primeira tela não é a hero: é o `#portal`, ocupando a viewport inteira, com
os dois brasões numa tempestade de brasas. Escolher um lado acende a página
naquela operação.

Ele vem **primeiro no DOM** porque é a primeira coisa que a pessoa vê — pintado
antes de qualquer seção, ele não espera o site inteiro montar. E é
`position: fixed`, não uma seção no fluxo: o site abaixo já está montado com o
scroll travado, e um portal no fluxo empurraria a hero para 100vh de distância
— a primeira rolagem depois da escolha cairia no vazio.

### Detalhes que não são estilo pessoal

- **Os portões são `<button>`, não `<a>`.** A escolha não navega para outro
  documento, ela acende esta mesma página. Um link com `href="#/pmpe"`
  prometeria página nova e daria o "abrir em nova aba", que abriria o portal
  de novo.
- **O `inert` no `.site` é o que faz o portal ser modal de verdade.** Sem ele
  o portal é modal só para quem enxerga: quem navega por teclado sai do
  segundo portão e cai na navbar de uma página que ainda não escolheu operação
  nenhuma. A dock e o WhatsApp moram **fora** do `.site` (são camadas da
  janela) e por isso levam `display: none` à parte enquanto o portal está de
  pé.
- **O aro do medalhão é dois elementos.** O que gira é a luz no metal, não a
  peça. Girar o próprio `.portao__aro`, que carrega o `clip-path` hexagonal,
  gira o hexágono junto: os vértices saem de alinhamento com os do núcleo e o
  medalhão aparece como duas peças tortas. É um bug que **só se vê em
  movimento** — um print no ângulo zero passa limpo. Então o recorte fica
  parado no pai e a rampa cônica gira num filho maior que ele.
- **A cascata da hero fica pausada, não escondida** (`html.is-portal .anim`).
  Sem isso ela roda inteira atrás do portal e quem escolhe uma operação recebe
  a dobra já montada, sem entrada nenhuma. Pausar em CSS mantém a coreografia
  num lugar só.
- **Os observadores de reveal e de contagem só ligam depois que o portal sai.**
  Um `IntersectionObserver` não sabe que a página está atrás de um modal —
  `opacity: 0` continua "intersecting".
- **Esc não faz nada.** Este modal não tem "cancelar": ele tem duas saídas
  legítimas, e escolher por engano é pior do que continuar no portal.

### A ignição

Entre o clique e a página: o clarão abre **a partir do ponto clicado**, os
estilhaços saem dali, o portão escolhido cresce e o outro cai. Acender no meio
da tela quando o toque foi na coluna da esquerda leria como coincidência, e não
como consequência. Em teclado (sem coordenada de clique) a origem é o centro do
próprio portão.

Os tempos casam entre CSS e JS: a animação `ignicao` dura `.72s`, a saída do
portal `.62s` e o `IGNICAO` do script dispara o fechamento em `460ms`. Mexer
num lado sem mexer no outro deixa a costura à mostra — ou a página aparece
antes do clarão, ou o preto dura demais.

Os **estilhaços** são os únicos que dependem de JS: o script cria os `<i>` com
ângulo, distância e tamanho sorteados; a animação é CSS. Sem JS o portal ainda
acende, só não solta faísca.

### Link direto e botão voltar

| URL | O que acontece |
|---|---|
| `/` | portal |
| `/#/pmpe` · `/?op=pmpe` | entra direto na PMPE, sem portal |
| `/#/pcpe` · `/?op=pcpe` | entra direto na PCPE, sem portal |

É o que permite segmentar tráfego pago sem duplicar a página: o criativo de
PMPE manda para `/#/pmpe` e o visitante nunca vê a escolha.

A classe `is-portal` é escrita por um script **no `<head>`**, antes do CSS
pintar, e não pelo `script.js` no fim do body: entre uma coisa e outra a página
rolaria livre por um quadro e o visitante veria a hero por trás do portal.

O **botão voltar** reabre o portal (`popstate`). Sem isso, quem entra numa
operação e aperta voltar sai do site inteiro em vez de voltar para a escolha.

### Trocar de lado depois

Existem três saídas, e as três são necessárias:

- a pastilha **`Trocar`** na navbar — reabre o portal;
- o **`Na verdade eu sou da PCPE`** no fim do CTA final — quem leu tudo e é da
  outra corporação não pode ter que voltar ao topo para descobrir que ela
  existe;
- os dois atalhos no **rodapé** (`data-ir`), que vão direto para o outro lado
  sem passar pelo portal: quem já está lendo não precisa reescolher, precisa
  ver a outra oferta.

---

## Mobile

**87% deste tráfego é celular**, e as quebras não são "o desktop espremido" —
em cada uma alguma peça muda de forma:

- **≤ 860px** · o portal vira coluna e os portões **deitam**: medalhão à
  esquerda, texto à direita. Empilhados na vertical eles teriam duas telas de
  altura e o segundo sairia da dobra — que é exatamente o que um portal não
  pode fazer. A costura central troca de orientação; a ignição sobrevive
  inteira porque é `transform` e não depende do eixo do layout.
- **≤ 920px** · a lista de entregáveis vira uma coluna e o bloco do professor
  empilha.
- **≤ 720px** · entram a dock fixa e o WhatsApp flutuante; os CTAs viram
  largura cheia.
- **altura ≤ 620px** · o parágrafo do portal some e a manchete encolhe.

Dois ajustes que existem por um motivo específico:

- **O WhatsApp flutuante entra junto com a dock, e não no carregamento.** Na
  primeira dobra do celular ele pousa exatamente em cima do CTA secundário da
  hero, que é largura cheia. Um botão verde tapando metade do "ver tudo que
  inclui" custa mais do que um atendimento ganho três segundos antes.
- **As duas linhas da dock nunca quebram** (`nowrap` + reticências). A dock tem
  altura fixa, e um nome de operação em três linhas empurraria o botão para
  fora dela.

O portal tem `overflow-y: auto`. A intenção é que ele caiba inteiro na tela —
enquanto está de pé, não deve existir página atrás para o visitante espiar. Mas
a intenção não vale um portão decepado: em tela baixa (celular deitado, janela
cortada, fonte aumentada) a rolagem entra e salva o conteúdo. Nas alturas
normais ninguém rola nada.

---

## Armadilhas de CSS que já morderam aqui

Duas classes de bug apareceram durante a construção e vão voltar se alguém
mexer sem saber:

**1. `<span>` com `width`/`height` e sem `display` de bloco.** Caixa inline
ignora `width`, `height`, `aspect-ratio` e margem vertical. O medalhão do
portal simplesmente não apareceu, e o ícone dos extras — cujo SVG pede `100%` —
desenhou do tamanho do card inteiro. Todo `<span>` que recebe tamanho neste CSS
carrega `display: block` (ou `grid`/`flex`) de propósito.

**2. Seletor de descendente onde cabia `>`.** `.item__txt span` e
`.extra span` pegavam também os `<span data-slot="sigla">` que vivem *dentro*
do título e do parágrafo: a sigla virava bloco e "Videoaulas e PDFs da PMPE"
quebrava com o "PMPE" sozinho numa linha. E `.extra span` alcançava o ícone,
pintando-o com a cor da legenda. Hoje são `.item__txt > span` e
`.extra__txt` (classe própria, porque o ícone também é filho direto).

Há um verificador rápido para a primeira classe de bug — ele cruza os `<span>`
do HTML com as regras do CSS e aponta os que recebem tamanho sem virar bloco:

```bash
node -e "
const fs=require('fs');
const css=fs.readFileSync('styles.css','utf8'), html=fs.readFileSync('index.html','utf8');
const cls=new Set();
for(const m of html.matchAll(/<span[^>]*class=\"([^\"]+)\"/g)) m[1].split(/\s+/).forEach(c=>cls.add(c));
for(const c of cls){
  const re=new RegExp('\\\\.'+c.replace(/-/g,'\\\\-')+'\\\\s*\\\\{([^}]*)\\\\}','g'); let m;
  while((m=re.exec(css))){const b=m[1];
    if(/(^|;|\s)(width|height|aspect-ratio)\s*:/.test(b)
      && !/display\s*:\s*(block|grid|flex|inline-flex|inline-grid)/.test(b)
      && !/position\s*:\s*(absolute|fixed)/.test(b)) console.log('INLINE COM TAMANHO:',c);}}
"
```

---

## Arquivos

| Arquivo | O que é |
|---|---|
| [index.html](index.html) | A página inteira: portal + site das duas operações |
| [styles.css](styles.css) | Sistema visual herdado de `../unificados` + o portal, que é novo |
| [script.js](script.js) | `CONFIG.ops`, portal, ignição, atmosfera, header, reveal, GTM |
| [vercel.json](vercel.json) | `cleanUrls` + cache longo em `/public` |

### Assets

Todos vieram de [`../livepmpe/public`](../livepmpe/public), que por sua vez os
herdou de `../unificados`:

| Arquivo | Onde aparece |
|---|---|
| `brasao-pmpe.webp`, `brasao-pcpe.webp` | medalhões do portal, da hero e do CTA final |
| `marca-pmpe.webp`, `marca-pcpe.webp` | marca d água das seções (`--op-marca`) |
| `emblema-leao.webp` | marca do header e do portal, textura das seções alternadas, atrás do brasão na hero |
| `bgatirador.webp` | fundo do portal e da hero |
| `everton-mota.webp` | bloco do professor |
| `favicon.ico`, `favicon-192.png`, `favicon-512.png` | — |

Os dois brasões levam `<link rel="preload">` no `<head>`: eles entram no
portal, que é a primeira tela, e sem o preload só começam a baixar depois do
CSS — os medalhões abrem vazios.

Se algum arquivo deixar de carregar, a página **não** mostra imagem quebrada: o
script esconde a `<img>` e escreve a sigla da corporação no mesmo lugar, dentro
do mesmo medalhão.

**As marcas são `marca-*`, não `brasao-*`.** O brasão oficial é colorido e,
mesmo a 5% de opacidade, jogava manchas de cor na direita da seção — a única
coisa fora da paleta na página inteira. O `marca-*` é o mesmo desenho remapeado
para a rampa de ouro e some no preto como as outras texturas.

> O recuo da marca (`--op-marca-x`) é token, e não número fixo, porque os dois
> desenhos têm densidade diferente: o da PMPE é um brasão fechado que some no
> preto; o da PCPE é um escudo aberto com "POLÍCIA CIVIL" em caixa alta, e no
> mesmo recuo ele deixa letras legíveis atrás do texto da seção — vira ruído,
> não textura.

---

## Rastreamento

O container do GTM é o mesmo das demais landings do CPPEM
(`sgtm.cppem.com.br`), e precisa continuar sendo o **primeiro script do
`<head>`** — é ele que carrega a PixelX.

Eventos empurrados para o `dataLayer`:

| Evento | Quando |
|---|---|
| `escolha_operacao` | o visitante escolhe um lado no portal |
| `troca_operacao` | troca de operação pelos atalhos do rodapé |
| `portal_aberto` | o portal é reaberto pelo "Trocar" |
| `clique_checkout` | qualquer CTA de checkout (7 na página) |

Todos carregam `pagina` e, quando faz sentido, `produto` com o nome completo da
operação.

## Rede de segurança do checkout

Se uma URL de `CONFIG.ops.*.checkout` for esvaziada, aquele botão **não** fica
morto: volta a apontar para o WhatsApp já dizendo qual operação a pessoa quis.
É para cobrir o intervalo entre despublicar um checkout e publicar o próximo
sem queimar tráfego pago num CTA que não leva a lugar nenhum.

## Acessibilidade

- O portal é `role="dialog" aria-modal="true"`, com o `.site` em `inert` e o
  foco indo para o primeiro portão.
- Os vistos da lista de entregáveis são **SVG desenhados**, e não o emoji ✅ do
  briefing: o emoji entra colorido, quebra a paleta em nove pontos da mesma
  tela e muda de desenho entre Android, iOS e Windows.
- O comparativo é `<table>` de verdade, com `<th scope>` nos dois eixos: um
  leitor de tela anuncia a linha inteira em vez de despejar fragmentos.
- O medalhão do CTA final é decorativo (`alt=""`) porque o brasão já foi
  anunciado na hero — devolver texto a ele faria o leitor repetir a mesma
  informação duas vezes na mesma página.
- `prefers-reduced-motion` desliga brasas, faíscas, aro girando e varreduras, e
  a escolha do portal passa a ser instantânea. **O portal continua
  funcionando** — ele é navegação, não enfeite.
