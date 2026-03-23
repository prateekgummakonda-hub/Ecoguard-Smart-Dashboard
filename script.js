const sideButtons = document.querySelectorAll(".nav-item");
const bottomButtons = document.querySelectorAll(".bottom-item");
const pages = {
  home: document.getElementById("homePage"),
  cost: document.getElementById("costPage"),
  impact: document.getElementById("impactPage"),
  alerts: document.getElementById("alertsPage"),
  profile: document.getElementById("profilePage"),
  settings: document.getElementById("settingsPage"),
  logout: document.getElementById("logoutPage")
};

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const topAlertsBtn = document.getElementById("topAlertsBtn");
const topProfileBtn = document.getElementById("topProfileBtn");
const topSettingsBtn = document.getElementById("topSettingsBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const loginOverlay = document.getElementById("loginOverlay");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const emailLoginForm = document.getElementById("emailLoginForm");
const emailInput = document.getElementById("emailInput");
const profileEmail = document.getElementById("profileEmail");
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");

/* ---------------- PAGE NAVIGATION ---------------- */

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

  if (window.innerWidth <= 980) {
    sidebar.classList.remove("open");
  }
}

sideButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

bottomButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

topAlertsBtn.addEventListener("click", () => showPage("alerts"));
topProfileBtn.addEventListener("click", () => showPage("profile"));
topSettingsBtn.addEventListener("click", () => showPage("settings"));

menuToggle.addEventListener("click", () => {
  if (window.innerWidth <= 980) {
    sidebar.classList.toggle("open");
  }
});

/* ---------------- SEARCH ---------------- */

document.getElementById("topSearch").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  if (value.includes("cost")) showPage("cost");
  else if (value.includes("impact")) showPage("impact");
  else if (value.includes("setting")) showPage("settings");
  else if (value.includes("alert")) showPage("alerts");
  else if (value.includes("profile")) showPage("profile");
  else if (value.includes("home")) showPage("home");
});

document.getElementById("sidebarSearch").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  if (value.includes("cost")) showPage("cost");
  else if (value.includes("impact")) showPage("impact");
  else if (value.includes("setting")) showPage("settings");
  else if (value.includes("alert")) showPage("alerts");
  else if (value.includes("profile")) showPage("profile");
  else if (value.includes("home")) showPage("home");
});

/* ---------------- DARK MODE ---------------- */

if (localStorage.getItem("ecoguardDarkMode") === "on") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("ecoguardDarkMode", "on");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("ecoguardDarkMode", "off");
  }
});

/* ---------------- LOGIN ---------------- */

googleLoginBtn.addEventListener("click", () => {
  alert("Google sign-in requires Firebase or another auth provider. For now, use the email option below.");
});

emailLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  localStorage.setItem("ecoguardUserEmail", email);
  profileEmail.textContent = email;
  loginOverlay.style.display = "none";
});

const savedEmail = localStorage.getItem("ecoguardUserEmail");
if (savedEmail) {
  profileEmail.textContent = savedEmail;
  loginOverlay.style.display = "none";
}

confirmLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("ecoguardUserEmail");
  loginOverlay.style.display = "flex";
  showPage("home");
});

/* ---------------- CARD 3-DOT MENUS ---------------- */

function createCardMenu(cardType, button) {
  const existingMenu = document.querySelector(".floating-card-menu");
  if (existingMenu) existingMenu.remove();

  const menu = document.createElement("div");
  menu.className = "floating-card-menu";

  let menuItems = [];

  if (cardType === "energy") {
    menuItems = [
      { label: "View Cost Projection", action: () => showPage("cost") },
      { label: "Open Environmental Impact", action: () => showPage("impact") },
      { label: "Energy Tips", action: () => alert("Tip: Reduce air conditioner usage during peak hours.") }
    ];
  } else if (cardType === "water") {
    menuItems = [
      { label: "Open Cost Projection", action: () => showPage("cost") },
      { label: "Open Environmental Impact", action: () => showPage("impact") },
      { label: "Water Saving Tips", action: () => alert("Tip: Reduce shower duration and avoid unnecessary tap usage.") }
    ];
  } else if (cardType === "safety") {
    menuItems = [
      { label: "View Alerts Page", action: () => showPage("alerts") },
      { label: "View Settings", action: () => showPage("settings") },
      { label: "Safety Help", action: () => alert("Safety tip: Immediately inspect the area when a gas alert appears.") }
    ];
  }

  menuItems.forEach(item => {
    const menuBtn = document.createElement("button");
    menuBtn.className = "floating-card-menu-item";
    menuBtn.textContent = item.label;
    menuBtn.addEventListener("click", () => {
      item.action();
      menu.remove();
    });
    menu.appendChild(menuBtn);
  });

  document.body.appendChild(menu);

  const rect = button.getBoundingClientRect();
  menu.style.top = `${rect.bottom + window.scrollY + 8}px`;
  menu.style.left = `${rect.right + window.scrollX - 210}px`;

  setTimeout(() => {
    document.addEventListener("click", handleOutsideMenuClick, { once: true });
  }, 0);
}

function handleOutsideMenuClick(event) {
  const menu = document.querySelector(".floating-card-menu");
  if (!menu) return;

  if (!menu.contains(event.target) && !event.target.classList.contains("card-menu")) {
    menu.remove();
  }
}

const energyMenuBtn = document.querySelector(".energy-card .card-menu");
const waterMenuBtn = document.querySelector(".water-card .card-menu");
const safetyMenuBtn = document.querySelector(".safety-card .card-menu");

if (energyMenuBtn) {
  energyMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    createCardMenu("energy", energyMenuBtn);
  });
}

if (waterMenuBtn) {
  waterMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    createCardMenu("water", waterMenuBtn);
  });
}

if (safetyMenuBtn) {
  safetyMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    createCardMenu("safety", safetyMenuBtn);
  });
}
