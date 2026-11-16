function getSelectedLabel(select: HTMLSelectElement): string {
  return select.options[select.selectedIndex]?.text ?? select.value;
}

function buildWhatsAppMessage(form: HTMLFormElement, lang: string): string {
  const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
  const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
  const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
  const product = getSelectedLabel(form.elements.namedItem('product') as HTMLSelectElement);
  const plan = getSelectedLabel(form.elements.namedItem('plan') as HTMLSelectElement);
  const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

  if (lang === 'en') {
    const lines = [
      'Hello, I would like information about a Resoria product.',
      '',
      `*Name:* ${name}`,
      `*Email:* ${email}`,
    ];
    if (phone) lines.push(`*Phone:* ${phone}`);
    lines.push(`*Product:* ${product}`, `*Plan:* ${plan}`);
    if (message) lines.push(`*Message:* ${message}`);
    return lines.join('\n');
  }

  const lines = [
    'Hola, quiero información sobre un producto de Resoria.',
    '',
    `*Nombre:* ${name}`,
    `*Correo:* ${email}`,
  ];
  if (phone) lines.push(`*Teléfono:* ${phone}`);
  lines.push(`*Producto:* ${product}`, `*Modalidad:* ${plan}`);
  if (message) lines.push(`*Mensaje:* ${message}`);
  return lines.join('\n');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!(form instanceof HTMLFormElement)) return;

  const whatsapp = form.dataset.whatsapp;
  const lang = form.dataset.lang ?? 'es';
  if (!whatsapp) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = buildWhatsAppMessage(form, lang);
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

initContactForm();
