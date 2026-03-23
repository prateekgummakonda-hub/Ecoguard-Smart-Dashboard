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
