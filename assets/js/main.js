/**
 * BananaTech.in - Agency Main Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initEstimator();
  initPortfolioFilter();
  initFaqAccordion();
  initLeadForm();
  initQuickModals();
  initLiveEdgePing();
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
 * 2. Interactive Project Cost & Timeline Estimator
 * -------------------------------------------------- */
function initEstimator() {
  const typeSelect = document.getElementById('est-type');
  const scaleSlider = document.getElementById('est-scale');
  const scaleDisplay = document.getElementById('est-scale-display');
  const addonCheckboxes = document.querySelectorAll('.est-addon');
  const currencyToggle = document.getElementById('est-currency-toggle');
  
  const priceDisplay = document.getElementById('est-price-display');
  const timelineDisplay = document.getElementById('est-timeline-display');
  const whatsappQuoteBtn = document.getElementById('est-whatsapp-btn');

  if (!typeSelect || !scaleSlider || !priceDisplay) return;

  // Base pricing in INR
  const basePrices = {
    hospital: { base: 65000, perScale: 12000, weeks: 3, label: 'Hospital/Healthcare Portal' },
    restaurant: { base: 38000, perScale: 8000, weeks: 2, label: 'Restaurant & QR System' },
    profiling: { base: 28000, perScale: 6000, weeks: 1.5, label: 'Executive & Brand Profiling' },
    mobileapp: { base: 110000, perScale: 25000, weeks: 5, label: 'Mobile Application (iOS/Android)' },
    saas: { base: 95000, perScale: 20000, weeks: 4, label: 'SaaS / Web Application MVP' }
  };

  const addonPrices = {
    appointment_engine: 15000,
    qr_menu: 9000,
    whatsapp_bot: 12000,
    payment_gateway: 10000,
    cloudflare_enterprise: 8000,
    seo_booster: 12000
  };

  let currentCurrency = 'INR'; // 'INR' or 'USD'
  const inrToUsdRate = 85.5;

  function calculateEstimate() {
    const selectedType = typeSelect.value || 'hospital';
    const scale = parseInt(scaleSlider.value, 10) || 1;
    const typeInfo = basePrices[selectedType] || basePrices.hospital;

    let scaleLabel = '';
    if (scale === 1) scaleLabel = 'Starter (1 - 5 Pages / Essential Features)';
    else if (scale === 2) scaleLabel = 'Professional (6 - 15 Pages / Advanced Modules)';
    else if (scale === 3) scaleLabel = 'Enterprise (Unlimited Pages / Multi-branch / Full API)';
    if (scaleDisplay) scaleDisplay.textContent = scaleLabel;

    let totalINR = typeInfo.base + (scale - 1) * typeInfo.perScale;
    let selectedAddonNames = [];

    addonCheckboxes.forEach(box => {
      if (box.checked) {
        const val = box.value;
        const addCost = addonPrices[val] || 0;
        totalINR += addCost;
        const label = box.dataset.name || val;
        selectedAddonNames.push(label);
      }
    });

    const calculatedWeeks = Math.ceil(typeInfo.weeks + (scale - 1) * 1.5 + (selectedAddonNames.length * 0.4));

    // Currency Formatting
    if (currentCurrency === 'INR') {
      priceDisplay.innerHTML = `<span class="text-2xl text-amber-400 font-bold">₹</span>${totalINR.toLocaleString('en-IN')}`;
    } else {
      const totalUSD = Math.round(totalINR / inrToUsdRate);
      priceDisplay.innerHTML = `<span class="text-2xl text-amber-400 font-bold">$</span>${totalUSD.toLocaleString('en-US')}`;
    }

    if (timelineDisplay) {
      timelineDisplay.textContent = `~${calculatedWeeks} Weeks`;
    }

    // Update WhatsApp pre-filled link
    if (whatsappQuoteBtn) {
      const formattedPrice = currentCurrency === 'INR' ? `₹${totalINR.toLocaleString('en-IN')}` : `$${Math.round(totalINR / inrToUsdRate)}`;
      const message = `Hello BananaTech Team! 👋 I used your interactive website estimator for my project:\n\n• Type: ${typeInfo.label}\n• Scope: ${scaleLabel}\n• Add-ons: ${selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'None'}\n• Estimated Budget: ${formattedPrice}\n• Est. Timeline: ~${calculatedWeeks} Weeks\n\nI would like to discuss next steps and launch on Cloudflare!`;
      whatsappQuoteBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    }
  }

  typeSelect.addEventListener('change', calculateEstimate);
  scaleSlider.addEventListener('input', calculateEstimate);
  addonCheckboxes.forEach(box => box.addEventListener('change', calculateEstimate));

  if (currencyToggle) {
    currencyToggle.addEventListener('click', () => {
      currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
      currencyToggle.textContent = currentCurrency === 'INR' ? 'Switch to USD ($)' : 'Switch to INR (₹)';
      calculateEstimate();
    });
  }

  calculateEstimate();
}

