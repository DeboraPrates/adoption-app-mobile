import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { environment } from "../environments/environment"; // Ajuste o caminho se necessário

// Inicializa o app usando a configuração do environment
const app = initializeApp(environment.firebaseConfig);

// Exporta as instâncias prontas para o resto do app usar diretamente
export const auth = getAuth(app);
export const db = getFirestore(app);