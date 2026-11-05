function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (!links) return;
  const opening = !links.classList.contains('open');
  links.classList.toggle('open');
  if (!opening) {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  }
}

const KB = [
  {
    keys: ['paid', 'get paid', 'pay me', 'family member', 'caregiver pay', 'paid to care', 'paid caregiver', 'excluded', 'spouse', 'who cannot'],
    reply: `In Michigan, you often <strong>can</strong> be paid to care for a loved one through the state's <strong>Home Help Program</strong> (MDHHS). Adult children, siblings, grandchildren, and friends may qualify — spouses and a few roles are excluded. We help with enrollment and paperwork. <a href="articles/family-caregiver-pay.html">Read the guide →</a>`,
    followUps: [
      'Who cannot be a paid family caregiver?',
      'How long does enrollment usually take?',
      'What does home care cost if we do not qualify?'
    ]
  },
  {
    keys: ['cost', 'price', 'how much', 'afford', 'expensive', 'medicaid', 'pay for'],
    reply: `For most families we serve, care is covered through <strong>Michigan Medicaid's Home Help Program</strong> — little to no out-of-pocket cost when you qualify. We'll check eligibility for free. <a href="contact.html">Request a free check →</a>`,
    followUps: [
      'How do I know if my parent qualifies?',
      'Can a family member get paid instead?',
      'What services are included?'
    ]
  },
  {
    keys: ['service', 'what do you do', 'offer', 'help with', 'tasks'],
    reply: `We provide <strong>non-medical personal care</strong> at home through trusted family caregivers and trained Diamond providers: bathing, grooming, dressing, meals, light housekeeping, errands, medication reminders, mobility help, and companionship. <a href="services.html">All services →</a>`,
    followUps: [
      'Is this medical care or non-medical?',
      'Can a trained provider help if family cannot?',
      'What does it cost in Michigan?'
    ]
  },
  {
    keys: ['provider', 'trained provider', 'staff', 'aide', 'backup', 'family cannot', 'family can not', 'not family', 'who helps'],
    reply: `Yes. Care can come from a trusted family caregiver, one of our <strong>trained Diamond Home Assist providers</strong>, or a mix of both. Our providers are prepared for daily non-medical support like personal care, meals, errands, reminders, mobility help, and companionship. <a href="contact.html">Ask about provider support →</a>`,
    followUps: [
      'How are providers matched?',
      'Can family and providers share the schedule?',
      'What services can a provider do?'
    ]
  },
  {
    keys: ['parent', 'mom', 'dad', 'mother', 'father', 'start', 'get started', 'set up', 'how do i', 'sign up'],
    reply: `Tell us about your loved one, we confirm eligibility and match a caregiver, and care can begin at home — often within days. <a href="contact.html">Free consultation →</a>`,
    followUps: [
      'Can I get paid to care for them myself?',
      'What will you need from our family?',
      'Do you serve my county?'
    ]
  },
  {
    keys: ['eligible', 'qualify', 'eligibility', 'requirements'],
    reply: `Eligibility depends on Medicaid status and how much daily help your loved one needs. A quick, free check with us is the fastest way to know. <a href="contact.html">Check eligibility →</a>`,
    followUps: [
      'What if they already have Medicaid?',
      'Can I be the paid caregiver?',
      'How much does care cost if approved?'
    ]
  },
  {
    keys: ['area', 'where', 'location', 'michigan', 'near me', 'serve', 'county'],
    reply: `We serve families in all <strong>83 Michigan counties</strong>. Share your county and we'll confirm coverage. <a href="contact.html">Contact us →</a>`,
    followUps: [
      'How do I start the application?',
      'Can family members get paid?',
      'What help can a caregiver provide?'
    ]
  },
  {
    keys: ['caregiver', 'helper', 'staff', 'aide', 'who comes', 'uniform'],
    reply: `Caregivers and providers are background-checked, trained on Home Help standards, and arrive in a Diamond Home Assist uniform. Many families use a trusted relative, a trained provider, or both. <a href="about.html">Our approach →</a>`,
    followUps: [
      'Can my sibling be the caregiver?',
      'Can a trained provider help if family cannot?',
      'How do we request a consultation?'
    ]
  },
  {
    keys: ['hour', 'schedule', 'how often', 'time', 'days'],
    reply: `Hours are set by MDHHS based on your loved one's needs — often up to authorized monthly hours. We build the schedule with your family. <a href="contact.html">Plan together →</a>`,
    followUps: [
      'Who decides how many hours we get?',
      'Can care be daily or just a few days a week?',
      'How do I check eligibility?'
    ]
  }
];

