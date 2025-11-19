$(document).ready(function () {
    // === Inicializa o editor Quill ===
    var quill = new Quill('#editor-mensagem', {
        theme: 'snow',
        placeholder: 'Digite sua mensagem...',
        modules: {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
            ]
        }
    });

    // Inicializa textarea oculta
    var conteudo = $('#conteudo').val();
    quill.clipboard.dangerouslyPasteHTML(conteudo || "");
    $('#conteudo').val(conteudo);

    quill.on('text-change', function () {
        $('#conteudo').val(quill.root.innerHTML);
    });

    // === CONFIGURAÇÃO DO WEBSOCKET ===
    const chatContainer = $("#chat-container");
    const chamadoId = chatContainer.data("chamado-id");
    const currentUser = chatContainer.data("current-user");
    const autorPerfilId = chatContainer.data("autor-perfil-id");

    const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
    const socketUrl = protocol + window.location.host + "/ws/chat/" + chamadoId + "/";

    const chatSocket = new WebSocket(socketUrl);
    const chatBody = $("#chat-messages");

    // === Função auxiliar para remover mensagem de placeholder ===
    function removePlaceholder() {
        const noMessages = document.getElementById('no-messages');
        if (noMessages) noMessages.remove();
    }

    // === RECEBE MENSAGENS DO CHAT EM TEMPO REAL ===
    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        removePlaceholder();

        const isSelf = data.user === currentUser || data.is_self;
        const mensagemHtml = `
            <div class="mb-3 ${isSelf ? 'text-end' : ''}">
                <div class="d-inline-block p-2 rounded ${isSelf ? 'bg-primary text-white' : 'bg-light'}">
                    <small><strong>${data.first_name || data.user}</strong></small><br>
                    ${data.message}
                </div><br>
                <small class="text-muted">${new Date().toLocaleString('pt-BR')}</small>
            </div>
        `;

        chatBody.append(mensagemHtml);
        chatBody.scrollTop(chatBody[0].scrollHeight);
    };

    chatSocket.onclose = function (e) {
        console.error("🚫 Conexão WebSocket fechada:", e);
    };

    // === Função auxiliar para pegar o cookie CSRF ===
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // === ENVIO DE MENSAGEM ===
    $("form[data-submit-target='detalhar-chamado']").on("submit", async function (e) {
        e.preventDefault();

        const message = $("#conteudo").val().trim();
        if (!message) {
            console.warn("⚠️ Mensagem vazia, nada enviado");
            return;
        }

        const csrftoken = getCookie('csrftoken');

        try {
            const response = await fetch("/ajax/enviar-mensagem/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken
                },
                body: JSON.stringify({
                    chamado_id: chamadoId,
                    autor_perfil_id: autorPerfilId,
                    conteudo: message
                })
            });

            if (!response.ok) {
                console.error("❌ Erro HTTP:", response.status);
                alert("Erro ao enviar mensagem. Status: " + response.status);
                return;
            }

            const data = await response.json();

            if (data.status === "sucesso") {
                if (chatSocket.readyState === WebSocket.OPEN) {
                    removePlaceholder();
                    chatSocket.send(JSON.stringify({ "message": message }));
                    quill.root.innerHTML = "";
                    $('#conteudo').val("");
                } else {
                    console.error("❌ WebSocket não está conectado.");
                }
            } else {
                console.warn("⚠️ API retornou erro:", data.mensagem);
                alert("Falha: " + data.mensagem);
            }

        } catch (error) {
            console.error("🚨 Erro na requisição AJAX:", error);
            alert("Erro inesperado ao enviar mensagem.");
        }
    });

    // Mantém compatibilidade com o form "abrir-chamado"
    $("form[data-submit-target='abrir-chamado']").on("submit", function () {
        $('#conteudo').val(quill.root.innerHTML);
    });
});
