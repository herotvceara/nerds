// scripts/servidor.js

// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2WL1y3hRd1YLHjXPUG7bQzJ6s8pH4Ob8",
  authDomain: "isaacplay-a0452.firebaseapp.com",
  projectId: "isaacplay-a0452",
  storageBucket: "isaacplay-a0452.appspot.com",
  messagingSenderId: "631970859391",
  appId: "1:631970859391:web:c9b1526fa6495a2d3c324a"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para buscar e organizar filmes por categoria
export async function getFilmes() {
  try {
    const filmesSnapshot = await getDocs(collection(db, 'Filmes'));
    const categorias = {};

    filmesSnapshot.forEach(doc => {
      const { Categoria, Capa, ...data } = doc.data(); // Acessa a string `Capa`
      if (Categoria) {
        if (!categorias[Categoria]) {
          categorias[Categoria] = [];
        }
        categorias[Categoria].push({ id: doc.id, Capa, ...data }); // Inclui o id e a Capa
      } else {
        console.warn(`O documento ${doc.id} não possui uma categoria definida.`);
      }
    });

    // Converte o dicionário em um array
    return Object.entries(categorias).map(([categoria, filmes]) => ({ categoria, filmes }));
  } catch (error) {
    console.error("Erro ao buscar filmes: ", error);
    return [];
  }
}

// Chama a função e imprime os filmes organizados no console
getFilmes().then(filmes => console.log("Filmes:", filmes));
   