# AGENTS.md

## TL;DR

- Build a minimal, modern, accessible, high-performing static portfolio for **Adetiba Samuel — UI/UX & Product Designer**.
- Source of truth: `My Portfolio PRD Document.pdf` (project root).
- HTML/CSS/JS only. No frameworks. No fabricated content. Blue accent applied sparingly.
- Implementation details live in `.agents/Rules/`; this file wins for scope and positioning.
- When in doubt, ask the project owner instead of guessing.

---

## Project Identity

You are the primary AI development agent responsible for building and maintaining the personal portfolio website for:

**Name:** Adetiba Samuel  
**Primary Professional Title:** UI/UX & Product Designer

The portfolio presents Adetiba as a designer who combines:

- UI/UX Design
- Product Design
- Product Thinking
- AI-assisted development
- Frontend development
- AI agents
- Functional digital product building

The central narrative of the portfolio is:

> Design → Product Thinking → AI → Frontend Development → Functional Products

The portfolio should communicate that Adetiba does not only design interfaces; he uses AI-assisted development and frontend knowledge to help bring digital products to life.

---

# 1. Source of Truth

The approved Product Requirements Document (PRD) is the primary source of truth. It is located at `My Portfolio PRD Document.pdf` in the project root.

Do not introduce functionality, content, technologies, design patterns, claims, or product behavior that contradicts the PRD.

When requirements are unclear:

1. Check the PRD.
2. Check the existing project structure.
3. Preserve the simplest implementation that satisfies the requirement.
4. Do not invent functionality.
5. Do not silently change an approved product decision.

If a requirement genuinely cannot be determined, leave the implementation extensible rather than guessing.

Conflict resolution order:

1. The PRD wins over all other documents.
2. This file wins over `.agents/Rules/` for scope, positioning, content, and constraints.
3. `.agents/Rules/` wins for implementation details and conventions.
4. Do not silently resolve disagreements between documents. Flag them to the project owner.

---

# 2. Primary Objective

Build a polished, responsive, accessible, performant personal portfolio that allows recruiters, hiring managers, potential collaborators, and users to quickly understand:

- Who Adetiba is
- What he does
- What skills he has
- How he approaches product design
- What products he has worked on
- How he uses AI in his workflow
- How he combines design and frontend development
- Where they can view his work
- How they can contact him

The website should feel like a professional product, not a template or an experimental coding project.

---

# 3. Professional Positioning

The primary title must remain:

> UI/UX & Product Designer

Supporting positioning:

> I design digital products and use AI-assisted development to bring them to life.

Do not replace the primary title with:

- Software Engineer
- Full-Stack Developer
- AI Engineer
- Product Engineer
- Design Engineer

unless the project owner explicitly requests a future positioning change.

Frontend development and AI-assisted building should strengthen the design/product identity rather than replace it.

---

# 4. Technology Constraints

The MVP should use:

- HTML5
- CSS3
- JavaScript ES6+
- SVG or Lucide icons where appropriate
- Google Fonts or suitable web-safe fonts
- Git
- GitHub
- Vercel

Do not introduce React, Next.js, Vue, Angular, Tailwind, Bootstrap, or another frontend framework unless explicitly requested.

The absence of a framework is intentional.

Prefer:

- Semantic HTML
- Modern CSS
- Modular JavaScript
- Reusable components through templates/functions where appropriate
- Data-driven project rendering
- Small, understandable files
- Minimal dependencies

---

# 5. Development Philosophy

Build progressively.

Follow this sequence:

1. Understand
2. Plan
3. Structure
4. Build
5. Test
6. Review
7. Refine
8. Deploy

Do not attempt to build the entire application blindly in one step.

For substantial changes:

- Explain what will change internally through code comments or documentation where useful.
- Keep existing working functionality intact.
- Test affected areas after implementation.
- Avoid unnecessary refactoring.

---

# 6. Design Philosophy

The portfolio must be:

- Minimal
- Modern
- Professional
- Warm
- Clean
- Spacious
- User-friendly
- Typography-led
- Technically polished
- Human

Avoid:

- Excessive gradients
- Glassmorphism
- Excessive shadows
- 3D effects
- Neon developer aesthetics
- Overly animated interfaces
- Excessive cards
- Visual clutter
- Decorative elements that do not serve a purpose

The design should communicate confidence through restraint.

---

# 7. Color Direction

Primary accent:

`hsl(221, 83%, 53%)`

Main background:

`hsl(60, 14%, 97%)`

Main text:

`hsl(0, 0%, 9%)`

Secondary text:

`hsl(0, 0%, 40%)`

Surface:

`hsl(0, 0%, 100%)`

Border:

`hsl(0, 0%, 90%)`

Use blue primarily for:

- Primary CTA
- Links
- Active navigation
- Focus states
- Selected states
- Small highlights

Do not make the entire website blue.

Recommended visual balance:

- Warm neutral background ≈ 70%
- White / dark content ≈ 20%
- Gray supporting elements ≈ 8%
- Blue accent ≈ 2%

Apply blue with restraint throughout, consistent with `.agents/Rules/design-system.md`.

---

# 8. Required Core Sections

The MVP should support:

1. Navigation
2. Hero
3. About
4. Skills / Expertise
5. Featured Projects
6. GreenScore case study
7. Menowell case study
8. Future project support
9. Professional/social links
10. Contact
11. Footer

The architecture must make it easy to add projects later.

---

# 9. Featured Projects

## GreenScore

GreenScore is a mobile gamified sustainability application designed to help users build eco-friendly habits.

Important characteristics:

- Sustainability behavior tracking
- Gamification
- Points
- Streaks
- Levels
- Badges
- Weekly challenges
- Environmental impact feedback

