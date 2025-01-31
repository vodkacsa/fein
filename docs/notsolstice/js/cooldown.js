"use strict";

(function() {
  let cooldownInterval;
  const cooldownKey = "cooldownEndTime";

  function startCooldown() {
    const endTime = Date.now() + 120000; // 120 sec
    localStorage.setItem(cooldownKey, endTime);
    applyCooldown();
  }

  function applyCooldown() {
    const endTime = parseInt(localStorage.getItem(cooldownKey), 10) || 0;
    const now = Date.now();
    if (now < endTime) {
      disableForm(true);
      cooldownInterval = setInterval(() => {
        if (Date.now() >= endTime) {
          clearInterval(cooldownInterval);
          disableForm(false);
          localStorage.removeItem(cooldownKey);
        }
      }, 1000);
    }
  }

  function disableForm(state) {
    const authInput = document.getElementById("auth_code");
    const submitBtn = document.querySelector("button.login100-form-btn");
    if (!authInput || !submitBtn) return;
    if (state) {
      authInput.disabled = true;
      submitBtn.disabled = true;
      authInput.placeholder = "Disabled for 2 minutes for security reasons";
    } else {
      authInput.disabled = false;
      submitBtn.disabled = false;
      authInput.placeholder = "Auth Code";
    }
  }

  // Expose globally so it can be called if auth fails
  window.startCooldown = startCooldown;
  applyCooldown();
})();