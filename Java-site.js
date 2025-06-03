// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Lista de usuários e senhas. Certifique-se de que está correta e que você está testando com os nomes e senhas exatos.
    const usuariosPermitidos = [
        { usuario: 'admin', senha: 'Enzzo.2010', pagina: 'admin.html', tokens: 999999 },
        { usuario: 'grupo-1', senha: 'grupo_1.csj', pagina: 'g1.html', tokens: 2 },
        { usuario: 'grupo-2', senha: 'grupo_2.csj', pagina: 'g2.html', tokens: 2 },
        { usuario: 'grupo-3', senha: 'grupo_3.csj', pagina: 'g3.html', tokens: 2 },
        { usuario: 'grupo-4', senha: 'grupo_4.csj', pagina: 'g4.html', tokens: 2 },
        { usuario: 'grupo-5', senha: 'grupo_5.csj', pagina: 'g5.html', tokens: 2 },
        { usuario: 'grupo-6', senha: 'grupo_6.csj', pagina: 'g6.html', tokens: 2 },
        { usuario: 'grupo-7', senha: 'grupo_7.csj', pagina: 'g7.html', tokens: 2 },
        { usuario: 'grupo-8', senha: 'grupo_8.csj', pagina: 'g8.html', tokens: 2 },
        { usuario: 'grupo-9', senha: 'grupo_9.csj', pagina: 'g9.html', tokens: 2 },
        { usuario: 'grupo-10', senha: 'grupo_10.csj', pagina: 'g10.html', tokens: 2 },
        { usuario: 'grupo-11', senha: 'grupo_11.csj', pagina: 'g11.html', tokens: 2 },
        { usuario: 'grupo-12', senha: 'grupo_12.csj', pagina: 'g12.html', tokens: 2 },
        { usuario: 'grupo-13', senha: 'grupo_13.csj', pagina: 'g13.html', tokens: 2 },
        { usuario: 'grupo-14', senha: 'grupo_14.csj', pagina: 'g14.html', tokens: 2 },
        { usuario: 'grupo-15', senha: 'grupo_15.csj', pagina: 'g15.html', tokens: 2 },
        { usuario: 'grupo-16', senha: 'grupo_16.csj', pagina: 'g16.html', tokens: 2 },
        { usuario: 'grupo-17', senha: 'grupo_17.csj', pagina: 'g17.html', tokens: 2 },
        
        // Verifique se os nomes das páginas estão corretos e existem na mesma pasta do index.html
    ];

    // Certifique-se de que esses IDs correspondem exatamente aos do seu HTML
    const formCadastro = document.getElementById('formCadastro');
    const inputNome = document.getElementById('nome');
    const inputSenha = document.getElementById('senha');
    const mensagemErro = document.getElementById('mensagemErro');
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    // VERIFIQUE SE formCadastro É NULO!
    // Se esta linha estiver logando "null", significa que o ID 'formCadastro' não foi encontrado.
    console.log("Formulário encontrado:", formCadastro);

    // Adiciona um "ouvinte" de evento para quando o formulário for enviado
    if (formCadastro) { // Verifica se o formulário foi encontrado antes de adicionar o listener
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault(); // MUITO IMPORTANTE! Impede o envio padrão do formulário.

            // Limpa mensagens anteriores
            mensagemErro.textContent = '';
            mensagemSucesso.textContent = '';

            const nomeDigitado = inputNome.value.trim();
            const senhaDigitada = inputSenha.value.trim();

            const usuarioEncontrado = usuariosPermitidos.find(user =>
                user.usuario === nomeDigitado && user.senha === senhaDigitada
            );

            if (usuarioEncontrado) {
                mensagemSucesso.textContent = `Bem-vindo(a), ${usuarioEncontrado.usuario}! Redirecionando...`;
                console.log(`Redirecionando para: ${usuarioEncontrado.pagina}`); // Adicione este log para verificar o caminho
                setTimeout(() => {
                    window.location.href = usuarioEncontrado.pagina;
                }, 1500);
            } else {
                mensagemErro.textContent = 'Nome de usuário ou senha inválidos. Tente novamente.';
            }
        });
    } else {
        console.error("Erro: Formulário com ID 'formCadastro' não encontrado. Verifique seu HTML.");
    }
});