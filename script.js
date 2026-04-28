/* ---- PARTICLES ---- */
const pc = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--dur:${8 + Math.random() * 14}s;--del:${Math.random() * 10}s`;
  pc.appendChild(p);
}

/* ---- NAVBAR ---- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- SCROLL TO SECTION ---- */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ---- TYPEWRITER ---- */
const roles = ['MERN Stack Developer', 'DevOps Engineer', 'SCCM & Intune Specialist'];
let ri = 0, ci = 0, del = false;
const tw = document.getElementById('tw');
function type() {
  const cur = roles[ri];
  if (!del && ci === cur.length) { setTimeout(() => { del = true; type(); }, 2000); return; }
  if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 400); return; }
  ci += del ? -1 : 1;
  tw.textContent = roles[ri].slice(0, ci);
  setTimeout(type, del ? 60 : 110);
}
type();

/* ---- SCROLL REVEAL ---- */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));

/* ---- SKILLS DATA ---- */
const skillCats = [
  { title: 'Cloud & Infrastructure', icon: '☁', color: '#00d4ff', skills: [{ n: 'Azure DevOps', l: 85 }, { n: 'Microsoft Azure', l: 80 }, { n: 'AWS (EC2)', l: 70 }, { n: 'SCCM/MECM', l: 92 }] },
  { title: 'Scripting & Dev', icon: '⚡', color: '#7c3aed', skills: [{ n: 'PowerShell', l: 88 }, { n: 'Bash/Shell Scripting', l: 82 }, { n: 'JavaScript', l: 70 }, { n: 'SQL', l: 72 }] },
  { title: 'DevOps & ITSM', icon: '🔧', color: '#f59e0b', skills: [{ n: 'Microsoft Intune', l: 88 }, { n: 'ServiceNow', l: 85 }, { n: 'Active Directory', l: 92 }, { n: 'Jira', l: 80 }] },
  { title: 'Systems & OS', icon: '🖥', color: '#10b981', skills: [{ n: 'Windows Admin', l: 95 }, { n: 'Linux/Unix', l: 78 }, { n: 'macOS Admin', l: 75 }, { n: 'VMware', l: 70 }] },
];
const sg = document.getElementById('skillsGrid');
skillCats.forEach((cat, ci2) => {
  const card = document.createElement('div');
  card.className = `skill-card reveal d${ci2 + 1}`;
  const rgb = cat.color === '#00d4ff' ? '0,212,255' : cat.color === '#7c3aed' ? '124,58,237' : cat.color === '#f59e0b' ? '245,158,11' : '16,185,129';
  card.style.cssText = `--cat-c:${cat.color}`;
  card.innerHTML = `
    <div class="skill-card-glow" style="background:radial-gradient(circle,rgba(${rgb},.15),transparent 70%)"></div>
    <div class="skill-cat-header">
      <div class="skill-cat-icon" style="background:rgba(${rgb},.12);border:1px solid rgba(${rgb},.28)">${cat.icon}</div>
      <div class="skill-cat-title">${cat.title}</div>
    </div>
    ${cat.skills.map(s => `
    <div class="skill-row">
      <div class="skill-row-header">
        <span class="skill-name">${s.n}</span>
        <span class="skill-pct" style="color:${cat.color}">${s.l}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" data-w="${s.l}" style="background:linear-gradient(90deg,${cat.color},${cat.color}88);box-shadow:0 0 10px rgba(${rgb},.35)"></div>
      </div>
    </div>`).join('')}
  `;
  sg.appendChild(card);
  obs.observe(card);
});

/* Animate skill bars on visibility */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 120);
      });
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));

/* ---- BADGES ---- */
const badges = ['SCCM', 'Intune', 'Azure DevOps', 'AWS', 'PowerShell', 'Bash Scripting', 'ServiceNow', 'Jira', 'Active Directory', 'ITIL', 'VMware', 'Linux', 'Windows Server', 'OSD', 'Patch Management', 'SQL', 'JavaScript', 'React', 'Node.js', 'Git', 'Remote Desktop', 'Incident Management'];
const bw = document.getElementById('badgesWrap');
badges.forEach(b => {
  const s = document.createElement('span');
  s.className = 'badge';
  s.textContent = b;
  bw.appendChild(s);
});

/* ---- CONTACT CARD HOVER COLOR ---- */
document.querySelectorAll('.contact-card').forEach(card => {
  const hc = getComputedStyle(card).getPropertyValue('--hc').trim();
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = hc + '55';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255,255,255,.06)';
  });
});
