const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Escreva a descrição da vaga...',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link']
        ]
    }
});

quill.on('text-change', function () {
    document.getElementById('descricao').value = quill.root.innerHTML;
});

document.querySelector('form').addEventListener('submit', function () {
    document.getElementById('descricao').value = quill.root.innerHTML;
});