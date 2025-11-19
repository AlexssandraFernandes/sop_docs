$(document).ready(function () {
    const $estadoSelect = $("#estado");
    const $cidadeSelect = $("#cidade");

    // Carregar estados
    $.getJSON("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome", function (estados) {
        $.each(estados, function (i, estado) {
            $estadoSelect.append($("<option>", { value: estado.sigla, text: estado.nome }));
        });
    });

    // Quando mudar o estado, carregar cidades
    $estadoSelect.on("change", function () {
        let uf = $(this).val();
        $cidadeSelect.html(''); // Limpa opções

        if (uf) {
            $.getJSON(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`, function (cidades) {
                $.each(cidades, function (i, cidade) {
                    $cidadeSelect.append($("<option>", { value: cidade.nome, text: cidade.nome }));
                });
                $cidadeSelect.trigger('change'); // Atualiza Select2
            });
        }
    });

    // Inicializa Select2 para cidades
    $('#cidade').select2({
        placeholder: "Selecione as cidades",
        allowClear: true,
        width: '100%'
    });

    // Formatar CPF
    $('#cpf').on('input', function () {
        let cpf = $(this).val().replace(/\D/g, '');
        if (cpf.length > 11) cpf = cpf.slice(0, 11);

        if (cpf.length <= 6) $(this).val(cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2'));
        else if (cpf.length <= 9) $(this).val(cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3'));
        else $(this).val(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4'));
    });

    // Validar CPF
    $('#cpf').on('blur', function () {
        let cpf = $(this).val().replace(/\D/g, '');
        if (cpf.length === 11 && !validarCPF(cpf)) {
            alert('CPF inválido!');
            $(this).val('');
        }
    });

    function validarCPF(cpf) {
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf[10]);
    }
});