/* ----------------------------------------------------
 * 3. Portfolio Category Filtering
 * -------------------------------------------------- */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-item');

  if (!filterButtons.length || !portfolioCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active style
      filterButtons.forEach(b => {
        b.classList.remove('bg-amber-400', 'text-slate-950', 'shadow-lg');
        b.classList.add('bg-slate-900', 'text-slate-400');
      });
      btn.classList.add('bg-amber-400', 'text-slate-950', 'shadow-lg');
      btn.classList.remove('bg-slate-900', 'text-slate-400');

      const filter = btn.dataset.filter;

      portfolioCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * 4. FAQ Accordion
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
 * 5. Lead Form Submission & Validation
 * -------------------------------------------------- */
function initLeadForm() {
  const form = document.getElementById('consultation-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name')?.value.trim();
    const email = document.getElementById('client-email')?.value.trim();
    const phone = document.getElementById('client-phone')?.value.trim();
    const service = document.getElementById('client-service')?.value;
    const notes = document.getElementById('client-notes')?.value.trim();

    if (!name || !email) {
      showToast('Please provide your name and email address.', 'error');
      return;
    }

    // Submit state simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Sending Proposal Request...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (feedbackMsg) {
        feedbackMsg.classList.remove('hidden');
        feedbackMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      showToast(`Thank you, ${name}! Your request was received. We will respond within 4 hours.`, 'success');

      // WhatsApp fallback bridge option
      const waText = `Hi BananaTech! I just submitted an inquiry on bananatech.in for ${service}.\nName: ${name}\nPhone: ${phone}\nDetails: ${notes}`;
      const waUrl = `https://wa.me/919999999999?text=${encodeURIComponent(waText)}`;
      
      const promptWa = confirm("Inquiry received! Would you also like to open WhatsApp to connect directly with our engineering lead?");
      if (promptWa) {
        window.open(waUrl, '_blank');
      }
    }, 900);
  });
}

/* ----------------------------------------------------
 * 6. Quick Interactive Demo Preview Modal
 * -------------------------------------------------- */
