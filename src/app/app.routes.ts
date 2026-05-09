import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Masseria del Sole — Agriturismo Bio Salento dal 1850'
  },
  {
    path: 'camere-esperienze',
    loadComponent: () =>
      import('./pages/camere-esperienze/camere-esperienze.component').then(
        (m) => m.CamereEsperienzeComponent
      ),
    title: 'Camere e Esperienze — Masseria del Sole'
  },
  {
    path: 'prodotti',
    loadComponent: () =>
      import('./pages/prodotti/prodotti.component').then((m) => m.ProdottiComponent),
    title: 'Prodotti Bio — Masseria del Sole'
  },
  {
    path: 'chi-siamo',
    loadComponent: () =>
      import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Masseria del Sole'
  },
  {
    path: 'contatti',
    loadComponent: () =>
      import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti e Prenotazioni — Masseria del Sole'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
