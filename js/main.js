/**
 * Pit Coffee — UI Logic
 * Navigazione, modali, interazioni (sito vetrina)
 */

document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  PageInit.run();
});

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

const Nav = {
  init() {
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');

    if (burger && mobileMenu) {
      burger.addEventListener('click', () => this.toggleMobile());
      overlay?.addEventListener('click', () => this.closeMobile());
    }

    // Scroll behaviour
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(a => {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
  },

  toggleMobile() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open', !isOpen);
    overlay?.classList.toggle('show', !isOpen);
    document.body.classList.toggle('no-scroll', !isOpen);
  },

  closeMobile() {
    document.getElementById('mobile-menu')?.classList.remove('open');
    document.getElementById('mobile-overlay')?.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }
};


// ─── PRODUCT CARD BUILDER ─────────────────────────────────────────────────────

function buildProductCard(product, compact = false) {
  const badgeHtml = product.badge
    ? `<span class="product-badge">${product.badge}</span>` : '';
  const priceNote = product.priceNote
    ? `<small class="price-note">${product.priceNote}</small>` : '';

  return `
    <article class="product-card${compact ? ' product-card--compact' : ''}" data-product-id="${product.id}">
      <div class="product-card__media" onclick="ProductModal.open('${product.id}')">
        ${badgeHtml}
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
        <div class="product-card__overlay">
          <span>Dettagli</span>
        </div>
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${Store.getCategory(product.category)?.shortName || ''}</p>
        <h3 class="product-card__name" onclick="ProductModal.open('${product.id}')">${product.name}</h3>
        <p class="product-card__desc">${product.description.substring(0, 80)}…</p>
        <div class="product-card__footer">
          <div class="product-card__price">
            ${Store.formatPrice(product.price)}
            ${priceNote}
          </div>
          <a href="mailto:info@pitcoffeepavia.it?subject=Richiesta%20info%3A%20${encodeURIComponent(product.name)}" class="btn btn--primary btn--sm" style="text-align:center;">
            Richiedi info
          </a>
        </div>
      </div>
    </article>`;
}

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────

const ProductModal = {
  el: null,
  current: null,

  init() {
    this.el = document.getElementById('product-modal');
    document.getElementById('modal-overlay')?.addEventListener('click', () => this.close());
    document.getElementById('modal-close')?.addEventListener('click', () => this.close());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });
  },

  open(productId) {
    this.current = Store.getProduct(productId);
    if (!this.current || !this.el) return;
    this.render();
    this.el.classList.add('open');
    document.getElementById('modal-overlay')?.classList.add('show');
    document.body.classList.add('no-scroll');
  },

  close() {
    this.el?.classList.remove('open');
    document.getElementById('modal-overlay')?.classList.remove('show');
    document.body.classList.remove('no-scroll');
    this.current = null;
  },

  render() {
    const p = this.current;
    const content = document.getElementById('modal-content');
    if (!content) return;

    const isBomb = p.category === 'bomboniere';

    content.innerHTML = `
      <div class="modal-product">
        <div class="modal-product__media">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='images/placeholder.jpg'">
          ${p.badge ? `<span class="product-badge product-badge--lg">${p.badge}</span>` : ''}
        </div>
        <div class="modal-product__info">
          <p class="modal-category">${Store.getCategory(p.category)?.name || ''}</p>
          <h2 class="modal-title">${p.name}</h2>
          <p class="modal-price">${Store.formatPrice(p.price)} ${p.priceNote ? `<small>${p.priceNote}</small>` : ''}</p>
          <p class="modal-desc">${p.description}</p>
          <p class="modal-detail">${p.detail}</p>

          <div class="modal-actions">
            <a href="mailto:info@pitcoffeepavia.it?subject=Richiesta%20info%3A%20${encodeURIComponent(p.name)}&body=Ciao%2C%20vorrei%20ricevere%20informazioni%20sul%20prodotto%3A%20${encodeURIComponent(p.name)}%20(%E2%82%AC${p.price.toFixed(2).replace('.',',')})" class="btn btn--primary btn--full btn--lg" style="text-align:center;">
              Richiedi informazioni
            </a>
            <a href="tel:+390382304728" class="btn btn--outline btn--full btn--sm" style="margin-top:.75rem;text-align:center;">
              Chiama: 0382 304728
            </a>
          </div>
        </div>
      </div>`;
  },

  buildCustomizer(p) {
    const events = ['Matrimonio', 'Battesimo', 'Laurea', 'Compleanno', 'Anniversario', 'Azienda'];
    const nastri = ['Avorio', 'Oro', 'Rosa antico', 'Azzurro polvere', 'Borgogna', 'Verde salvia'];

    return `
      <div class="customizer">
        <h4 class="customizer__title">Personalizza la tua bomboniera</h4>
        <div class="customizer__field">
          <label>Tipo di evento</label>
          <div class="chip-group" id="event-chips">
            ${events.map(ev => `<button class="chip" data-type="event" data-val="${ev}" onclick="ProductModal.selectChip(this)">${ev}</button>`).join('')}
          </div>
        </div>
        <div class="customizer__field">
          <label>Colore nastro</label>
          <div class="chip-group" id="nastro-chips">
            ${nastri.map(n => `<button class="chip" data-type="nastro" data-val="${n}" onclick="ProductModal.selectChip(this)">${n}</button>`).join('')}
          </div>
        </div>
        <div class="customizer__field">
          <label>Testo bigliettino <small>(opzionale, max 60 caratteri)</small></label>
          <input type="text" id="card-text" class="form-input" maxlength="60" placeholder="Es: Con tutto il nostro amore — Maria & Luca">
        </div>
      </div>`;
  },

  selectChip(el) {
    const type = el.dataset.type;
    document.querySelectorAll(`.chip[data-type="${type}"]`).forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  },

  changeModalQty(delta) {
    const input = document.getElementById('modal-qty');
    if (!input) return;
    const min = parseInt(input.min) || 1;
    input.value = Math.max(min, parseInt(input.value) + delta);
  },

};

