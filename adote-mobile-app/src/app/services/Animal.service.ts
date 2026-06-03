// src/app/services/animal.service.ts
import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collectionData,
  query,
  where,
  orderBy,
  Timestamp,
} from '@angular/fire/firestore';

import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { Animal } from '../model/Animal.model';

import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AnimalService {

  private readonly colecao = 'animais';

  constructor(
    private firestore: Firestore,
    private storage: Storage,
  ) {}

  // ── Upload de foto ──────────────────────────────────────────
  // Recebe um File (do input) e devolve a URL pública no Storage
  async uploadFoto(arquivo: File, nomeAnimal: string): Promise<string> {
    const timestamp  = Date.now();
    const extensao   = arquivo.name.split('.').pop();
    const caminho    = `animais/${nomeAnimal}_${timestamp}.${extensao}`;
    const storageRef = ref(this.storage, caminho);

    await uploadBytes(storageRef, arquivo);
    return getDownloadURL(storageRef);
  }

  // ── Cadastrar animal ────────────────────────────────────────
  async cadastrar(animal: Animal, foto?: File): Promise<string> {
    // 1. faz upload da foto se houver
    if (foto) {
      animal.fotoUrl = await this.uploadFoto(foto, animal.nome);
    }

    // 2. salva no Firestore
    const ref = await addDoc(collection(this.firestore, this.colecao), {
      ...animal,
      status:    'disponivel',
      criadoEm: Timestamp.now(),
    });

    return ref.id; // retorna o ID gerado
  }

  // ── Listar animais disponíveis (para o app do usuário) ──────
  // Retorna um Observable — atualiza automaticamente em tempo real
  listarDisponiveis(): Observable<Animal[]> {
    const q = query(
      collection(this.firestore, this.colecao),
      where('status', '==', 'disponivel'),
      orderBy('criadoEm', 'desc'),
    );
    return collectionData(q, { idField: 'id' }) as Observable<Animal[]>;
  }

  // ── Listar animais de uma instituição específica ─────────────
  listarPorInstituicao(instituicaoId: string): Observable<Animal[]> {
    const q = query(
      collection(this.firestore, this.colecao),
      where('instituicaoId', '==', instituicaoId),
      orderBy('criadoEm', 'desc'),
    );
    return collectionData(q, { idField: 'id' }) as Observable<Animal[]>;
  }

  // ── Atualizar status (ex: quando adoção é aprovada) ─────────
  async atualizarStatus(
    animalId: string,
    status: 'disponivel' | 'em_processo' | 'adotado',
  ): Promise<void> {
    const docRef = doc(this.firestore, this.colecao, animalId);
    await updateDoc(docRef, { status });
  }

  // ── Deletar animal ──────────────────────────────────────────
  async deletar(animalId: string): Promise<void> {
    const docRef = doc(this.firestore, this.colecao, animalId);
    await deleteDoc(docRef);
  }
}