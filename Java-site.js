// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Lista de usuários e senhas. Certifique-se de que está correta e que você está testando com os nomes e senhas exatos.
    const usuariosPermitidos = [
        { usuario: 'admin', senha: 'Enzzo.2010', pagina: 'admin.html'},
        { usuario: 'grupo-1', senha: '12867512', pagina: 'admin.html'},
        { usuario: 'grupo-2', senha: '43685311', pagina: 'admin.html'},
        { usuario: 'grupo-3', senha: '87341234', pagina: 'admin.html'},
        { usuario: 'teste', senha: '1234', pagina: 'admin.html'}
        
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
