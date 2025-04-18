document.addEventListener("DOMContentLoaded", function () {
    const modeToggle = document.getElementById("mode-toggle");
    const body = document.body;
    const section1 = document.querySelector(".section-1");
  
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      section1.classList.add("dark-mode"); // Ensure section-1 updates
      modeToggle.children[0].style.opacity = "0"; // Hide sun
      modeToggle.children[1].style.opacity = "1"; // Show moon
    }
  
    modeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      section1.classList.toggle("dark-mode"); // Toggle section-1
      const isDark = body.classList.contains("dark-mode");
  
      modeToggle.children[0].style.opacity = isDark ? "0" : "1";
      modeToggle.children[1].style.opacity = isDark ? "1" : "0";
  
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });

  /* Add JavaScript for file name display */

document.getElementById('file').addEventListener('change', function(e) {
  const fileName = e.target.files[0] ? e.target.files[0].name : 'No files selected';
  document.querySelector('.file-info').textContent = fileName;
});


//   // Toggle with smoother transitions
// const modeToggle = document.getElementById("mode-toggle");
// const body = document.body;

// modeToggle.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");
//   const isDark = body.classList.contains("dark-mode");
//   localStorage.setItem("theme", isDark ? "dark" : "light");
//   // Smooth icon transition
//   gsap.to(modeToggle.children, { 
//     opacity: isDark ? [0, 1] : [1, 0], 
//     duration: 0.3,
//     stagger: 0.1 
//   });
// });