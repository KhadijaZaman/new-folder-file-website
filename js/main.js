(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  function setMobile(open){
    if(!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', String(open));
    mobileNav.hidden = !open;
    document.body.dataset.navOpen = open ? '1' : '0';
  }
  if(toggle && mobileNav){
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMobile(!isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMobile(false)));
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') setMobile(false);
    });
  }

  // Video lightbox modal
  const videoModal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  function openVideoModal(card){
    if(!card) return;
    const title = card.getAttribute('data-video-title');
    const url = card.getAttribute('data-video-url');
    const desc = card.getAttribute('data-video-desc');

    if(title && url && videoModal && videoPlayer){
      modalTitle.textContent = title;
      modalDescription.textContent = desc || '';
      videoPlayer.src = url;
      videoModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function closeVideoModal(){
    if(videoModal){
      videoModal.hidden = true;
      videoPlayer.src = '';
      document.body.style.overflow = '';
    }
  }

  // Use event delegation on document to handle all video triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.video-trigger');
    if(trigger){
      e.preventDefault();
      e.stopPropagation();
      const card = trigger.closest('.video-card');
      if(card) openVideoModal(card);
    }
  });

  if(modalClose){
    modalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeVideoModal();
    });
  }

  if(modalOverlay){
    modalOverlay.addEventListener('click', closeVideoModal);
  }

  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && videoModal && !videoModal.hidden){
      closeVideoModal();
    }
  });

  // Reveal on scroll
  const revealables = document.querySelectorAll('.section, .hero, .footer');
  revealables.forEach(el => el.classList.add('reveal'));

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, {threshold: 0.12});
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-visible'));
  }

  // Contact form: open mail client with prefilled content
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const message = String(fd.get('message') || '').trim();

      const subject = encodeURIComponent(`Consultation Request — khadijazaman.com`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nWhat we're solving:\n${message}\n\n— Sent from khadijazaman.com`
      );

      window.location.href = `mailto:khadijarafiqzaman@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Builder.io Integration
  // Initialize Builder with your public API key (required for headless CMS)
  const BUILDER_API_KEY = '6cb89a19747242e7ba0f4d3103f188ed'; // Replace with your API key
  
  // Function to fetch content from Builder.io headless CMS
  async function fetchBuilderContent(modelName, options = {}) {
    try {
      const query = new URLSearchParams({
        apiKey: BUILDER_API_KEY,
        limit: options.limit || 10,
        sort: options.sort || '-createdDate',
        query: options.query || '',
      });

      const response = await fetch(
        `https://cdn.builder.io/api/v3/content/${modelName}?${query}`
      );

      if (!response.ok) throw new Error(`Builder.io API error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching Builder content:', error);
      return null;
    }
  }

  // Function to render Builder content dynamically
  async function renderBuilderSection(modelName, targetSelector) {
    const data = await fetchBuilderContent(modelName);
    if (!data || !data.results || data.results.length === 0) return;

    const content = data.results[0];
    const target = document.querySelector(targetSelector);
    if (!target || !content.data) return;

    // Update section with Builder-managed content
    if (content.data.html) {
      target.innerHTML = content.data.html;
    }
    if (content.data.css) {
      const style = document.createElement('style');
      style.textContent = content.data.css;
      document.head.appendChild(style);
    }
  }

  // Optional: Load specific sections from Builder (uncomment to use)
  // renderBuilderSection('hero', '[data-builder-id="hero-section"]');
  // renderBuilderSection('insights', '[data-builder-id="insights-section"]');

  // Expose fetchBuilderContent globally for custom use
  window.builderFetch = fetchBuilderContent;
})();
