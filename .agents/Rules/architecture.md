---
trigger: always_on
---

# Architecture

## 1. Purpose

This document defines the technical architecture for Adetiba Samuel's personal portfolio.

The portfolio MVP intentionally uses a lightweight architecture based on:

- HTML5
- CSS3
- JavaScript ES6+
- Static assets
- Git/GitHub
- Vercel

No frontend framework is required for the MVP.

---

## 2. Architecture Principles

The architecture should be:

- Simple
- Maintainable
- Modular
- Data-driven
- Accessible
- Fast
- Responsive
- Easy for an AI agent to understand
- Easy for a human developer to modify

Avoid unnecessary abstraction.

Do not create complex architecture simply because it is technically possible.

---

## 3. Recommended Project Structure

```text
portfolio/
│
├── index.html
│
├── projects/
│   ├── greenscore.html
│   └── menowell.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── components.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   └── components/
│       ├── project-card.js
│       └── modal.js
│
├── data/
│   ├── projects.js
│   └── profile.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── README.md
│
└── .gitignore
```

Repository-level configuration and tooling live outside the shipped portfolio folder:

- `AGENTS.md` — agent scope, positioning, and constraints.
- `.agents/Rules/` — architecture, code style, design system, security.
- `Skills/` — agent skills such as `component-builder`.
- `Tokens/` — design-token sources (`design-tokens.tokens.json`, `Color-system`) and the `build-css.js` generator that produces `sys-tokens.css`.

Recommended `.gitignore` entries:

- `node_modules/`
- `node_log.txt`
- `.env`
- `.env.local`

---

## 4. Application Layers

The portfolio should conceptually contain four layers.

### Presentation Layer

Responsible for:

- HTML structure
- Typography
- Layout
- Visual hierarchy
- Responsive behavior

### Component Layer

Responsible for reusable UI patterns:

- Navigation
- Buttons
- Project cards
- Tags
- Sections
- Modal/dialog elements
- Contact elements

### Data Layer

Responsible for project and profile information.

Examples:

- Project metadata
- Skills
- Social links
- Case-study information

### Behavior Layer

Responsible for:

- Navigation behavior
- Mobile menu
- Filtering
- Project interactions
- Modals
- Form behavior
- Scroll interactions
- Accessibility behavior

---

## 5. Data-Driven Projects

Projects should be represented as structured data wherever practical.

Example:

```javascript
const projects = [
  {
    id: "greenscore",
    slug: "greenscore",
    title: "GreenScore",
    category: "Product Design",
    status: "Completed",
    featured: true,
    shortDescription: "...",
    role: [
      "UI/UX Design",
      "Product Design",
      "AI-assisted MVP Development"
    ],
    tools: ["Figma", "AI Agents"],
    technologies: ["HTML", "CSS", "JavaScript"],
    thumbnail: "assets/images/greenscore-cover.webp",
    liveUrl: "",
    designUrl: "",
    repositoryUrl: ""
  }
];
```

The exact content must be based on verified project information.

---

## 6. Project Model

A project may support the following fields:

```text
Project
├── id
├── slug
├── title
├── shortDescription
├── fullDescription
├── category
├── status
├── featured
├── thumbnail
├── images
├── role
├── tools
├── technologies
├── duration
├── problem
├── goal
├── targetUsers
├── research
├── process
├── userFlows
├── wireframes
├── designDecisions
├── designSystem
├── solution
├── development
├── aiWorkflow
├── outcome
├── lessonsLearned
├── liveUrl
├── designUrl
├── repositoryUrl
├── createdDate
└── updatedDate
```

Fields may be optional.

Do not render empty fields.

---

## 7. Profile Model

```text
Profile
├── name
├── professionalTitle
├── headline
├── biography
├── location
├── profileImage
├── resumeUrl
├── email
├── skills
├── socialLinks
├── professionalLinks
└── availability
```

Do not invent missing information.

---

## 8. Social Link Model

```text
SocialLink
├── id
├── platform
├── label
├── url
├── icon
├── displayOrder
└── enabled
```

Disabled links should not be rendered.

---

## 9. Navigation Architecture

Navigation should support:

- Home
- About
- Skills
- Projects
- Contact

Project case studies may have dedicated URLs.

Example:

```text
/
 /projects/greenscore.html
 /projects/menowell.html
```

Navigation must work without JavaScript where possible.

JavaScript should enhance navigation rather than make basic navigation impossible.

---

## 10. Component Architecture

Components should be created when:

- A pattern appears more than once.
- A section has meaningful internal behavior.
- Reuse improves consistency.
- A component makes the code easier to understand.

Avoid componentizing every small HTML element.

Examples:

- Navigation
- ProjectCard
- ProjectTag
- Button
- SectionHeading
- SocialLinks
- ContactForm
- Footer

See `Skills/component-builder` for the detailed component construction rules.

---

## 11. CSS Architecture

Use CSS variables for design tokens.

Example:

```css
:root {
  --color-primary: hsl(221, 83%, 53%);
  --color-secondary: hsl(214, 100%, 97%);
  --color-tertiary: hsl(221, 44%, 93%);

  --color-neutral: hsl(60, 14%, 97%);
  --color-neutral-variant: hsl(0, 0%, 100%);

  --color-text: hsl(0, 0%, 9%);
  --color-text-secondary: hsl(0, 0%, 40%);
  --color-border: hsl(0, 0%, 90%);

  --color-success: hsl(142, 71%, 45%);
  --color-warning: hsl(38, 92%, 50%);
  --color-error: hsl(0, 72%, 51%);
  --color-info: hsl(199, 89%, 48%);
}
```

Do not scatter raw colors throughout the stylesheet.

---

## 12. JavaScript Architecture

JavaScript should be:

- Modular
- Small
- Predictable
- Defensive
- Accessible

Prefer:

```javascript
function initializeNavigation() {}
function initializeProjectCards() {}
function initializeContactForm() {}
```

over one large script containing unrelated behavior.

Avoid global variables unless genuinely necessary.

---

## 13. State Management

No complex state-management library is required.

Use:

- DOM state
- Local variables
- URL parameters where appropriate
- Local storage only when the product requirement genuinely needs persistence

Do not introduce Redux, Zustand, or similar libraries.

---

## 14. Backend

The MVP does not require a backend.

Do not introduce:

- PostgreSQL
- Prisma
- Authentication
- API servers
- Server-side rendering
- CMS infrastructure

unless the product requirements later change.

The portfolio should remain a lightweight static site during the MVP.

---

## 15. Forms

If a contact form is implemented without a backend:

- Provide clear validation.
- Provide accessible error messages.
- Do not pretend a message was sent if no delivery mechanism exists.
- Use an appropriate external form service only if explicitly approved.

---

## 16. Performance Architecture

Prefer static assets.

Images should be:

- Properly sized
- Compressed
- Modern formats where appropriate
- Given dimensions where practical
- Lazy-loaded when appropriate

Avoid loading large libraries for small interactions.

---

## 17. Deployment

Primary deployment target:

- Vercel

Deployment should be compatible with a static frontend.

Git should be used for version control.

Recommended workflow:

```text
Local Development
        ↓
Git
        ↓
GitHub
        ↓
Vercel
        ↓
Production
```

---

## 18. Architecture Rule

The architecture should remain as simple as possible while still supporting:

- A professional portfolio
- Multiple case studies
- Future project additions
- Responsive design
- Accessibility
- SEO
- Maintainability

Do not add infrastructure merely to make the project appear more sophisticated.