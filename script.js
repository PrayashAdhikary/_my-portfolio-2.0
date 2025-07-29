document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".container");
  const eduCards = document.querySelectorAll(".edu.card");
  const bars = document.querySelectorAll(".bar div");
  const navbar = document.querySelector(".navbar"); 

  let lastScrollTop = 0;

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight * 0.85 &&
      rect.bottom > 0
    );
  }

  function animateOnScroll() {
    containers.forEach(el => {
      if (isInViewport(el)) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });

    eduCards.forEach((el, i) => {
      if (isInViewport(el)) {
        setTimeout(() => el.classList.add("visible"), i * 100);
      } else {
        el.classList.remove("visible");
      }
    });

    bars.forEach(bar => {
      if (isInViewport(bar)) {
        bar.style.width = bar.getAttribute("data-skill");
      } else {
        bar.style.width = "0";
      }
    });

   
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
     
      navbar.classList.add("nav-hidden");
    } else {
     
      navbar.classList.remove("nav-hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); 
});


const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if (isMobile) {
  document.body.style.backgroundColor = "#f0f8ff";
  console.log("Mobile device detected");
} else {
  console.log("Desktop device detected");
}
(() => {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    document.body.style.backgroundColor = "#f0f8ff";

    // Add mobile-specific class to navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("mobile-navbar");
    }

    // Add mobile-friendly meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1";
      document.head.appendChild(meta);
    }

    // Inject responsive CSS to wrap navbar items into 3 lines
    const style = document.createElement("style");
    style.textContent = `
      .mobile-navbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        padding: 10px;
      }

      .mobile-navbar > * {
        flex: 1 1 30%;
        min-width: 30%;
        text-align: center;
      }
    `;
    document.head.appendChild(style);

    console.log("Mobile device detected - Navbar wrapped into 3 lines");
  } else {
    console.log("Desktop device detected");
  }
})();
