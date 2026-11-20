---
trigger: always_on
---

# Design System

## 1. Design Direction

The portfolio should feel:

- Minimal
- Professional
- Modern
- Warm
- Human
- Confident
- Clean
- Technical without looking like a generic developer portfolio

The design should communicate expertise through clarity and restraint.

---

## 2. Brand Positioning

Primary professional identity:

> UI/UX & Product Designer

Supporting narrative:

> I design digital products and use AI-assisted development to bring them to life.

The visual system should support the combination of:

- Design
- Product thinking
- AI
- Frontend development
- Functional product building

---

## 3. Color System

The roles in this section are canonical. They are generated from `Tokens/design-tokens.tokens.json` and `Tokens/Color-system` using `Tokens/build-css.js`, which emits `--sys-*` tokens into `sys-tokens.css`. Do not hardcode raw colors elsewhere.

### Primary Accent

```text
Token: --sys-primary
HSL: hsl(221, 83%, 53%)
HEX: #2563EB
```

Use blue for:

- Primary CTA
- Links
- Active navigation
- Focus states
- Selected states
- Small highlights

Apply blue with restraint in line with the color usage principle in this document. It must not dominate the interface.

### Background

```text
Token: --sys-background
HSL: hsl(60, 14%, 97%)
HEX: #F8F8F5
```

Primary website background.

### Surface

```text
Token: --sys-surface
HSL: hsl(0, 0%, 100%)
HEX: #FFFFFF
```

Use for:

- Cards
- Content surfaces
- Forms
- Navigation surfaces
- Case-study content areas

### Primary Text

```text
Token: --sys-text
HSL: hsl(0, 0%, 9%)
HEX: #171717
```

Use for:

- Headings
- Main body text
- Important information

### Secondary Text

```text
Token: --sys-text-secondary
HSL: hsl(0, 0%, 40%)
HEX: #666666
```

Use for:

- Descriptions
- Supporting text
- Metadata
- Secondary information

### Border

```text
Token: --sys-border
HSL: hsl(0, 0%, 90%)
HEX: #E5E5E5
```

Use for:

- Dividers
- Card borders
- Form fields
- Navigation separation

---

## 4. Semantic Colors

```text
Success      hsl(142, 71%, 45%)   #22C55E
Warning      hsl(38, 92%, 50%)    #F59E0B
Error        hsl(0, 72%, 51%)     #DC2626
Information  hsl(199, 89%, 48%)   #0EA5E9
```

Semantic colors should only be used when communicating functional states.

### Dark Mode

`build-css.js` also emits a `[data-theme="dark"]` token set. When dark theme is enabled:

- Reuse the same role hierarchy and contrast requirements.
- Do not introduce new semantic roles for dark mode.
- Verify link, border, and surface contrast against the dark background before shipping.

---

## 5. Color Usage Principle

The portfolio should be predominantly neutral.

Recommended visual balance:

- Warm neutral background ≈ 70%
- White / dark content ≈ 20%
- Gray supporting elements ≈ 8%
- Blue accent ≈ 2%

Do not turn the website into a blue-heavy interface.

---

## 6. Typography

Use one primary typeface family with a web-safe fallback stack unless a second font has a strong design reason.

Recommended pattern:

```css
font-family: "Inter", "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
```

The exact family may be finalized during implementation, but it must load efficiently and support the character set used on the site.

Typography should be:

- Clean
- Modern
- Highly readable
- Professional
- Accessible

Typography should create hierarchy through:

- Size
- Weight
- Line height
- Spacing
- Color

rather than excessive decorative styling.

---

## 7. Typography Hierarchy

Recommended hierarchy:

- Display / Hero — large and confident
- H1 — strong primary heading
- H2 — section heading
- H3 — subsection / project heading
- Body — readable paragraph text
- Small / Metadata — supporting information

Do not make every section visually compete with the hero.

---

## 8. Layout

Use generous whitespace.

The layout should feel:

- Spacious
- Intentional
- Calm
- Easy to scan

Avoid excessive content density.

---

## 9. Grid

Use a consistent content container.

Example:

```css
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}
```

The exact maximum width may be adjusted during implementation.

---

## 10. Spacing

Use a consistent spacing scale.

Scale:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px
- 80px
- 96px
- 120px

Do not introduce arbitrary spacing values without a reason.

---

## 11. Buttons

Primary buttons should use:

- Primary blue
- Clear readable text
- Strong contrast
- Comfortable padding
- Accessible focus state
- Appropriate hover state

Secondary buttons may use:

- White surface
- Border
- Dark text

Buttons should not be excessively rounded unless it fits the visual system.

Interactive controls (buttons, links, form fields) must provide a visible `:focus-visible` outline and a minimum touch target of approximately 44 × 44px.

---

## 12. Cards

Cards should be used selectively.

Project cards may contain:

- Image
- Project name
- Category
- Short description
- Role
- Tools
- CTA

Avoid turning every section into a card.

---

## 13. Project Visual Identity

The portfolio's visual identity should remain neutral enough to allow individual projects to retain their own identity.

For example:

- GreenScore can retain its green visual language.
- Menowell can retain its own product visuals.
- Future projects can have their own visual identity.

The portfolio should frame projects rather than visually overwrite them.

---

## 14. Borders and Shadows

Use subtle borders.

Shadows should be:

- Soft
- Minimal
- Functional

Avoid dramatic shadows.

---

## 15. Border Radius

Use a restrained radius system.

- Small: 6px
- Medium: 10px
- Large: 16px

Do not make every element extremely rounded.

---

## 16. Motion

Animations should be:

- Subtle
- Fast
- Purposeful
- Accessible

Use motion to communicate:

- State changes
- Navigation
- Hover feedback
- Content transitions

Avoid:

- Excessive parallax
- Long animations
- Constant movement
- Distracting effects

Respect `prefers-reduced-motion`.

---

## 17. Icons

Prefer:

- Lucide
- Inline SVG
- Simple accessible icons

Icons should support meaning rather than act as decoration.

---

## 18. Images

Use high-quality project images.

Images should:

- Have appropriate aspect ratios
- Be optimized
- Include alt text
- Load efficiently
- Maintain visual consistency

---

## 19. Responsive Design

Design for:

- Mobile
- Tablet
- Laptop
- Desktop

Mobile is not simply a smaller desktop.

Layouts should intentionally adapt.

---

## 20. Accessibility

The design system must maintain:

- Sufficient color contrast
- Keyboard focus (visible `:focus-visible`)
- Readable text
- Accessible controls
- Reduced motion
- Meaningful visual hierarchy
- Adequate touch targets

Never sacrifice accessibility for visual aesthetics.

---

## 21. Design Principle

The portfolio should communicate:

- Minimal
- Confident
- Human
- Modern
- Technical

The website does not need to be visually loud to demonstrate design ability.