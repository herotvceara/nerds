// Função para inicializar e acessar o Firebase


    // Referência à coleção "Clientes"
    const clientesCollection = collection(db, "Clientes");

    try {
      // Obtenha os documentos da coleção e liste no console
      const querySnapshot = await getDocs(clientesCollection);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error("Erro ao obter documentos: ", error);
    }
  }

  // Chame a função para acessar o Firebase
  acessarFirebase();