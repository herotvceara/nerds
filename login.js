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
                
                // Salvar o email do usuário no armazenamento local
                localStorage.setItem('userEmail', email);
                
                // Redirecionar para a página home
                window.location.href = "pagina-home.html";
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
        document.addEventListener("click", function() {
            // Tenta reproduzir o áudio ao clicar em qualquer lugar do documento
            try {
                audio.play().then(function() {
                    // Autoplay iniciado com sucesso
                }).catch(function(error) {
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