// ─── TOAST ────────────────────────────────────────────────────────────────────

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${message}</span>`;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── PAGE INITIALIZER ─────────────────────────────────────────────────────────

const PageInit = {
  run() {
    ProductModal.init();

    const page = window.location.pathname.split('/').pop() || 'index.html';
    switch (page) {
      case '':
      case 'index.html':  this.home(); break;
      case 'catalog.html': this.catalog(); break;
    }
  },

  // ── HOME ──────────────────────────────────────────────────────────────────
  home() {
    // Featured products
    const grid = document.getElementById('featured-grid');
    if (grid) {
      grid.innerHTML = Store.getFeatured()
        .slice(0, 8)
        .map(p => buildProductCard(p))
        .join('');
    }

    // Counter animation
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      animateCount(el, target);
    });

    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        hero.style.setProperty('--parallax-y', `${y * 0.3}px`);
      }, { passive: true });
    }
  },

  // ── CATALOG ───────────────────────────────────────────────────────────────
  catalog() {
    const params = new URLSearchParams(window.location.search);
    const initCat = params.get('cat') || 'all';

    let currentCat = initCat;
    let currentSearch = '';
    let priceMin = null, priceMax = null;

    const grid = document.getElementById('catalog-grid');
    const filters = document.querySelectorAll('[data-filter]');
    const searchInput = document.getElementById('catalog-search');

    // Listen for price filter events from catalog.html inline script
    window.addEventListener('priceFilter', e => {
      priceMin = e.detail.min;
      priceMax = e.detail.max;
      render();
    });

    function render() {
      if (!grid) return;
      let products = currentCat === 'all'
        ? Store.getAll()
        : Store.getByCategory(currentCat);

      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        products = products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q))
        );
      }

      if (priceMin !== null) {
        products = products.filter(p => p.price >= priceMin && p.price <= priceMax);
      }

      const count = document.getElementById('catalog-count');
      if (count) count.textContent = `${products.length} prodott${products.length === 1 ? 'o' : 'i'}`;

      if (products.length === 0) {
        grid.innerHTML = `<div class="catalog-empty"><p>Nessun prodotto trovato.</p>
          <button class="btn btn--outline btn--sm" onclick="clearFilters()">Mostra tutti</button></div>`;
        return;
      }
      grid.innerHTML = products.map(p => buildProductCard(p)).join('');
      grid.querySelectorAll('.product-card').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.05}s`;
        el.classList.add('fade-in');
      });
    }

    window.clearFilters = function() {
      currentCat = 'all';
      currentSearch = '';
      if (searchInput) searchInput.value = '';
      filters.forEach(f => f.classList.toggle('active', f.dataset.filter === 'all'));
      render();
    };

    filters.forEach(btn => {
      if (btn.dataset.filter === currentCat) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentCat = btn.dataset.filter;
        filters.forEach(f => f.classList.toggle('active', f === btn));
        render();
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    searchInput?.addEventListener('input', e => {
      currentSearch = e.target.value.trim();
      render();
    });

    render();
  },

};

// ─── UTILS ────────────────────────────────────────────────────────────────────

function animateCount(el, target) {
  let start = 0;
  const duration = 1500;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      requestAnimationFrame(step);
      observer.disconnect();
    }
  });
  observer.observe(el);
}
