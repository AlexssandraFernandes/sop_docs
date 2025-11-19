$(document).ready(function () {
    $.getJSON('/chamados-mensais/', function (data) {
        var options = {
            chart: {
                type: 'bar',
                height: 256
            },
            series: [{
                name: 'Chamados por região',
                data: [
                    data.SolicitacoesNorte,
                    data.SolicitacoesSul,
                    data.SolicitacoesLeste,
                    data.SolicitacoesSudeste,
                    data.SolicitacoesCentro,
                    data.SolicitacoesRural
                ]
            }],
            xaxis: {
                categories: ['Norte', 'Sul', 'Leste', 'Sudeste', 'Centro', 'Rural']
            },
            colors: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#6f42c1'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                }
            },
            fill: {
                opacity: 0.9
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                colors: ['#FFFFFF']
            }
        };

        var chart1 = new ApexCharts(document.querySelector("#chart1"), options);
        chart1.render();

        $('#contagem-solicitacoes-norte').text(`Norte: ${data.SolicitacoesNorte}`);
        $('#contagem-solicitacoes-sul').text(`Sul: ${data.SolicitacoesSul}`);
        $('#contagem-solicitacoes-leste').text(`Leste: ${data.SolicitacoesLeste}`);
        $('#contagem-solicitacoes-sudeste').text(`Sudeste: ${data.SolicitacoesSudeste}`);
        $('#contagem-solicitacoes-centro').text(`Centro: ${data.SolicitacoesCentro}`);
        $('#contagem-solicitacoes-rural').text(`Rural: ${data.SolicitacoesRural}`);
        $('#contagem-solicitacoes-total').text(`Total geral: ${data.SolicitacoesTotal}`);
    });

    $.ajax({
        url: "/solicitacoes-totais/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var options = {
                chart: {
                    type: 'bar',
                    height: 256
                },
                series: [{
                    name: 'Solicitações por Zona',
                    data: [
                        data.SolicitacoesTotaisNorte,
                        data.SolicitacoesTotaisLeste,
                        data.SolicitacoesTotaisSul,
                        data.SolicitacoesTotaisSudeste,
                        data.SolicitacoesTotaisCentro,
                        data.SolicitacoesTotaisRural
                    ]
                }],
                xaxis: {
                    categories: ['Norte', 'Leste', 'Sul', 'Sudeste', 'Centro', 'Rural']
                },
                colors: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    }
                },
                fill: {
                    opacity: 0.9
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2,
                    colors: ['#FFFFFF']
                }
            };

            var chart2 = new ApexCharts(document.querySelector("#chart2"), options);
            chart2.render();
            $('#solicitacoes-totais-norte').text(`Norte: ${data.SolicitacoesTotaisNorte}`);
            $('#solicitacoes-totais-sul').text(`Sul: ${data.SolicitacoesTotaisSul}`);
            $('#solicitacoes-totais-leste').text(`Leste: ${data.SolicitacoesTotaisLeste}`);
            $('#solicitacoes-totais-sudeste').text(`Sudeste: ${data.SolicitacoesTotaisSudeste}`);
            $('#solicitacoes-totais-centro').text(`Centro: ${data.SolicitacoesTotaisCentro}`);
            $('#solicitacoes-totais-rural').text(`Rural: ${data.SolicitacoesTotaisRural}`);
            $('#solicitacoes-totais-total').text(`Total geral: ${data.SolicitacoesTotaisTotal}`);
        },
        error: function (xhr, status, error) {
            console.error("Erro ao carregar os dados do gráfico:", error);
        }
    });

    $.ajax({
        url: "/chamados-mensais-pizza/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var options = {
                chart: {
                    type: 'pie',
                    height: 256
                },
                series: [
                    data.SolicitacoesSolicitado,
                    data.SolicitacoesAprovado,
                    data.SolicitacoesEmAnalise,
                    data.SolicitacoesRecusado
                ],
                labels: ['Solicitado', 'Aprovado', 'Em Análise', 'Recusado'],
                colors: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%'
                        }
                    }
                }]
            };
    
            var chart3 = new ApexCharts(document.querySelector("#chart3"), options);
            chart3.render();
        },
        error: function (xhr, status, error) {
            console.error("Erro ao carregar os dados do gráfico:", error);
        }
    });

    $.ajax({
        url: '/chamados-totais-pizza/',
        method: 'GET',
        dataType: 'json',
        success: function(data) {    
            const solicitados = data.SolicitacoesTotaisSolicitado || 0;
            const aprovados = data.SolicitacoesTotaisAprovado || 0;
            const emAnalise = data.SolicitacoesTotaisEmAnalise || 0;
            const recusados = data.SolicitacoesTotaisRecusado || 0;
    
            if (solicitados === undefined || aprovados === undefined || emAnalise === undefined || recusados === undefined) {
                console.error("Erro: Dados incompletos para o gráfico de pizza.");
                return;
            }
    
            var chartOptions = {
                chart: {
                    type: 'pie',
                    height: 350
                },
                series: [solicitados, aprovados, emAnalise, recusados],
                labels: ['Solicitado', 'Aprovado', 'Em Análise', 'Recusado'],
                colors: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                title: {
                    text: 'Distribuição por Status',
                    align: 'center',
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#333'
                    }
                }
            };
    
            var chart = new ApexCharts(document.querySelector("#chart4"), chartOptions);
            chart.render();
        },
        error: function(xhr, status, error) {
            console.log("Erro na requisição AJAX: " + error);
        }
    });    

    $.ajax({
        url: "/entradas-alunos-mensal/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var labels = Object.keys(data).map(function (date) {
                var parts = date.split('-');
                return parts[1] + '-' + parts[0];
            });
            var values = Object.values(data);
    
            var options = {
                chart: {
                    type: 'bar',
                    height: 256
                },
                series: [{
                    name: 'Alunos',
                    data: values
                }],
                xaxis: {
                    categories: labels
                },
                colors: ['#FF5733', '#FFC300'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    }
                },
                fill: {
                    opacity: 0.9
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2,
                    colors: ['#FFFFFF'],
                }
            };
    
            var chart = new ApexCharts(document.querySelector("#chart-alunos-mensal"), options);
            chart.render();
        },
        error: function (xhr, status, error) {
            console.error("Erro ao carregar os dados do gráfico:", error);
        }
    });

    $.ajax({
        url: "/candidaturas-por-mes/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var labels = Object.keys(data).map(function (date) {
                var parts = date.split('-');
                return parts[1] + '-' + parts[0];
            });
            var values = Object.values(data);
    
            var options = {
                chart: {
                    type: 'bar',
                    height: 256
                },
                series: [{
                    name: 'Candidaturas',
                    data: values
                }],
                xaxis: {
                    categories: labels
                },
                colors: ['#035C8E', '#1081c2'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    }
                },
                fill: {
                    opacity: 0.9
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2,
                    colors: ['#FFFFFF'],
                }
            };
    
            var chart = new ApexCharts(document.querySelector("#chart-candidaturas-mensal"), options);
            chart.render();
        },
        error: function (xhr, status, error) {
            console.error("Erro ao carregar os dados do gráfico:", error);
        }
    });
});