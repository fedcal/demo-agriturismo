# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Agriturismo'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `agriturismo` con nome cliente (`acme-agriturismo`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili Sviluppi Customizzabili per Agriturismo

### 1. Filiera Tracking QR (Blockchain-light)
**Scope**: ~26h | **Tier**: Avanzato | **Valore**: Premium positioning, food traceability story

Bottiglia olio: QR code → storia lotto (data raccolta, alberi, lavorazione, foto processo). Certificazione DOP/IGP badge.

### 2. Wedding Venue Configurator + E-sign
**Scope**: ~32h | **Tier**: Premium | **Valore**: Wedding market, €3k-7k per evento

Guest count → auto-suggest tavoli, menu, wine pairing. PDF proposal e-sign contract. B2B revenue stream.

### 3. Cooking Class Live Zoom Ticketing
**Scope**: ~28h | **Tier**: Avanzato | **Valore**: New revenue stream €500-1000/mese, brand extension

Chef insegna settimanale, live Zoom audience (max 20) + on-demand video sell. Supply list email pre-class.

### 4. Wellness Retreat Packages AI-Recommend
**Scope**: ~22h | **Tier**: Avanzato | **Valore**: Wellness market segment, +€2k-4k package/mese

Yoga + colazione + wine tasting + farm walk. Pre-built templates. AI recommend basesd on guest profile.

### 5. Virtual Farm Tour 360° Matterport
**Scope**: ~20h | **Tier**: Avanzato | **Valore**: Pre-booking conversion +12%, cancellation -8%

Scannerizzazione: cantina, orchard, cucina. Hotspot interactivi (wine box, olive press, kitchen).

### 6. Content Hub Blog SEO (52 articoli/anno)
**Scope**: ~40h setup | **Tier**: Premium | **Valore**: Organic traffic +300%, domain authority grow

Scheduling: "Farm-to-table ricette", "Wine pairing guide", "Organic farming sostenibilità". Long-tail targeting.

### 7. YouTube Vlog Series (Monthly)
**Scope**: ~24h production | **Tier**: Premium | **Valore**: Viral potential, brand storytelling

4-6 min video: giorno nella vita, truffle hunt, harvest season, family interview. Auto-repurpose TikTok/Instagram Reels.

### 8. Email Newsletter Segmentazione
**Scope**: ~16h | **Tier**: Intermedio+ | **Valore**: Engagement +40%, upsell packages

Wine subscriber → wine news, cookbook buyer → recipe email, winter visitor → summer offer.

### 9. Loyalty Points + Referral Marketplace
**Scope**: ~20h | **Tier**: Avanzato | **Valore**: Retention +30%, repeat visit +45%

5 overnight → 1 free. Referral: amico prenota cooking class → €25 buono entrambi.

### 10. Multi-Property Management 2-3 Agriturismi
**Scope**: ~24h | **Tier**: Avanzato | **Valore**: Scalability, consolidation

Proprietario gestisci 2-3 location da dashboard. Cross-property loyalty, unified calendar.

### 11. Dynamic Pricing Seasonal AI
**Scope**: ~22h | **Tier**: Avanzato | **Valore**: Revenue per room +18-20%

ML predice demand: festival locale +35%, holiday weekend +25%, feriale -15%. Auto-adjust Stripe prices.

### 12. Sustainability Report (ESG Marketing)
**Scope**: ~14h | **Tier**: Intermedio+ | **Valore**: ESG positioning, green tourism market

Track energy/water, plastic-free amenities, km0 sourcing. Guest quiz "Vuoi ridurre water?" → reward points.

**Total**: 12 customizzazioni per €5k-8k development, ROI medio 3-4 mesi (wedding event + cooking class).
