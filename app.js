// Sua configuração Firebase para o aplicativo da web
const firebaseConfig = {
    apiKey: "AIzaSyAohbxWMgVo48A6QDh-_fjP2c2MZzmqJL4",
    authDomain: "atividadesfisicas-e9c51.firebaseapp.com",
    projectId: "atividadesfisicas-e9c51",
    storageBucket: "atividadesfisicas-e9c51.appspot.com",
    messagingSenderId: "785815132104",
    appId: "785815132104"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();  // Inicialize o Firestore

// Configurar adaptador de tempo
const ChartTime = {
    id: 'time',
    afterBuildTicks: (scale, ticks) => {
        const [min, max] = scale.getMinMax(true);
        const year = new Date(max).getFullYear();
        ticks.forEach((tick) => {
            tick.major = tick.value % new Date(year, 0, 1).getTime() === 0;
        });
    },
    adapters: {
        date: {
            inputTimeUnit: 'millisecond',
            parser: 'time',
            round: 'time',
            isoWeekday: false,
            unit: false,
            displayFormats: {
                millisecond: 'SSS [ms]',
                second: 'h:mm:ss a',
                minute: 'h:mm a',
                hour: 'hA',
                day: 'MMM D',
                week: 'll',
                month: 'MMM YYYY',
                quarter: '[Q]Q - YYYY',
                year: 'YYYY',
            },
        },
    },
};

document.addEventListener("DOMContentLoaded", function () {
    // Lógica para exibir os campos de detalhes conforme o tipo de atividade selecionada
    document.getElementById("tipoAtividade").addEventListener("change", function () {
        const tipoAtividade = this.value;

        document.getElementById("detalhesCaminhada").style.display = tipoAtividade === "caminhada" ? "block" : "none";
        document.getElementById("detalhesPedalada").style.display = tipoAtividade === "pedalada" ? "block" : "none";
        document.getElementById("detalhesPassos").style.display = tipoAtividade === "passos" ? "block" : "none";
    });

    // Lógica para adicionar atividade
    function adicionarAtividade() {
        const tipoAtividade = document.getElementById("tipoAtividade").value;
        const data = new Date();

        let detalhes;
        if (tipoAtividade === "caminhada") {
            const km = parseFloat(document.getElementById("km").value);
            const tempo = parseInt(document.getElementById("tempo").value);
            detalhes = { km, tempo };
        } else if (tipoAtividade === "pedalada") {
            const kmPedalada = parseFloat(document.getElementById("kmPedalada").value);
            const tempoPedalada = parseInt(document.getElementById("tempoPedalada").value);
            detalhes = { kmPedalada, tempoPedalada };
        } else if (tipoAtividade === "passos") {
            const passos = parseInt(document.getElementById("passos").value);
            detalhes = { passos };
        }

        // Adicionar atividade ao Firestore
        db.collection("atividades").add({
            tipo: tipoAtividade,
            detalhes: detalhes,
            data: data
        })
            .then(function (docRef) {
                console.log("Atividade adicionada com ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Erro ao adicionar atividade: ", error);
            });

        // Limpar campos após adicionar atividade (opcional)
        limparCampos();
    }

    // Função para limpar campos do formulário (opcional)
    function limparCampos() {
        document.getElementById("km").value = "";
        document.getElementById("tempo").value = "";
        document.getElementById("kmPedalada").value = "";
        document.getElementById("tempoPedalada").value = "";
        document.getElementById("passos").value = "";
    }

    // Lógica para exibir gráficos
    function exibirGraficos() {
        // Configurar adaptador de data
        Chart.register(ChartTime);

        // Recuperar dados do Firestore
        db.collection("atividades").get().then((querySnapshot) => {
            const dadosCaminhada = [];
            const dadosPedalada = [];
            const dadosPassos = [];

            querySnapshot.forEach((doc) => {
                const atividade = doc.data();
                const data = atividade.data.toDate();

                if (atividade.tipo === "caminhada") {
                    dadosCaminhada.push({
                        x: data,
                        y: atividade.detalhes.km
                    });
                } else if (atividade.tipo === "pedalada") {
                    dadosPedalada.push({
                        x: data,
                        y: atividade.detalhes.kmPedalada
                    });
                } else if (atividade.tipo === "passos") {
                    dadosPassos.push({
                        x: data,
                        y: atividade.detalhes.passos
                    });
                }
            });

            // Criar gráfico de caminhada
            criarGrafico("graficoCaminhada", "Caminhada", dadosCaminhada);

            // Criar gráfico de pedalada
            criarGrafico("graficoPedalada", "Pedalada", dadosPedalada);

            // Criar gráfico de passos
            criarGrafico("graficoPassos", "Passos", dadosPassos);
        });
    }

    // Função para criar gráfico usando Chart.js
    function criarGrafico(idCanvas, label, dados) {
        const ctx = document.getElementById(idCanvas).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: label,
                    data: dados,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Data'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: label === 'Passos' ? 'Quantidade de Passos' : 'Distância (KM)'
                        }
                    }
                }
            }
        });
    }

    // Chamar a função para exibir os gráficos
    exibirGraficos();

    // Adicionar evento de clique ao botão de adicionar atividade
    document.getElementById("adicionarAtividadeBtn").addEventListener("click", adicionarAtividade);
});
