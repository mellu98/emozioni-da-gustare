/*
 * Pit Coffee - Bomboniera / Box configurator
 * Logica condivisa per index.html, catalog.html e bomboniere.html.
 */
(function () {
  const DEFAULT_QTY = 10;
  const MIN_BOX_PRODUCTS = 2;
  const MIN_BOMBONIERA_PRODUCTS = 1;
  const MAX_BOMBONIERA_PRODUCTS = 1;

  const BOX_PRODUCT_CATEGORIES = [
    {
      name: 'Confetture e marmellate',
      icon: '&#127855;',
      accent: 'Agrumi e frutti siciliani',
      products: [
        ['Marmellata di arancia di Sicilia', '210 g', 7.50],
        ['Marmellata di limoni di Sicilia', '210 g', 7.50],
        ['Confettura di ficodindia di Sicilia', '210 g', 7.50],
        ['Confettura extra di gelsi neri', '210 g', 10.70],
        ['Marmellata di mandarini di Sicilia', '210 g', 7.50],
        ['Marmellata di arancia di Sicilia', '100 g', 4.80],
        ['Marmellata di limoni di Sicilia', '100 g', 4.80],
        ['Confettura di ficodindia di Sicilia', '100 g', 4.80],
        ['Confettura extra di gelsi neri', '100 g', 7.20],
        ['Marmellata di mandarini di Sicilia', '100 g', 4.80]
      ]
    },
    {
      name: 'Olietti aromatizzati',
      icon: '&#129746;',
      accent: '100 ml',
      products: [
        ['Olio aromatizzato al peperoncino', '100 ml', 7.50],
        ['Olio aromatizzato al rosmarino', '100 ml', 7.50],
        ['Olio aromatizzato al basilico', '100 ml', 7.50],
        ['Olio aromatizzato all\u2019arancia', '100 ml', 7.50],
        ['Olio aromatizzato al limone', '100 ml', 7.50]
      ]
    },
    {
      name: 'Creme spalmabili',
      icon: '&#127851;',
      accent: 'Senza glutine',
      note: 'Senza glutine',
      products: [
        ['Crema spalmabile cioccolato bianco', '220 g', 8.99],
        ['Crema spalmabile cioccolato fondente', '220 g', 8.99],
        ['Crema spalmabile limone', '220 g', 8.99],
        ['Crema spalmabile mandorla', '220 g', 8.99],
        ['Crema spalmabile caff\u00e8', '220 g', 8.99],
        ['Crema spalmabile nocciola', '220 g', 8.99]
      ]
    },
    {
      name: 'Creme spalmabili crunchy',
      icon: '&#129372;',
      accent: 'Senza glutine',
      note: 'Senza glutine',
      products: [
        ['Crema spalmabile pistacchio crunchy', '220 g', 9.99],
        ['Crema spalmabile cioccolato bianco e frutti di bosco crunchy', '220 g', 9.99],
        ['Crema spalmabile caramello salato crunchy', '220 g', 9.99],
        ['Crema spalmabile croccantino e rum', '220 g', 9.99],
        ['Crema spalmabile limone crunchy', '220 g', 9.99],
        ['Crema spalmabile cioccolato fondente con peperoncino', '220 g', 9.99]
      ]
    },
    {
      name: 'Mieli aromatizzati',
      icon: '&#127855;',
      accent: 'Senza glutine',
      note: 'Senza glutine',
      products: [
        ['Miele aromatizzato al bergamotto', '250 g', 8.99],
        ['Miele aromatizzato al tartufo', '250 g', 8.99],
        ['Miele aromatizzato alle more', '250 g', 8.99],
        ['Miele aromatizzato al peperoncino', '250 g', 8.99],
        ['Miele aromatizzato alle nocciole', '250 g', 8.99],
        ['Miele aromatizzato al cioccolato', '250 g', 8.99]
      ]
    },
    {
      name: 'Pesti',
      icon: '&#127807;',
      accent: 'Ricette siciliane',
      products: [
        ['Pesto di pistacchio', '190 g', 6.00],
        ['Pesto di mandorla', '190 g', 6.00],
        ['Pesto tipico siciliano', '190 g', 6.00],
        ['Pesto trapanese', '190 g', 6.00],
        ['Pesto di pistacchio', '90 g', 4.50],
        ['Pesto di mandorla', '90 g', 4.50],
        ['Pesto tipico siciliano', '90 g', 4.50],
        ['Pesto trapanese', '90 g', 4.50]
      ]
    },
    {
      name: 'Spalmabili dolci',
      icon: '&#129371;',
      accent: 'Formati 200 g e 100 g',
      products: [
        ['Crema di pistacchio', '200 g', 4.80],
        ['Crema di cocco', '200 g', 4.80],
        ['Crema di mandorla', '200 g', 4.80],
        ['Crema di nocciola', '200 g', 4.80],
        ['Confettura di peperoncino', '200 g', 4.80],
        ['Crema di pistacchio', '100 g', 4.80],
        ['Crema di cocco', '100 g', 4.80],
        ['Crema di mandorla', '100 g', 4.80],
        ['Crema di nocciola', '100 g', 4.80],
        ['Confettura di peperoncino', '100 g', 4.80]
      ]
    }
  ];

  const state = {
    kind: null,
    bomboniera: null,
    bombonieraNote: '',
    event: null,
    basePrice: 0,
    products: [],
    scatola: 'cartone',
    nastro: 'Avorio',
    cardText: '',
    qty: DEFAULT_QTY
  };

  function byId(id) { return document.getElementById(id); }
  function all(selector) { return Array.from(document.querySelectorAll(selector)); }
  function setText(id, value) { const el = byId(id); if (el) el.textContent = value; }
  function setHtml(id, value) { const el = byId(id); if (el) el.innerHTML = value; }
  function setPreviewImage(src) { const img = byId('preview-img'); if (img) img.src = src; }
  function formatEuro(value) { return `\u20ac${value.toFixed(2).replace('.', ',')}`; }
  function productKey(category, name, format) {
    return `${category}|${name}|${format}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    }[char]));
  }
  function setPreviewRequestOnly(isRequestOnly) {
    document.querySelector('.bomb-preview')?.classList.toggle('is-request-only', isRequestOnly);
  }

  function isConfiguratorFlowActive() {
    return state.kind === 'box' || state.kind === 'bomboniera';
  }

  function getMinProductsForCurrentKind() {
    return state.kind === 'bomboniera' ? MIN_BOMBONIERA_PRODUCTS : MIN_BOX_PRODUCTS;
  }

  function getMaxProductsForCurrentKind() {
    return state.kind === 'bomboniera' ? MAX_BOMBONIERA_PRODUCTS : Number.POSITIVE_INFINITY;
  }

  function setProductStepCopy() {
    const titleEl = byId('step-2-title');
    const noticeEl = byId('products-min-notice');
    if (!titleEl || !noticeEl) return;

    if (state.kind === 'bomboniera') {
      titleEl.textContent = 'Scegli il prodotto della bomboniera';
      noticeEl.textContent = 'Per la bomboniera seleziona 1 solo prodotto dal catalogo. Il prezzo indicato è per singolo prodotto.';
      return;
    }

    titleEl.textContent = 'Componi il contenuto del box';
    noticeEl.textContent = 'Seleziona almeno 2 prodotti per il tuo box. I prezzi indicati sono per singolo prodotto.';
  }

  function setRequestHref(subjectText, bodyText) {
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);
    const href = `mailto:info@pitcoffeepavia.it?subject=${subject}&body=${body}`;
    const mainBtn = byId('bomb-request-btn');
    const bombonieraBtn = byId('bomboniera-request-btn');
    if (mainBtn) mainBtn.href = href;
    if (bombonieraBtn) bombonieraBtn.href = href;
  }

  function getBoxProductList() {
    if (!state.products.length) return '- Nessun prodotto selezionato';
    return state.products
      .map(product => `- ${product.name} (${product.format}) | ${product.category} | ${formatEuro(product.price)}`)
      .join('\n');
  }

  function updateRequestHrefForConfigurator(totalPrice) {
    const isBomboniera = state.kind === 'bomboniera';
    const kindLabel = isBomboniera ? 'Bomboniera' : 'Box';
    const bombonieraLabel = isBomboniera ? `\nTipo bomboniera: ${state.bomboniera || '-'}` : '';

    setRequestHref(
      `Preventivo ${kindLabel} ${state.event || 'personalizzata'} - ${state.qty} pz`,
      `Ciao, vorrei un preventivo per una ${kindLabel.toLowerCase()} personalizzata.\n\nPercorso: ${kindLabel}${bombonieraLabel}\nEvento: ${state.event || '-'}\nProdotti:\n${getBoxProductList()}\nScatola: ${state.scatola}\nNastro: ${state.nastro}\nQuantità: ${state.qty} pz\nPrezzo stimato: ${Number.isFinite(totalPrice) ? formatEuro(totalPrice) : '-'}\n\nTesto bigliettino: ${state.cardText || '-'}\nNote:`
    );
  }

  function renderBoxProductCatalog() {
    const container = byId('box-product-catalog');
    if (!container) return;

    const totalProducts = BOX_PRODUCT_CATEGORIES.reduce((sum, category) => sum + category.products.length, 0);
    const categories = BOX_PRODUCT_CATEGORIES.map((category, index) => {
      const productCount = category.products.length;
      const products = category.products.map(([name, format, price]) => {
        const id = productKey(category.name, name, format);
        const note = category.note ? `<span class="box-product-card__note">${escapeHtml(category.note)}</span>` : '';
        return `
          <button class="product-toggle box-product-card" type="button"
            data-product-id="${id}"
            data-product="${escapeHtml(name)}"
            data-format="${escapeHtml(format)}"
            data-category="${escapeHtml(category.name)}"
            data-note="${escapeHtml(category.note || '')}"
            data-price="${price.toFixed(2)}"
            onclick="toggleProduct(this)">
            <span class="box-product-card__check" aria-hidden="true">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" stroke-width="2"><polyline points="1 4 4 7 9 1"/></svg>
            </span>
            <span class="box-product-card__body">
              <span class="box-product-card__name">${escapeHtml(name)}</span>
              <span class="box-product-card__meta">${escapeHtml(format)}${note}</span>
            </span>
            <span class="box-product-card__price">+${formatEuro(price)}</span>
          </button>`;
      }).join('');

      return `
        <details class="box-product-category" ${index === 0 ? 'open' : ''}>
          <summary class="box-product-category__summary">
            <span class="box-product-category__icon">${category.icon}</span>
            <span class="box-product-category__title-wrap">
              <span class="box-product-category__title">${escapeHtml(category.name)}</span>
              <span class="box-product-category__subtitle">${escapeHtml(category.accent || '')}</span>
            </span>
            <span class="box-product-category__count">${productCount} prodotti</span>
          </summary>
          <div class="box-product-grid">${products}</div>
        </details>`;
    }).join('');

    container.innerHTML = `
      <div class="box-product-catalog__head">
        <span class="box-product-catalog__eyebrow">Catalogo prodotti</span>
        <strong>${BOX_PRODUCT_CATEGORIES.length} categorie \u00b7 ${totalProducts} referenze</strong>
      </div>
      ${categories}`;
  }

  function setInitialPreview() {
    setPreviewRequestOnly(true);
    setPreviewImage('images/cta-bomboniere.jpg');
    setText('preview-event', 'Percorso guidato');
    setText('preview-title', 'Scegli Bomboniera o Box');
    setHtml('preview-contents', '<p class="bomb-preview__empty">Prima scegli cosa vuoi creare: una bomboniera dedicata oppure una box personalizzata.</p>');
    setText('price-val', '0,00');
    setText('preview-total', 'Scegli un percorso per iniziare');
    setRequestHref(
      'Richiesta Bomboniere Pit Coffee',
      `Ciao, vorrei ricevere informazioni sulle bomboniere Pit Coffee.\n\nTipologia desiderata:\nEvento:\nQuantit\u00e0 indicativa:\nNote:`
    );
  }

  function resetBoxConfigurator() {
    state.bomboniera = null;
    state.bombonieraNote = '';
    state.event = null;
    state.basePrice = 0;
    state.products = [];
    state.scatola = 'cartone';
    state.nastro = 'Avorio';
    state.cardText = '';
    state.qty = DEFAULT_QTY;

    all('.event-card, .product-toggle, .bomboniera-option-card').forEach(el => el.classList.remove('selected'));

    all('[data-type="scatola"]').forEach((btn, index) => {
      btn.classList.toggle('selected', index === 0);
      btn.style.background = index === 0 ? 'rgba(181,131,42,.15)' : 'rgba(255,255,255,.06)';
      btn.style.borderColor = index === 0 ? 'var(--gold)' : 'rgba(255,255,255,.2)';
      btn.style.color = index === 0 ? 'var(--white)' : 'rgba(255,255,255,.9)';
    });

    all('#nastro-swatches-config .nastro-swatch').forEach((swatch, index) => {
      swatch.classList.toggle('selected', index === 0);
      swatch.style.borderColor = index === 0 ? 'var(--white)' : 'transparent';
    });

    const cardInput = byId('card-text-config') || byId('card-text');
    if (cardInput) cardInput.value = '';
    setText('char-count-config', '0');
    setText('char-count', '0');

    const qtyEl = byId('bomb-qty');
    if (qtyEl) qtyEl.textContent = String(DEFAULT_QTY);
    setText('qty-label', `${DEFAULT_QTY} bomboniere`);
  }

  function hideBoxFlow() {
    all('.requires-box').forEach(step => step.classList.remove('active', 'done'));
  }

  function selectBombType(card) {
    const kind = card?.dataset?.kind;
    if (!kind) return;

    state.kind = kind;
    all('.bomb-type-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    byId('step-kind')?.classList.add('done');

    resetBoxConfigurator();
    hideBoxFlow();
    setProductStepCopy();
    byId('step-1')?.classList.add('active');

    const isBomboniera = kind === 'bomboniera';
    const label = isBomboniera ? 'Bomboniera' : 'Box personalizzata';

    setPreviewRequestOnly(isBomboniera);
    setPreviewImage('images/prod-box-matrimonio.jpg');
    setText('preview-event', label);
    setText('preview-title', "Scegli l'evento per iniziare");
    setHtml('preview-contents', '<p class="bomb-preview__empty">Ora scegli il tipo di evento &rarr;</p>');
    setText('price-val', '0,00');
    setText('preview-total', 'Seleziona prima il tipo di evento');
    setRequestHref(
      `Richiesta ${label}`,
      `Ciao, vorrei ricevere informazioni per una ${label.toLowerCase()}.\n\nEvento:\nQuantit\u00e0 indicativa:\nNote:`
    );
  }

  function selectEvent(card) {
    if (!isConfiguratorFlowActive() || !card) return;

    all('.event-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.event = card.dataset.event;
    state.basePrice = parseFloat(card.dataset.base) || 0;

    setPreviewImage(`images/${card.dataset.img}`);
    byId('step-1')?.classList.add('done');
    ['step-2', 'step-3', 'step-4'].forEach(id => byId(id)?.classList.add('active'));
    setProductStepCopy();
    updatePreview();
  }

  function toggleProduct(el) {
    if (!isConfiguratorFlowActive() || !state.event || !el) return;

    const id = el.dataset.productId || productKey(el.dataset.category || 'Prodotti', el.dataset.product, el.dataset.format || '');
    const name = el.dataset.product;
    const format = el.dataset.format || '';
    const category = el.dataset.category || '';
    const note = el.dataset.note || '';
    const price = parseFloat(el.dataset.price) || 0;
    const alreadySelected = el.classList.contains('selected');

    if (alreadySelected) {
      el.classList.remove('selected');
      state.products = state.products.filter(product => product.id !== id);
      updatePreview();
      return;
    }

    if (getMaxProductsForCurrentKind() === 1) {
      all('.product-toggle.selected').forEach(btn => btn.classList.remove('selected'));
      state.products = [];
    }

    el.classList.add('selected');
    state.products = state.products.filter(product => product.id !== id);
    state.products.push({ id, name, format, category, note, price });

    updatePreview();
  }

  function selectNastro(btn) {
    all('.nastro-swatch').forEach(s => s.classList.remove('selected'));
    btn?.classList.add('selected');
    if (btn?.dataset?.name) state.nastro = btn.dataset.name;
    updatePreview();
  }

  function selectPersonalization(btn, type) {
    if (!isConfiguratorFlowActive() || !btn) return;

    all(`[data-type="${type}"]`).forEach(b => {
      b.style.background = type === 'scatola' ? 'rgba(255,255,255,.06)' : b.style.background;
      b.style.borderColor = type === 'scatola' ? 'rgba(255,255,255,.2)' : b.style.borderColor;
      b.style.color = type === 'scatola' ? 'rgba(255,255,255,.9)' : b.style.color;
      b.classList.remove('selected');
    });

    btn.style.background = 'rgba(181,131,42,.15)';
    btn.style.borderColor = 'var(--gold)';
    btn.style.color = 'var(--white)';
    btn.classList.add('selected');

    if (type === 'scatola') state.scatola = btn.dataset.val;
    updatePreview();
  }

  function selectNastroConfig(btn) {
    if (!isConfiguratorFlowActive() || !btn) return;

    all('#nastro-swatches-config .nastro-swatch').forEach(s => {
      s.classList.remove('selected');
      s.style.borderColor = 'transparent';
    });
    btn.classList.add('selected');
    btn.style.borderColor = 'var(--white)';
    state.nastro = btn.dataset.name;
    updatePreview();
  }

  function changeBombQty(delta) {
    if (!isConfiguratorFlowActive()) return;

    const el = byId('bomb-qty');
    if (!el) return;
    const current = parseInt(el.textContent, 10);
    const next = Math.max(DEFAULT_QTY, (Number.isFinite(current) ? current : DEFAULT_QTY) + delta);
    el.textContent = String(next);
    state.qty = next;
    updatePreview();
  }

  function updatePreview() {
    if (!isConfiguratorFlowActive()) return;

    const cardInput = byId('card-text-config') || byId('card-text');
    if (cardInput) {
      state.cardText = cardInput.value;
      const counterEl = byId('char-count-config') || byId('char-count');
      if (counterEl) counterEl.textContent = cardInput.value.length;
    }

    const qtyEl = byId('bomb-qty');
    if (qtyEl) {
      state.qty = Math.max(DEFAULT_QTY, parseInt(qtyEl.textContent, 10) || DEFAULT_QTY);
      setText('qty-label', `${state.qty} bomboniere`);
    }

    const addOns = state.products.reduce((sum, product) => sum + product.price, 0);
    const boxCost = 10;
    const pricePerPiece = boxCost + addOns;
    const totalPrice = pricePerPiece * state.qty;
    const minProducts = getMinProductsForCurrentKind();
    const isBomboniera = state.kind === 'bomboniera';

    setText('price-val', pricePerPiece.toFixed(2).replace('.', ','));

    if (state.event) {
      setText('preview-event', state.event);
      const kindTitle = isBomboniera
        ? `Bomboniera ${state.bomboniera || 'dedicata'}`
        : `Box ${state.event}`;
      setText('preview-title', `${kindTitle} \u00b7 Nastro ${state.nastro}`);
    }

    if (state.products.length === 0) {
      setHtml('preview-contents', '<p class="bomb-preview__empty">Aggiungi i prodotti dal catalogo &rarr;</p>');
    } else {
      setHtml('preview-contents', state.products.map(product => `
        <div class="bomb-preview__item">
          <span>${escapeHtml(product.name)} <small style="color:rgba(255,255,255,.45)">${escapeHtml(product.format)}</small></span>
          <span style="margin-left:auto;font-size:.72rem;color:var(--gold-light)">+${formatEuro(product.price)}</span>
        </div>
      `).join(''));
    }

    updateRequestHrefForConfigurator(totalPrice);

    if (!state.event) {
      setText('preview-total', 'Seleziona prima il tipo di evento');
    } else if (state.products.length >= minProducts) {
      setText('preview-total', `Totale ${state.qty} pz: ${formatEuro(totalPrice)}`);
    } else if (!isBomboniera && state.products.length === 1) {
      setText('preview-total', 'Seleziona almeno un altro prodotto');
    } else {
      const productWord = minProducts === 1 ? 'prodotto' : 'prodotti';
      setText('preview-total', `Seleziona almeno ${minProducts} ${productWord}`);
    }
  }

  function initConfigurator() {
    if (!document.querySelector('.bomb-configurator')) return;
    renderBoxProductCatalog();
    setProductStepCopy();
    hideBoxFlow();
    setInitialPreview();
  }

  window.selectBombType = selectBombType;
  window.selectEvent = selectEvent;
  window.toggleProduct = toggleProduct;
  window.selectNastro = selectNastro;
  window.selectPersonalization = selectPersonalization;
  window.selectNastroConfig = selectNastroConfig;
  window.changeBombQty = changeBombQty;
  window.updatePreview = updatePreview;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfigurator);
  } else {
    initConfigurator();
  }
})();
