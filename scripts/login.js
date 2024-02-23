// Função para registrar um novo usuário
function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorMessageContainer = document.getElementById('error-message');

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            console.log("Usuário registrado com sucesso");
            errorMessageContainer.innerText = ""; // Limpa a mensagem de erro

            // Verifica o nome do usuário no Firestore
            checkUserNameAndRedirect(email.split('@')[0]);
        })
        .catch((error) => {
            // Tratar erros de registro
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage); // Exibe o código e a mensagem de erro
            errorMessageContainer.innerText = errorMessage; // Exibe a mensagem de erro na caixa de texto
        });
}

// Função para fazer login
function login() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var errorMessageContainer = document.getElementById('login-error-message');

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Sucesso no login
            console.log("Login bem-sucedido");
            errorMessageContainer.innerText = ""; // Limpa a mensagem de erro

            // Obtenha o usuário atualmente autenticado
            var user = userCredential.user;

            // Inicializa o Firestore
            var db = firebase.firestore();

            // Referência à coleção 'usuarios'
            var usuariosRef = db.collection('usuarios');

            // Consulta para obter a quantidade atual de usuários
            usuariosRef.get()
                .then((querySnapshot) => {
                    var quantidadeUsuarios = querySnapshot.size;

                    // Cria um novo usuário com o ID baseado na quantidade atual de usuários
                    var usuario = {
                        id: quantidadeUsuarios + 1,
                        nome: email.split('@')[0],
                        email: email,
                        // Adicione outras propriedades conforme necessário
                    };

                    // Adiciona o documento com o novo ID
                    usuariosRef.doc(user.uid).set(usuario)
                        .then(() => {
                            console.log("Usuário adicionado com sucesso");

                            // Redirecionar para a página home após a adição do usuário
                            window.location.href = "home.html";
                        })
                        .catch((error) => {
                            console.error("Erro ao adicionar usuário:", error);
                        });
                })
                .catch((error) => {
                    console.error("Erro ao obter quantidade de usuários", error);
                    errorMessageContainer.innerText = "Erro ao obter quantidade de usuários";
                });
        })
        .catch((error) => {
            // Tratar erros de login
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage); // Exibe o código e a mensagem de erro
            errorMessageContainer.innerText = errorMessage; // Exibe a mensagem de erro na caixa de texto
        });
}



//som do login
var audio = document.getElementById("backgroundAudio");

// Adiciona um ouvinte de eventos ao documento
document.addEventListener("click", function () {
    // Tenta reproduzir o áudio ao clicar em qualquer lugar do documento
    try {
        audio.play().then(function () {
            // Autoplay iniciado com sucesso
        }).catch(function (error) {
            // Tratamento de erro
            console.error("Erro ao reproduzir áudio automaticamente:", error);
        });

        // Remove o ouvinte de eventos após a primeira interação do usuário
        document.removeEventListener("click", arguments.callee);
    } catch (error) {
        // Se ocorrer um erro ao reproduzir o áudio, ele será capturado aqui
        console.error("Erro ao reproduzir áudio:", error);
    }
});

function toggleAudio() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
