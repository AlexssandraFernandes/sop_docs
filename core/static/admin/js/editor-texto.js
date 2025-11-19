$(document).ready(function () {
    var quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Digite a descrição do curso...',
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

    // Pega o conteúdo HTML cru do atributo data-conteudo
    var conteudo = document.getElementById('editor').dataset.conteudo;

    // Define o conteúdo do Quill
    quill.root.innerHTML = conteudo;

    // Inicializa o textarea
    $('#conteudo').val(conteudo);

    // Sincroniza o Quill com o textarea
    quill.on('text-change', function () {
        $('#conteudo').val(quill.root.innerHTML);
    });

    $("form[data-submit-target='curso']").on("submit", function () {
        $('#conteudo').val(quill.root.innerHTML);
    });
});
