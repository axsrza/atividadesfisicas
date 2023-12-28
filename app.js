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

// Configurar adaptador de tempo com Moment.js
const ChartTime = {
    id: 'time',
    adapters: {
        date: {
            parser: 'moment',
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

// Lógica para exibir os campos de detalhes conforme o tipo de atividade selecionada
document.getElementById("tipoAtividade").addEventListener("change", function () {
    const tipoAtividade = this.value;

    document.getElementById("detalhesCaminhada").style.display = tipoAtividade === "caminhada" ? "block" : "none";
    document.getElementById("detalhesPedalada").style.display = tipoAtividade === "pedalada" ? "block" : "none";
    document.getElementById("detalhesPassos").style.display = tipoAtividade === "passos" ? "block" : "none";
});

// Lógica para adicionar atividade
function adicionarAtividade() {
    // ... (o restante da lógica para adicionar atividade permanece inalterado) ...
}

// Função para limpar campos do formulário (opcional)
function limparCampos() {
    // ... (o restante da lógica para limpar campos permanece inalterado) ...
}

// Lógica para exibir gráficos
function exibirGraficos() {
    // ... (o restante da lógica para exibir gráficos permanece inalterado) ...
}

// Função para criar gráfico usando Chart.js
function criarGrafico(idCanvas, label, dados) {
    // ... (o restante da lógica para criar gráfico permanece inalterado) ...
}

// Chamar a função para exibir os gráficos após o DOM ser completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    Chart.register(ChartTime);  // Certifique-se de que está registrado antes de exibir os gráficos
    exibirGraficos();

    // Adicionar evento de clique ao botão de adicionar atividade
    document.getElementById("adicionarAtividadeBtn").addEventListener("click", adicionarAtividade);
});
