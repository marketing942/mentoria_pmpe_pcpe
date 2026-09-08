# Operação Praça PMPE + Operação Distintivo PCPE — venda direta ao checkout

Landing de **venda direta** das duas mentorias completas do Prof. Everton
Mota. Uma página só, com um **portal de entrada** onde o visitante escolhe a
corporação antes de ver qualquer oferta.

| | Checkout |
|---|---|
| **Operação Praça PMPE** — Polícia Militar de Pernambuco | `.../pay/operacao-praca-pmpe` |
| **Operação Distintivo PCPE** — Polícia Civil de Pernambuco | `.../pay/operacao-distintivo-pcpe` |

No ar em **`mentoria.cppem.com.br`** — o mesmo endereço no `canonical` e no
`og:url`.

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

### 2. Número de vagas

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

O número grande da página é a **parcela**: `12x R$ 61`. O valor cheio entra
riscado acima dela em corpo pequeno, e o à vista logo abaixo. Na ordem inversa
— total na frente, parcela na letra miúda — o primeiro número que a pessoa lê é
o maior da página, e ela decide antes de descobrir que dá para dividir.

A conta detalhada continua existindo, dentro de um `<details>` fechado por
padrão. Ela precisa existir: é a mesma tela que a pessoa vai ver no checkout, e
bater linha por linha é o que sustenta a confiança no número grande. Mas aberta
ela põe quatro valores entre o preço e o botão, e o valor cheio volta a ser a
primeira coisa lida.

| Linha | Valor |
|---|---|
| Produto `−56%` | ~~R$ 1.654,00~~ |
| Com o desconto | R$ 732,36 · **12x R$ 61,03 sem juros** |
| Desconto à vista | − R$ 95,36 |
| **Total à vista** | **R$ 637,00** |

### ⚠️ O que foi deduzido, e não informado

O checkout entregou quatro valores e a parcela (`12x R$ 61`). O rótulo
**"Desconto à vista"** na terceira linha é dedução, não informação recebida — e
é a única aritmética que fecha:

```
12 × 61,03 = 732,36   ← exatamente a linha "com o desconto"
732,36 − 95,36 = 637,00
```

Ou seja: quem parcela paga sobre R$ 732,36; quem paga à vista leva os R$ 95,36
a menos. É também como o [`../unificados`](../unificados) apresenta o mesmo
preço ("12x R$ 61 sem juros · R$ 637 à vista"), o que corrobora.

**Se o desconto de R$ 95,36 valer também no parcelado**, o rótulo está errado e
a linha vira "Desconto adicional" de novo — e a parcela passa a ser
`12x R$ 53,08`. Vale conferir na tela do checkout antes de publicar.

Pela mesma razão a página **não anuncia percentual próprio**: 1.654 → 637 dá
61,5% de abatimento, mas o checkout estampa `−56%` na linha do produto, e a
página que diz "61% off" ao lado de um checkout que diz "−56%" contradiz a si
mesma. A economia aparece em reais — **R$ 1.017,00** — que é o número que fecha
nas duas contas.

No JSON-LD vai o **total à vista** (`637.00`), nunca o valor cheio nem o da
parcela: o Google compara o `price` com o que aparece na tela de pagamento.

Os valores vivem no `CONFIG.ops` como todo o resto. Se um mudar no checkout,
mudam **três** lugares: o `CONFIG`, o texto estático do bloco no
[index.html](index.html) (que existe para a página funcionar sem JS) e o
`offers.price` do JSON-LD.

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

### ⚠️ A regra, e por que ela está escrita na página

Dentro do bloco existe um quadro sóbrio — sem ouro, sem chanfro, sem brilho —
chamado **"Como a regra funciona"**. Ele é o contrapeso: tudo em volta empurra,
e aquele pedaço segura. Diz três coisas, e as três são deliberadas:

1. valem as **10 primeiras compras confirmadas**, somando as duas operações;
2. **esta página não tem contador** e não sabe quantas já saíram — quem confirma
   se você entrou no lote é a equipe, no grupo, depois da compra;
