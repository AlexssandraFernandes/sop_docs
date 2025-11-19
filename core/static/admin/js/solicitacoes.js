let idParaExcluir = null;

let ascending = true;

$(document).ready(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();

    $('.btn-excluir').on('click', function () {
        idParaExcluir = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    $('#confirmDeleteBtn').on('click', function () {
        if (idParaExcluir) {
            window.location.href = `/excluir-solicitacao/${idParaExcluir}/`;
        }
    });

    $('#sort-id').on('click', function () {
        const rows = $('#solicitacoes-body tr').get();

        rows.sort(function (a, b) {
            const A = parseInt($(a).find('td:first').text());
            const B = parseInt($(b).find('td:first').text());

            if (ascending) {
                return A - B;
            } else {
                return B - A;
            }
        });

        $.each(rows, function (index, row) {
            $('#solicitacoes-body').append(row);
        });

        ascending = !ascending;

        $('#sort-icon')
            .removeClass('icon-chevron-down icon-chevron-up')
            .addClass(ascending ? 'icon-chevron-down' : 'icon-chevron-up');
    });
    
    $('#filtro-situacao').change(function () {
        const situacao = $(this).val();
        const search = $('#search-input').val();
        let url = "/solicitacoes/?";

        if (search) {
            url += "search=" + encodeURIComponent(search) + "&";
        }
        if (situacao) {
            url += "situacao=" + encodeURIComponent(situacao);
        }

        window.location.href = url;
    });

    $('#th-situacao').on('click', function (e) {
        e.stopPropagation();
        $('#filtro-situacao').toggleClass('d-none');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#th-situacao').length) {
            $('#filtro-situacao').addClass('d-none');
        }
    });

});