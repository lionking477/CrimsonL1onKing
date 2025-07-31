// ---- CONFIG MODAL: FECHAR ao clicar fora ----
function closeConfig() {
  document.getElementById("config-modal").style.display = "none";
}
document.getElementById("config-toggle").onclick = function(event) {
  let modal = document.getElementById("config-modal");
  modal.style.display = (modal.style.display === "block" ? "none" : "block");
  event.stopPropagation();
};
document.addEventListener('click', function(event) {
  let modal = document.getElementById("config-modal");
  let toggle = document.getElementById("config-toggle");
  if (
    modal.style.display === "block" &&
    !modal.contains(event.target) &&
    event.target !== toggle &&
    !toggle.contains(event.target)
  ) {
    modal.style.display = "none";
  }
});

// ---- EFEITO DE FAÍSCAS ----
document.addEventListener('click', function(e) {
  if (document.body.classList.contains('batata')) return;
  if (e.target.closest('#config-modal')) return;
  createSparks(e.clientX, e.clientY);
});
function createSparks(x, y) {
  if (document.body.classList.contains('batata')) return;
  const sparkContainer = document.getElementById('sparks');
  const sparksCount = 16 + Math.floor(Math.random() * 6);
  for(let i=0; i < sparksCount; i++) {
    const angle = Math.random() * 360;
    const distance = 35 + Math.random() * 40;
    const tx = Math.cos(angle * Math.PI/180) * distance;
    const ty = Math.sin(angle * Math.PI/180) * distance;
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--angle', `${angle}deg`);
    spark.style.setProperty('--tx', `${tx}px`);
    spark.style.setProperty('--ty', `${ty}px`);
    sparkContainer.appendChild(spark);
    setTimeout(() => { spark.remove(); }, 700);
  }
}

// ---- NAVEGAÇÃO ----
function showForm() {
  document.getElementById("home").style.display = "none";
  document.getElementById("form-page").style.display = "block";
  document.getElementById("info-page").style.display = "none";
}
function goBackHome() {
  document.getElementById("form-page").style.display = "none";
  document.getElementById("info-page").style.display = "none";
  document.getElementById("home").style.display = "block";
}
function showInfo() {
  document.getElementById("home").style.display = "none";
  document.getElementById("form-page").style.display = "none";
  document.getElementById("info-page").style.display = "block";
}

// ---- BOTÃO DISCORD ----
let formSent = false; // Só libera após enviar o formulário

function discordAlert() {
  if (!formSent) {
    openDiscordModal();
    return;
  }
  window.open('https://discord.gg/X2ctd33vMM', '_blank');
}
function enableDiscordBtn() {
  formSent = true;
  const btn = document.getElementById("discord-btn");
  btn.disabled = false;
  btn.textContent = "Entrar no Servidor";
  btn.onclick = function() {
    window.open('https://discord.gg/X2ctd33vMM', '_blank');
  };
}

// ---- MODAL DISCORD ----
function openDiscordModal() {
  document.getElementById('discord-modal').style.display = 'flex';
}
function closeDiscordModal() {
  document.getElementById('discord-modal').style.display = 'none';
}
function goToFormFromDiscord() {
  closeDiscordModal();
  showForm();
  setTimeout(() => {
    document.getElementById("form-page").scrollIntoView({behavior:"smooth"});
  }, 100);
}
document.addEventListener('mousedown', function(e){
  const modal = document.querySelector('#discord-modal');
  if(modal && modal.style.display==="flex"){
    const inner = modal.querySelector('.modal');
    if(!inner.contains(e.target)){
      closeDiscordModal();
    }
  }
});

// ---- FORMULÁRIO OBRIGATÓRIO + MODAL ----
function openConfirm() {
  const form = document.getElementById("entry-form");
  if (!form.checkValidity()) {
    Array.from(form.elements).forEach(el => {
      if ((el.required || el.tagName === "TEXTAREA") && !el.value.trim()) {
        el.classList.add("shake");
      } else {
        el.classList.remove("shake");
      }
    });
    showFormError("Por favor, preencha todos os campos obrigatórios antes de enviar!");
    document.querySelectorAll(".shake").forEach(el => {
      el.style.animation = "shake 0.4s";
      setTimeout(() => { el.style.animation = ""; }, 450);
    });
    return;
  }
  document.getElementById("custom-confirm").style.display = "flex";
}
function closeConfirm() {
  document.getElementById("custom-confirm").style.display = "none";
}
function submitForm() {
  enableDiscordBtn();
  document.getElementById("custom-confirm").style.display = "none";
  document.getElementById("form-page").style.display = "none";
  document.getElementById("home").style.display = "block";
  alert("Formulário enviado com sucesso!\nAgora você pode entrar no Discord da crew.");
}
function showFormError(msg) {
  let errorDiv = document.getElementById("form-error-msg");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = "form-error-msg";
    errorDiv.className = "form-error";
    const form = document.getElementById("entry-form");
    form.prepend(errorDiv);
  }
  errorDiv.textContent = msg;
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 3500);
}
document.addEventListener("input", function(e) {
  if (e.target.classList.contains("shake")) {
    e.target.classList.remove("shake");
    e.target.style.animation = "";
  }
});

// ---- MODO BATATA ----
document.getElementById('batata-mode').onchange = function() {
  if(this.checked) {
    document.body.classList.add('batata');
    try { document.getElementById('bg-music').pause(); } catch(e){}
  } else {
    document.body.classList.remove('batata');
    try { document.getElementById('bg-music').play(); } catch(e){}
  }
  document.querySelectorAll('.emoji').forEach(el => {
    el.style.display = this.checked ? 'none' : '';
  });
  document.querySelectorAll('.tagline, code').forEach(el => {
    el.style.display = this.checked ? 'none' : '';
  });
};
