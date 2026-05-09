import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type {
  InfoAttivita,
  CamereData,
  ProdottiData,
  EsperienzeData,
  TeamData,
  FaqData
} from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoAttivita> = this.http
    .get<InfoAttivita>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly camere$: Observable<CamereData> = this.http
    .get<CamereData>('/assets/mock/camere.json')
    .pipe(shareReplay(1));

  readonly prodotti$: Observable<ProdottiData> = this.http
    .get<ProdottiData>('/assets/mock/prodotti.json')
    .pipe(shareReplay(1));

  readonly esperienze$: Observable<EsperienzeData> = this.http
    .get<EsperienzeData>('/assets/mock/esperienze.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<TeamData> = this.http
    .get<TeamData>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<FaqData> = this.http
    .get<FaqData>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
