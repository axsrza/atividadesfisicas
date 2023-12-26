// Configuração do Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Inicialização do Firestore
const db = firebase.firestore();

// Adicione aqui o código JavaScript para manipular os dados e interações com a página
// Lembre-se de incluir lógica para adicionar, recuperar e exibir dados no Firestore

// Exemplo básico para adicionar dados
function adicionarAtividade(tipo, detalhes, data) {
    db.collection("atividades").add({
        tipo: tipo,
        detalhes: detalhes,
        data: data
    })
    .then(function(docRef) {
        console.log("Atividade adicionada com ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Erro ao adicionar atividade: ", error);
    });
}