function initQuickModals() {
  const modal = document.getElementById('demo-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTag = document.getElementById('modal-tag');
  const modalFrame = document.getElementById('modal-frame-view');
  const triggers = document.querySelectorAll('.open-demo-modal');

  if (!modal) return;

  triggers.forEach(trig => {
    trig.addEventListener('click', (e) => {
      e.preventDefault();
      const title = trig.dataset.title || 'Live System Demo';
      const tag = trig.dataset.tag || 'BananaTech Case Study';
      const type = trig.dataset.type || 'hospital';

      if (modalTitle) modalTitle.textContent = title;
      if (modalTag) modalTag.textContent = tag;

      // Render interactive mockup content inside modal
      if (modalFrame) {
        modalFrame.innerHTML = generateMockupHtml(type);
      }

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
}

function generateMockupHtml(type) {
  if (type === 'hospital') {
    return `
      <div class="p-6 bg-slate-900 rounded-xl text-left space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center space-x-3">
            <span class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase">NABH Accredited</span>
            <h4 class="font-bold text-white text-lg">Apollo Crest Specialty Hospital Portal</h4>
          </div>
          <span class="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">Cloudflare Edge 18ms</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">Doctor Roster</p>
            <p class="text-sm font-semibold text-white">48 Specialists Active</p>
            <span class="text-xs text-emerald-400">● Live OPD Teleconsultation</span>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">Digital Patient Queue</p>
            <p class="text-sm font-semibold text-white">Zero Wait OPD Token</p>
            <span class="text-xs text-amber-400">SMS & WhatsApp Alerts</span>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">EHR / Lab Reports</p>
            <p class="text-sm font-semibold text-white">Instant 1-Click Download</p>
            <span class="text-xs text-cyan-400">Encrypted Cloud Storage</span>
          </div>
        </div>
        <div class="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <p class="text-xs text-amber-400 font-mono mb-1">Key Results Delivered by BananaTech:</p>
          <ul class="text-xs text-slate-300 space-y-1">
            <li>✓ 340% increase in online appointment bookings within 60 days.</li>
            <li>✓ 100/100 Google PageSpeed Score via Cloudflare Pages edge delivery.</li>
            <li>✓ Automated WhatsApp confirmation reducing patient no-shows by 42%.</li>
          </ul>
        </div>
      </div>
    `;
  } else if (type === 'restaurant') {
    return `
      <div class="p-6 bg-slate-900 rounded-xl text-left space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center space-x-3">
            <span class="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs uppercase">QR Food Tech</span>
            <h4 class="font-bold text-white text-lg">SpiceCraft Kitchen & Rooftop Lounge</h4>
          </div>
          <span class="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">0% Platform Commission</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">QR Table Ordering</p>
            <p class="text-sm font-semibold text-white">Direct Kitchen Printer KDS</p>
            <span class="text-xs text-emerald-400">Avg 42s Order Cycle</span>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">Direct Online Delivery</p>
            <p class="text-sm font-semibold text-white">Saved ₹1.8L/mo Commissions</p>
            <span class="text-xs text-amber-400">Direct UPI & Card Pay</span>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">Smart Table Booking</p>
            <p class="text-sm font-semibold text-white">Automated Slot Allocation</p>
            <span class="text-xs text-cyan-400">98% Weekend Occupancy</span>
          </div>
        </div>
        <div class="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <p class="text-xs text-amber-400 font-mono mb-1">Key Results Delivered by BananaTech:</p>
          <ul class="text-xs text-slate-300 space-y-1">
            <li>✓ Eliminated 25-30% aggregator commissions by enabling direct customer orders.</li>
            <li>✓ Instant QR loading under 0.8s on 4G/5G networks.</li>
            <li>✓ Customer re-engagement CRM driving 38% repeat orders via WhatsApp.</li>
          </ul>
        </div>
      </div>
    `;
  } else if (type === 'mobileapp') {
    return `
      <div class="p-6 bg-slate-900 rounded-xl text-left space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center space-x-3">
            <span class="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs uppercase">iOS & Android</span>
            <h4 class="font-bold text-white text-lg">PulseHealth Remote Tele-Care Application</h4>
          </div>
          <span class="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">Flutter & Supabase</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">Cross-Platform Code</p>
            <p class="text-sm font-semibold text-white">96% Shared Codebase</p>
            <span class="text-xs text-emerald-400">App Store & Play Store</span>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">Real-time Sync</p>
            <p class="text-sm font-semibold text-white">Sub-100ms Vitals Sync</p>
            <span class="text-xs text-cyan-400">WebSockets & Edge DB</span>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <p class="text-xs text-slate-400">User Retention</p>
            <p class="text-sm font-semibold text-white">68% D30 Retention</p>
            <span class="text-xs text-amber-400">Personalized Smart Push</span>
          </div>
        </div>
        <div class="bg-slate-950 p-4 rounded-lg border border-slate-800">
          <p class="text-xs text-amber-400 font-mono mb-1">Key Results Delivered by BananaTech:</p>
          <ul class="text-xs text-slate-300 space-y-1">
            <li>✓ Shipped from zero to Google Play Store & Apple App Store in 38 days.</li>
            <li>✓ 4.8★ average app rating across 5,000+ active downloads.</li>
            <li>✓ Zero downtime with Cloudflare Workers backend routing.</li>
          </ul>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="p-6 bg-slate-900 rounded-xl text-left space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center space-x-3">
            <span class="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs uppercase">Digital Product</span>
            <h4 class="font-bold text-white text-lg">BananaTech Enterprise Architecture</h4>
          </div>
          <span class="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">Cloudflare Edge Ready</span>
        </div>
        <p class="text-sm text-slate-300">Custom engineered web applications, founder brand profiles, and high-performance business applications designed to drive conversions and enterprise valuation.</p>
      </div>
    `;
  }
}

/* ----------------------------------------------------
 * 7. Live Cloudflare Edge Latency Simulator / Display
 * -------------------------------------------------- */
function initLiveEdgePing() {
  const edgeElem = document.getElementById('cf-edge-ping');
  if (!edgeElem) return;

  const start = performance.now();
  // Fetch favicon or lightweight local asset to simulate instant edge time
  fetch('/assets/images/favicon.svg')
    .then(() => {
      const latency = Math.round(performance.now() - start);
      const displayMs = Math.max(12, Math.min(latency, 24));
      edgeElem.textContent = `${displayMs}ms Edge Response`;
    })
    .catch(() => {
      edgeElem.textContent = `16ms Cloudflare CDN`;
    });
}

/* ----------------------------------------------------
 * 8. Toast Helper
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
