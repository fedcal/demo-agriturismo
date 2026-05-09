import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti e Prenotazioni</h1>
        <p>Prenota una camera, un'esperienza, o ordina i nostri prodotti biologici.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">

        <section class="info-block">
          <h2>Dove siamo</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </p>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">
                {{ info.contatti.whatsapp }}
              </a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Check-in / Check-out</h2>
          <ul class="hours-list">
            <li><span>Check-in</span><span>{{ info.orari.checkIn }}</span></li>
            <li><span>Check-out</span><span>{{ info.orari.checkOut }}</span></li>
            <li><span>Colazione</span><span>{{ info.orari.ristoranteAColazione }}</span></li>
            <li><span>Cena</span><span>{{ info.orari.ristoranteACena }}</span></li>
          </ul>

          <h2>Certificazione bio</h2>
          <p class="bio-info">{{ info.certificazioneBio }}</p>
        </section>

        <section class="form-block">
          <h2>Richiesta di prenotazione</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome *</label>
              <input id="nome" type="text" formControlName="nome" required />
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" required />
            </div>
            <div class="field">
              <label for="telefono">Telefono *</label>
              <input id="telefono" type="tel" formControlName="telefono" required />
            </div>
            <div class="row">
              <div class="field">
                <label for="checkIn">Check-in *</label>
                <input id="checkIn" type="date" formControlName="checkIn" required />
              </div>
              <div class="field">
                <label for="checkOut">Check-out *</label>
                <input id="checkOut" type="date" formControlName="checkOut" required />
              </div>
              <div class="field">
                <label for="ospiti">Ospiti *</label>
                <input id="ospiti" type="number" formControlName="ospiti" min="1" max="10" required />
              </div>
            </div>
            <div class="field">
              <label for="esperienze">Esperienze di interesse (opzionale)</label>
              <select id="esperienze" formControlName="esperienze" multiple>
                <option value="cooking-class">Cooking Class Salentina (+€65/pers)</option>
                <option value="wine-tasting">Wine Tasting (+€35/pers)</option>
                <option value="raccolta-olive">Raccolta Olive (+€25/pers) — solo ott/nov</option>
                <option value="tour-ulivi">Tour Ulivi Monumentali (+€20/pers)</option>
              </select>
              <p class="field-hint">Tieni premuto Ctrl (o Cmd su Mac) per selezionare più opzioni.</p>
            </div>
            <div class="field">
              <label for="note">Note (preferenze camera, allergie, richieste speciali)</label>
              <textarea id="note" formControlName="note" rows="3"></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali per la richiesta di prenotazione.
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna prenotazione è realmente inviata.
              Per prenotare contatta la masseria al numero indicato o via WhatsApp.
            </p>
          </form>
          <ng-template #thankyou>
            <div class="thankyou">
              <p class="thankyou-icon" aria-hidden="true">🌿</p>
              <h3>Grazie {{ form.value['nome'] }}!</h3>
              <p>
                La tua richiesta per {{ form.value['ospiti'] }} ospiti dal
                {{ form.value['checkIn'] }} al {{ form.value['checkOut'] }} è stata simulata.
              </p>
              <p>In un sito reale riceveresti un'email di conferma entro 24h con disponibilita e caparra.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 { margin: 1.5rem 0 0.75rem; font-size: 1.1rem; }
      .info-block h2:first-child { margin-top: 0; }
      .contact-list { list-style: none; padding: 0; margin: 0; }
      .contact-list li { margin-bottom: 0.5rem; font-size: 0.95rem; }
      .contact-list a { color: var(--color-accent); }
      .hours-list { list-style: none; padding: 0; margin: 0; }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .bio-info {
        font-size: 0.85rem;
        background: #ecfccb;
        color: #365314;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-sm);
        border: 1px solid #bef264;
        margin: 0;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 { margin: 0 0 1.5rem; }
      .field { margin-bottom: 1rem; display: flex; flex-direction: column; }
      .field label { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem; }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field select { min-height: 100px; }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field-hint { font-size: 0.78rem; color: var(--color-fg-muted); margin: 0.25rem 0 0; font-style: italic; }
      .field--checkbox { flex-direction: row; align-items: flex-start; gap: 0.5rem; }
      .field--checkbox label { font-weight: 400; font-size: 0.85rem; color: var(--color-fg-muted); }
      .row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-primary:not(:disabled):hover { background: #4d7a09; }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou { text-align: center; padding: 1rem 0; }
      .thankyou-icon { font-size: 3rem; margin: 0 0 0.5rem; }
      .thankyou h3 { color: var(--color-accent); margin: 0 0 1rem; }
      .thankyou p { color: var(--color-fg-muted); margin: 0 0 0.75rem; font-size: 0.95rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    ospiti: [2, [Validators.required, Validators.min(1), Validators.max(10)]],
    esperienze: [[]],
    note: [''],
    privacy: [false, Validators.requiredTrue]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ ospiti: 2, esperienze: [], privacy: false });
    this.submitted.set(false);
  }
}