const FALLBACK = {
  reply: `The clearest answer usually comes from a <strong>free consultation</strong> with our team. <a href="contact.html">Get in touch →</a> You can also ask about trained providers, family caregiver pay, services, eligibility, or getting started.`,
  followUps: [
    'Can I get paid to care for my mom?',
    'Can a trained provider help if family cannot?',
    'How do I know if we qualify?'
  ]
};

let turnCount = 0;

function findMatch(text) {
  const t = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const item of KB) {
    let score = 0;
    for (const k of item.keys) if (t.includes(k)) score += k.split(' ').length;
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  if (best) return { reply: best.reply, followUps: best.followUps, matched: true };
  return { reply: FALLBACK.reply, followUps: FALLBACK.followUps, matched: false };
}

function shouldShowFollowUps(matched) {
  if (turnCount > 5) return Math.random() < 0.25;
  return matched ? Math.random() < 0.68 : Math.random() < 0.35;
}

const thread = document.getElementById('chatBody');
const chatHero = document.getElementById('chatHero');

function scrollThread() {
  if (!thread) return;
  thread.scrollTop = thread.scrollHeight;
}

function setChatActive() {
  if (chatHero) chatHero.classList.add('is-active');
}

function appendMessage(role, content, isHtml) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg ' + role;
  const inner = document.createElement('div');
  inner.className = 'chat-msg-inner';
  if (isHtml) inner.innerHTML = content;
  else inner.textContent = content;
  msg.appendChild(inner);
  thread.appendChild(msg);
  scrollThread();
  return inner;
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'chat-msg assistant';
  el.id = 'typing';
  el.innerHTML = '<div class="chat-msg-inner chat-typing">Thinking</div>';
  thread.appendChild(el);
  scrollThread();
}

function hideTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}

function removeFollowUps() {
  document.querySelectorAll('.chat-followups').forEach((el) => el.remove());
}

function showFollowUps(questions) {
  if (!thread || !questions?.length) return;
  removeFollowUps();

  const wrap = document.createElement('div');
  wrap.className = 'chat-followups';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Suggested follow-up questions');

  const list = document.createElement('div');
  list.className = 'chat-followups-list';

  questions.slice(0, 3).forEach((q) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = q;
    btn.addEventListener('click', () => sendFollowUp(q));
    list.appendChild(btn);
  });

  wrap.appendChild(list);
  thread.appendChild(wrap);

  requestAnimationFrame(() => {
    wrap.classList.add('is-visible');
    scrollThread();
  });
}

function sendFollowUp(text) {
  removeFollowUps();
  hideStarters();
  setChatActive();
  appendMessage('user', text, false);
  botRespond(text);
}

function botRespond(text) {
  const match = findMatch(text);
  turnCount += 1;

  showTyping();
  setTimeout(() => {
    hideTyping();
    appendMessage('assistant', match.reply, true);

    if (shouldShowFollowUps(match.matched)) {
      setTimeout(() => showFollowUps(match.followUps), 320);
    }
  }, 550 + Math.random() * 400);
}

function hideStarters() {
  const s = document.getElementById('starters');
  if (s) s.style.display = 'none';
}

function sendStarter(text) {
  removeFollowUps();
  hideStarters();
  setChatActive();
  appendMessage('user', text, false);
  botRespond(text);
}

function handleSend() {
  const input = document.getElementById('chatInput');
  if (!input || !thread) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = '';
  removeFollowUps();
  hideStarters();
  setChatActive();
  appendMessage('user', text, false);
  botRespond(text);
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .stagger, .trust-bar, .cta-rise, .photo, .step').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('step')) {
          entry.target.classList.add('is-visible');
        }
        observer.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .stagger, .trust-bar, .cta-rise, .photo').forEach((el) => {
    observer.observe(el);
  });

  document.querySelectorAll('.step').forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();

  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-drop-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth > 720) return;
      e.preventDefault();
      dropdown.classList.toggle('open');
      document.querySelectorAll('.nav-dropdown').forEach((d) => {
        if (d !== dropdown) d.classList.remove('open');
      });
    });
  });

  // Close nav when any plain link or dropdown sub-link is tapped on mobile
  document.querySelectorAll('.nav-links > a, .nav-drop-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth > 720) return;
      const nav = document.getElementById('navLinks');
      if (nav) nav.classList.remove('open');
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    });
  });

  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('input', () => autoResize(input));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
  }

  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });
  }
});
