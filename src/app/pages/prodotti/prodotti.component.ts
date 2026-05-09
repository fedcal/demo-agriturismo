import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Prodotto } from '../../data/types';

interface ProdottiView {
  categorie: { id: string; nome: string; prodotti: Prodotto[] }[];
}

@Component({
  selector: 'app-prodotti',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <p class="bio-badge">IT-BIO-005 · Certificazione Biologica UE</p>
        <h1>Prodotti Biologici</h1>
        <p>Olio EVO, vini, conserve e formaggi da 40 ettari di oliveto e 8 di vigneto certificati bio nel Salento.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section *ngFor="let cat of view.categorie" class="categoria-block" [id]="cat.id">
        <h2>{{ cat.nome }}</h2>
        <ul class="prodotti-grid">
          <li *ngFor="let p of cat.prodotti" class="prodotto-card">
            <div class="prodotto-card__head">
              <div>
                <h3>{{ p.nome }}</h3>
                <span class="prodotto-formato">{{ p.formato }}</span>
              </div>
              <span class="prodotto-price">{{ p.prezzo | currency: 'EUR' }}</span>
            </div>
            <p class="prodotto-desc">{{ p.descrizione }}</p>
            <div class="prodotto-footer">
              <span class="bio-chip">Bio {{ p.certificazione }}</span>
              <span *ngIf="p.featured" class="featured-chip">Bestseller</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="acquisto-info">
        <h2>Come acquistare</h2>
        <div class="acquisto-grid">
          <div class="acquisto-card">
            <span class="acquisto-icon" aria-hidden="true">🏡</span>
            <h3>Spaccio in masseria</h3>
            <p>Lun–Sab 9:00–13:00 e 16:00–19:00. Acquisto diretto con degustazione gratuita degli oli.</p>
          </div>
          <div class="acquisto-card">
            <span class="acquisto-icon" aria-hidden="true">📦</span>
            <h3>Spedizione online</h3>
            <p>Ordini via email o WhatsApp. Corriere espresso 24/48h in Italia. Imballo isotermico per formaggi.</p>
          </div>
          <div class="acquisto-card">
            <span class="acquisto-icon" aria-hidden="true">🎁</span>
            <h3>Box regalo</h3>
            <p>Confezioni regalo personalizzate disponibili: Box Olio, Box Vino, Box Salento (olio + vino + conserve).</p>
          </div>
        </div>
        <div class="acquisto-cta">
          <p>Per ordini e disponibilita contattaci direttamente.</p>
          <a routerLink="/contatti" class="btn btn-primary">Contattaci</a>
        </div>
      </section>
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
      .bio-badge {
        display: inline-block;
        background: #ecfccb;
        color: #365314;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        margin-bottom: 0.75rem;
        border: 1px solid #bef264;
      }
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; max-width: 560px; margin: 0 auto; }
      .content { padding: 3rem 1rem; }
      .categoria-block { margin-bottom: 4rem; }
      .categoria-block h2 {
        font-size: 1.5rem;
        margin: 0 0 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .prodotti-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .prodotto-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        background: #ffffff;
      }
      .prodotto-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 0.75rem;
      }
      .prodotto-card__head h3 { margin: 0 0 0.2rem; font-size: 1.05rem; }
      .prodotto-formato {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-weight: 500;
      }
      .prodotto-price {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1.1rem;
        flex-shrink: 0;
      }
      .prodotto-desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0 0 0.75rem;
      }
      .prodotto-footer {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .bio-chip {
        font-size: 0.7rem;
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .featured-chip {
        font-size: 0.7rem;
        background: #fef3c7;
        color: #92400e;
        border: 1px solid #fde68a;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .acquisto-info { border-top: 2px solid var(--color-border); padding-top: 3rem; }
      .acquisto-info h2 { margin: 0 0 2rem; }
      .acquisto-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      .acquisto-card {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .acquisto-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
      .acquisto-card h3 { margin: 0 0 0.5rem; font-size: 1rem; color: var(--color-accent); }
      .acquisto-card p { margin: 0; font-size: 0.9rem; color: var(--color-fg-muted); }
      .acquisto-cta { text-align: center; }
      .acquisto-cta p { color: var(--color-fg-muted); margin: 0 0 1rem; }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover { background: #4d7a09; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProdottiComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.prodotti$.pipe(
    map((data): ProdottiView => ({
      categorie: data.categorie
        .slice()
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat) => ({
          id: cat.id,
          nome: cat.nome,
          prodotti: data.prodotti.filter((p) => p.categoria === cat.id)
        }))
    }))
  );
}