3. se as dez já tiverem saído, **a sua operação continua exatamente a mesma**:
   a nova plataforma chega na abertura geral, com todo mundo. O acesso
   antecipado é extra por ordem de chegada, **não parte do que se está
   comprando**.

O item 3 é o que evita o "no site tava dizendo que eu ia ter acesso". Ele
desacopla a compra do bônus: ninguém compra *por causa* de uma promessa que a
empresa não controla, porque a página diz na cara que a compra vale igual sem
ela. O mesmo texto está repetido no FAQ, onde a pergunta é feita.

> ⚠️ **Não troque esse quadro por "últimas vagas"**, nem por qualquer coisa que
> sugira que estar lendo a página garante o bônus. Ele existe exatamente para
> negar isso.

As etiquetas espalhadas pela página seguem a mesma regra: elas dizem "as 10
primeiras entradas testam a nova plataforma antes", e não "garanta o seu
acesso" — a primeira descreve um fato, a segunda promete um resultado.

### Os pips não são um contador de vagas restantes

Eles mostram o **tamanho do lote** — dez — e não quantas sobraram. Não existe
"faltam 3" nesta página, e não deve passar a existir sem um número que venha de
algum lugar de verdade.

Pelo mesmo motivo o texto diz "por ordem de entrada · encerra quando as dez
saírem", e não um relógio regressivo: a regra é verdadeira e verificável, o
relógio seria cenário.

### Quando as dez acabarem

O bloco sai em quatro cortes — a `<section id="bonus">`, as duas
`.flag-bonus` (hero e preço), o link `Bônus` da navbar e o `.flag-bonus` do CTA
final — mais as duas perguntas do FAQ. Nenhum outro componente da página
depende dele.

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

### A colisão de entrada

No carregamento os dois brasões atravessam a tela, cada um do seu lado, e
**batem no meio**. Da batida saem o clarão, duas ondas de choque hexagonais, um
risco de luz que rasga a tela na horizontal, quarenta estilhaços e um tranco na
página inteira — e é do ponto do impacto que os dois portões nascem, voltando
cada um para o seu lado.

A leitura é literal: as duas corporações se encontram, e a escolha é o que
sobra do encontro. Por isso os portões entram por `translateX` a partir do
centro, e não subindo de baixo: subir seria uma entrada; voltar do impacto é
uma consequência.

A ordem da cena — e ela é a razão de tudo abaixo:
**leão → manchete → os dois brasões vêm → BATIDA → os portões nascem → "ou" → rodapé.**

A marcação de tempo inteira sai de **três variáveis na `.portal`**
([styles.css](styles.css)): `--vem` (quando os brasões começam a vir), `--voo`
(quanto levam para atravessar) e `--impacto` (`--vem + --voo`, o instante da
batida). Elas moram no ancestral comum de tudo que participa da cena porque são
ramos diferentes da árvore: com uma cópia em cada um, bastava ajustar um lado
para a cena sair de sincronia.

> `--vem + --voo` **tem** que fechar em `--impacto`. Se não fechar, ou o clarão
> acende antes dos brasões chegarem, ou eles atravessam um o outro e batem no
> vazio.

### O ponto de encontro é diferente para cada lado

A caixa de cada brasão é quadrada e o desenho dentro dela é `contain`, então
cada um ocupa só uma **fatia** da própria caixa — e uma fatia diferente do
outro: `357x419` na PMPE, `326x454` na PCPE. Os dois arquivos são recortados
justos (nenhuma margem transparente sobrando), então a fatia é pura proporção.

Parar os dois no mesmo deslocamento encosta um no centro e deixa o outro a
15px dele. Daí o `--enc` por lado, calculado a partir da largura da caixa
(`--cx`):

| | proporção | metade renderizada | `--enc` |
|---|---|---|---|
| PMPE | 357/419 = .852 | .426 × `--cx` | `.435 × --cx` |
| PCPE | 326/454 = .718 | .359 × `--cx` | `.370 × --cx` |

