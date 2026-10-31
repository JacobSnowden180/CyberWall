/* CyberWall — mobile nav and early-access form checks.
   Keep this file in the document head, not deferred: the first line
   marks the page as JS-capable before the body is painted. */
(function () {
  document.documentElement.classList.add('js');

  function boot() {
    initForm();
    initNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    var label = toggle.querySelector('.nav-toggle-text');

    function setOpen(open, returnFocus) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (label) label.textContent = open ? 'Close' : 'Menu';
      if (!open && returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'), false);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false, false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false, true);
      }
    });

    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false, false);
    });

    if (window.matchMedia) {
      var desktop = window.matchMedia('(min-width: 900px)');
      if (desktop.addEventListener) {
        desktop.addEventListener('change', function (event) {
          if (event.matches) setOpen(false, false);
        });
      }
    }
  }

  function initForm() {
    var form = document.getElementById('start-form');
    if (!form) return;

    var plans = {
      essentials: 'Essentials',
      standard: 'Standard',
      priority: 'Priority'
    };
    var planField = document.getElementById('plan');
    var planNote = document.getElementById('plan-note');
    var selected = new URLSearchParams(window.location.search).get('plan');
    if (selected && plans[selected] && planField) {
      planField.value = selected;
      if (planNote) {
        planNote.hidden = false;
        planNote.textContent = 'This page pre-selected the ' + plans[selected] + ' plan because of the link you followed. You can change it.';
      }
    }

    var rules = {
      name: function (value) {
        return value.trim() ? '' : 'Enter your name so a reply has someone to address.';
      },
      email: function (value) {
        if (!value.trim()) return 'Enter an email address so a reply has somewhere to go.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'That email address does not look complete. Check the spelling.';
      },
      site: function (value) {
        if (!value.trim()) return '';
        return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}([\/?#].*)?$/i.test(value.trim())
          ? ''
          : 'That web address does not look complete. Example: www.yourstore.com';
      },
      platform: function (value) {
        return value ? '' : 'Choose what the store is built on. “Not sure” is a fine answer.';
      },
      consent: function (checked) {
        return checked ? '' : 'Tick the box if the team may email you about early access.';
      }
    };

    function field(id) {
      return document.getElementById(id);
    }

    function validateField(id) {
      var el = field(id);
      var message = rules[id](id === 'consent' ? el.checked : el.value);
      var wrap = el.closest('.field');
      var error = document.getElementById(id + '-error');
      wrap.classList.toggle('invalid', !!message);
      error.textContent = message;
      if (message) el.setAttribute('aria-invalid', 'true');
      else el.removeAttribute('aria-invalid');
      return message;
    }

    Object.keys(rules).forEach(function (id) {
      var el = field(id);
      el.addEventListener('blur', function () { validateField(id); });
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('invalid')) validateField(id);
      });
      el.addEventListener('change', function () {
        if (el.closest('.field').classList.contains('invalid')) validateField(id);
      });
    });

    var summary = document.getElementById('error-summary');
    var summaryList = document.getElementById('error-list');
    var thanks = document.getElementById('thanks');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var problems = [];
      Object.keys(rules).forEach(function (id) {
        var message = validateField(id);
        if (message) problems.push({ id: id, message: message });
      });

      if (problems.length) {
        summaryList.textContent = '';
        problems.forEach(function (problem) {
          var item = document.createElement('li');
          var link = document.createElement('a');
          link.href = '#' + problem.id;
          link.textContent = problem.message;
          link.addEventListener('click', function (clickEvent) {
            clickEvent.preventDefault();
            field(problem.id).focus();
          });
          item.appendChild(link);
          summaryList.appendChild(item);
        });
        summary.hidden = false;
        summary.focus();
        return;
      }

      summary.hidden = true;
      var first = field('name').value.trim().split(/\s+/)[0];
      document.getElementById('thanks-name').textContent = first;
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
    });

    var edit = document.getElementById('edit-answers');
    if (edit) {
      edit.addEventListener('click', function () {
        thanks.hidden = true;
        form.hidden = false;
        field('name').focus();
      });
    }
  }
})();
