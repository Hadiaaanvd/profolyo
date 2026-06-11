import type {
  Portfolio, SectionConfig,
  Publication, Testimonial, Award, Certification, Language, Volunteer,
} from "@/types/portfolio";

export const defaultSections: SectionConfig[] = [
  { id: "hero",           type: "about",          label: "Hero",           visible: true,  order: 0   },
  { id: "about",          type: "about",          label: "About",          visible: true,  order: 1   },
  { id: "projects",       type: "projects",       label: "Projects",       visible: true,  order: 2   },
  { id: "experience",     type: "experience",     label: "Experience",     visible: true,  order: 3   },
  { id: "education",      type: "education",      label: "Education",      visible: true,  order: 4   },
  { id: "skills",         type: "skills",         label: "Skills",         visible: true,  order: 5   },
  { id: "publications",   type: "publications",   label: "Publications",   visible: true,  order: 6   },
  { id: "awards",         type: "awards",         label: "Awards",         visible: true,  order: 7   },
  { id: "certifications", type: "certifications", label: "Certifications", visible: true,  order: 8   },
  { id: "languages",      type: "languages",      label: "Languages",      visible: true,  order: 9   },
  { id: "testimonials",   type: "testimonials",   label: "Testimonials",   visible: false, order: 10  },
  { id: "volunteer",      type: "volunteer",      label: "Volunteer",      visible: false, order: 11  },
  { id: "contact",        type: "about",          label: "Contact",        visible: true,  order: 999 },
];

// ─── Sample optional section data ─────────────────────────────────────────────

const mockPublications: Publication[] = [
  {
    id: "pub_01",
    title: "Design Tokens at Scale",
    venue: "Smashing Magazine",
    year: "2024",
    type: "article",
    url: "https://smashingmagazine.com",
    summary: "How to architect a multi-brand design token pipeline without losing your mind.",
  },
  {
    id: "pub_02",
    title: "Accessible Components Aren't Ugly",
    venue: "Frontend Nation 2023",
    year: "2023",
    type: "talk",
    url: "https://frontendnation.com",
    summary: "A talk on building accessible UI components that still look great.",
  },
];

const mockTestimonials: Testimonial[] = [
  {
    id: "t_01",
    quote:
      "Hadia has a rare ability to hold the whole system in her head — the design tokens, the component API, the accessibility requirements — and ship it on time.",
    author: "Lena Müller",
    role: "Head of Product",
    company: "Givency",
  },
  {
    id: "t_02",
    quote:
      "The best frontend collaborator I've worked with. She catches design problems before they reach production.",
    author: "James Park",
    role: "Principal Designer",
    company: "Pulse Inc.",
  },
];

const mockAwards: Award[] = [
  {
    id: "a_01",
    title: "Awwwards · Honourable Mention",
    issuer: "Awwwards",
    year: "2023",
    summary: "Awarded for the Givency donor portal redesign.",
  },
];

const mockCertifications: Certification[] = [
  {
    id: "cert_01",
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    year: "2022",
    url: "https://aws.amazon.com/certification",
  },
];

const mockLanguages: Language[] = [
  { id: "lang_1", name: "English",  proficiency: "Native" },
  { id: "lang_2", name: "Urdu",     proficiency: "Native" },
  { id: "lang_3", name: "German",   proficiency: "Professional" },
  { id: "lang_4", name: "French",   proficiency: "Conversational" },
];

const mockVolunteer: Volunteer[] = [
  {
    id: "vol_1",
    organization: "Django Girls Berlin",
    role: "Workshop Mentor",
    period: "2019 — present",
    description: "Running workshops teaching Python and Django to women and non-binary beginners.",
  },
];

// ─── Main mock portfolio ───────────────────────────────────────────────────────

