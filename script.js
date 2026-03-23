const sideButtons = document.querySelectorAll(".nav-item");
const bottomButtons = document.querySelectorAll(".bottom-item");
const pages = {
  home: document.getElementById("homePage"),
  cost: document.getElementById("costPage"),
  impact: document.getElementById("impactPage"),
  settings: document.getElementById("settingsPage"),
  logout: document.getElementById("logoutPage")
};

function showPage(pageName) {
  Object.values(pages).forEach(page => page.classList.remove("active-page"));

  if (pages[pageName]) {
    pages[pageName].classList.add("active-page");
  } else {
    pages.home.classList.add("active-page");
  }

  sideButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === pageName);
  });

  bottomButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === pageName);
  });
}

sideButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

bottomButtons.forEach(button => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;

    if (page === "alerts") {
      alert("Mock alerts page: Gas Leak Detected! Please check your kitchen.");
      return;
    }

    if (page === "profile") {
      alert("Mock profile page.");
      return;
    }

    showPage(page);
  });
});

document.getElementById("topSearch").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  if (value.includes("cost")) showPage("cost");
  else if (value.includes("impact")) showPage("impact");
  else if (value.includes("setting")) showPage("settings");
  else if (value.includes("home")) showPage("home");
});

document.getElementById("sidebarSearch").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  if (value.includes("cost")) showPage("cost");
  else if (value.includes("impact")) showPage("impact");
  else if (value.includes("setting")) showPage("settings");
  else if (value.includes("home")) showPage("home");
});

document.getElementById("menuToggle").addEventListener("click", function () {
  alert("This opens the sidebar menu in a mobile layout.");
});
