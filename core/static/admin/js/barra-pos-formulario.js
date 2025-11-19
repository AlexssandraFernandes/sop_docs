$(document).ready(function () {
    const $form = $("form[data-submit-target]");
    const $progressContainer = $("#progress-container");
    const $progressBar = $progressContainer.find(".progress-bar");

    if ($form.length && $progressContainer.length && $progressBar.length) {
        $form.on("submit", function (e) {
            e.preventDefault();
            const data = new FormData(this);

            // Esconde o formulário e mostra a barra de progresso
            $form.addClass("d-none");
            $progressContainer.removeClass("d-none");
            $progressBar.addClass("progress-bar-animated").css("width", "100%").text("Carregando...");

            // Envio via AJAX
            $.ajax({
                url: "",
                type: "POST",
                data: data,
                processData: false,
                contentType: false,
                headers: { "X-Requested-With": "XMLHttpRequest" },
                success: function (result) {
                    // Atualiza barra de progresso conforme resultado
                    $progressBar.removeClass("progress-bar-animated")
                        .addClass(result.success ? "bg-success" : "bg-danger")
                        .text(result.success ? "Concluído!" : "Falha!");

                    // Exibe modal com feedback
                    $("#feedbackModalBody").text(result.message);
                    const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
                    feedbackModal.show();

                    if (result.success) {
                        $form[0].reset();
                        // Redireciona após 1.5s
                        setTimeout(() => {
                            window.location.href = "/chamados/";
                        }, 1500);
                    }
                },
                error: function () {
                    $progressBar.removeClass("progress-bar-animated")
                        .addClass("bg-danger")
                        .text("Erro de conexão!");
                    $("#feedbackModalBody").text("Erro de conexão. Tente novamente.");
                    const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
                    feedbackModal.show();
                },
                complete: function () {
                    // Reset visual da barra de progresso após 2s
                    setTimeout(() => {
                        $progressContainer.addClass("d-none");
                        $form.removeClass("d-none");
                        $progressBar.removeClass("bg-success bg-danger").addClass("progress-bar-animated").text("Carregando...");
                    }, 2000);
                }
            });
        });
    }

    // Inicialização de texto da barra de progresso
    if ($form.length && $progressContainer.length) {
        const target = $form.data("submit-target");
        const genero = target.endsWith("a") ? "nova" : "novo";
        $progressBar.text("Carregando...");
    }
});
