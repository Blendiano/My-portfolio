export const projects = [
  {
    id: "greenscore",
    slug: "greenscore",
    title: "GreenScore",
    category: "Product Design",
    company: "GreenScore",
    status: "Completed",
    // The label shown in the "Other Projects" list on the home page
    otherProjectsMeta: "Gamified · Mobile App",
    timeline: { start: "2024", end: "2025" },
    featured: false,
    caseStudy: true,
    tagline: "A gamified behavior-change platform designed to help users build lasting eco-friendly habits.",
    shortDescription: "A gamified sustainability app designed to help users build eco-friendly habits.",
    overview: "GreenScore is a behavior-change platform that goes beyond simple tracking. It uses gamification through impact-based points, streaks, levels, and badges to encourage continuous eco-friendly actions like avoiding plastic and reducing CO₂ footprint. The platform provides tangible environmental impact feedback, helping users visualize the real difference their daily choices make.",
    challenges: "The core challenge was designing a system where sustainability actions feel rewarding rather than obligatory. Balancing game mechanics with meaningful environmental impact data required careful product thinking — making sure gamification enhanced motivation without trivializing the underlying mission. Building the MVP with AI-assisted development also meant iterating quickly while maintaining design integrity.",
    results: "By blending product thinking with technical frontend exploration, GreenScore delivers an accessible, rewarding experience that guides users toward sustainable decisions. The platform demonstrates how gamification, when grounded in real impact data, can make eco-friendly behavior feel natural and motivating.",
    role: [
      "UI/UX Design",
      "Product Design",
      "Design Systems",
      "AI-assisted MVP Development"
    ],
    tools: ["Figma", "AI Agents"],
    technologies: ["Figma", "Expo Go", "AI-assisted development"],
    images: [
      { src: "../assets/images/greenscore/greenscore-app.webp", alt: "GreenScore dashboard and impact screens showing points, challenges and environmental impact", width: 1672, height: 941 },
      { src: "../assets/images/greenscore/greenscore-walkthrough-poster.webp", alt: "GreenScore dashboard screen from the running mobile app", width: 288, height: 640 }
    ],
    thumbnail: "assets/images/greenscore-thumbnail.svg",
    liveUrl: "",
    designUrl: "#",
    repositoryUrl: ""
  },
  {
    id: "menowell",
    slug: "menowell",
    title: "Menowell",
    category: "Product Design",
    company: "Menowell",
    status: "Completed",
    timeline: { start: "2024", end: "2025" },
    featured: true,
    caseStudy: true,
    tagline: "A menopause support platform designed to help users track, understand, and manage their menopause journey.",
    shortDescription: "A digital product focused on tracking and managing the menopause journey with community support.",
    overview: "Menowell is a menopause support platform that facilitates symptom tracking, trigger identification, menstrual period tracking, community sharing, and tailored support advice. The product is designed to be sensitive, informative, and empowering — giving users clarity during a phase of life that is often underserved by digital products.",
    challenges: "Designing for menopause required deep empathy and research. The platform needed to handle deeply personal health data while fostering a sense of safety and community. The feature landscape spans multiple states — from fully built symptom tracking to conceptual expert support integrations — requiring honest presentation of what exists versus what is planned.",
    results: "Menowell demonstrates how thoughtful product design can address underserved health experiences. The platform provides a structured, compassionate framework for menopause management, combining personal tracking tools with the warmth of community support.",
    role: [
      "UI/UX Design",
      "Product Design",
      "Design Systems",
      "Component Design"
    ],
    tools: ["Figma"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    images: [
      { src: "../assets/images/menowell/menowell-landing-page.png", alt: "Menowell landing page with the headline about tracking symptoms and understanding menopause", width: 1123, height: 673 },
      { src: "../assets/images/menowell/menowell-hero.webp", alt: "Menowell dashboard with symptom logging, stage identification and learn cards", width: 1347, height: 619 },
      { src: "../assets/images/menowell/menowell-log-symptom.webp", alt: "Menowell symptom logging screen with severity and optional notes", width: 1237, height: 621 },
      { src: "../assets/images/menowell/menowell-community-post.webp", alt: "Menowell community post composer with an anonymous posting option", width: 1275, height: 585 },
      { src: "../assets/images/menowell/menowell-edit-profile.webp", alt: "Menowell edit profile screen with personal details and notification preferences", width: 1235, height: 651 },
      { src: "../assets/images/menowell/menowell-notifications.webp", alt: "Menowell notifications screen in its empty state", width: 1265, height: 505 },
      { src: "../assets/images/menowell/menowell-insights.webp", alt: "Menowell insights screen prompting the user to log symptoms first", width: 1181, height: 529 }
    ],
    thumbnail: "assets/images/menowell-thumbnail.svg",
    liveUrl: "https://menowell-gjcgqs1on-blendianos-projects.vercel.app/",
    designUrl: "#",
    repositoryUrl: ""
  },
  {
    id: "naijamart",
    slug: "naijamart",
    title: "NaijaMart",
    category: "Product Design",
    company: "NaijaMart",
    status: "Deployed",
    timeline: { start: "2026", end: "2026" },
    featured: true,
    caseStudy: true,
    tagline: "A modern African fashion e-commerce MVP designed and built to take shoppers from browsing to checkout.",
    shortDescription: "A fashion e-commerce platform for Nigerian shoppers, designed and built from concept to a live storefront.",
    overview: "NaijaMart is a modern African fashion e-commerce MVP built as a web application. The scope was deliberately focused on menswear, womenswear, and accessories, and on completing the shopping journey properly — browsing the catalogue, viewing a product, adding it to the cart, and checking out — rather than shipping a wide set of half-finished features.",
    challenges: "An e-commerce MVP has to make a strong first impression while covering a lot of ground. The catalogue, product detail, cart, and checkout all needed to feel like one coherent product rather than a collection of separate screens, and every decision had to hold up at both mobile and desktop widths. Designing and building it solo meant weighing what to include against what to leave for later, and keeping a consistent visual system as the product grew.",
    results: "NaijaMart reached a working, deployed product with a live URL people can use. The project demonstrates the full cycle of taking an idea through product thinking, UI/UX design, a design system, and AI-assisted development to a storefront that runs on the web.",
    role: [
      "Product Design",
      "UI/UX Design",
      "Design Systems",
      "Full-stack Development",
      "AI-assisted Development"
    ],
    tools: ["Figma", "Next.js", "AI Agents"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Neon PostgreSQL", "Drizzle ORM", "Auth.js", "Paystack", "Nodemailer", "Vercel"],
    images: [
      { src: "../assets/images/naijamart/naijamart-landing-page.png", alt: "NaijaMart storefront landing page showing featured fashion pieces", width: 669, height: 635 },
      { src: "../assets/images/naijamart/naijamart-home.webp", alt: "NaijaMart homepage with a full-width fashion editorial hero", width: 1440, height: 900 },
      { src: "../assets/images/naijamart/naijamart-catalogue.webp", alt: "NaijaMart catalogue with category filters and product cards", width: 1440, height: 900 },
      { src: "../assets/images/naijamart/naijamart-product-detail.webp", alt: "NaijaMart product detail page for the Gold-Plated Bangles Set", width: 1440, height: 900 },
      { src: "../assets/images/naijamart/naijamart-cart.webp", alt: "NaijaMart shopping cart with an item and order summary", width: 1440, height: 900 },
      { src: "../assets/images/naijamart/naijamart-checkout.webp", alt: "NaijaMart checkout with delivery details and a Paystack payment note", width: 1440, height: 900 }
    ],
    thumbnail: "assets/images/naijamart-thumbnail.svg",
    liveUrl: "https://naijamart-five.vercel.app/",
    designUrl: "#",
    repositoryUrl: "https://github.com/Blendiano/naijamartapp"
  }
];
