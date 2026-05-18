import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

const cadastrarUsuario = async (email, senha) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    console.log("Usuário cadastrado com sucesso:", user.uid);

    return user;

  } catch (error) {
    console.error("Erro ao cadastrar:", error.code, error.message);
    
    // Exemplo de tratamento de erro comum:
    if (error.code === 'auth/email-already-in-use') {
      alert('Este e-mail já está em uso.');
    }
  }
};