/* CyberWall — small vanilla JS: mobile nav, plan prefill, contact form validation. */
(function () {
  document.documentElement.classList.add('js');

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Contact form (front-end only; see the note in contact.html and README.md)
  var form = document.getElementById('start-form');
  if (!form) return;

  // Pre-select plan from ?plan=essentials|standard|priority
  var params = new URLSearchParams(window.location.search);
  var plan = params.get('plan');
  var planSel = document.getElementById('plan');
  if (plan && planSel) {
    for (var i = 0; i < planSel.options.length; i++) {
      if (planSel.options[i].value === plan) { planSel.selectedIndex = i; }
    }
  }

  var rules = {
    name: function (v) { return v.trim() ? '' : 'Please tell us your name so we know who to reply to.'; },
    email: function (v) {
      if (!v.trim()) return 'Please enter your email address so we can reply.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'That email address doesn\u2019t look quite right. Could you check it?';
    },
    site: function (v) {
      if (!v.trim()) return '';
      return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(v.trim()) ? '' : 'That web address doesn\u2019t look quite right. Example: www.yourstore.com';
    },
    platform: function (v) { return v ? '' : 'Please choose what your store is built on. \u201CNot sure\u201D is a fine answer.'; },
    consent: function (checked) { return checked ? '' : 'Please tick this box so we know it\u2019s okay to reply to you.'; }
  };

  function validateField(id) {
    var el = document.getElementById(id);
    var msg = rules[id](id === 'consent' ? el.checked : el.value);
    var wrap = el.closest('.field');
    var err = document.getElementById(id + '-error');
    wrap.classList.toggle('invalid', !!msg);
    err.textContent = msg;
    if (msg) { el.setAttribute('aria-invalid', 'true'); } else { el.removeAttribute('aria-invalid'); }
    return msg;
  }

  Object.keys(rules).forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('blur', function () { validateField(id); });
    el.addEventListener('input', function () {
      if (el.closest('.field').classList.contains('invalid')) validateField(id);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstBad = null;
    Object.keys(rules).forEach(function (id) {
      if (validateField(id) && !firstBad) firstBad = document.getElementById(id);
    });
    if (firstBad) { firstBad.focus(); return; }

    // TODO (before launch): send the form data to a real backend here
    // (Formspree, Netlify Forms, or a PHP mail handler). Right now nothing is sent anywhere.
    var thanks = document.getElementById('thanks');
    var name = document.getElementById('name').value.trim().split(' ')[0];
    document.getElementById('thanks-name').textContent = name;
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
  });
})();
