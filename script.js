// Importando a biblioteca do Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/umd/supabase.js';

// Suas credenciais do Supabase
const supabaseUrl = 'https://gesisobvosuebkqqhjpm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlc2lzb2J2b3N1ZWJrcXFoanBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMDAyNDAsImV4cCI6MjA0MzU3NjI0MH0.RV08BDWDQuCBUxY8DAlaPL5gCFsjg5MX_g4lKdpRzDU';
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para adicionar um pedido
const adicionarPedido = async (nome, descricao) => {
    const { data, error } = await supabase
        .from('pedidos')
        .insert([{ nome, descricao }]);
    
    if (error) {
        console.error('Erro ao adicionar pedido:', error);
    } else {
        console.log('Pedido adicionado:', data);
        listarPedidos();
    }
};

// Função para listar pedidos
const listarPedidos = async () => {
    const { data, error } = await supabase
        .from('pedidos')
        .select('*');
    
    const listaPedidos = document.getElementById('lista-pedidos');
    listaPedidos.innerHTML = '';
    
    if (error) {
        console.error('Erro ao listar pedidos:', error);
    } else {
        data.forEach(pedido => {
            const li = document.createElement('li');
            li.textContent = `${pedido.nome}: ${pedido.descricao} ( ${new Date(pedido.data).toLocaleString()} )`;
            listaPedidos.appendChild(li);
        });
    }
};

// Adicionando evento de submit ao formulário
document.getElementById('pedido-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    adicionarPedido(nome, descricao);
});

// Listar pedidos ao carregar a página
listarPedidos();
