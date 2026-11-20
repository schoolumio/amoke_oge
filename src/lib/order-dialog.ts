/**
 * Client-side behaviour for the WhatsApp order dialog.
 */
interface OrderData {
  prices: Record<string, number>;
  defaultNumber: string | null;
  defaultMessage: string;
  branches: { slug: string; name: string; number: string | null }[];
}
interface Line { name: string; qty: number; price?: number }

const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

export const estimate = (lines: Line[]) => {
  const priced = lines.filter((l) => typeof l.price === 'number');
  return { total: priced.reduce((t, l) => t + l.price! * l.qty, 0), complete: priced.length === lines.length, any: priced.length > 0 };
};

const STORAGE_KEY = 'amoke-oge-order';

const store = {
  load(): Line[] {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((l) => l && typeof l.name === 'string' && l.qty > 0) : [];
    } catch {
      return [];
    }
  },
  save(lines: Line[]) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines)); } catch { /* storage unavailable */ }
  },
};

export function buildMessage(opts: {
  lines: Line[];
  branchName: string | null;
  mode: string;
  notes: string;
  name: string;
  defaultMessage: string;
}) {
  const parts: string[] = [];
  if (opts.lines.length) {
    parts.push("Hello Amoke Oge, I'd like to order:");
    opts.lines.forEach((l) => parts.push(`• ${l.qty} × ${l.name}${l.price ? ` — ${naira(l.price * l.qty)}` : ''}`));
    const est = estimate(opts.lines);
    if (est.any) parts.push(`Estimated total: ${naira(est.total)}${est.complete ? '' : ' + other items'} (pack/delivery extra)`);
  } else {
    parts.push(opts.defaultMessage);
  }
  parts.push('');
  parts.push(`Branch: ${opts.branchName ?? 'Please advise the nearest branch'}`);
  parts.push(`Order type: ${opts.mode}`);
  if (opts.notes.trim()) parts.push(`Notes: ${opts.notes.trim()}`);
  if (opts.name.trim()) parts.push(`Name: ${opts.name.trim()}`);
  if (opts.lines.length) {
    parts.push('');
    parts.push('Please confirm availability and the total. Thank you.');
  }
  return parts.join('\n');
}

export function initOrderDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-order-dialog]');
  const dataEl = dialog?.querySelector('[data-order-data]');
  if (!dialog || !dataEl || typeof dialog.showModal !== 'function') return;

  const data: OrderData = JSON.parse(dataEl.textContent || '{}');
  const form = dialog.querySelector<HTMLFormElement>('[data-order-form]')!;
  const list = dialog.querySelector<HTMLUListElement>('[data-order-items]')!;
  const empty = dialog.querySelector<HTMLElement>('[data-order-empty]')!;
  const add = dialog.querySelector<HTMLSelectElement>('[data-order-add]')!;
  const preview = dialog.querySelector<HTMLElement>('[data-order-preview]')!;
  const send = dialog.querySelector<HTMLAnchorElement>('[data-order-send]')!;
  const totalEl = dialog.querySelector<HTMLElement>('[data-order-total]');

  let lines: Line[] = store.load();
  let lastTrigger: HTMLElement | null = null;

  const branchFor = (slug: string) => data.branches.find((b) => b.slug === slug) ?? null;

  const update = () => {
    const fd = new FormData(form);
    const branch = branchFor(String(fd.get('branch') ?? ''));
    const message = buildMessage({
      lines,
      branchName: branch?.name ?? null,
      mode: String(fd.get('mode') ?? 'Pickup (takeaway)'),
      notes: String(fd.get('notes') ?? ''),
      name: String(fd.get('name') ?? ''),
      defaultMessage: data.defaultMessage,
    });
    const number = branch?.number ?? data.defaultNumber;
    send.href = `https://wa.me/${number ?? ''}?text=${encodeURIComponent(message)}`;
    preview.textContent = message;
    store.save(lines);
  };

  const render = () => {
    list.replaceChildren(
      ...lines.map((line, i) => {
        const li = document.createElement('li');
        const name = document.createElement('span');
        name.className = 'item-name';
        name.textContent = line.name;
        if (line.price) {
          const small = document.createElement('small');
          small.textContent = `${naira(line.price)} each`;
          name.append(small);
        }
        const qty = document.createElement('span');
        qty.className = 'qty';
        const minus = document.createElement('button');
        minus.type = 'button';
        minus.setAttribute('aria-label', line.qty > 1 ? `One less ${line.name}` : `Remove ${line.name}`);
        minus.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';
        minus.addEventListener('click', () => {
          line.qty -= 1;
          if (line.qty <= 0) lines.splice(i, 1);
          render();
        });
        const out = document.createElement('output');
        out.textContent = String(line.qty);
        out.setAttribute('aria-label', `Quantity of ${line.name}`);
        const plus = document.createElement('button');
        plus.type = 'button';
        plus.setAttribute('aria-label', `One more ${line.name}`);
        plus.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
        plus.addEventListener('click', () => { line.qty = Math.min(line.qty + 1, 50); render(); });
        qty.append(minus, out, plus);
        li.append(name, qty);
        return li;
      }),
    );
    empty.hidden = lines.length > 0;
    if (totalEl) {
      const est = estimate(lines);
      totalEl.hidden = !est.any;
      totalEl.textContent = est.any ? `Estimated total ${naira(est.total)}${est.complete ? '' : ' + unpriced items'} · pack & delivery extra` : '';
    }
    update();
  };

  const addDish = (name: string, price?: number) => {
    const p = Number.isFinite(price) && price! > 0 ? price : data.prices[name];
    const existing = lines.find((l) => l.name === name);
    if (existing) existing.qty += 1;
    else lines.push(p ? { name, qty: 1, price: p } : { name, qty: 1 });
  };

  const open = (trigger: HTMLElement) => {
    lastTrigger = trigger;
    const dish = trigger.dataset.dish;
    if (dish && !lines.some((l) => l.name === dish)) addDish(dish, Number(trigger.dataset.price));
    const branch = trigger.dataset.branch;
    if (branch) {
      const radio = form.querySelector<HTMLInputElement>(`input[name="branch"][value="${CSS.escape(branch)}"]`);
      if (radio) radio.checked = true;
    }
    render();
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => dialog.classList.add('is-open'));
  };

  const close = () => {
    dialog.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => {
      dialog.close();
      lastTrigger?.focus({ preventScroll: true });
    }, reduced ? 0 : 300);
  };

  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-order-trigger]');
    if (!trigger || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    open(trigger);
  });

  add.addEventListener('change', () => {
    if (add.value) addDish(add.value);
    add.value = '';
    render();
  });
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (e) => e.preventDefault());
  dialog.querySelector('[data-order-close]')?.addEventListener('click', close);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  send.addEventListener('click', () => {
    // Order handed over to WhatsApp: clear the list for next time.
    setTimeout(() => { lines = []; render(); close(); }, 400);
  });

  render();
}
