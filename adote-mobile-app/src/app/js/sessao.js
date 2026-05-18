import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.js";

// Monitora o usuário
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuário está logado
    console.log("Usuário atual:", user.email);
    // Exiba o painel do usuário, esconda a tela de login
  } else {
    // Usuário está deslogado
    console.log("Nenhum usuário logado.");
    // Redirecione para a tela de login
  }
});

// Função para fazer Logout (Sair)
const deslogar = () => {
  signOut(auth).then(() => {
    console.log("Desconectado com sucesso.");
  });
};