export const mockPortfolio: Portfolio = {
  user: {
    name: "Hadia Naveed",
    handle: "hadia",
    headline: "Frontend lead & design systems engineer",
    pronouns: "she/her",
    location: "Berlin, Germany",
    available: true,
    availability_text: "Available · Senior IC roles · Q3 2026",
    avatar_url: null,
    cover_image_url: null,
    bio:
      "Frontend lead and design-systems engineer building tools that turn structured data into beautiful surfaces.",
    bio_long:
      "Frontend lead with nine years building products at the seam of design and engineering. Currently shipping a donor management platform at Givency; previously at Pulse and Studio X. I care most about the slow, careful work — design systems, accessibility, performance budgets, and the quiet polish that makes products feel intentional.",
    email: "hadia@profolyo.me",
    phone: "+49 000 000 0000",
    website: "https://hadianaveed.com",
    contact_note: "Open to senior IC roles, design-systems projects, or just a chat about typography.",
    social: [
      { id: "sl_1", type: "github",   label: "GitHub",    url: "https://github.com/hadia" },
      { id: "sl_2", type: "twitter",  label: "Twitter",   url: "https://twitter.com/hadianaveed" },
      { id: "sl_3", type: "linkedin", label: "LinkedIn",  url: "https://linkedin.com/in/hadia" },
      { id: "sl_4", type: "readcv",   label: "Read.cv",   url: "https://read.cv/hadia" },
    ],
  },
  projects: [
    {
      id: "p_01",
      slug: "givency",
      title: "Givency",
      tagline: "Donor management for mid-sized nonprofits",
      description:
        "B2B SaaS for nonprofits to manage recurring donor relationships, cohort retention, and board reporting.",
      role: "Frontend Lead",
      period: "2021 — 2024",
      team: "6 engineers, 1 designer",
      status: "live",
      cover_image_url: null,
      cover_color: "linear-gradient(135deg, #FFD4A8, #E76F51, #C44536)",
      tech_stack: ["React", "TypeScript", "Firebase", "Node.js", "Stripe", "Algolia"],
      links: [
        { type: "live",       url: "https://givency.com",   label: "Visit live" },
        { type: "case_study", url: "/projects/givency",     label: "Case study" },
      ],
      featured: true,
    },
    {
      id: "p_02",
      slug: "create-profolyo-app",
      title: "create-profolyo-app",
      tagline: "CLI to scaffold self-hosted Profolyo with custom branding",
      description: "Open-source command-line tool for spinning up a self-hosted Profolyo instance.",
      role: "Maintainer",
      period: "2025 — present",
      status: "in_progress",
      cover_color: "linear-gradient(160deg, #B8C7FF, #B8A0FF)",
      tech_stack: ["Node.js", "TypeScript", "OSS"],
      links: [{ type: "repo", url: "https://github.com/hadia/create-profolyo-app", label: "View repo" }],
      featured: true,
    },
    {
      id: "p_03",
      slug: "pulse",
      title: "Pulse",
      tagline: "Real-time metrics dashboard for ops teams",
      description: "Live dashboard for operations teams. Sunset January 2025 after acquisition.",
      role: "Senior Engineer",
      period: "2019 — 2021",
      status: "archived",
      cover_color: "#0F1410",
      tech_stack: ["Vue", "WebSocket", "D3"],
      links: [],
      featured: true,
    },
    {
      id: "p_04",
      slug: "field-notes",
      title: "Field Notes",
      tagline: "Markdown CMS for engineering teams",
      description: "Lightweight Markdown CMS with git-backed storage, built for engineering docs.",
      role: "Sole maintainer",
      period: "2023 — present",
      status: "live",
      cover_color: "linear-gradient(150deg, #F4E8D0, #C4A57B)",
      tech_stack: ["Next.js", "MDX", "GitHub API"],
      links: [{ type: "live", url: "https://fieldnotes.dev", label: "Visit" }],
    },
    {
      id: "p_05",
      slug: "lumen",
      title: "Lumen",
      tagline: "Tiny privacy-first analytics for indie hackers",
      description: "Sub-1KB analytics script. No cookies. Ships event data to your own database.",
      role: "Co-founder",
      period: "2022 — 2023",
      status: "live",
      cover_color: "linear-gradient(135deg, #2A6FDB, #1F4FB0)",
      tech_stack: ["TypeScript", "Cloudflare Workers", "Postgres"],
      links: [{ type: "live", url: "https://uselumen.dev", label: "Visit" }],
    },
    {
      id: "p_06",
      slug: "cohort",
      title: "Cohort",
      tagline: "Recurring donor retention insights",
      description:
        "An internal Givency tool that became a customer feature. Cohort-style retention curves for recurring donors.",
      role: "Frontend Lead",
      period: "2022",
      status: "archived",
      cover_color: "linear-gradient(135deg, #E8C8FF, #7C5AFF)",
      tech_stack: ["React", "D3", "Prisma"],
      links: [],
    },
  ],
  experience: [
    {
      id: "exp_01",
      company: "Givency",
      title: "Frontend Lead",
      period: "2021 — 2024",
      location: "Berlin",
      description:
        "Owned design system, accessibility, and frontend performance for the donor-management product. Built the editor with Tiptap and DnD-Kit; shipped weekly for 18 months. Migrated marketing site to App Router; cut TBT by 62%. Hired and mentored 3 frontend engineers.",
    },
    {
      id: "exp_02",
      company: "Pulse Inc.",
      title: "Senior Frontend Engineer",
      period: "2019 — 2021",
      location: "Remote",
      description: "Built the real-time metrics dashboard from prototype to acquisition. Designed WebSocket-backed live charts handling 10k events/sec. Co-led migration from Vue 2 to Vue 3 with zero downtime.",
    },
    {
      id: "exp_03",
      company: "Studio X",
      title: "Frontend Engineer",
      period: "2017 — 2019",
      location: "Karachi",
      description: "Agency work for SaaS and fintech clients across Pakistan and the Gulf.",
    },
    {
      id: "exp_04",
      company: "Freelance",
      title: "Designer & Developer",
      period: "2015 — 2017",
      location: "Karachi",
      description: "WordPress, Shopify, and the occasional brand identity for early-stage clients.",
    },
  ],
  education: [
    {
      id: "edu_01",
      institution: "Technische Universität Berlin",
      degree: "M.S. Human-Computer Interaction",
      period: "2017 — 2019",
      location: "Berlin",
    },
    {
      id: "edu_02",
      institution: "National University of Sciences & Technology",
      degree: "B.S. Computer Science",
      period: "2013 — 2017",
      location: "Islamabad",
    },
  ],
  skills: [
    { category: "Languages",       items: ["TypeScript", "JavaScript", "Python", "SQL", "Go"] },
    { category: "Frameworks",      items: ["React", "Next.js", "Tailwind", "Prisma"] },
    { category: "Design",          items: ["Figma", "Design Systems", "Storybook", "Tokens Studio", "Accessibility"] },
    { category: "Infra & Tooling", items: ["PostgreSQL", "Redis", "Stripe", "Vercel", "GitHub Actions", "Sentry"] },
  ],

  // Optional additional sections
  publications:   mockPublications,
  testimonials:   mockTestimonials,
  awards:         mockAwards,
  certifications: mockCertifications,
  languages:      mockLanguages,
  volunteer:      mockVolunteer,

  sections: defaultSections,
};