A folga de ~1% de cada lado é o vão onde o clarão aparece no instante do
contato. Como tudo sai de `--cx`, a distância acompanha o tamanho em qualquer
largura de tela — com número fixo o par encosta certo numa e se atravessa em
todas as outras.

> O **ponto de contato** fica no centro exato da tela, e é dele que saem o
> clarão, o risco e a onda. A massa dos dois desenhos junta não fica centrada,
> porque a PMPE é visivelmente mais larga que a PCPE — mas isso é verdade
> também dentro dos cartões, onde os dois usam o mesmo `contain` numa caixa
> quadrada. Centrar a massa jogaria o contato para fora do eixo de onde a luz
> nasce, que é bem pior.

### A passagem de bastão

O brasão não sai do impacto para um lugar qualquer: ele vai para o **ponto
exato onde o medalhão do portão dele vai estar**, encolhendo até o **tamanho
exato daquele medalhão**, e apaga ao chegar. O portão nasce por baixo, no mesmo
lugar, e o que se vê é um desenho só se assentando no cartão.

Três medidas saem do `mirarPortoes()` no [script.js](script.js) e entram como
variáveis nos keyframes de recuo: `--dx`, `--dy` e `--esc`.

A medição usa `offsetLeft`/`offsetTop`, e **não** `getBoundingClientRect()`: no
instante em que medimos, o portão está parado no primeiro quadro da entrada
dele (fill `both`), ou seja, deslocado e reduzido. O rect devolveria essa
posição temporária; os offsets ignoram `transform` e dão a caixa de layout, que
é onde o cartão vai realmente ficar.

Ela roda três vezes, e as três valem: **agora** (o layout já existe), quando as
**fontes carregarem** (elas mudam a altura do texto do cartão, e o cartão
inteiro sobe ou desce junto) e no **próprio instante da batida**, que é a última
chance antes de o recuo usar os valores. Mais um `resize`.

> Antes disso o brasão saía para `-24vw`, que não é lugar nenhum: no desktop
> apagava a meio caminho do cartão e no celular apagava fora dele. Duas logos
> sumindo longe de onde as logos dos cartões aparecem — e, por um instante,
> quatro brasões na tela.

O que sustenta a cena são três ajustes que andam juntos, e mexer num sem os
outros traz o problema de volta:

1. o recuo apaga em **62%** do percurso, não em 100% — o cartão já está
   desenhando o medalhão no último terço, e dois brasões nítidos no mesmo ponto
   leem como erro de renderização;
2. o portão entra em **`--impacto + .26s`**, não `+ .1s` — é o tempo de a
   travessia acontecer;
3. o portão **se assenta** (sobe 22px, cresce 3,5%) em vez de vir de lado. Quem
   faz o percurso lateral agora é o brasão. Dois movimentos laterais ao mesmo
   tempo, um por cima do outro, é o que fazia a cena parecer atropelada.

### O anel de choque tem prazo curto

Ampliado sete vezes, um hexágono só mostra os dois lados retos dele, e o que
sobra na tela são **duas barras verticais altas**. Com a onda durando quase um
segundo, essas barras ainda cruzavam os cartões quando os cartões já estavam
assentando — duas réguas de luz atravessando a peça que a pessoa deveria estar
lendo. Hoje a opacidade cai bem antes do fim da escala: o anel cresce até o
dobro do que se enxerga dele, e é isso que dá a sensação de que a onda continuou
passando depois de sumir.

### Como conferir que a cena está inteira

Há dois testes no diretório de trabalho desta sessão que valem ser refeitos a
cada mexida na coreografia: um percorre a cena **quadro a quadro** pausando o
relógio das animações e mede, em cada instante, quantos brasões estão visíveis,
se os dois voadores estão empilhados e a que distância cada um está do medalhão
do cartão dele; o outro amostra a mesma coisa em **tempo real**, sem pausar
nada, e reporta o pior caso. Os números que a cena entrega hoje, em 1440, 1024,
390 e 360 de largura:

| | |
|---|---|
| tempo com as duas logos empilhadas | **0 ms** |
| tempo com quatro brasões na tela | **0–34 ms**, e só com os voadores abaixo de 11% de opacidade |
| distância do voador ao medalhão no fim | **0–1 px** |
| escala no fim | idêntica à do medalhão do cartão |

