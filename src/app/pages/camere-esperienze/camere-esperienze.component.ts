import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-camere-esperienze',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink, TitleCasePipe],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Camere ed Esperienze</h1>
        <p>8 camere in masseria storica · 4 esperienze autentiche nella campagna salentina</p>
      </div>
    </section>

    <article class="demo-container content">

      <!-- Camere -->
      <section class="block" *ngIf="camere$ | async as data">
        <h2>Le camere</h2>
        <p class="block-intro">
          Tutte le camere sono arredate con materiali tradizionali salentini: pietra leccese, cotto antico,
          legno di ulivo, calce bianca. Lenzuola in cotone biologico certificato, prodotti da bagno
          naturali artigianali.
        </p>
        <ul class="camere-grid">
          <li *ngFor="let camera of data.camere" class="camera-card">
            <div class="camera-card__header">
              <div>
                <h3>{{ camera.nome }}</h3>
                <p class="camera-tipo">{{ tipologiaLabel(camera.tipologia) }}</p>
              </div>
              <div class="camera-price">
                <span class="price-value">{{ camera.prezzoNotte | currency: 'EUR' }}</span>
                <span class="price-label">/notte</span>
              </div>
            </div>
            <p class="camera-desc">{{ camera.descrizione }}</p>
            <p class="camera-meta">
              <span>{{ camera.superficieMq }} m²</span>
              <span>·</span>
              <span>max {{ camera.capienza }} ospiti</span>
            </p>
            <ul class="servizi-list" aria-label="Servizi camera">
              <li *ngFor="let s of camera.servizi">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <!-- Esperienze -->
      <section class="block" *ngIf="esperienze$ | async as data">
        <h2>Le esperienze</h2>
        <p class="block-intro">
          Aperte anche agli esterni, non solo agli ospiti in pernottamento. Prenotazione richiesta
          con almeno 48h di anticipo. Cancellazione gratuita fino a 24h prima.
        </p>
        <ul class="esp-grid">
          <li *ngFor="let e of data.esperienze" class="esp-card">
            <div class="esp-card__header">
              <div>
                <h3>{{ e.nome }}</h3>
                <span class="esp-categoria">{{ e.categoria | titlecase }}</span>
                <span *ngIf="e.stagionale" class="badge badge--stagionale">Stagionale</span>
              </div>
              <div class="esp-price">
                <span class="price-value">{{ e.prezzo | currency: 'EUR' }}</span>
                <span class="price-label">/persona</span>
              </div>
            </div>
            <p class="esp-desc">{{ e.descrizione }}</p>
            <div class="esp-meta">
              <p><strong>Durata:</strong> {{ e.durata }}</p>
              <p><strong>Orario:</strong> {{ e.orario }}</p>
              <p><strong>Partecipanti:</strong> min {{ e.paxMinimo }} · max {{ e.paxMassimo }}</p>
              <p><strong>Disponibilita:</strong> {{ e.disponibilita[0] }}</p>
            </div>
            <div class="incluso-block">
              <p class="incluso-title">Incluso:</p>
              <ul class="incluso-list">
                <li *ngFor="let item of e.incluso">{{ item }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <div class="cta-inline">
        <p>Per prenotare una camera o un'esperienza contattaci direttamente.</p>
        <a routerLink="/contatti" class="btn btn-primary">Richiedi disponibilita</a>
      </div>

    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: linear-gradient(180deg, #f3f9e8 0%, #f6f8fa 100%);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; }
      .content { padding: 3rem 1rem; }
      .block { margin-bottom: 4rem; }
      .block h2 {
        font-size: 1.75rem;
        margin: 0 0 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .block-intro {
        color: var(--color-fg-muted);
        margin: 1rem 0 2rem;
        max-width: 720px;
        line-height: 1.7;
      }
      .camere-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 1.5rem;
      }
      .camera-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: #ffffff;
      }
      .camera-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
        gap: 1rem;
      }
      .camera-card__header h3 { margin: 0 0 0.2rem; }
      .camera-tipo {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-fg-muted);
        margin: 0;
        font-weight: 600;
      }
      .camera-price { text-align: right; flex-shrink: 0; }
      .price-value {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1.2rem;
      }
      .price-label {
        color: var(--color-fg-muted);
        font-size: 0.85rem;
      }
      .camera-desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0 0 0.75rem;
      }
      .camera-meta {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        display: flex;
        gap: 0.5rem;
        margin: 0 0 1rem;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .servizi-list li {
        font-size: 0.72rem;
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
      }
      .esp-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 1.5rem;
      }
      .esp-card {
        border: 1px solid #bbf7d0;
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: #f0fdf4;
      }
      .esp-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
        gap: 1rem;
      }
      .esp-card__header h3 { margin: 0 0 0.3rem; }
      .esp-categoria {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-accent);
        font-weight: 600;
      }
      .esp-price { text-align: right; flex-shrink: 0; }
      .esp-desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0 0 1rem;
      }
      .esp-meta p {
        font-size: 0.875rem;
        margin: 0 0 0.35rem;
        color: var(--color-fg-muted);
      }
      .esp-meta p strong { color: var(--color-fg-default); }
      .esp-meta { margin-bottom: 1rem; }
      .incluso-block { border-top: 1px dashed var(--color-border); padding-top: 0.75rem; }
      .incluso-title {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        margin: 0 0 0.4rem;
      }
      .incluso-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .incluso-list li {
        font-size: 0.72rem;
        background: #dcfce7;
        color: #14532d;
        border: 1px solid #86efac;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
      }
      .badge {
        display: inline-block;
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
        margin-left: 0.4rem;
      }
      .badge--stagionale {
        background: #fef3c7;
        color: var(--color-warning);
        border: 1px solid #fde68a;
      }
      .cta-inline {
        text-align: center;
        padding: 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
      }
      .cta-inline p {
        color: var(--color-fg-muted);
        margin: 0 0 1rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover { background: #4d7a09; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CamereEsperienzeComponent {
  private readonly mockData = inject(MockDataService);

  readonly camere$ = this.mockData.camere$;
  readonly esperienze$ = this.mockData.esperienze$;

  readonly tipologiaLabel = (t: string): string => {
    const labels: Record<string, string> = {
      camera_doppia: 'Camera doppia',
      suite: 'Suite',
      trullo: 'Trullo',
      lamia: 'Lamia'
    };
    return labels[t] ?? t;
  };
}
