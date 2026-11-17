const CHAVE = "spotify-usuario";
const $ = (id) => document.getElementById(id);

function lerUsuario() {
  try { return JSON.parse(localStorage.getItem(CHAVE)); } catch { return null; }
}

function salvarUsuario(usuario) {
  try { localStorage.setItem(CHAVE, JSON.stringify(usuario)); } catch { /* armazenamento indisponível */ }
}

function mostrarErro(mensagem) {
  const erro = $("erro");
  erro.textContent = "ⓘ " + mensagem;
  erro.hidden = false;
}

function novaConta(evento) {
  evento.preventDefault();

  const nome = $("nome").value.trim();
  const sobrenome = $("sobrenome").value.trim();
  const ano = Number($("ano").value);
  const email = $("email").value.trim();
  const senha = $("senha").value;
  const anoAtual = new Date().getFullYear();

  if (!nome || !sobrenome) return mostrarErro("Preencha nome e sobrenome.");
  if (!Number.isInteger(ano) || ano < 1900 || ano > anoAtual) return mostrarErro("Digite um ano de nascimento válido, por exemplo 2000.");
  if (anoAtual - ano < 18) return mostrarErro("Você não tem a idade apropriada para acessar o nosso site.");
  if (!/^\S+@\S+\.\S+$/.test(email)) return mostrarErro("Digite um email válido.");
  if (senha.length < 6) return mostrarErro("A senha precisa ter pelo menos 6 caracteres.");
  if (senha !== $("confirmar").value) return mostrarErro("As senhas não são iguais.");

  const genero = document.querySelector('input[name="genero"]:checked').value;
  salvarUsuario({ nome, sobrenome, ano, genero, email, senha });
  window.location.href = "../index.html";
}

function logar(evento) {
  evento.preventDefault();

  const email = $("email").value.trim();
  const senha = $("senha").value;
  const usuario = lerUsuario();

  if (!email || !senha) return mostrarErro("Digite seu email e sua senha.");
  if (!usuario) return mostrarErro("Nenhuma conta encontrada. Cadastre-se primeiro.");
  if (usuario.email !== email || usuario.senha !== senha) return mostrarErro("Email ou senha incorretos.");

  window.location.href = "../index.html";
}

function alternarBiblioteca() {
  $("lateral").classList.toggle("recolhida");
}

$("form-cadastro")?.addEventListener("submit", novaConta);
$("form-login")?.addEventListener("submit", logar);
$("btn-biblioteca")?.addEventListener("click", alternarBiblioteca);
