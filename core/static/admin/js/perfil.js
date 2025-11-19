$(document).ready(function () {
    $('#telefone').on('input', function () {
        let telefone = $(this).val().replace(/\D/g, '');

        if (telefone.length > 11) {
            telefone = telefone.slice(0, 11);
        }

        if (telefone.length > 10) {
            telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (telefone.length > 6) {
            telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (telefone.length > 2) {
            telefone = telefone.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else {
            telefone = telefone.replace(/^(\d*)$/, '($1');
        }

        $(this).val(telefone);
    });

    $('button[data-submit="perfil"]').on('click', function () {
        const $form = $('form[data-submit-target="perfil"]');
        if ($form.length) {
          $form.submit();
        }
    });
});
