// Tipi TypeScript per i dati mock di Masseria del Sole Agriturismo

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariMasseria {
  checkIn: string;
  checkOut: string;
  ristoranteAColazione: string;
  ristoranteACena: string;
}

export interface ServiziMasseria {
  piscina: boolean;
  parcheggioGratuito: boolean;
  wifiGratuito: boolean;
  ariaCondizionata: boolean;
  accessibileDisabili: boolean;
  petFriendly: boolean;
  colazioneBiologica: boolean;
  ristoranteAzienda: boolean;
  venditaProdotti: boolean;
  ettariOliveto: number;
  ettariVigneto: number;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  certificazioneBio: string;
  anniFondazione: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariMasseria;
  servizi: ServiziMasseria;
  metaSeo: MetaSeo;
}

// Camere
export interface Camera {
  id: number;
  nome: string;
  tipologia: 'camera_doppia' | 'suite' | 'trullo' | 'lamia';
  descrizione: string;
  superficieMq: number;
  capienza: number;
  prezzoNotte: number;
  servizi: string[];
  immagine: string;
  featured: boolean;
}

export interface CamereData {
  camere: Camera[];
}

// Prodotti
export interface CategoriaProdotto {
  id: string;
  nome: string;
  ordine: number;
}

export interface Prodotto {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  formato: string;
  prezzo: number;
  certificazione: string;
  featured: boolean;
}

export interface ProdottiData {
  categorie: CategoriaProdotto[];
  prodotti: Prodotto[];
}

// Esperienze
export interface Esperienza {
  id: number;
  nome: string;
  categoria: 'cucina' | 'vino' | 'agricoltura' | 'natura';
  descrizione: string;
  durata: string;
  orario: string;
  prezzo: number;
  paxMinimo: number;
  paxMassimo: number;
  incluso: string[];
  disponibilita: string[];
  certificazione: string;
  stagionale?: boolean;
  featured: boolean;
}

export interface EsperienzeData {
  esperienze: Esperienza[];
}

// Team
export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  image: string;
  specialita: string[];
}

export interface TeamData {
  team: MembroTeam[];
}

// FAQ
export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}
