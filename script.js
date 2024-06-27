document.addEventListener("DOMContentLoaded", () => {
  const greetings = [
    "Welcome",
    "Bienvenue",
    "Willkommen",
    "Bienvenido",
    "Benvenuto",
    "Bem-vindo",
    "Välkommen",
    "歓迎",
    "欢迎",
    "환영합니다",
    "स्वागत है",
  ];

  let greetingIndex = 0;
  const greetingElement = document.getElementById("greeting");
  const loadingScreen = document.getElementById("loading-screen");

  const changeGreeting = () => {
    greetingElement.textContent = greetings[greetingIndex];
    greetingIndex = (greetingIndex + 1) % greetings.length;
  };

  changeGreeting();
  const interval = setInterval(changeGreeting, 300);

  setTimeout(() => {
    clearInterval(interval);
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 1000); // Wait for the fade-out transition to complete
  }, 5000); // Changed from 3500 to 5000 (5 seconds)
});
