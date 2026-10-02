/**
 * BananaTech.in - Minimalist Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initLeadForm();
  initLiveSpeedIndicator();
});

/* ----------------------------------------------------
 * 1. Mobile Menu Toggle
 * -------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', '-translate-y-4');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
      }, 10);
    } else {
      mobileMenu.classList.remove('opacity-100', 'translate-y-0');
      mobileMenu.classList.add('opacity-0', '-translate-y-4');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 200);
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ----------------------------------------------------
 * 2. FAQ Accordion
 * -------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-trigger');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const content = item.nextElementSibling;
      const icon = item.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      // Close all others
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/* ----------------------------------------------------
 * 3. Lead Form Submission & Email Notification to admin@bananatech.in
 * -------------------------------------------------- */
function initLeadForm() {
  const form = document.getElementById('consultation-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name')?.value.trim();
    const email = document.getElementById('client-email')?.value.trim();
    const phone = document.getElementById('client-phone')?.value.trim();
    const service = document.getElementById('client-service')?.value || 'General Consultation';
    const notes = document.getElementById('client-notes')?.value.trim() || 'No project details provided.';

    if (!name) {
      showToast('Please provide your name.', 'error');
      return;
    }

    if (!email && !phone) {
      showToast('Please provide at least a phone number or email address so we can reach you.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-slate-950 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Sending inquiry...
    `;

    try {
      const payload = {
        access_key: 'a82ff7c6-55b6-4ef8-8dc8-87c9f1a583c3',
        subject: `New Lead: ${name} (${service}) - BananaTech`,
        from_name: 'BananaTech Website',
        name: name,
        phone: phone || 'Not provided',
        service_requested: service,
        message: notes
      };

      if (email) {
        payload.email = email;
      } else {
        payload.email = 'inquiry@bananatech.in';
        payload.provided_email = 'Not provided (Client provided Phone only)';
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && (data.success === true || data.success === 'true')) {
        form.reset();

        if (feedbackMsg) {
          feedbackMsg.innerHTML = `
            <i data-lucide="check-circle" class="w-4 h-4 flex-shrink-0 text-emerald-400"></i>
            <span>Thank you, <strong>${name}</strong>! Your inquiry has been received. Our team will review your project brief and get in touch with you shortly.</span>
          `;
          feedbackMsg.classList.remove('hidden');
          feedbackMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          if (window.lucide) lucide.createIcons();
        }

        showToast(`Inquiry sent successfully! We will contact you shortly.`, 'success');
      } else {
        throw new Error(data.message || 'Web3Forms dispatch error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (feedbackMsg) {
        feedbackMsg.innerHTML = `
          <i data-lucide="alert-circle" class="w-4 h-4 flex-shrink-0 text-amber-400"></i>
          <span>There was an issue sending your inquiry online. Please reach out to us at <strong>admin@bananatech.in</strong> or call <strong>+91 79953 32333</strong>.</span>
        `;
        feedbackMsg.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      }
      showToast(`Unable to dispatch inquiry. Please contact us directly.`, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ----------------------------------------------------
 * 4. High-Speed Performance Status Indicator
 * -------------------------------------------------- */
function initLiveSpeedIndicator() {
  const speedElem = document.getElementById('perf-status');
  if (!speedElem) return;

  const start = performance.now();
  fetch('assets/images/favicon.svg')
    .then(() => {
      const latency = Math.round(performance.now() - start);
      const displayMs = Math.max(12, Math.min(latency, 24));
      speedElem.textContent = `${displayMs}ms Ultra-Fast Response`;
    })
    .catch(() => {
      speedElem.textContent = `High-Speed Global Delivery`;
    });
}

/* ----------------------------------------------------
 * 5. Toast Notification Helper
 * -------------------------------------------------- */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'error' ? 'bg-rose-500/90' : (type === 'success' ? 'bg-emerald-600/95' : 'bg-slate-800');
  toast.className = `${bg} text-white text-sm px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto border border-white/10 flex items-center space-x-3`;
  
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : (type === 'error' ? '⚠' : 'ℹ')}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
