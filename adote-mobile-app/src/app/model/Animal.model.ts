// src/app/models/animal.model.ts

export interface Animal {
  id?: string;                          // gerado pelo Firestore
  nome: string;
  especie: 'gato' | 'cachorro' | 'coelho' | 'tartaruga' | '';
  sexo: 'femea' | 'macho' | '';
  faixaEtaria: 'filhote' | 'adulto' | 'idoso' | '';
  castrado: boolean | null;
  comportamento?: string;
  preferencias?: string;
  condicaoMedica: boolean | null;
  descricaoCondicao?: string;
  fotoUrl?: string;                     // URL do Firebase Storage
  status: 'disponivel' | 'em_processo' | 'adotado';
  instituicaoId: string;               // ID da instituição que cadastrou
  criadoEm?: Date;
}