// ─── Thumbnail portfolio (used in template picker cards — hero + about + 3 projects only) ───

const thumbnailSections: SectionConfig[] = [
  { id: "hero",           type: "about",          label: "Hero",           visible: true,  order: 0   },
  { id: "about",          type: "about",          label: "About",          visible: true,  order: 1   },
  { id: "projects",       type: "projects",       label: "Projects",       visible: true,  order: 2   },
  { id: "experience",     type: "experience",     label: "Experience",     visible: false, order: 3   },
  { id: "education",      type: "education",      label: "Education",      visible: false, order: 4   },
  { id: "skills",         type: "skills",         label: "Skills",         visible: false, order: 5   },
  { id: "publications",   type: "publications",   label: "Publications",   visible: false, order: 6   },
  { id: "awards",         type: "awards",         label: "Awards",         visible: false, order: 7   },
  { id: "certifications", type: "certifications", label: "Certifications", visible: false, order: 8   },
  { id: "languages",      type: "languages",      label: "Languages",      visible: false, order: 9   },
  { id: "testimonials",   type: "testimonials",   label: "Testimonials",   visible: false, order: 10  },
  { id: "volunteer",      type: "volunteer",      label: "Volunteer",      visible: false, order: 11  },
  { id: "contact",        type: "about",          label: "Contact",        visible: false, order: 999 },
];

export const thumbnailPortfolio: Portfolio = {
  ...mockPortfolio,
  projects: mockPortfolio.projects.slice(0, 3),
  publications:   [],
  testimonials:   [],
  awards:         [],
  certifications: [],
  languages:      [],
  volunteer:      [],
  sections: thumbnailSections,
};

// ─── Empty portfolio (used as editor initial state) ───────────────────────────

export const emptyPortfolio: Portfolio = {
  user: {
    name: "",
    handle: "",
    headline: "",
    pronouns: "",
    location: "",
    available: false,
    availability_text: "",
    avatar_url: null,
    cover_image_url: null,
    bio: "",
    bio_long: "",
    email: "",
    social: [],
    contact_note: "",
  },
  projects:       [],
  experience:     [],
  education:      [],
  skills:         [],
  publications:   [],
  testimonials:   [],
  awards:         [],
  certifications: [],
  languages:      [],
  volunteer:      [],
  sections:       defaultSections,
};
