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

