function showForm() {
  const clickSound = document.getElementById("click-sound");
  clickSound.play();

  const home = document.getElementById("home");
  const formPage = document.getElementById("form-page");

  home.style.opacity = 1;
  home.style.transition = "opacity 0.8s ease";
  home.style.opacity = 0;

  setTimeout(() => {
    home.style.display = "none";
    formPage.style.display = "block";
    formPage.style.opacity = 0;
    setTimeout(() => {
      formPage.style.opacity = 1;
    }, 50);
  }, 800);
}

function openConfirm() {
  document.getElementById("custom-confirm").style.display = "flex";
}

function closeConfirm() {
  document.getElementById("custom-confirm").style.display = "none";
}

function submitForm() {
  document.getElementById("entry-form").submit();
}
