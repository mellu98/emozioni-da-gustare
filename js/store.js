/**
 * Pit Coffee — Store State & Data
 * Prodotti, carrello, persistenza localStorage
 */

const Store = (() => {

  // ─── PRODUCT CATALOG ──────────────────────────────────────────────────────

  const products = [
    // ── BOMBONIERE ──────────────────────────────────────────────────────────
    {
      id: 'bomb-01',
      name: 'Box Matrimonio Classico',
      category: 'bomboniere',
      event: 'matrimonio',
      price: 35.00,
      priceNote: 'a pezzo, min. 10 pz.',
      minQty: 10,
      description: 'Un\'elegante selezione curata con confettura di fichi neri di Sicilia, miele millefiori biologico e cioccolato fondente 80%.',
      detail: 'Confezione in cartone riciclato premium con nastro in raso. Bigliettino personalizzato incluso. Disponibile in vari colori nastro.',
      image: 'images/prod-box-matrimonio.jpg',
      badge: 'Bestseller',
      featured: true,
      customizable: false,
      tags: ['matrimonio', 'bomboniera', 'regalo', 'evento', 'gourmet']
    },
    {
      id: 'bomb-02',
      name: 'Box Matrimonio Premium',
      category: 'bomboniere',
      event: 'matrimonio',
      price: 55.00,
      priceNote: 'a pezzo, min. 10 pz.',
      minQty: 10,
      description: 'Selezione esclusiva con olio EVO siciliano, confettura di fichi, miele di acacia e praline al cioccolato fondente.',
      detail: 'Box rigido con coperchio magnetico, fodera in seta, nastro doppio. Etichetta personalizzata con nomi e data.',
      image: 'images/prod-box-matrimonio.jpg',
      badge: 'Premium',
      featured: true,
      customizable: false,
      tags: ['matrimonio', 'bomboniera', 'lusso', 'evento']
    },
    {
      id: 'bomb-03',
      name: 'Box Battesimo',
      category: 'bomboniere',
      event: 'battesimo',
      price: 28.00,
      priceNote: 'a pezzo, min. 10 pz.',
      minQty: 10,
      description: 'Delicata selezione con tisana biologica ai fiori, miele millefiori e biscottini artigianali di frolla.',
      detail: 'Disponibile azzurro o rosa. Confezione in cartoncino soft-touch con fiocco. Bigliettino con nome del bambino.',
      image: 'images/prod-box-battesimo.jpg',
      badge: null,
      featured: true,
      customizable: false,
      tags: ['battesimo', 'bomboniera', 'neonato', 'evento']
    },
    {
      id: 'bomb-04',
      name: 'Box Laurea',
      category: 'bomboniere',
      event: 'laurea',
      price: 32.00,
      priceNote: 'a pezzo, min. 10 pz.',
      minQty: 10,
      description: 'Celebrativo con caffè specialty macinato, cioccolato fondente 70% e confettura di agrumi di Sicilia.',
      detail: 'Confezione con colori personalizzabili. Opzioni tema: medicina, legge, ingegneria, economia e altro.',
      image: 'images/prod-box-laurea.jpg',
      badge: null,
      featured: true,
      customizable: false,
      tags: ['laurea', 'bomboniera', 'celebrazione', 'evento']
    },

    // ── PRODOTTI GOURMET ─────────────────────────────────────────────────────
    {
      id: 'gour-01',
      name: 'Miele di Acacia Biologico',
      category: 'gourmet',
      price: 12.50,
      description: 'Miele di acacia biologico certificato, dal sapore delicato e floreale. Perfetto con formaggi freschi o nella tisana.',
      detail: '250g — Provenienza: Lombardia. Apicoltura certificata BIO. Senza conservanti.',
      image: 'images/prod-miele.jpg',
      badge: 'Bio',
      featured: true,
      customizable: false,
      tags: ['miele', 'biologico', 'gourmet', 'acacia']
    },
    {
      id: 'gour-02',
      name: 'Confettura Fichi Neri di Sicilia',
      category: 'gourmet',
      price: 8.90,
      description: 'Confettura artigianale di fichi neri con una nota di cannella. Ricetta tradizionale siciliana con frutta in purezza.',
      detail: '200g — Ingredienti: fichi neri (85%), zucchero di canna, cannella. Senza conservanti né coloranti.',
      image: 'images/prod-confettura.jpg',
      badge: null,
      featured: true,
      customizable: false,
      tags: ['confettura', 'fichi', 'sicilia', 'artigianale']
    },
    {
      id: 'gour-03',
      name: 'Cioccolato Fondente 80%',
      category: 'gourmet',
      price: 6.50,
      description: 'Tavoletta di cioccolato fondente con cacao pregiato di origine singola. Amaro intenso e persistente.',
      detail: '100g — Cacao: origine Costa Rica 80%. Bean-to-bar. Senza lecitina di soia.',
      image: 'images/prod-cioccolato.jpg',
      badge: 'Artigianale',
      featured: false,
      customizable: false,
      tags: ['cioccolato', 'fondente', 'artigianale', 'cacao']
    },
    {
      id: 'gour-04',
      name: 'Crema di Pistacchio di Bronte',
      category: 'gourmet',
      price: 11.00,
      description: 'Crema spalmabile ai pistacchi DOP di Bronte, colore verde intenso e sapore unico. Purissima, senza olio di palma.',
      detail: '200g — Pistacchi di Bronte DOP (60%), zucchero di canna. Senza aromi artificiali.',
      image: 'images/prod-crema-pistacchio.jpg',
      badge: 'DOP',
      featured: true,
      customizable: false,
      tags: ['pistacchio', 'bronte', 'sicilia', 'crema', 'spalmabile']
    },
    {
      id: 'gour-05',
      name: 'Olio EVO Siciliano',
      category: 'gourmet',
      price: 18.00,
      description: 'Olio extravergine di oliva siciliano da prima spremitura a freddo, varietà Nocellara del Belice. Fruttato e speziato.',
      detail: '250ml — Cultivar: Nocellara del Belice. Prima spremitura a freddo. Acidità < 0,3%.',
      image: 'images/cat-gourmet.jpg',
      badge: null,
      featured: false,
      customizable: false,
      tags: ['olio', 'extravergine', 'sicilia', 'EVO']
    },
    {
      id: 'gour-06',
      name: 'Marmellata di Arance Amare',
      category: 'gourmet',
      price: 8.50,
      description: 'Marmellata di arance amare di Sicilia, ricetta classica inglese rivisitata in chiave italiana. Amara e profumata.',
      detail: '200g — Ingredienti: arance amare di Sicilia (80%), zucchero di canna. Artigianale.',
      image: 'images/prod-confettura.jpg',
      badge: null,
      featured: false,
      customizable: false,
      tags: ['marmellata', 'arancia', 'sicilia', 'artigianale']
    },

    // ── LIQUORI E AMARI ────────────────────────────────────────────────────────
    {
      id: 'liq-01',
      name: 'Amaro di Sicilia alle Erbe',
      category: 'liquori',
      price: 8.50,
      description: 'Amaro tradizionale siciliano, infuso di erbe aromatiche spontanee. Intenso, bilanciato, con retrogusto amarognolo.',
      detail: '100 ml — Erbe di Sicilia. Da servire freddo o a temperatura ambiente.',
      image: 'images/cat-caffe.jpg',
      badge: null,
      featured: true,
      customizable: false,
      tags: ['amaro', 'sicilia', 'erbe', 'liquore', 'tradizione']
    },
    {
      id: 'liq-02',
      name: 'Liquore di Mandarino',
      category: 'liquori',
      price: 8.50,
      description: 'Liquore dolce e profumato ottenuto dalle scorze di mandarini siciliani. Fresco, agrumato, avvolgente.',
      detail: '100 ml — Mandarini di Sicilia. Perfetto come digestivo o cocktail.',
      image: 'images/cat-caffe.jpg',
      badge: null,
      featured: true,
      customizable: false,
      tags: ['liquore', 'mandarino', 'sicilia', 'agrumi', 'digestivo']
    },
    {
      id: 'liq-03',
      name: 'Liquore di Ficodindia',
      category: 'liquori',
      price: 8.50,
      description: 'Liquore ottenuto dalle pale di ficodindia siciliano. Dolce, fruttato, con colore rosato naturale.',
      detail: '100 ml — Ficodindia di Sicilia. Tipico della tradizione isolana.',
      image: 'images/cat-caffe.jpg',
      badge: 'Siciliano',
      featured: true,
      customizable: false,
      tags: ['liquore', 'ficodindia', 'sicilia', 'fruttato']
    },
    {
      id: 'liq-04',
      name: 'Liquore di Melone Cantalupo',
      category: 'liquori',
      price: 8.50,
      description: 'Liquore fresco e dolce al sapore di melone cantalupo. Delicato, estivo, con nota finale speziata.',
      detail: '100 ml — Melone cantalupo. Eccellente freddo o con ghiaccio.',
      image: 'images/cat-caffe.jpg',
      badge: null,
      featured: false,
      customizable: false,
      tags: ['liquore', 'melone', 'cantalupo', 'fresco', 'estivo']
    },
    {
      id: 'liq-05',
      name: 'Amaro di Sicilia alle Erbe',
      category: 'liquori',
      price: 19.00,
      priceNote: 'da €18,50 a €20,00',
      description: 'Amaro tradizionale siciliano, infuso di erbe aromatiche spontanee. Formato grande per occasioni speciali.',
      detail: '500 ml — Erbe di Sicilia. Da servire freddo o a temperatura ambiente.',
      image: 'images/cat-caffe.jpg',
      badge: 'Formato Grande',
      featured: false,
      customizable: false,
      tags: ['amaro', 'sicilia', 'erbe', 'liquore', 'tradizione']
    },
    {
      id: 'liq-06',
      name: 'Liquore di Mandarino',
      category: 'liquori',
      price: 19.00,
      priceNote: 'da €18,50 a €20,00',
      description: 'Liquore dolce e profumato al mandarino siciliano. Formato grande, ideale per regali e occasioni.',
      detail: '500 ml — Mandarini di Sicilia. Perfetto come digestivo o cocktail.',
      image: 'images/cat-caffe.jpg',
      badge: 'Formato Grande',
      featured: false,
      customizable: false,
      tags: ['liquore', 'mandarino', 'sicilia', 'agrumi', 'digestivo']
    },
    {
      id: 'liq-07',
      name: 'Liquore di Ficodindia',
      category: 'liquori',
      price: 19.00,
      priceNote: 'da €18,50 a €20,00',
      description: 'Liquore di ficodindia siciliano nel formato grande. Colore rosato, dolce e fruttato.',
      detail: '500 ml — Ficodindia di Sicilia. Tipico della tradizione isolana.',
      image: 'images/cat-caffe.jpg',
      badge: 'Siciliano',
      featured: false,
      customizable: false,
      tags: ['liquore', 'ficodindia', 'sicilia', 'fruttato']
    },
    {
      id: 'liq-08',
      name: 'Liquore di Melone Cantalupo',
      category: 'liquori',
      price: 19.00,
      priceNote: 'da €18,50 a €20,00',
      description: 'Liquore al melone cantalupo nel formato grande. Fresco, dolce, con finale speziato.',
      detail: '500 ml — Melone cantalupo. Eccellente freddo o con ghiaccio.',
      image: 'images/cat-caffe.jpg',
      badge: null,
      featured: false,
      customizable: false,
      tags: ['liquore', 'melone', 'cantalupo', 'fresco', 'estivo']
    },

    // ── TÈ & INFUSI ──────────────────────────────────────────────────────────
    {
      id: 'te-01',
      name: 'Tè Verde Sencha Giapponese',
      category: 'te',
      price: 12.00,
      description: 'Sencha di primo raccolto (Ichibancha) dal Giappone. Fresco, erbaceo con dolce retrogusto umami.',
      detail: '50g — Origine: Shizuoka, Giappone. Raccolto: Aprile. Infusione: 70°C, 1-2 min.',
      image: 'images/prod-te-verde.jpg',
      badge: 'Primo Raccolto',
      featured: true,
      customizable: false,
      tags: ['tè', 'verde', 'sencha', 'giappone', 'premium']
    },
    {
      id: 'te-02',
      name: 'Tè Darjeeling First Flush',
      category: 'te',
      price: 14.00,
      description: 'Il "Champagne dei tè". Primo raccolto primaverile dalle colline dell\'Himalaya. Muscatel, floreale e luminoso.',
      detail: '50g — FTGFOP1. Origine: Darjeeling, India. Raccolto: Marzo-Aprile. Infusione: 85°C, 3 min.',
      image: 'images/cat-te.jpg',
      badge: 'Raro',
      featured: true,
      customizable: false,
      tags: ['tè', 'darjeeling', 'nero', 'india', 'premium']
    },
    {
      id: 'te-03',
      name: 'Tisana Relax Bio',
      category: 'te',
      price: 8.50,
      description: 'Blend biologico rilassante con camomilla, lavanda, tiglio e melissa. Perfetta prima di dormire.',
      detail: '30g — Ingredienti: camomilla BIO, lavanda BIO, tiglio BIO, melissa BIO. Senza glutine.',
      image: 'images/cat-te.jpg',
      badge: 'Bio',
      featured: false,
      customizable: false,
      tags: ['tisana', 'relax', 'bio', 'camomilla', 'lavanda']
    },
    {
      id: 'te-04',
      name: 'Infuso Frutti Rossi',
      category: 'te',
      price: 7.50,
      description: 'Infuso fruttato con lamponi, ribes rosso, ibisco e rosa canina. Gustoso caldo o freddo (cold brew).',
      detail: '40g — Ingredienti: ibisco, lamponi, ribes rosso, rosa canina, ciliegia. Senza caffeina.',
      image: 'images/cat-te.jpg',
      badge: null,
      featured: false,
      customizable: false,
      tags: ['infuso', 'frutti rossi', 'lampone', 'ibisco', 'senza caffeina']
    },
    {
      id: 'te-05',
      name: 'Tè Oolong Formosa',
      category: 'te',
      price: 13.50,
      description: 'Oolong semifermentato di Taiwan. A metà strada tra verde e nero: orchidea, pesca bianca, note tostate.',
      detail: '50g — Dong Ding Oolong 40% ossidazione. Origine: Nantou, Taiwan. Infusioni multiple possibili.',
      image: 'images/cat-te.jpg',
      badge: null,
      featured: false,
      customizable: false,
      tags: ['tè', 'oolong', 'taiwan', 'semifermentato']
    }
  ];

  // ─── CATEGORY META ─────────────────────────────────────────────────────────

  const categories = [
    {
      id: 'bomboniere',
      name: 'Bomboniere Gastronomiche',
      shortName: 'Bomboniere',
      description: 'Regala emozioni autentiche. Bomboniere gastronomiche artigianali per matrimoni, battesimi, lauree e feste.',
      image: 'images/cat-bomboniere.jpg',
      icon: '🎀'
    },
    {
      id: 'gourmet',
      name: 'Prodotti Gourmet',
      shortName: 'Gourmet',
      description: 'Eccellenze italiane selezionate con cura: miele biologico, confetture artigianali, olio EVO e cioccolato di pregio.',
      image: 'images/cat-gourmet.jpg',
      icon: '🫙'
    },
    {
      id: 'liquori',
      name: 'Creme Liquorose e Amari',
      shortName: 'Creme Liquorose e Amari',
      description: 'Amari alle erbe siciliane, liquori di mandarino, ficodindia e melone cantalupo. La tradizione isolana in bottiglia.',
      image: 'images/cat-caffe.jpg',
      icon: '🍾'
    },
    {
      id: 'te',
      name: 'Tè & Infusi del Mondo',
      shortName: 'Tè & Infusi',
      description: 'Un viaggio sensoriale attraverso i migliori tè al mondo, tisane biologiche e infusi naturali.',
      image: 'images/cat-te.jpg',
      icon: '🍵'
    }
  ];

  // ─── PRODUCT HELPERS ───────────────────────────────────────────────────────

  function getProduct(id) { return products.find(p => p.id === id) || null; }
  function getByCategory(cat) { return products.filter(p => p.category === cat); }
  function getFeatured() { return products.filter(p => p.featured); }
  function getAll() { return [...products]; }
  function getCategories() { return [...categories]; }
  function getCategory(id) { return categories.find(c => c.id === id) || null; }

  function search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [...products];
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);
  }

  // ─── PUBLIC API ────────────────────────────────────────────────────────────
  return {
    getProduct, getByCategory, getFeatured, getAll, getCategories, getCategory,
    search, formatPrice
  };
})();
