import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-badge">Certificazione Biologica IT-BIO-005</p>
        <h1>Salento autentico, dal 1850</h1>
        <p class="hero-tagline">
          Agriturismo biologico nella campagna salentina. 8 camere in masseria storica, olio EVO,
          vino Primitivo, cooking class e raccolte di olive tra ulivi millenari.
        </p>
        <div class="hero-actions">
          <a routerLink="/camere-esperienze" class="btn btn-primary">Camere e Esperienze</a>
          <a routerLink="/contatti" class="btn btn-secondary">Prenota ora</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Masseria del Sole</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🫒</span>
          <h3>Ulivi millenari</h3>
          <p>40 ettari di oliveto biologico certificato con alberi fino a 1.500 anni. Olio EVO a freddo di eccellenza.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🍷</span>
          <h3>Vini biologici</h3>
          <p>8 ettari di vigneto con Primitivo, Negroamaro e Verdeca autoctona. Vinificazione naturale.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🏛️</span>
          <h3>Masseria storica</h3>
          <p>Edificio del 1850 restaurato con rispetto dei materiali originali: pietra leccese, cotto, calce bianca.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🌱</span>
          <h3>Bio certificato</h3>
          <p>Certificazione biologica UE Reg. 848/2018 dal 2008. Zero pesticidi, zero chimica, filiera corta km0.</p>
        </li>
      </ul>
    </section>

    <section class="featured-camere demo-container" *ngIf="featuredCamere$ | async as camere">
      <div class="section-header">
        <h2>Dove dormire</h2>
        <a routerLink="/camere-esperienze" class="link-more">Tutte le 8 camere →</a>
      </div>
      <ul class="camere-grid">
        <li *ngFor="let camera of camere" class="camera-card">
          <div class="camera-card__head">
            <h3>{{ camera.nome }}</h3>
            <span class="camera-card__price">{{ camera.prezzoNotte | currency: 'EUR' }}/notte</span>
          </div>
          <p class="camera-card__desc">{{ camera.descrizione }}</p>
          <p class="camera-card__meta">{{ camera.superficieMq }} m² · max {{ camera.capienza }} ospiti</p>
        </li>
      </ul>
    </section>

    <section class="featured-esperienze demo-container" *ngIf="featuredEsperienze$ | async as esp">
      <div class="section-header">
        <h2>Esperienze in masseria</h2>
        <a routerLink="/camere-esperienze" class="link-more">Tutte le esperienze →</a>
      </div>
      <ul class="esp-grid">
        <li *ngFor="let e of esp" class="esp-card">
          <div class="esp-card__head">
            <h3>{{ e.nome }}</h3>
            <span class="esp-card__price">{{ e.prezzo | currency: 'EUR' }}/persona</span>
          </div>
          <p class="esp-card__desc">{{ e.descrizione }}</p>
          <p class="esp-card__meta">{{ e.durata }} · fino a {{ e.paxMassimo }} partecipanti</p>
          <span *ngIf="e.stagionale" class="badge badge--stagionale">Stagionale (ott-nov)</span>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Vivi il Salento vero</h2>
        <p>
          Prenota il tuo soggiorno o un'esperienza. Minimo 2 notti in alta stagione,
          1 notte nel resto dell'anno. Check-in dalle 15:00.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota</a>
          <a routerLink="/prodotti" class="btn btn-secondary">Acquista online</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #f3f9e8 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-badge {
        display: inline-block;
        background: #ecfccb;
        color: #365314;
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        margin-bottom: 1rem;
        border: 1px solid #bef264;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 auto 2rem;
        max-width: 640px;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
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
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover { background: var(--color-bg-subtle); }
      .features { padding: 4rem 1rem; }
      .features h2 { text-align: center; margin-bottom: 2rem; }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .feature-icon { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
      .feature-grid h3 { margin: 0 0 0.5rem; font-size: 1.1rem; color: var(--color-accent); }
      .feature-grid p { margin: 0; color: var(--color-fg-muted); font-size: 0.95rem; }
      .featured-camere, .featured-esperienze { padding: 4rem 1rem; }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 { margin: 0; }
      .link-more { color: var(--color-accent); text-decoration: none; font-weight: 600; }
      .link-more:hover { text-decoration: underline; }
      .camere-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .camera-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .camera-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
      }
      .camera-card__head h3 { margin: 0; font-size: 1.1rem; }
      .camera-card__price { color: var(--color-accent); font-weight: 700; flex-shrink: 0; }
      .camera-card__desc { color: var(--color-fg-muted); font-size: 0.9rem; margin: 0 0 0.5rem; }
      .camera-card__meta { font-size: 0.8rem; color: var(--color-fg-muted); margin: 0; }
      .esp-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .esp-card {
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .esp-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
      }
      .esp-card__head h3 { margin: 0; font-size: 1.05rem; }
      .esp-card__price { color: var(--color-accent); font-weight: 700; flex-shrink: 0; }
      .esp-card__desc { color: var(--color-fg-muted); font-size: 0.9rem; margin: 0 0 0.5rem; }
      .esp-card__meta { font-size: 0.8rem; color: var(--color-fg-muted); margin: 0 0 0.5rem; }
      .badge { font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 9999px; font-weight: 600; }
      .badge--stagionale { background: #fef3c7; color: var(--color-warning); }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 { margin: 0 0 0.75rem; color: #ffffff; }
      .cta-band p { color: rgba(255,255,255,0.85); margin: 0 auto 2rem; max-width: 540px; }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255,255,255,0.3);
      }
      .cta-band .btn-secondary:hover { background: rgba(255,255,255,0.1); }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredCamere$ = this.mockData.camere$.pipe(
    map((data) => data.camere.filter((c) => c.featured))
  );

  readonly featuredEsperienze$ = this.mockData.esperienze$.pipe(
    map((data) => data.esperienze.filter((e) => e.featured))
  );
}
