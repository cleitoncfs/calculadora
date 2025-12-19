const display = document.querySelector('#displayInput');

let valorAtual = '';
let valorAnterior = '';
let operador = null;

const atualizarDisplay = () => {
  display.value = valorAtual || '0';
};

const limparTudo = () => {
  valorAtual = '';
  valorAnterior = '';
  operador = null;
  atualizarDisplay();
};

const limparEntrada = () => {
  valorAtual = valorAtual.slice(0, -1);
  atualizarDisplay();
};

const inserirNumero = (num) => {
  if (num === '.' && valorAtual.includes('.')) return;
  valorAtual += num;
  atualizarDisplay();
};

const inserirOperador = (op) => {
  if (!valorAtual) return;

  if (valorAnterior && operador) calcular();

  operador = op;
  valorAnterior = valorAtual;
  valorAtual = '';
};

const calcular = () => {
  if (!valorAnterior || !valorAtual || !operador) return;

  const a = parseFloat(valorAnterior);
  const b = parseFloat(valorAtual);
  let resultado = 0;

  switch (operador) {
    case '+':
      resultado = a + b;
      break;
    case '-':
      resultado = a - b;
      break;
    case '*':
      resultado = a * b;
      break;
    case '/':
      if (b === 0) {
        alert('Erro: divisão por zero');
        return limparTudo();
      }
      resultado = a / b;
      break;
    case '%':
      resultado = a * (b / 100);
      break;
  }

  valorAtual = String(resultado);
  valorAnterior = '';
  operador = null;
  atualizarDisplay();
};

// Eventos dos botões
document
  .querySelectorAll('.num')
  .forEach((btn) =>
    btn.addEventListener('click', () => inserirNumero(btn.textContent))
  );

document
  .querySelector('.ponto')
  .addEventListener('click', () => inserirNumero('.'));

document
  .querySelectorAll('.operador')
  .forEach((btn) =>
    btn.addEventListener('click', () => inserirOperador(btn.textContent))
  );

document.querySelector('.igual').addEventListener('click', calcular);

document.querySelectorAll('.acao')[0].addEventListener('click', limparTudo);
document.querySelectorAll('.acao')[1].addEventListener('click', limparEntrada);

// Suporte ao teclado físico
document.addEventListener('keydown', (e) => {
  if (!isNaN(e.key)) inserirNumero(e.key);
  if (['+', '-', '*', '/', '%'].includes(e.key)) inserirOperador(e.key);
  if (e.key === 'Enter') calcular();
  if (e.key === 'Backspace') limparEntrada();
  if (e.key === 'Escape') limparTudo();
  if (e.key === '.') inserirNumero('.');
});
