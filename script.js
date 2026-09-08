/* =========================================================
   CPPEM · OPERAÇÃO PRAÇA PMPE + OPERAÇÃO DISTINTIVO PCPE
   ---------------------------------------------------------
   Uma página, duas operações. O script faz quatro coisas:

     1. PORTAL      a escolha de lado, a ignição e a volta
     2. APLICAR     escrever a operação escolhida nos slots
     3. ATMOSFERA   brasas, faíscas, brilho no cursor
     4. PÁGINA      header, progresso, reveal, contagem, GTM

   ⚠️ TUDO que muda entre as duas operações mora no CONFIG.ops
   abaixo, e em lugar nenhum mais. Se você precisar escrever
   "PMPE" ou "PCPE" em qualquer outro ponto deste arquivo, é
   sinal de que falta um slot.
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    pagina: "operacao-pmpe-pcpe",
    whats:  "558173105354",

    /* ─── O PREÇO ────────────────────────────────────────────
       Hoje as duas operações custam o mesmo, mas o valor mora DENTRO de cada
       uma: no dia em que uma delas mudar de preço, é só editar o objeto dela
       — nenhuma outra linha desta página precisa saber que isso aconteceu.

       Estes números espelham o checkout linha por linha. Se um mudar lá,
       mudam quatro lugares aqui: este CONFIG, a <table class="conta"> no
       index.html, o "offers.price" do JSON-LD e o texto do CTA final. */

    ops: {
      pmpe: {
        sigla:        "PMPE",
        nome:         "Praça PMPE",
        nomeCompleto: "Operação Praça PMPE",
        corp:         "Polícia Militar de Pernambuco",
        vagas:        "1.320",
        tag:          "1.320 vagas autorizadas · edital previsto para 2026",
        dockSub:      "12x R$ 61 sem juros",
        brasao:       "public/brasao-pmpe.webp",
        brasaoAlt:    "Brasão da Polícia Militar de Pernambuco",
        precoOff:     "−63%",
        precoDe:      "R$ 1.997,00",
        precoCom:     "R$ 732,36",
        precoAbate:   "− R$ 95,36",
        preco:        "R$ 637,00",
        parcelas:     "12x",
        precoParcela: "R$ 61",
        parcelamento: "(12x R$ 61,03 sem juros)",
        economia:     "R$ 1.360,00",
        checkout:     "https://checkout.cppem.com.br/pay/operacao-praca-pmpe",
        titulo:       "Operação Praça PMPE — mentoria completa para a Polícia Militar de Pernambuco | CPPEM"
      },
      pcpe: {
        sigla:        "PCPE",
        nome:         "Distintivo PCPE",
        nomeCompleto: "Operação Distintivo PCPE",
        corp:         "Polícia Civil de Pernambuco",
        vagas:        "1.315",
        tag:          "1.315 vagas autorizadas · edital previsto para 2026",
        dockSub:      "12x R$ 61 sem juros",
        brasao:       "public/brasao-pcpe.webp",
        brasaoAlt:    "Brasão da Polícia Civil de Pernambuco",
        precoOff:     "−63%",
        precoDe:      "R$ 1.997,00",
        precoCom:     "R$ 732,36",
        precoAbate:   "− R$ 95,36",
        preco:        "R$ 637,00",
        parcelas:     "12x",
        precoParcela: "R$ 61",
        parcelamento: "(12x R$ 61,03 sem juros)",
        economia:     "R$ 1.360,00",
        checkout:     "https://checkout.cppem.com.br/pay/operacao-distintivo-pcpe",
        titulo:       "Operação Distintivo PCPE — mentoria completa para a Polícia Civil de Pernambuco | CPPEM"
      }
    }
  };

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var raiz    = document.documentElement;
  var portal  = document.getElementById("portal");
  var site    = document.getElementById("site");

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }
  function push(dados) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(dados);
  }

  /* =========================================================
     1 · APLICAR A OPERAÇÃO

     Escreve a operação nos slots, no atributo data-op do <html> (é dele que
     saem as quatro variáveis de cor e as marcas de seção) e nos botões de
     checkout. Nada além disto muda entre as duas versões da página.
     ========================================================= */
  var atual = null;

  function aplicar(chave) {
    var op = CONFIG.ops[chave];
    if (!op || chave === atual) { if (op) atual = chave; return; }
    atual = chave;

    raiz.setAttribute("data-op", chave);

    var outra = chave === "pmpe" ? CONFIG.ops.pcpe : CONFIG.ops.pmpe;
    var valores = {
      "sigla":         op.sigla,
      "nome":          op.nome,
      "nome-completo": op.nomeCompleto,
      "corp":          op.corp,
      "vagas":         op.vagas,
      "tag":           op.tag,
      "dock-sub":      op.dockSub,
      "hero-sub":      "A preparação completa para a " + op.corp + " — do primeiro dia à posse.",
      "preco":         op.preco,
      "preco-de":      op.precoDe,
      "preco-com":     op.precoCom,
      "preco-abate":   op.precoAbate,
      "preco-off":     op.precoOff,
      "economia":      op.economia,
      "parcelas":      op.parcelas,
      "preco-parcela": op.precoParcela,
      "parcelamento":  op.parcelamento,
      "cta-preco":     "Garantir minha vaga por " + op.parcelas + " " + op.precoParcela,
      "outra-sigla":   outra.sigla
    };

    Object.keys(valores).forEach(function (slot) {
      $$('[data-slot="' + slot + '"]').forEach(function (el) {
        el.textContent = valores[slot];
      });
    });

    /* O brasão é <img>: troca de src e de alt. O alt só é reescrito onde já
       existia um — o medalhão do CTA final é decorativo (alt="") porque a
       mesma informação já foi anunciada na hero, e devolver texto a ele faria
       o leitor de tela repetir o brasão duas vezes na mesma página. */
    $$('img[data-slot="brasao"]').forEach(function (img) {
      img.src = op.brasao;
      if (img.getAttribute("alt")) img.alt = op.brasaoAlt;
      img.classList.remove("is-fallback");
    });

    /* Rede de segurança: se o checkout for esvaziado, o botão NÃO fica morto —
       vira atendimento no WhatsApp já dizendo qual operação a pessoa quis. É
       para cobrir o intervalo entre despublicar um checkout e publicar o
       próximo sem queimar tráfego pago num CTA que não leva a lugar nenhum. */
    $$("[data-checkout]").forEach(function (btn) {
      if (op.checkout) {
        btn.href = op.checkout;
        btn.removeAttribute("target");
        btn.removeAttribute("rel");
      } else {
        btn.href = "https://wa.me/" + CONFIG.whats + "?text=" + encodeURIComponent(
          "Olá! Tenho interesse na " + op.nomeCompleto + ". Como faço para garantir minha vaga?");
        btn.target = "_blank";
        btn.rel = "noopener";
      }
    });

    document.title = op.titulo;
  }

  /* =========================================================
     2 · O PORTAL

     Abrir e fechar mexem em três coisas ao mesmo tempo: a classe is-portal no
     <html> (que trava o scroll e esconde o site), o inert no .site (que tira
     a página de trás do alcance do Tab e dos leitores de tela) e o histórico.

     O inert é o detalhe que costuma faltar: sem ele o portal é modal só para
     quem enxerga — quem navega por teclado sai do segundo portão e cai direto
     na navbar de uma página que ainda não escolheu operação nenhuma.
     ========================================================= */
  var portalAberto = raiz.classList.contains("is-portal");

  function travarSite(travado) {
    if (!site) return;
    if (travado) {
      site.setAttribute("inert", "");
      site.setAttribute("aria-hidden", "true");
    } else {
      site.removeAttribute("inert");
      site.removeAttribute("aria-hidden");
    }
  }

  function abrirPortal(comHistorico) {
    if (!portal || portalAberto) return;
    portalAberto = true;
    portal.classList.remove("is-gone", "is-igniting");
    $$(".portao", portal).forEach(function (p) { p.classList.remove("is-chosen"); });
    raiz.classList.add("is-portal");
    travarSite(true);
    window.scrollTo(0, 0);
    if (comHistorico && location.hash) history.pushState(null, "", location.pathname + location.search);
    var primeiro = $(".portao", portal);
    if (primeiro) primeiro.focus();
    push({ event: "portal_aberto", pagina: CONFIG.pagina });
  }

  function fecharPortal() {
    if (!portal) return;
    portalAberto = false;
    portal.classList.add("is-gone");
    raiz.classList.remove("is-portal");
    travarSite(false);
    window.scrollTo(0, 0);
    /* a cascata da hero estava pausada pelo CSS enquanto o portal estava de
       pé; é agora que ela roda, e é agora que os observadores fazem sentido */
    ligarObservadores();
  }

  /* ─── a ignição ─────────────────────────────────────────
     Entre o clique e a página: o clarão abre a partir do ponto clicado, os
     estilhaços saem dali, o portão escolhido cresce e o outro cai.

     O clarão nasce onde o dedo tocou, e não no meio da tela, porque acender
     no centro quando o toque foi na coluna da esquerda lê como coincidência
     em vez de consequência. Em teclado (sem coordenada de clique) a origem é
     o centro do próprio portão.

     Os tempos abaixo casam com o CSS: a animação .ignicao dura .72s e a saída
     do portal, .62s. Mexer num lado sem mexer no outro deixa a costura à
     mostra — ou a página aparece antes do clarão, ou o preto dura demais. */
  var IGNICAO = reduced ? 0 : 460;

  function escolher(botao, evento) {
    var chave = botao.getAttribute("data-op");
    if (!CONFIG.ops[chave]) return;

    aplicar(chave);
    push({ event: "escolha_operacao", pagina: CONFIG.pagina, produto: CONFIG.ops[chave].nomeCompleto });
    history.pushState(null, "", "#/" + chave);

    if (reduced) { fecharPortal(); return; }

    var caixa = botao.getBoundingClientRect();
    var px = evento && evento.clientX ? evento.clientX : caixa.left + caixa.width / 2;
    var py = evento && evento.clientY ? evento.clientY : caixa.top + caixa.height / 2;

    portal.style.setProperty("--fx", (px / window.innerWidth) * 100 + "%");
    portal.style.setProperty("--fy", (py / window.innerHeight) * 100 + "%");
    portal.style.setProperty("--halo", getComputedStyle(botao).getPropertyValue("--halo"));

    botao.classList.add("is-chosen");
    portal.classList.add("is-igniting");
    estilhacar(document.getElementById("portalCacos"), px, py, 26, 300);

    setTimeout(fecharPortal, IGNICAO);
  }

  /* Os estilhaços são os únicos que dependem de JS: o script cria os <i> com
     ângulo, distância e tamanho sorteados e a animação é CSS. Sem JS o portal
     ainda acende — só não solta faísca.

     Servem às DUAS cenas: a colisão da entrada e a ignição do clique. Muda o
     contêiner, a origem e a quantidade; o resto é o mesmo desenho. */
  var TONS_CACO = ["#FFE7B0", "#C9AE7A", "#C4703F"];

  function estilhacar(alvo, px, py, quantos, forca) {
    if (!alvo || reduced) return;
    alvo.textContent = "";

    for (var i = 0; i < quantos; i++) {
      var caco = document.createElement("i");
      var ang  = Math.random() * Math.PI * 2;
      var dist = forca * (.42 + Math.random());
      caco.className = "caco";
      caco.style.setProperty("--ox", px + "px");
      caco.style.setProperty("--oy", py + "px");
      caco.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      caco.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      caco.style.setProperty("--s", (2 + Math.random() * 4).toFixed(1) + "px");
      caco.style.setProperty("--cor", TONS_CACO[Math.floor(Math.random() * TONS_CACO.length)]);
      caco.style.setProperty("--dur", (.5 + Math.random() * .6).toFixed(2) + "s");
      alvo.appendChild(caco);
    }
    setTimeout(function () { alvo.textContent = ""; }, 1400);
  }

  /* ─── os estilhaços da COLISÃO de entrada ─────────────────
     O instante NÃO é calculado: ele é escutado. O `animationend` do voo do
     brasão da esquerda dispara exatamente quando ele chega ao centro, que é
     por definição o instante da batida.

     A conta ingênua — ler o --impacto e comparar com performance.now() —
     erra, e erra feio: o relógio das animações de CSS começa quando o
     elemento é renderizado, e o performance.now() começa na navegação. Numa
     página que leva 400ms para pintar, os dois ficam 400ms fora de fase e as
     faíscas saem antes dos brasões se encostarem. Escutar o próprio evento
     não tem como sair de sincronia com a cena, porque É a cena.
     ========================================================= */
  /* ─── a passagem de bastão ────────────────────────────────
     Cada brasão que voa precisa saber para ONDE ir depois da batida: o ponto
     exato do medalhão do portão dele, e o tamanho exato daquele medalhão.
     Sem isso ele apaga a meio caminho, fora do lugar onde a logo do cartão
     aparece — e por um instante ficam quatro brasões na tela.

     A medição usa `offsetLeft/offsetTop`, e NÃO `getBoundingClientRect()`:
     no instante em que medimos, o portão está parado no primeiro quadro da
     entrada dele (`both` de fill), ou seja, deslocado e reduzido. O rect
     devolveria essa posição temporária; os offsets ignoram transform e dão a
     caixa de layout, que é onde o cartão vai realmente ficar. */
  function mirarPortoes() {
    if (reduced) return;
    [["a", "pmpe"], ["b", "pcpe"]].forEach(function (par) {
      var voador = $(".choque__brasao--" + par[0]);
      var alvo   = $('.portao[data-op="' + par[1] + '"] .portao__core img');
      if (!voador || !alvo || !alvo.offsetWidth) return;

      var x = 0, y = 0, n = alvo;
      while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }

      voador.style.setProperty("--dx", (x + alvo.offsetWidth  / 2 - window.innerWidth  / 2).toFixed(1) + "px");
      voador.style.setProperty("--dy", (y + alvo.offsetHeight / 2 - window.innerHeight / 2).toFixed(1) + "px");
      voador.style.setProperty("--esc", (alvo.offsetWidth / voador.offsetWidth).toFixed(3));
    });
  }

  (function colisao() {
    var alvo   = document.getElementById("choqueCacos");
    var brasao = $(".choque__brasao--a");
    if (!alvo || !brasao || reduced || !portalAberto) return;

    /* Três medições, e as três valem: agora (o layout já existe), quando as
       fontes carregarem (elas mudam a altura do texto do cartão, e o cartão
       inteiro sobe ou desce junto) e no próprio instante da batida, que é a
       última chance antes de o recuo usar os valores. */
    mirarPortoes();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(mirarPortoes);
    window.addEventListener("resize", mirarPortoes, { passive: true });

    brasao.addEventListener("animationend", function (e) {
      if (e.animationName !== "voa-esq") return;   /* ignora o recuo */
      mirarPortoes();
      estilhacar(alvo, window.innerWidth / 2, window.innerHeight / 2, 40, 420);
    });
  })();

  $$(".portao").forEach(function (botao) {
    botao.addEventListener("click", function (e) { escolher(botao, e); });
    /* o clarão que segue o cursor dentro do portão */
    botao.addEventListener("mousemove", function (e) {
      var r = botao.getBoundingClientRect();
      botao.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      botao.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  /* "Trocar" volta ao portal; os atalhos do rodapé vão direto para o outro
     lado sem passar por ele — quem já está lendo a página não precisa
     reescolher, precisa é ver a outra oferta. */
  $$("[data-trocar]").forEach(function (b) {
    b.addEventListener("click", function () { abrirPortal(true); });
  });
  $$("[data-ir]").forEach(function (b) {
    b.addEventListener("click", function () {
      var chave = b.getAttribute("data-ir");
      if (!CONFIG.ops[chave]) return;
      aplicar(chave);
      history.pushState(null, "", "#/" + chave);
      push({ event: "troca_operacao", pagina: CONFIG.pagina, produto: CONFIG.ops[chave].nomeCompleto });
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  });

  /* Esc fecha o portal escolhendo a PMPE? Não: escolher por engano é pior do
     que continuar no portal. Esc não faz nada aqui, e é de propósito — este
     modal não tem "cancelar", ele tem duas saídas legítimas. */

  /* O botão voltar do navegador. Sem isto, quem entra numa operação e aperta
     voltar sai do site inteiro em vez de voltar para a escolha. */
  window.addEventListener("popstate", function () {
    var h = (location.hash || "").replace(/[#/]/g, "").toLowerCase();
    if (CONFIG.ops[h]) { aplicar(h); if (portalAberto) fecharPortal(); }
    else abrirPortal(false);
  });

  /* ─── estado inicial ───
     O <head> já decidiu se o portal fica de pé (é ele que escreve is-portal
     antes do primeiro quadro). Aqui só terminamos de montar o que sobrou. */
  (function inicio() {
    var h = (location.hash || "").replace(/[#/]/g, "").toLowerCase();
    var q = (new URLSearchParams(location.search).get("op") || "").toLowerCase();
    var escolhida = CONFIG.ops[h] ? h : CONFIG.ops[q] ? q : null;

    if (escolhida) {
      aplicar(escolhida);
      portalAberto = false;
      if (portal) portal.classList.add("is-gone");
      travarSite(false);
    } else {
      /* O HTML nasce com o conteúdo da PMPE, então não há nada a escrever
         enquanto o portal está de pé. `atual` fica NULO de propósito: se ele
         já valesse "pmpe", o aplicar() sairia pela porta do "já está nessa
         operação" quando o visitante escolhesse a PMPE, e o <title> ficaria o
         título neutro das duas operações numa página que já escolheu lado. */
      travarSite(true);
    }
  })();

  /* =========================================================
     3 · HEADER, PROGRESSO, PARALLAX E DOCK
     ========================================================= */
  var header   = document.getElementById("header");
  var progress = document.getElementById("progress");
  var heroBg   = document.getElementById("heroBg");
  var dock     = document.getElementById("dock");
  var whats    = document.getElementById("whats");
  var ticking  = false;

  function render() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-stuck", y > 40);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }

    /* A barra fixa do mobile e o WhatsApp só entram depois da hero — antes
       disso o próprio CTA da dobra já está na tela, e os dois só cobririam
       conteúdo. É o mesmo limiar para os dois de propósito: eles aparecem
       juntos e o olho registra uma mudança, não duas. */
    var passouHero = y > window.innerHeight * 0.85;
    if (dock)  dock.classList.toggle("is-on", passouHero);
    if (whats) whats.classList.toggle("is-on", passouHero);

    if (!reduced && heroBg && y < window.innerHeight * 1.2) {
      heroBg.style.transform = "translateY(" + (y * 0.16) + "px)";
    }
    ticking = false;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(render); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  render();

  /* =========================================================
     4 · REVEAL AO ROLAR (com escalonamento)

     .ficha__item ficou de fora de propósito: a ficha mora na hero e já entra
     pela animação .anim d5 — dois fade-ins no mesmo bloco brigariam.
     ========================================================= */
  var alvos = $$(
    ".section__head, .item, .extras__head, .extra, .etapa, .bonus__grid > *, " +
    ".preco__caixa, .duo__foto, .duo__col, .faq__item, .tabela-wrap, .final__inner"
  );
  alvos.forEach(function (el) { el.classList.add("reveal"); });

  /* =========================================================
     5 · CONTAGEM DOS NÚMEROS

     Só anima o que é número PURO no formato pt-BR ("1.320", "570"). Os campos
     com texto — "14K+", "AO VIVO" — não casam com a expressão e ficam
     parados, que é o certo: animar "AO VIVO" partindo de zero não significa
     nada.
     ========================================================= */
  function formatar(n) { return n.toLocaleString("pt-BR"); }

  function contar(el) {
    var bruto = el.textContent.trim();
    if (!/^\d{1,3}(\.\d{3})*$/.test(bruto)) return;
    var destino = parseInt(bruto.replace(/\./g, ""), 10);
    if (!destino) return;
    if (reduced) { el.textContent = formatar(destino); return; }

    var dur = 1100, ini = null;
    el.textContent = "0";

    function passo(ts) {
      if (ini === null) ini = ts;
      var p = Math.min((ts - ini) / dur, 1);
      /* easeOutCubic: chega devagar no número final, como um contador de
         painel travando — subir linear parece cronômetro. */
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = formatar(Math.round(destino * e));
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  /* ─── ligar os dois observadores ─────────────────────────
     Só depois que o portal sai. Um IntersectionObserver não sabe que a página
     está escondida atrás de um modal — opacity: 0 continua "intersecting" —
     e sem esta espera a hero e o primeiro título já teriam entrado e contado
     enquanto ninguém olhava. Quem chega por /#/pmpe não espera nada: para ele
     o portal nunca existiu. */
  var observadoresLigados = false;

  function ligarObservadores() {
    if (observadoresLigados) return;
    observadoresLigados = true;

    if (!("IntersectionObserver" in window)) {
      alvos.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = (i++ * 70) + "ms";
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px" });
    alvos.forEach(function (el) { io.observe(el); });

    var ioNum = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        contar(e.target);
        ioNum.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    $$(".ficha__item b, .final h2 .gold").forEach(function (el) { ioNum.observe(el); });
  }

  if (!portalAberto) ligarObservadores();

  /* =========================================================
     6 · CHECKOUT — evento e destino

     O href já foi escrito pelo aplicar(). Aqui só marcamos o clique. O
     checkout abre na MESMA aba, que é o comportamento esperado de um fluxo de
     pagamento.
     ========================================================= */
  $$("[data-checkout]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var op = CONFIG.ops[atual] || CONFIG.ops.pmpe;
      push({
        event: "clique_checkout",
        pagina: CONFIG.pagina,
        produto: op.nomeCompleto,
        destino: op.checkout ? "checkout" : "whatsapp"
      });
    });
  });

  /* =========================================================
     7 · BRASÕES QUE NÃO CARREGAM

     Se um .webp falhar, a página não mostra imagem quebrada: o medalhão fica
     com o núcleo escuro e a sigla assume no lugar. `complete &&
     naturalWidth === 0` pega as que JÁ falharam antes deste script rodar.
     ========================================================= */
  function cair(img) {
    img.style.display = "none";
    var core = img.parentNode;
    if (!core || core.querySelector(".selo__sigla")) return;
    var sigla = document.createElement("span");
    sigla.className = "selo__sigla";
    sigla.textContent = (CONFIG.ops[atual] || CONFIG.ops.pmpe).sigla;
    core.appendChild(sigla);
  }
  $$('img[data-slot="brasao"], .portao__core img').forEach(function (img) {
    img.addEventListener("error", function () { cair(img); });
    if (img.complete && img.naturalWidth === 0) cair(img);
  });

  /* =========================================================
     8 · ATMOSFERA — brasas e faíscas

     Cada brasa é um <i> com quatro variáveis CSS (posição, tamanho, cor,
     ritmo). A animação mora no styles.css e só mexe em transform e opacity,
     que o compositor resolve sozinho — nenhuma delas causa layout.

     Duas faixas de cor: a maioria em ouro, uma minoria em brasa quente. Todas
     do mesmo tom deixava a camada chapada; alternando, ela ganha a variação
     de temperatura que uma fagulha de verdade tem.
     ========================================================= */
  var TONS = [
    "rgba(201,174,122,.9)",   // ouro claro
    "rgba(175,146,86,.85)",   // ouro
    "rgba(196,112,63,.85)"    // brasa quente
  ];

  function semear(alvo, quantidade) {
    if (!alvo || reduced) return;
    for (var b = 0; b < quantidade; b++) {
      var br = document.createElement("i");
      br.className = "brasa";
      br.style.setProperty("--x", (Math.random() * 100).toFixed(2) + "%");
      br.style.setProperty("--s", (2 + Math.random() * 3).toFixed(1) + "px");
      /* o tom quente entra em cerca de um terço delas */
      br.style.setProperty("--cor", TONS[Math.random() < .34 ? 2 : (Math.random() < .5 ? 0 : 1)]);
      br.style.setProperty("--op", (.35 + Math.random() * .45).toFixed(2));
      br.style.setProperty("--dur", (13 + Math.random() * 13).toFixed(1) + "s");
      /* atraso negativo: as brasas já entram no meio do próprio ciclo, então a
         camada aparece povoada no primeiro segundo em vez de começar vazia e
         levar meio minuto para encher. */
      br.style.setProperty("--atraso", "-" + (Math.random() * 26).toFixed(1) + "s");
      alvo.appendChild(br);
    }
  }

  /* O portal recebe quase o dobro: ele não rola, então a atmosfera dele
     precisa se sustentar sozinha numa tela parada. */
  semear(document.getElementById("brasas"), 22);
  semear(document.getElementById("portalBrasas"), 38);
  /* O bloco do bônus tem brasa própria. As da página são `fixed` e sobem pela
     viewport inteira; estas são `absolute` dentro da seção, então elas se
     concentram ali e o bloco fica visivelmente mais quente que o resto. */
  semear(document.getElementById("bonusBrasas"), 16);

  var sparks = document.getElementById("sparks");
  if (sparks && !reduced) {
    for (var s = 0; s < 16; s++) {
      var i = document.createElement("i");
      i.className = "spark";
      i.style.left = (Math.random() * 100) + "%";
      i.style.bottom = (Math.random() * 40) + "%";
      i.style.animationDuration = (7 + Math.random() * 7) + "s";
      i.style.animationDelay = (Math.random() * 8) + "s";
      sparks.appendChild(i);
    }
  }

  /* ─── brilho seguindo o cursor nos itens ─── */
  $$(".item, .extra").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  /* ─── ano do rodapé ─── */
  var ano = document.getElementById("year");
  if (ano) ano.textContent = new Date().getFullYear();

})();
