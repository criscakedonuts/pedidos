// Import the Firebase modules you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Firebase configuration
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

// Reference to the "pedidos" node
const pedidosRef = ref(database, 'pedidos');

// Function to load orders in real-time
function carregarPedidos() {
    onValue(pedidosRef, (snapshot) => {
        const data = snapshot.val();
        const lista = document.getElementById('listaPedidos');
        lista.innerHTML = '';  // Clear the list before adding new orders

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

// Function to add a new order
function adicionarPedido(novoPedido) {
    // Add the new order to the database
    push(pedidosRef, novoPedido);
}

// Form submit event
document.getElementById('formPedido').addEventListener('submit', function (event) {
    event.preventDefault();
    const novoPedido = document.getElementById('novoPedido').value;
    adicionarPedido(novoPedido);
    document.getElementById('novoPedido').value = '';  // Clear the input after submission
});

// Load orders when starting
carregarPedidos();