Os 30ms com quatro brasões são o cruzamento da passagem de bastão — dois ou
três quadros em que o que sai está quase transparente. Zerar isso exigiria um
corte seco, que lê pior do que a transição.

Quatro coisas que quebram se mexidas sem cuidado:

- **Cada brasão tem duas animações, não uma, e os fills são diferentes.** O voo
  tem easing de aceleração (entra devagar, chega rápido — é o que faz ler como
  massa ganhando velocidade) e o recuo tem easing de saída; num keyframe único
  o easing seria o mesmo nos dois trechos e a batida perderia o que a torna uma
  batida. O **voo leva `both`**: sem o `backwards` dele, os dois brasões ficam
  parados e **empilhados no meio da tela** durante todo o `--vem`, porque a
  posição base deles é o centro e o keyframe ainda não vale — é um segundo de
  duas logos uma em cima da outra antes de qualquer coisa acontecer. O **recuo
  leva só `forwards`**: com `backwards` o navegador aplicaria o estado inicial
  dele já no primeiro quadro da página e o voo nunca aconteceria. (Os
  `.choque__brasao` também nascem com `opacity: 0` na regra base, como segunda
  trava para o mesmo empilhamento.)
- **Os estilhaços escutam, não calculam.** O `animationend` do voo do brasão da
  esquerda dispara exatamente quando ele chega ao centro. A conta ingênua —
  ler o `--impacto` e comparar com `performance.now()` — erra e erra feio: o
  relógio das animações de CSS começa quando o elemento é renderizado, e o do
  `performance.now()` na navegação. Numa página que leva 400 ms para pintar os
  dois ficam 400 ms fora de fase e as faíscas saem antes dos brasões se
  encostarem.
- **O tranco usa `backwards`, não `both`.** Com `both`, o `transform: none` do
  último quadro ficaria fixado para sempre e o `.is-gone { transform:
  scale(1.14) }` da saída do portal nunca sairia do lugar.
- **Os textos do portal usam `entra-portal`, não `rise`.** O `rise` só declara
  o `to`, e o preenchimento `backwards` de um keyframe sem `from` herda o
  estado atual do elemento — opacity 1. Com atraso curto ninguém via; com o
  atraso ancorado no impacto, o rodapé e o "ou" apareciam **antes** da colisão.

Os brasões da cena são decorativos (`alt=""`): os mesmos dois desenhos são
anunciados logo abaixo, dentro dos portões, com nome de corporação e tudo.
Repetir aqui faria um leitor de tela ouvir quatro brasões numa tela que tem
dois.

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

## Decisões de conteúdo

Coisas que a página deliberadamente **não** tem, e o porquê:

**O portal não tem parágrafo, e a marca não tem wordmark.** O leão é a marca —
grande, sozinho, sem "CPPEM / Concursos Públicos" ao lado. Numa tela cujo
assunto é escolher entre duas corporações, um terceiro nome disputava a leitura
com os dois que importam. O parágrafo explicativo saiu pela mesma razão: quem
chega aqui tem uma decisão para tomar, não um texto para ler.

**O subtítulo da hero é uma linha.** Era um parágrafo de cinco linhas que
listava tudo que a operação entrega — e empurrava o botão de checkout para fora
da primeira dobra do celular. Tudo que ele dizia está três blocos abaixo, em "O
que você recebe". Aqui ele só atrasava o CTA.

**Os nove entregáveis ficam em três colunas.** Em duas, o nono sobrava sozinho
na quinta fileira, e um órfão numa lista de benefícios lê como item esquecido,
não como item extra. Três colunas fecham em três fileiras exatas. Na faixa de
tablet (≤1080px) são duas colunas com o último item ocupando a largura inteira
— a sobra vira fecho da lista em vez de buraco no canto.

**Não existe seção "Como a operação funciona".** As quatro etapas que ela
descrevia repetiam, em outra ordem, o que a lista de entregáveis já diz — e
ficavam entre o bônus e o preço, que é o trecho onde a página menos pode
divagar.

