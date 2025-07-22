// bootstrap 5 collapse API
const collapseEl = document.getElementById('mobileMenu');
const toggler  = document.getElementById('hamburger');

document.addEventListener('click', (e) => {
  // build/get the Bootstrap Collapse instance
  const bsCollapse = bootstrap.Collapse.getInstance(collapseEl)
                   || new bootstrap.Collapse(collapseEl, { toggle: false });

  // if you clicked outside the menu AND didn’t click the ☰, hide it
  if (
    collapseEl.classList.contains('show') &&
    !collapseEl.contains(e.target) &&
    !toggler.contains(e.target)
  ) {
    bsCollapse.hide();
  }
});


setInterval(() => {
  const options = {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  document.getElementById("ny-time").innerText = new Date().toLocaleTimeString('en-US', options);
}, 1000);

document.querySelectorAll('.timeline-toggle').forEach(button => {
  const targetId = button.getAttribute('data-bs-target');
  const collapseEl = document.querySelector(targetId);
  const label = button.querySelector('.toggle-label');

  collapseEl.addEventListener('show.bs.collapse', () => {
    label.textContent = 'Click to collapse ↑';
  });

  collapseEl.addEventListener('hide.bs.collapse', () => {
    label.textContent = 'Click to expand ↓';
  });
});


const wrap = document.getElementById('jeel-card');
const card = wrap.querySelector('.pc-card');

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const round = (val, prec = 3) => parseFloat(val.toFixed(prec));

const adjust = (val, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (val - fromMin)) / (fromMax - fromMin));

function updateCardTransform(e) {
  const rect = card.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const percentX = clamp((100 / rect.width) * offsetX);
  const percentY = clamp((100 / rect.height) * offsetY);
  const centerX = percentX - 50;
  const centerY = percentY - 50;

  wrap.style.setProperty("--pointer-x", `${percentX}%`);
  wrap.style.setProperty("--pointer-y", `${percentY}%`);
  wrap.style.setProperty("--background-x", `${adjust(percentX, 0, 100, 35, 65)}%`);
  wrap.style.setProperty("--background-y", `${adjust(percentY, 0, 100, 35, 65)}%`);
  wrap.style.setProperty("--pointer-from-center", `${clamp(Math.hypot(centerY, centerX) / 50, 0, 1)}`);
  wrap.style.setProperty("--pointer-from-top", `${percentY / 100}`);
  wrap.style.setProperty("--pointer-from-left", `${percentX / 100}`);
  wrap.style.setProperty("--rotate-x", `${round(-centerX / 5)}deg`);
  wrap.style.setProperty("--rotate-y", `${round(centerY / 4)}deg`);
}

card.addEventListener("pointerenter", () => {
  wrap.classList.add("active");
  card.classList.add("active");
});
card.addEventListener("pointermove", updateCardTransform);
card.addEventListener("pointerleave", () => {
  wrap.classList.remove("active");
  card.classList.remove("active");
});

