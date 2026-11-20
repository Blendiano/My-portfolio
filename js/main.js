// Main entry point for JavaScript architecture
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { initContactForm } from './contact-form.js';
import { initializeLightbox } from './lightbox.js';

// Inline brand marks keep the footer icon-only links dependency-free.
// `fill="currentColor"` lets the link's colour styles drive the icon.
const SOCIAL_ICONS = {
  linkedin: '<svg class="social-link__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  github: '<svg class="social-link__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  behance: '<svg class="social-link__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/></svg>'
};

function populateProfile() {
  const titleEl = document.getElementById("profile-title");
  if (titleEl) titleEl.textContent = profile.professionalTitle;

  const headlineEl = document.getElementById("profile-headline");
  if (headlineEl) headlineEl.textContent = profile.headline;

  const bioEl = document.getElementById("profile-biography");
  if (bioEl) {
    bioEl.innerHTML = profile.biography.split('\n\n').map(p => `<p>${p}</p>`).join('');
  }

  const approachEl = document.getElementById("profile-approach");
  if (approachEl) {
    approachEl.innerHTML = profile.approachSteps.map(step => `
      <li class="about-step">
        <span class="about-step__number" aria-hidden="true">${step.number}</span>
        <div class="about-step__body">
          <h3 class="about-step__title">${step.title}</h3>
          <p class="about-step__description">${step.description}</p>
        </div>
      </li>
    `).join('');
  }

  const skillsEl = document.getElementById("profile-skills");
  if (skillsEl) {
    skillsEl.innerHTML = profile.skillGroups.map(group => `
      <div class="skill-group">
        <p class="skill-group__number" aria-hidden="true">${group.number}</p>
        <h3 class="skill-group__title">${group.title}</h3>
        <ul class="skill-group__list">
          ${group.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  const contactEl = document.getElementById("profile-contact");
  if (contactEl) {
    contactEl.innerHTML = `
      <p class="contact__lead">Have a project in mind, an opportunity to discuss, or just want to connect? I'd love to hear from you. Let's turn great ideas into products that make a difference.</p>
      <p class="contact-email-wrapper">
        <a href="mailto:${profile.email}" class="button button--primary">${profile.email}</a>
      </p>
    `;
  }

  const socialsEl = document.getElementById("profile-socials");
  if (socialsEl) {
    socialsEl.innerHTML = profile.socialLinks
      .filter(link => link.enabled)
      .map(link => {
        // Icon-only link: the accessible name comes from aria-label, and the
        // platform name is the fallback if an icon has not been mapped yet.
        const icon = SOCIAL_ICONS[link.icon];
        return `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${link.label}">${icon || link.platform}</a>
      `;
      }).join('');
  }

  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function buildProjectHref(project) {
  if (project.caseStudy) return `projects/${project.id}.html`;
  if (project.liveUrl) return project.liveUrl;
  return '#';
}

function renderProjectCard(project) {
  const href = buildProjectHref(project);
  const isExternal = href.startsWith('http');
  return `
    <article class="project-card">
      <a href="${href}" class="project-card__link" aria-label="View ${project.title}${project.caseStudy ? ' case study' : ''}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>
        <img
          class="project-card__image"
          src="${project.thumbnail}"
          alt=""
          width="1200"
          height="675"
          loading="lazy"
        />
        <div class="project-card__content">
          <p class="project-card__category">${project.category}</p>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__description">${project.shortDescription}</p>
          <div class="project-card__tags">
            ${project.role.map(r => `<span class="project-card__tag">${r}</span>`).join('')}
          </div>
        </div>
      </a>
    </article>
  `;
}

function renderOtherProjectRow(project) {
  // The title is plain text — the CTA on the right is the only way in.
  const cta = project.caseStudy
    ? { href: `projects/${project.id}.html`, label: 'View Case Study', aria: `View Case Study for ${project.title}` }
    : project.liveUrl
      ? { href: project.liveUrl, label: 'Visit Live Site', aria: `Visit the live site for ${project.title}` }
      : null;
  const ctaMarkup = cta
    ? `<a href="${cta.href}" class="button button--primary other-project__cta" aria-label="${cta.aria}"${cta.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${cta.label} <span aria-hidden="true">&rarr;</span></a>`
    : '';
  const meta = project.otherProjectsMeta
    || [project.category, project.status].filter(Boolean).join(' · ');
  return `
    <li class="other-project">
      <div class="other-project__body">
        <div class="other-project__head">
          <h3 class="other-project__title">${project.title}</h3>
          <p class="other-project__category">${meta}</p>
        </div>
        <p class="other-project__description">${project.shortDescription}</p>
        <div class="other-project__role">
          <h4 class="other-project__role-label">Role</h4>
          <p class="other-project__role-value">${project.role.join(' &middot; ')}</p>
        </div>
      </div>
      ${ctaMarkup}
    </li>
  `;
}

function renderOtherProjects() {
  const otherContainer = document.getElementById("other-projects-container");
  const emptyEl = document.getElementById("other-projects-empty");
  if (!otherContainer) return;

  const others = projects.filter(project => !project.featured);
  otherContainer.innerHTML = others.map(renderOtherProjectRow).join('');
  if (emptyEl) emptyEl.hidden = others.length > 0;
}

function resolveCaseStudyLinks() {
  const projectId = document.body.dataset.projectId;
  if (!projectId) return;
  const project = projects.find(item => item.id === projectId);
  if (!project) return;

  const liveLink = document.querySelector('[data-case-study-cta="live"]');
  if (liveLink) {
    if (project.liveUrl) {
      liveLink.href = project.liveUrl;
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      liveLink.removeAttribute("hidden");
    } else {
      liveLink.setAttribute("hidden", "");
    }
  }

  const repoLink = document.querySelector('[data-case-study-cta="repo"]');
  if (repoLink) {
    if (project.repositoryUrl) {
      repoLink.href = project.repositoryUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.removeAttribute("hidden");
    } else {
      repoLink.setAttribute("hidden", "");
    }
  }
}

function resolveShowcaseLinks() {
  document.querySelectorAll("[data-project-live]").forEach(link => {
    const project = projects.find(item => item.id === link.dataset.projectLive);
    if (!project || !project.liveUrl) {
      link.setAttribute("hidden", "");
      return;
    }
    link.href = project.liveUrl;
    link.removeAttribute("hidden");
  });
}

function renderLatestProjects() {
  const container = document.getElementById("latest-projects");
  if (!container) return;

  const currentProjectId = document.body.dataset.projectId;
  const others = projects.filter(project => project.id !== currentProjectId);
  container.innerHTML = others.slice(0, 2).map(renderProjectCard).join('');
}

function renderProjectIndex() {
  const container = document.getElementById("all-projects");
  if (!container) return;

  const all = [...projects].sort((a, b) => (b.featured - a.featured) || b.timeline.start.localeCompare(a.timeline.start));
  container.innerHTML = all.map(renderProjectCard).join('');
}

function initializeNavigation() {
  const menuBtn = document.querySelector(".mobile-menu-button");
  const navList = document.querySelector(".nav-list");
  if (!menuBtn || !navList) return;

  function setMenuOpen(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navList.classList.toggle("is-open", open);
  }

  function toggleMenu() {
    setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true");
  }

  menuBtn.addEventListener("click", toggleMenu);

  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuBtn.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateProfile();
  renderOtherProjects();
  renderLatestProjects();
  renderProjectIndex();
  resolveCaseStudyLinks();
  resolveShowcaseLinks();
  initializeNavigation();
  initContactForm();
  initializeLightbox();
});