Adetiba's contribution includes:

- UI/UX design
- User flows
- Wireframes
- Design system
- Component design
- User-centered decisions
- Product thinking
- Design reviews
- Team collaboration
- AI-assisted MVP development

Do not invent business results, user numbers, testimonials, research findings, or performance metrics.

---

## Menowell

Menowell is a menopause support platform designed to help users understand, track, and manage their menopause journey.

Core product areas include:

- User accounts
- Symptom tracking
- Menopause stage identification
- Personalized wellness insights
- Educational resources
- Community
- Notifications
- Dashboard
- Privacy controls

Menowell must be presented honestly.

Clearly distinguish between:

- Designed
- Built
- AI-assisted
- Planned
- Conceptual

Do not present planned functionality as completed functionality.

---

# 10. Content Authenticity

Never fabricate:

- Work experience
- Clients
- Testimonials
- User numbers
- Revenue
- Research
- Certifications
- Awards
- Business results
- Product metrics
- Medical claims
- Professional achievements

If a piece of information is unavailable, do not invent it.

Use an appropriate placeholder only when necessary.

---

# 11. AI Transparency

AI is part of the user's development workflow.

The portfolio may communicate that AI was used for:

- Prototyping
- Development
- Debugging
- Code generation
- Exploration
- Iteration
- MVP development

However:

> AI helps accelerate the process; design and product thinking guide the outcome.

Do not imply that AI independently created the product or replaced human decision-making.

---

# 12. Accessibility

All implementation must consider:

- Semantic HTML
- Correct heading hierarchy
- Keyboard navigation
- Visible focus states
- Meaningful link text
- Accessible forms
- Image alt text
- Color contrast
- Reduced motion
- Screen reader compatibility
- Responsive text
- Appropriate touch targets

Never use color as the only method of communicating information.

---

# 13. Responsive Requirements

The portfolio must work across:

- Mobile
- Tablet
- Laptop
- Desktop

Requirements:

- No horizontal overflow
- Responsive navigation
- Responsive typography
- Flexible layouts
- Proper image scaling
- Usable buttons
- Comfortable spacing
- Readable case studies

Do not optimize only for desktop.

---

# 14. SEO

Implement:

- Descriptive page title
- Meta description
- Semantic HTML
- Proper heading hierarchy
- Descriptive URLs
- Image alt text
- Open Graph metadata where appropriate
- Meaningful page content

Avoid keyword stuffing.

---

# 15. Performance

Prefer:

- Optimized images
- Minimal JavaScript
- Minimal dependencies
- Lazy loading where appropriate
- Efficient DOM manipulation
- Reusable CSS
- Efficient asset loading

Do not add a dependency for functionality that can reasonably be achieved with native HTML, CSS, or JavaScript.

---

# 16. Security

Never expose:

- API keys
- Passwords
- Tokens
- Private credentials
- Secrets

Validate user input.

Do not collect unnecessary personal information.

If the portfolio does not require a backend, do not introduce one unnecessarily.

---

# 17. AI Agent Behavior

Before modifying files:

1. Inspect the relevant existing files.
2. Understand the current implementation.
3. Identify dependencies.
4. Make the smallest reasonable change.
5. Preserve working functionality.
6. Test the change.

Never overwrite the entire project simply because a new implementation appears easier.

---

# 18. Error Handling

Errors should be:

- Understandable
- Human-readable
- Non-technical where possible
- Helpful
- Consistent

Do not expose stack traces or unnecessary technical information to normal users.

---

# 19. Definition of Done

A feature is complete only when:

- It matches the PRD.
- It matches the design system.
- It works on mobile and desktop.
- It is accessible.
- It does not introduce console errors.
- It does not break existing functionality.
- It uses authentic content.
- It has appropriate error/empty states.
- It is reasonably performant.
- Its code follows the project conventions.

---

# 20. Golden Rule

Do not build what looks impressive to the developer.

Build what makes the portfolio clearer, easier to use, more professional, and more useful to the person evaluating Adetiba's work.

---

# 21. Current Project State

The MVP has not been built yet. The directory currently contains only:

- This file
- `My Portfolio PRD Document.pdf`
- `.agents/Rules/` (architecture, code style, design system, security)
- `Skills/` and `Tokens/` (design-token generation tooling)

Do not assume `index.html`, `css/`, `js/`, or `data/` files exist. Build the project structure from scratch according to `.agents/Rules/architecture.md`.

---

# 22. Commands & Local Development

- Preview locally with any static server, e.g. `python -m http.server 8000`, then open `http://localhost:8000`.
- Design tokens are generated from `Tokens/design-tokens.tokens.json` using `Tokens/build-css.js`.
- No install, build, lint, or test framework is required for the MVP. Do not add dependencies outside the PRD.
- Commit style: short, imperative, descriptive messages (e.g. `Add hero section`, `Fix mobile nav overflow`).

Do not introduce `package.json` scripts, a bundler, or a framework unless explicitly requested.

---

# 23. Testing & Verification

Before considering work complete:

- Open the site in a browser and confirm there are no console errors.
- Test at mobile, tablet, laptop, and desktop widths. There must be no horizontal overflow.
- Exercise keyboard navigation and verify visible focus states.
- Run a basic accessibility pass (alt text, heading order, contrast, reduced motion).
- Confirm no invented content was introduced.

---

# 24. When to Ask the User

Pause and confirm with the project owner before:

- Changing the primary title or professional positioning.
- Adding, removing, or renaming a featured project or case study.
- Adding functionality, technology, or dependencies outside this file or the PRD.
- Introducing new content about the owner's background, clients, or achievements.
- Expanding beyond the approved MVP scope.

When in doubt, ask. Do not guess about personal or professional facts.