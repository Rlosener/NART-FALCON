(() => {
  'use strict';
  const config = window.NART_PUBLIC_CONFIG || {};
  const contact = config.contact || {};
  const safePublicUrl = value => {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url : null;
    } catch {
      return null;
    }
  };
  const corporateUrl = safePublicUrl(config.corporateSiteUrl);
  const storeUrl = safePublicUrl(config.storeSiteUrl);
  if (storeUrl) {
    document.querySelectorAll('[data-nart-store-link]').forEach(link => {
      link.href = storeUrl.href;
    });
  }

  const pageName = location.pathname.split('/').pop() || 'index.html';
  const seo = {
    'index.html': ['Nart Falcon | Kreatif Stüdyo & Dijital Deneyimler', 'Nart Falcon Creative; marka stratejisi, yaratıcı tasarım, web geliştirme ve dijital iletişimi tek bir güçlü deneyimde buluşturur.'],
    'index-4.html': ['Nart Falcon | Kreatif Stüdyo & Dijital Deneyimler', 'Nart Falcon Creative; marka stratejisi, yaratıcı tasarım, web geliştirme ve dijital iletişimi tek bir güçlü deneyimde buluşturur.'],
    'page-about.html': ['Biz | Nart Falcon Creative', 'Nart Falcon Creative’in strateji, tasarım ve teknolojiyi bir araya getiren yaratıcı yaklaşımını keşfedin.'],
    'page-services.html': ['Hizmetler | Nart Falcon Creative', 'Marka, sosyal medya, dijital reklam, fotoğraf-video, web, yazılım ve üretim hizmetlerimizi inceleyin.'],
    'page-service-details.html': ['Hizmet Detayları | Nart Falcon Creative', 'Nart Falcon Creative’in yedi hizmet grubundaki kapsam, çıktı ve çalışma yaklaşımını inceleyin.'],
    'page-projects.html': ['Yaratıcı Alanlar | Nart Falcon Creative', 'Nart Falcon Creative’in marka, dijital deneyim ve içerik alanlarındaki konsept çalışmalarını keşfedin.'],
    'page-project-details.html': ['Proje Detayı | Nart Falcon Creative', 'Nart Falcon Creative proje yaklaşımını ve seçili konsept çalışmanın ayrıntılarını inceleyin.'],
    'news-grid.html': ['İçgörüler | Nart Falcon Creative', 'Strateji, tasarım, teknoloji ve yaratıcı üretim üzerine Nart Falcon içgörülerini okuyun.'],
    'news-details.html': ['İçgörü Detayı | Nart Falcon Creative', 'Nart Falcon Creative’den strateji, tasarım ve teknoloji üzerine seçili bir içgörü yazısı.'],
    'page-faq.html': ['Sık Sorulan Sorular | Nart Falcon Creative', 'Nart Falcon Creative hizmetleri, çalışma modeli ve proje süreci hakkında sık sorulan sorular.'],
    'page-contact.html': ['İletişim | Nart Falcon Creative', 'Marka, tasarım, teknoloji veya yaratıcı üretim projenizi Nart Falcon Creative ile paylaşın.'],
    'page-privacy.html': ['Gizlilik Bilgilendirmesi | Nart Falcon Creative', 'Nart Falcon Creative iletişim formunda kullanılan kişisel veriler ve zorunlu teknik oturumlar hakkında bilgilendirme.'],
    'page-404.html': ['Sayfa Bulunamadı | Nart Falcon Creative', 'Aradığınız sayfa bulunamadı. Nart Falcon ana sayfasına, hizmetlerine veya mağazasına geçin.'],
  };
  const [seoTitle, seoDescription] = seo[pageName] || seo['index.html'];
  document.title = seoTitle;
  const setMeta = (selector, attribute, value) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      const [key, name] = attribute === 'property' ? ['property', selector.match(/"([^"]+)"/)?.[1]] : ['name', selector.match(/"([^"]+)"/)?.[1]];
      if (name) element.setAttribute(key, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', value);
  };
  setMeta('meta[name="description"]', 'name', seoDescription);
  setMeta('meta[property="og:title"]', 'property', seoTitle);
  setMeta('meta[property="og:description"]', 'property', seoDescription);
  setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'name', seoTitle);
  setMeta('meta[name="twitter:description"]', 'name', seoDescription);
  if (corporateUrl) {
    const canonicalUrl = new URL(
      ['index.html', 'index-4.html'].includes(pageName) ? '/' : `/${pageName}`,
      corporateUrl,
    );
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl.href;
    setMeta('meta[property="og:url"]', 'property', canonicalUrl.href);
    const shareImage = new URL('/images/banner/nart-falcon-hero.jpg', corporateUrl).href;
    setMeta('meta[property="og:image"]', 'property', shareImage);
    setMeta('meta[property="og:image:alt"]', 'property', 'Nart Falcon Creative marka görseli');
    setMeta('meta[name="twitter:image"]', 'name', shareImage);
    const structured = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Nart Falcon Creative',
      url: corporateUrl.href,
      logo: new URL('/images/nart-falcon-logo.svg', corporateUrl).href,
      ...(contact.email ? { email: contact.email } : {}),
      ...(contact.phone ? { telephone: contact.phone } : {}),
      ...(contact.address ? { address: contact.address } : {}),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structured);
    document.head.appendChild(script);
  }
  const contactContainer = document.querySelector('[data-nart-public-contact]');
  if (contactContainer) {
    const items = [
      contact.email && ['E-posta', contact.email, `mailto:${contact.email}`],
      contact.phone && ['Telefon', contact.phone, `tel:${String(contact.phone).replace(/[^+\d]/g, '')}`],
      contact.address && ['Adres', contact.address, ''],
    ].filter(Boolean);
    if (items.length) {
      const heading = document.createElement('div');
      heading.className = 'h5';
      heading.textContent = 'Doğrudan iletişim';
      contactContainer.appendChild(heading);
      items.forEach(([label, value, href]) => {
        const row = document.createElement('p');
        const title = document.createElement('strong');
        title.textContent = `${label}: `;
        row.appendChild(title);
        if (href) {
          const link = document.createElement('a');
          link.href = href;
          link.textContent = value;
          row.appendChild(link);
        } else {
          row.appendChild(document.createTextNode(value));
        }
        contactContainer.appendChild(row);
      });
      contactContainer.hidden = false;
    }
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = document.querySelectorAll('video');
  const videoToggle = document.querySelector('.nart-video-toggle');
  let videoPausedByUser = reducedMotion.matches;
  const syncVideos = () => {
    videos.forEach(video => {
      if (videoPausedByUser || document.hidden) video.pause();
      else video.play().catch(() => {});
    });
    if (videoToggle) {
      const label = videoPausedByUser ? 'Videoyu oynat' : 'Videoyu duraklat';
      videoToggle.textContent = label;
      videoToggle.setAttribute('aria-label', 'Arka plan ' + label.toLocaleLowerCase('tr'));
    }
  };
  syncVideos();
  videoToggle?.addEventListener('click', () => { videoPausedByUser = !videoPausedByUser; syncVideos(); });
  document.addEventListener('visibilitychange', syncVideos);
  reducedMotion.addEventListener('change', event => { videoPausedByUser = event.matches; syncVideos(); });

  const menu = document.querySelector('.mobile-menu');
  let menuTrigger;
  if (menu) {
    const openers = document.querySelectorAll('.mobile-nav-toggler');
    const syncMenu = () => {
      const open = document.body.classList.contains('mobile-menu-visible');
      menu.inert = !open;
      menu.setAttribute('aria-hidden', String(!open));
      openers.forEach(button => button.setAttribute('aria-expanded', String(open)));
      if (open) menu.querySelector('.close-btn')?.focus();
      else if (menu.contains(document.activeElement)) menuTrigger?.focus();
    };
    openers.forEach(button => button.addEventListener('click', () => { menuTrigger = button; }));
    new MutationObserver(syncMenu).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    syncMenu();
    document.addEventListener('keydown', event => {
      if (!document.body.classList.contains('mobile-menu-visible')) return;
      if (event.key === 'Escape') document.body.classList.remove('mobile-menu-visible');
      if (event.key === 'Tab') {
        const items = [...menu.querySelectorAll('a[href], button, [tabindex="0"]')].filter(el => el.getClientRects().length);
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    });
    menu.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', () => document.body.classList.remove('mobile-menu-visible')));
  }
  document.querySelectorAll('.acc-btn').forEach(button => {
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); button.click(); }
    });
    new MutationObserver(() => button.setAttribute('aria-expanded', String(button.classList.contains('active'))))
      .observe(button, { attributes: true, attributeFilter: ['class'] });
  });
  document.querySelectorAll('.service-block-four a').forEach(link => link.addEventListener('focus', () => {
    const source = link.closest('.inner-block')?.dataset.img;
    const image = document.getElementById('serviceImage');
    if (image && source) image.src = source;
  }));

  const form = document.querySelector('[data-nart-contact]');
  if (!form) return;
  const status = form.querySelector('.nart-form-status');
  const submit = form.querySelector('[type="submit"]');
  const reset = form.querySelector('[type="reset"]');
  let sending = false;
  const subjects = {"marka": "Marka ve Tasarım", "sosyal-medya": "Sosyal Medya", "dijital": "Dijital Reklam", "fotograf-video": "Fotoğraf ve Video", "web": "Web ve Dijital Çözümler", "yazilim": "Yazılım ve Otomasyon", "uretim": "Üretim ve Uygulama", "arayuz": "Web ve Dijital Çözümler", "strateji": "Marka ve Tasarım"};
  const selected = subjects[new URLSearchParams(location.search).get('service')];
  if (selected) form.elements.form_subject.value = selected;
  const showStatus = (message, state) => { status.textContent = message; status.dataset.state = state; };
  form.addEventListener('input', event => {
    event.target.removeAttribute('aria-invalid');
    event.target.setCustomValidity?.('');
  });
  form.addEventListener('reset', () => {
    showStatus('', '');
    form.querySelectorAll('[aria-invalid]').forEach(el => { el.removeAttribute('aria-invalid'); el.setCustomValidity(''); });
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    for (const field of form.querySelectorAll('[required]')) {
      if (field.type !== 'checkbox') field.value = field.value.trim();
      field.setCustomValidity('');
      if (!field.value || !field.checkValidity()) {
        const requiredMessages = { form_name: 'Lütfen adınızı ve soyadınızı yazın.', form_email: 'Lütfen e-posta adresinizi yazın.', form_subject: 'Lütfen projenizin konusunu belirtin.', form_message: 'Lütfen mesajınızı yazın.', privacy_consent: 'Mesajı göndermek için gizlilik bilgilendirmesini onaylayın.' };
        const message = requiredMessages[field.name] || 'Lütfen bu alanı geçerli biçimde doldurun.';
        field.setAttribute('aria-invalid', 'true');
        showStatus(message, 'error');
        field.setCustomValidity(message);
        field.reportValidity();
        field.focus();
        return;
      }
    }
    sending = true;
    const original = submit.innerHTML;
    submit.disabled = true;
    if (reset) reset.disabled = true;
    submit.textContent = 'Gönderiliyor…';
    form.setAttribute('aria-busy', 'true');
    showStatus('Mesajınız gönderiliyor…', 'pending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const tokenResponse = await fetch(form.action, { headers: { Accept: 'application/json' }, credentials: 'same-origin', signal: controller.signal });
      const token = await tokenResponse.json();
      if (!tokenResponse.ok || !token.csrf) throw new Error(token.message || 'Form şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
      const body = new FormData(form);
      body.set('csrf', token.csrf);
      const response = await fetch(form.action, { method: 'POST', body, credentials: 'same-origin', headers: { Accept: 'application/json' }, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || 'Mesaj gönderilemedi. Lütfen tekrar deneyin.');
      form.reset();
      showStatus(result.message, 'success');
    } catch (error) {
      const message = error.name === 'AbortError' ? 'İşlem beklenenden uzun sürdü; mesajın iletildiği doğrulanamadı. Girdiğiniz bilgiler korundu.' : (error instanceof SyntaxError || error instanceof TypeError) ? 'İletişim servisine ulaşılamadı. Girdiğiniz bilgiler korundu; lütfen daha sonra tekrar deneyin.' : error.message;
      showStatus(message, 'error');
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      if (reset) reset.disabled = false;
      submit.innerHTML = original;
      form.removeAttribute('aria-busy');
    }
  });
})();
