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
      // Uncomment the below lines to scroll to the home section after the loading screen
      // window.scrollTo({
      //   top: window.innerHeight,
      //   behavior: "smooth",
      // });
    }, 1000); // Wait for the fade-out transition to complete
  }, 3550); // 3.55 seconds
});
window.onload = function () {
  setTimeout(function () {
    document.querySelector(".navigation").classList.add("sticky");
  }, 3550);
};

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".auto-blur");

  function handleScroll() {
    let screenHeight = window.innerHeight;
    let startTrigger = screenHeight * 0.4; // 40% from bottom
    let endTrigger = 0; // Top of screen

    elements.forEach((element) => {
      let rect = element.getBoundingClientRect();
      let elementTop = rect.top;
      let elementHeight = rect.height;

      // Ensure the element is within the trigger range
      if (
        elementTop < startTrigger &&
        elementTop > endTrigger - elementHeight
      ) {
        let progress =
          (startTrigger - elementTop) / (startTrigger - endTrigger);
        progress = Math.min(Math.max(progress, 0), 1); // Keep progress between 0 and 1
        let rotation = progress * 360; // Exactly one rotation from entry to exit

        element.style.transform = `rotateY(${rotation}deg)`;
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
});

gsap.to(".autotranslate", {
  x: () => -window.innerWidth, // Moves text right when scrolling down
  ease: "none",
  scrollTrigger: {
    trigger: ".autotranslate",
    start: "top bottom",
    end: "bottom top",
    scrub: 10,
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.getElementById("contact-btn");
  const popup = document.getElementById("contact-popup");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("contact-form");

  contactBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
    popup.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup.style.display = "none";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.querySelector(".submit-btn");
    const formData = new FormData(form);

    try {
      submitBtn.innerHTML = "Sending...";

      const response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        body: formData,
      });

      // Check content type before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned unexpected response format");
      }

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully!");
        form.reset();
        popup.classList.add("hidden");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      submitBtn.innerHTML = "Send Message";
    }
  });
}); // ← This closing parenthesis was missing
