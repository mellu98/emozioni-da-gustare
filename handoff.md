# HANDOFF - Sito Pit Coffee (configuratore bomboniere/box)

## 1) Contesto progetto
Sito cliente statico per Pit Coffee.
Focus di lavoro attuale: configuratore bomboniere/box, senza stravolgere il design premium esistente.

## 2) Stack tecnico
- Frontend statico: HTML + CSS + JavaScript vanilla.
- Nessun backend applicativo attivo nel flusso configuratore (invio richiesta via mailto).
- File centrale logica configuratore: `js/bomb-configurator.js`.
- Stili principali: `css/style.css`.
- Pagine con configuratore: `index.html`, `catalog.html`, `bomboniere.html`.

## 3) Stato attuale (dove siamo arrivati)
### Flusso implementato
1. Scelta percorso iniziale:
   - Bomboniera
   - Box personalizzata
2. Se scegli **Box**:
   - Step evento
   - Step catalogo prodotti (categorie + prodotti)
   - Step personalizzazione (scatola/nastro/bigliettino)
   - Step quantita

### Catalogo prodotti box
- E' stato sostituito il vecchio blocco prodotti hardcoded (quello dello screen) con catalogo categorie/prodotti reale.
- Il catalogo e' renderizzato dinamicamente da `BOX_PRODUCT_CATEGORIES` in `js/bomb-configurator.js`.
- Regola attuale box: minimo 2 prodotti (`MIN_BOX_PRODUCTS = 2`).

### UI/Design
- Nuova UI premium per catalogo a categorie (accordion + card prodotto), coerente con stile dark/gold.
- Cache busting asset aggiornato a `v=20260424-configuratore-v3`.

### Nota tecnica importante
Durante il refactor precedente c'e' stato un problema encoding/sintassi JS (caratteri accentati/euro e stringhe multilinea). E' stato corretto.
Tenere sempre controllo con `node --check` dopo modifiche al JS.

## 4) Focus operativo adesso (richiesta prioritaria)
Implementare il flusso **Bomboniera configurabile** mantenendo il sito stabile:

### Requisito funzionale richiesto dal cliente
Se utente sceglie **Bomboniera**, NON deve fermarsi alla sola scelta tipo bomboniera.
Deve proseguire con:
1. scelta **tipo evento** (come box),
2. scelta dagli **stessi prodotti del catalogo box**, ma con regola: **si puo scegliere solo 1 prodotto**,
3. scelta **colore nastro**,
4. inserimento **testo bigliettino**,
(esattamente come logica box, ma con vincolo prodotto singolo).

## 5) Strategia consigliata (safe, senza danni)
Implementare senza duplicare componenti/markup:

1. Riutilizzare gli stessi step del box anche per bomboniera (evento + catalogo + personalizzazione).
2. Introdurre regole per percorso, ad esempio:
   - box: min 2 prodotti
   - bomboniera: min 1, max 1 prodotto
3. In `toggleProduct` gestire il caso bomboniera:
   - se seleziona un nuovo prodotto, deselezionare automaticamente quello precedente.
4. Rendere dinamico il testo di aiuto (`.min-notice`) in base al percorso:
   - box: "Seleziona almeno 2 prodotti"
   - bomboniera: "Seleziona 1 prodotto"
5. Aggiornare preview e mailto per includere percorso bomboniera con evento/prodotto/nastro/bigliettino.
6. Mantenere inalterati look&feel premium e struttura generale del sito.

## 6) File dove intervenire (principalmente)
- `C:\Users\franc\Desktop\sito caffe\js\bomb-configurator.js`
- `C:\Users\franc\Desktop\sito caffe\index.html`
- `C:\Users\franc\Desktop\sito caffe\catalog.html`
- `C:\Users\franc\Desktop\sito caffe\bomboniere.html`
- `C:\Users\franc\Desktop\sito caffe\css\style.css` (solo se servono micro-adjust UI)

## 7) Criteri di accettazione
- Se scelgo Box: comportamento attuale invariato (minimo 2 prodotti).
- Se scelgo Bomboniera:
  - posso scegliere evento,
  - posso scegliere solo 1 prodotto dal catalogo,
  - posso scegliere nastro,
  - posso scrivere bigliettino,
  - preview e bottone richiesta coerenti.
- Nessun peggioramento estetico rispetto al design premium attuale.
- Nessun errore JS in console.

## 8) Checklist rapida verifica
1. Hard refresh browser (Ctrl+F5).
2. Test percorso Box completo.
3. Test percorso Bomboniera completo con vincolo singolo prodotto.
4. Verifica mailto generato.
5. Verifica responsive mobile.

---
Se devi toccare la logica, farlo in modo incrementale e con rollback facile: una modifica per volta, test visivo subito dopo.
