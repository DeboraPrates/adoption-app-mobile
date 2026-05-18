import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

const logarUsuario = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    console.log("Usuário logado:", userCredential.user);

  } catch (error) {
    console.error("Erro ao logar:", error.code, error.message);
    if (error.code === 'auth/invalid-credential') {
      alert('E-mail ou senha incorretos.');
    }
  }
};