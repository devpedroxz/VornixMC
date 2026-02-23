// ====== VORNIXMC - index.js ======

const SERVER_IP = "jogar.vornixmc.com.br";

// ====== ELEMENTOS DOM ======
const copyIpBtn = document.getElementById("copyIpBtn");
const playNowBtn = document.getElementById("playNow");
const tooltip = document.getElementById("tooltip");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");
const yearSpan = document.getElementById("year");

// ====== FUNÇÕES ======

// Copiar IP com feedback visual foda
async function copyServerIp(event) {
  try {
    await navigator.clipboard.writeText(SERVER_IP);

    // Feedback no botão
    const btn = event?.currentTarget || copyIpBtn;
    btn.textContent = "IP Copiado!";
    btn.style.background = "linear-gradient(90deg, #43d97a, #2ea44f)";

    // Tooltip mais bonito
    tooltip.textContent = "IP copiado com sucesso!";
    tooltip.classList.add("show");

    setTimeout(() => {
      btn.textContent = "Copiar IP do Servidor";
      btn.style.background = "";
      tooltip.classList.remove("show");
    }, 2000);
  } catch (err) {
    tooltip.textContent = "Falha ao copiar!";
    tooltip.classList.add("show");
    setTimeout(() => tooltip.classList.remove("show"), 2000);
  }
}

// Atualizar ano automaticamente
function updateYear() {
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// ====== PARTÍCULAS ======
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray = [];
const numberOfParticles = window.innerWidth < 768 ? 30 : 70;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = `rgba(105, 0, 105, ${this.opacity})`; // cor das partículas
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity * 0.6})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const count = window.innerWidth < 768 ? 30 : 70;
  for (let i = 0; i < count; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

// ====== EVENTOS ======
copyIpBtn?.addEventListener("click", copyServerIp);
playNowBtn?.addEventListener("click", copyServerIp);

// Botão "Jogar Agora" com pulso dourado extra
playNowBtn?.addEventListener("click", () => {
  playNowBtn.style.transform = "scale(0.95)";
  setTimeout(() => playNowBtn.style.transform = "", 150);
});

// Inicialização
updateYear();
handleResize();
animateParticles();
window.addEventListener("resize", () => {
  handleResize();
  // Recria partículas com quantidade certa pro tamanho da tela
  initParticles();
});

// Evitar erro se algum elemento não existir
if (!copyIpBtn) console.warn("Botão #copyIpBtn não encontrado");
if (!tooltip) console.warn("Tooltip não encontrado");