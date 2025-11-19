$(document).ready(function () {
    // =========================
    // CONFIGURAÇÃO DO QUILL EDITOR
    // =========================
    var quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Descreva o problema ou solicitação...',
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

    var descricao = $('#descricao').val();
    quill.clipboard.dangerouslyPasteHTML(descricao || "");
    $('#descricao').val(descricao);

    quill.on('text-change', function () {
        $('#descricao').val(quill.root.innerHTML);
    });

    $("form[data-submit-target='abrir-chamado']").on("submit", function () {
        $('#descricao').val(quill.root.innerHTML);
    });

    // =========================
    // FILTRO DE CATEGORIAS POR SETOR
    // =========================
    function filtrarCategorias() {
        var setorSelecionado = $('#setor_destino_id').val();

        $('#categoria_id option').each(function() {
            var setor = $(this).data('setor');

            if ($(this).val() === "") {
                $(this).show();
                return;
            }

            if (setor.toString() === setorSelecionado) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        $('#categoria_id').val('');
    }

    filtrarCategorias();

    $('#setor_destino_id').on('change', filtrarCategorias);
});
