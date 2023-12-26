// Configuração do Firebase
const firebaseConfig = {
    // Sua configuração do Firebase aqui
};

firebase.initializeApp(firebaseConfig);

// Inicialização do Firestore
const db = firebase.firestore();

// Adicione aqui o código JavaScript para manipular os dados e interações com a página

// Lógica para exibir os campos de detalhes conforme o tipo de atividade selecionada
document.getElementById("tipoAtividade").addEventListener("change", function() {
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
    .then(function(docRef) {
        console.log("Atividade adicionada com ID: ", docRef.id);
    })
    .catch(function(error) {
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