**O bloco do professor não fala mal da plataforma.** Ele dizia "você vai ser
cobrado por gente, **não** por plataforma", e a plataforma é parte do que se
está vendendo três blocos acima. Agora o texto reconhece o que ela faz —
cronograma, gráficos, IA que responde às onze da noite — e posiciona a mentoria
ao vivo como o que ela não faz: olhar para o seu mês e dizer o que muda no
próximo.


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
  largura cheia; e o **comparativo deixa de ser tabela e vira pilha de
  cartões** — cada linha com a situação no topo e as duas respostas
  empilhadas, cada uma rotulada pelo `data-col` da célula. Três colunas em
  360px só cabem com rolagem lateral, e rolagem lateral numa comparação é
  onde a comparação morre: a pessoa nunca vê os dois lados ao mesmo tempo.
  Empilhada, a comparação continua acontecendo — só que na vertical.
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

## O comparativo é o único bloco arredondado

E é escolha, não descuido. O resto do sistema é chanfrado — canto cortado em
45°, linguagem de operação — e o chanfro serve bem a peças que precisam de
tensão: botão, medalhão, portão, o bloco do bônus.

Uma tabela de comparação precisa do contrário. Ela é a peça que a pessoa lê
devagar, linha por linha, pesando dois lados; canto macio e linha larga é o que
a deixa ser **lida** em vez de admirada.

Duas decisões dentro dela:

- **A coluna "Na operação" ganha fundo próprio de cima a baixo**, e não um fio
  de ouro de cada lado como na versão anterior: num contêiner arredondado com
  `overflow: hidden`, dois fios verticais batem de frente com o raio nos quatro
  cantos.
- **Zebra em vez de grade de bordas.** Numa tabela de sete linhas e três
  colunas, a zebra é o que segura o olho na linha certa sem encher a peça de
  fios.

O visto e o xis vivem em discos, e são a leitura de relance da tabela inteira:
quem não lê uma linha sequer entende a comparação só pela coluna de discos.
Eles usam `float`, e não flex, para que o texto de duas linhas encoste embaixo
do disco em vez de ficar preso numa coluna estreita ao lado dele.

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

### O brasão de fundo, no lado da operação

A marca da corporação entra pelo **mesmo lado do portão dela no portal**: a
PMPE pela esquerda, a PCPE pela direita. Não é simetria gratuita — é a única
continuidade que sobra entre a tela de escolha e a página. Quem tocou no portão
da esquerda continua com a PMPE à esquerda.

E entra **pela metade**, cortada pela borda da tela. Um brasão inteiro
centralizado num lado vira ilustração de fundo e disputa com o texto; cortado ao
meio, ele lê como marca em relevo no papel. O leão vai para o lado oposto, nas
seções alternadas, para os dois nunca se empilharem e o olho ganhar um ritmo
lateral ao rolar.

Quatro tokens governam isso, e todos trocam com a operação: `--op-marca`,
`--op-marca-x` (de que lado, e quanto fica para fora), `--op-marca-h` (o
tamanho) e `--op-leao-x` (o lado oposto). Além das seções, a marca aparece no
bloco do bônus (`.bonus__marca`) e no CTA final (`.final__marca`) — os dois são
altos e não têm seção irmã por perto, e sem ela o fundo deles fica liso
comparado ao resto.

**As marcas são `marca-*`, não `brasao-*`.** O brasão oficial é colorido e,
mesmo a 5% de opacidade, jogava manchas de cor na direita da seção — a única
coisa fora da paleta na página inteira. O `marca-*` é o mesmo desenho remapeado
para a rampa de ouro e some no preto como as outras texturas.

> O recuo (`--op-marca-x`) é diferente para cada uma porque os dois desenhos
> têm densidade diferente: o da PMPE é um brasão fechado que some no preto; o
> da PCPE é um escudo aberto com "POLÍCIA CIVIL" em caixa alta, e no mesmo
> recuo ele deixaria letras legíveis atrás do texto da seção — vira ruído, não
> textura.

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
