import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>La nostra storia</h1>
        <p>Cinque generazioni della famiglia Greco, 175 anni di olivicoltura nel Salento.</p>
      </div>
    </section>

    <article class="demo-container content">

      <section class="storia">
        <h2>Masseria del Sole, dal 1850</h2>
        <p>
          La Masseria del Sole nasce nel 1850 quando il capostipite Donato Greco acquista 40 ettari di campagna
          nella Valle dei Messapi, tra Corigliano d'Otranto e Melpignano, piantando i primi ulivi della cultivar
          Ogliarola salentina. In quella terra, oggi protetta dai sistemi d'irrigazione non intensiva e dalla
          certificazione biologica, crescono ancora quei stessi ulivi — alcuni già millenari all'epoca dell'acquisto.
        </p>
        <p>
          Per cinque generazioni la famiglia ha custodito il patrimonio olivicolo senza mai cedere all'agricoltura
          intensiva. Nel 2005, Giovanni Greco, agronomo di formazione, avvia la conversione biologica certificata
          dell'intero fondo — oliveto, vigneto, orto e stalla — completata nel 2008 con la certificazione
          IT-BIO-005 secondo il Reg. UE 848/2018.
        </p>
        <p>
          L'agriturismo apre nel 2010, quando la famiglia Greco decide di condividere questo luogo con i viaggiatori
          attenti alla sostenibilità, alla cultura contadina e all'enogastronomia autentica del Salento profondo —
          lontano dai lidi affollati, nel silenzio dei muretti a secco e del vento tra le foglie d'argento degli ulivi.
        </p>
      </section>

      <section class="valori">
        <h2>I nostri valori</h2>
        <ul class="valori-grid">
          <li>
            <h3>Biologico convinto</h3>
            <p>Non siamo bio per marketing. Non usiamo pesticidi, erbicidi né concimi chimici dal 1992, tre anni prima della prima certificazione. Una scelta prima culturale, poi documentata.</p>
          </li>
          <li>
            <h3>Filiera cortissima</h3>
            <p>Dall'oliva all'olio in massimo 24h. Dalla vigna al calice senza additivi tecnologici. Dalle pecore dell'azienda alla ricotta del mattino. Km0 non come slogan, come modo di vivere.</p>
          </li>
          <li>
            <h3>Patrimonio condiviso</h3>
            <p>Gli ulivi millenari non appartengono alla famiglia: la famiglia li custodisce. Aprire la masseria agli ospiti è un modo per condividere questa responsabilità collettiva verso un patrimonio irripetibile.</p>
          </li>
          <li>
            <h3>Ospitalita autentica</h3>
            <p>Non siamo un hotel. Siamo una famiglia che accoglie. La colazione è quella che mangiamo noi, il vino è quello che produciamo noi, la cucina è quella di Rosa — la stessa da 40 anni.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as data">
        <h2>La famiglia</h2>
        <ul class="team-grid">
          <li *ngFor="let m of data.team" class="team-card">
            <div class="team-avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-ruolo">{{ m.ruolo }}</p>
            <p class="team-bio">{{ m.bio }}</p>
            <p class="team-exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as data">
        <h2>Domande frequenti</h2>
        <dl class="faq-list">
          <div *ngFor="let item of data.faq" class="faq-item">
            <dt>{{ item.domanda }}</dt>
            <dd>{{ item.risposta }}</dd>
          </div>
        </dl>
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
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; }
      .content { padding: 3rem 1rem; }
      .storia {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .storia h2 { margin-bottom: 1rem; }
      .storia p { line-height: 1.7; margin-bottom: 1rem; color: var(--color-fg-muted); }
      .storia p:first-of-type { color: var(--color-fg-default); }
      .valori { margin-bottom: 4rem; }
      .valori h2 { text-align: center; margin-bottom: 2rem; }
      .valori-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .valori-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .valori-grid h3 { margin: 0 0 0.5rem; color: var(--color-accent); }
      .valori-grid p { margin: 0; color: var(--color-fg-muted); font-size: 0.9rem; line-height: 1.6; }
      .team { margin-bottom: 4rem; }
      .team h2 { text-align: center; margin-bottom: 2rem; }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 { margin: 0 0 0.25rem; }
      .team-ruolo { margin: 0 0 0.75rem; color: var(--color-accent); font-weight: 600; font-size: 0.9rem; }
      .team-bio { font-size: 0.9rem; color: var(--color-fg-muted); margin-bottom: 0.5rem; text-align: left; line-height: 1.6; }
      .team-exp { font-size: 0.8rem; font-weight: 600; margin-bottom: 0.75rem; }
      .team-skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-skills li {
        font-size: 0.7rem;
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
      }
      .faq h2 { margin-bottom: 1.5rem; }
      .faq-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .faq-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .faq-item dt {
        background: var(--color-bg-subtle);
        padding: 1rem 1.25rem;
        font-weight: 600;
        font-size: 0.95rem;
      }
      .faq-item dd {
        padding: 1rem 1.25rem;
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.7;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
