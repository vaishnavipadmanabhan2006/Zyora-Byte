/* ===========================================================
   script.js — Day 4: DOM & Events
   1) Dark-mode toggle (toggles a class on <body>)
   2) Contact form validation with inline error messages
   =========================================================== */

// ---------- 1. Dark-mode toggle ----------

const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

// Applies a theme by toggling the "light-mode" class on <body>
// and updates the button label so it always describes the NEXT action.
function applyTheme(mode) {
  if (mode === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️ Light mode';
  } else {
    body.classList.remove('light-mode');
    themeToggle.textContent = '🌙 Dark mode';
  }
}

// Remember the visitor's choice across page reloads.
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', function () {
  const isCurrentlyLight = body.classList.contains('light-mode');
  const nextTheme = isCurrentlyLight ? 'dark' : 'light';

  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);

  console.log('Theme switched to:', nextTheme);
});


// ---------- 2. Contact form validation ----------

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('form-status');

// Simple, good-enough email pattern: something@something.something
function isValidEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

function showError(inputEl, errorId, message) {
  document.getElementById(errorId).textContent = message;
  inputEl.classList.add('input-error');
}

function clearError(inputEl, errorId) {
  document.getElementById(errorId).textContent = '';
  inputEl.classList.remove('input-error');
}

form.addEventListener('submit', function (event) {
  // Stop the browser's default page-reload submit — we're handling it ourselves.
  event.preventDefault();

  formStatus.textContent = '';
  formStatus.className = 'form-status';

  let isValid = true;

  // Name: just can't be empty
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'name-error', 'Please enter your name.');
    isValid = false;
  } else {
    clearError(nameInput, 'name-error');
  }

  // Email: can't be empty, and must look like a real email
  const emailValue = emailInput.value.trim();
  if (emailValue === '') {
    showError(emailInput, 'email-error', 'Please enter your email.');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    showError(emailInput, 'email-error', 'Please enter a valid email.');
    isValid = false;
  } else {
    clearError(emailInput, 'email-error');
  }

  // Message: just can't be empty
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'message-error', 'Please write a short message.');
    isValid = false;
  } else {
    clearError(messageInput, 'message-error');
  }

  console.log('Form submitted. Valid?', isValid);

  if (isValid) {
    formStatus.textContent = "Thanks! Your message looks good — I'll get back to you soon.";
    formStatus.classList.add('success');
    form.reset();
  } else {
    formStatus.textContent = 'Please fix the errors above and try again.';
    formStatus.classList.add('error');
  }
});
