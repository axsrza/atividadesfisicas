// Sua configuração Firebase para o aplicativo da web
var firebaseConfig = {
    apiKey: "AIzaSyAohbxWMgVo48A6QDh-_fjP2c2MZzmqJL4",
    authDomain: "atividadesfisicas-e9c51.firebaseapp.com",
    projectId: "atividadesfisicas-e9c51",
    storageBucket: "atividadesfisicas-e9c51.appspot.com",
    messagingSenderId: "785815132104",
    appId: "785815132104"
};

// Inicialize o Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);  // Inicialize o Firestore

// Lógica para exibir os campos de detalhes conforme o tipo de atividade selecionada
document.getElementById("tipoAtividade").addEventListener("change", function () {
    var tipoAtividade = this.value;

    document.getElementById("detalhesCaminhada").style.display = tipoAtividade === "caminhada" ? "block" : "none";
    document.getElementById("detalhesPedalada").style.display = tipoAtividade === "pedalada" ? "block" : "none";
    document.getElementById("detalhesPassos").style.display = tipoAtividade === "passos" ? "block" : "none";
});

// Lógica para adicionar atividade
function adicionarAtividade() {
    var tipoAtividade = document.getElementById("tipoAtividade").value;
    var data = new Date();

    var detalhes;
    if (tipoAtividade === "caminhada") {
        var km = parseFloat(document.getElementById("km").value);
        var tempo = parseInt(document.getElementById("tempo").value);
        detalhes = { km: km, tempo: tempo };
    } else if (tipoAtividade === "pedalada") {
        var kmPedalada = parseFloat(document.getElementById("kmPedalada").value);
        var tempoPedalada = parseInt(document.getElementById("tempoPedalada").value);
        detalhes = { kmPedalada: kmPedalada, tempoPedalada: tempoPedalada };
    } else if (tipoAtividade === "passos") {
        var passos = parseInt(document.getElementById("passos").value);
        detalhes = { passos: passos };
    }

    // Adicionar atividade ao Firestore
    firebase.firestore().collection("atividades").add({
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
    // Recuperar dados do Firestore
    db.collection("atividades").get().then((querySnapshot) => {
        var dadosCaminhada = [];
        var dadosPedalada = [];
        var dadosPassos = [];

        querySnapshot.forEach((doc) => {
            var atividade = doc.data();
            var data = atividade.data.toDate();

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
    var ctx = document.getElementById(idCanvas).getContext('2d');
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
