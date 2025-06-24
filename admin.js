document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    let loadingMessageDiv = null; // Variável para armazenar o div da mensagem de carregamento

    // Função para adicionar mensagens ao chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('ai-message');
        }
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para a mensagem mais recente
        return messageDiv; // Retorna o elemento da mensagem para manipulação futura
    }

    // Função para mostrar as bolinhas de carregamento
    function showLoadingDots() {
        loadingMessageDiv = document.createElement('div');
        loadingMessageDiv.classList.add('message', 'ai-message');
        loadingMessageDiv.innerHTML = `
            <div class="loading-animation-container">
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
            </div>
        `;
        chatMessages.appendChild(loadingMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Função para remover as bolinhas de carregamento
    function hideLoadingDots() {
        if (loadingMessageDiv) {
            loadingMessageDiv.remove();
            loadingMessageDiv = null;
        }
    }

    // Função para enviar a mensagem para o backend
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        addMessage(message, 'user');
        messageInput.value = ''; // Limpa o input

        showLoadingDots(); // Mostra as bolinhas de carregamento

        try {
            // URL do seu backend Python
            const response = await fetch('https://Enzzo.pythonanywhere.com/ask_ai', { // Ajuste a URL se seu backend estiver em outro lugar
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            hideLoadingDots(); // Esconde as bolinhas antes de mostrar a resposta
            addMessage(data.reply, 'ai'); // Adiciona a resposta da IA
        } catch (error) {
            console.error('Erro ao comunicar com o backend:', error);
            hideLoadingDots(); // Esconde as bolinhas mesmo em caso de erro
            addMessage('Desculpe, não consegui me conectar com a IA no momento.', 'ai');
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Mensagem inicial da IA
    addMessage('Olá! Como posso ajudar?', 'ai');
});
