// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxRtBKKQQo0pJlGjMUwxO5R1anvDTR8kI",
    authDomain: "order-e261b.firebaseapp.com",
    projectId: "order-e261b",
    storageBucket: "order-e261b.appspot.com",
    messagingSenderId: "639561321343",
    appId: "1:639561321343:web:9808195b35f2676d50284a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referência ao nó de "pedidos"
const pedidosRef = ref(database, 'pedidos');

// Função para carregar pedidos em tempo real
function carregarPedidos() {
    onValue(pedidosRef, (snapshot) => {
        const data = snapshot.val();
        const lista = document.getElementById('listaPedidos');
        lista.innerHTML = '';  // Limpa a lista antes de adicionar novos pedidos

        if (data) {
            Object.values(data).forEach((pedido, index) => {
                const div = document.createElement('div');
                div.className = 'pedido';
                div.innerHTML = `Pedido ${index + 1}: ${pedido}`;
                lista.appendChild(div);
            });
        }
    });
}

// Função para adicionar um novo pedido
function adicionarPedido(novoPedido) {
    // Adiciona o novo pedido ao banco de dados
    push(pedidosRef, novoPedido);
}

// Evento de envio do formulário
document.getElementById('formPedido').addEventListener('submit', function (event) {
    event.preventDefault();
    const novoPedido = document.getElementById('novoPedido').value;
    adicionarPedido(novoPedido);
    document.getElementById('novoPedido').value = '';  // Limpa o campo após o envio
});

// Carregar pedidos ao iniciar
carregarPedidos();
