document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('[name="company_website"]');

  const setStatus = (message, type = '') => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    if (type) statusEl.classList.add(type);
  };

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (honeypot && honeypot.value.trim()) {
      setStatus('Request blocked.', 'is-error');
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      whatsapp: String(formData.get('whatsapp') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      project_type: String(formData.get('project_type') || '').trim(),
      budget: String(formData.get('budget') || '').trim(),
      description: String(formData.get('description') || '').trim()
    };

    if (!payload.name || !payload.email || !payload.description) {
      setStatus('Please complete your name, email and project description.', 'is-error');
      return;
    }

    if (!validateEmail(payload.email)) {
      setStatus('Please enter a valid email address.', 'is-error');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    setStatus('Sending your project request...', '');

    try {
      const result = await window.CARELINK_SUPABASE.insertInquiry(payload);

      if (result.ok) {
        form.reset();
        setStatus('Thanks — we’ve received your project request. We’ll get back to you soon.', 'is-success');
      } else {
        setStatus(result.message || 'Something went wrong. Please try again.', 'is-error');
      }
    } catch (error) {
      setStatus('We could not send your request right now. Please try again in a moment.', 'is-error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Project Request';
    }
  });
});
