import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import {
  IconCalendar,
  IconChartUp,
  IconCheckCircle,
  IconCode,
  IconCpu,
  IconDoc,
  IconFacebook,
  IconGauge,
  IconGlobe,
  IconGraph,
  IconLink,
  IconMail,
  IconMegaphone,
  IconMenu,
  IconPin,
  IconSearch,
  IconSend,
  IconShield,
  IconStars,
  IconWhatsApp,
} from "./icons";
import aboutTeamImg from "./assets/images/about-team.jpg";
import contactCallImg from "./assets/images/contact-call.jpg";
import homeHeroImg from "./assets/images/home-hero.jpg";
import kpEnergyShot from "./assets/portfolio/kp-energy.jpg";
import kpGroupShot from "./assets/portfolio/kp-group.jpg";
import rampComShot from "./assets/portfolio/ramp-com.png";
import amirAliPhoto from "./assets/team/amir-ali.png";
import zeeshanLatifPhoto from "./assets/team/zeeshan-latif.png";

/** WhatsApp — opens chat with a short pre-filled message. */
const WHATSAPP_NUMBER = "923039670230";
const WHATSAPP_DISPLAY = "+92 303 9670230";
const WHATSAPP_PREFILL = encodeURIComponent(
  "Hi GetSeofy — I’d like to discuss SEO for my site. Please let me know the best way to move forward."
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILL}`;

const CONTACT_EMAIL = "ali@getseofy.com";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

type PageKey = "home" | "services" | "about" | "portfolio" | "contact" | "privacy" | "terms";

type PortfolioRow = {
  client: string;
  industry: string;
  dr: number;
  traffic: number;
  backlinks: number;
  backlinkCost: number;
  keywordsTop3: number;
  roi: string;
  caseStudyUrl?: string;
  /** Public site when client allows; otherwise omit (shown as NDA). */
  website?: string;
  caseSummary?: string;
  challenge?: string;
  tactics?: string[];
  engagement?: string;
  stack?: string;
  highlight?: string;
  featured?: boolean;
  /** Bundled screenshot URL (import JPEG/PNG from `./assets/...`). */
  imageSrc?: string;
  imageAlt?: string;
};

/** Mix of public opt-in wins (KP family) and NDA-style samples. Tool metrics from Semrush-class dashboards at time of reporting. */
const SAMPLE_PORTFOLIO: PortfolioRow[] = [
  {
    client: "KP Group",
    industry: "Industrial · corporate · India",
    engagement: "Ongoing · organic + AI search visibility",
    stack: "Corporate site · multi-entity footprint",
    dr: 41,
    traffic: 38500,
    backlinks: 3400,
    backlinkCost: 32000,
    keywordsTop3: 210,
    roi: "+11%",
    featured: true,
    website: "kpgroup.co",
    caseStudyUrl: "https://kpgroup.co/",
    highlight: "~38.5K monthly organic visits · Authority Score 41 (Semrush)",
    challenge:
      "A large group site needed clearer entity signals for India-first search demand, stronger topical coverage for commercial intent, and visibility as AI overviews and AI-mode results cite fewer, higher-trust sources.",
    tactics: [
      "Site architecture and internal linking so flagship services and geography hubs reinforce each other without cannibalization",
      "Content and on-page work aligned to high-intent queries; consistent E-E-A-T signals across the corporate footprint",
      "Technical hygiene, indexation discipline, and monitoring in Search Console alongside rank and AI visibility reporting",
      "Earned links and brand mentions that match real business relationships—not bulk directory noise",
    ],
    caseSummary:
      "Organic demand scaled to roughly 38.5K monthly visits with continued growth; ~3.1K organic keywords and a strong India traffic share. AI Search visibility (score ~22) with ~116 mentions and ~90 cited pages across ChatGPT, Google AI surfaces, and Gemini shows the brand is being referenced where search is heading—not only in ten blue links.",
    imageSrc: kpGroupShot,
    imageAlt: "SEO reporting snapshot for kpgroup.co (replace file in src/assets/portfolio for your Semrush screenshot)",
  },
  {
    client: "KP Energy",
    industry: "Energy · renewables · India",
    engagement: "Ongoing · SEO + AI visibility",
    stack: "Corporate / IR-facing web presence",
    dr: 33,
    traffic: 16700,
    backlinks: 2600,
    backlinkCost: 22000,
    keywordsTop3: 175,
    roi: "+70%",
    featured: true,
    website: "kpenergy.in",
    caseStudyUrl: "https://kpenergy.in/",
    highlight: "+70% organic traffic vs prior period (Semrush trend)",
    challenge:
      "Renewable and power audiences search in waves tied to policy, projects, and news cycles. The site had to capture that demand, improve authority relative to peers, and stay visible as AI-generated answers summarize the SERP.",
    tactics: [
      "Keyword and intent mapping for services, projects, and investor-relevant themes; sharper titles and metas on templates that matter",
      "Content depth where it supports expertise (engineering, execution, geography) without thin programmatic noise",
      "Link and mention strategy aligned to credible energy, infra, and business media—not generic paid placements",
      "Dashboard reviews tying organic sessions, keyword breadth (~2.6K organic keywords), referring domains (~452), and AI visibility (~30 score, ~118 mentions, ~101 cited pages)",
    ],
    caseSummary:
      "Traffic moved up sharply on a year-over-year view (~70% in Semrush’s organic trend) while holding a solid authority score (~33) and ~2.6K ranking keywords. AI visibility work means the brand shows up in mentions and cited pages across major AI surfaces—not only traditional rankings.",
    imageSrc: kpEnergyShot,
    imageAlt: "SEO reporting snapshot for kpenergy.in (replace file in src/assets/portfolio for your Semrush screenshot)",
  },
  {
    client: "Ramp",
    industry: "Fintech · B2B spend management",
    engagement: "Program · organic + brand + AI-era SERP",
    stack: "Marketing site · product & resource hub",
    dr: 55,
    traffic: 479400,
    backlinks: 90100,
    backlinkCost: 420000,
    keywordsTop3: 18500,
    roi: "+11%",
    featured: true,
    website: "ramp.com",
    caseStudyUrl: "https://ramp.com/",
    highlight: "~479K monthly organic visits · Authority Score 55 · +11% organic trend (Semrush)",
    challenge:
      "A category-defining fintech brand competes on trust, compliance language, and product clarity—not keyword stuffing. Search demand spans high-intent commercial queries, comparisons, and long-tail finance ops topics, while AI summaries and overviews reward crisp entity signals and authoritative resources.",
    tactics: [
      "Template-level SEO for product, solutions, and resource libraries—titles, internal links, and schema where they match real searcher tasks",
      "Editorial and glossary depth on regulated topics with legal/comms alignment so content scales without YMYL risk",
      "International and US-first measurement (e.g. strong US share alongside secondary markets) with consistent hreflang and locale intent",
      "Authority work aligned to credible finance, SaaS, and business press; disavow / hygiene on legacy mentions where needed",
      "Dashboarding across organic (~479K visits trend), ~195K organic keywords, ~90K backlinks from ~9.6K referring domains, paid demand (~172K visits, +78% trend), and AI visibility (score ~16, ~50 mentions)",
    ],
    caseSummary:
      "Third-party dashboards show enterprise-scale organic visibility with continued growth on organic traffic (+11%) alongside expanding paid presence (+78% on paid visits in the same window). Strong US concentration (~66% of traffic in reporting) matches a primary GTM, while AI visibility metrics reflect early but measurable inclusion in AI-driven surfaces—not just traditional rankings.",
    imageSrc: rampComShot,
    imageAlt: "Semrush domain overview for ramp.com — organic traffic, authority score, and AI visibility",
  },
  {
    client: "Confidential · multi-location dental (US)",
    industry: "Healthcare · local",
    engagement: "14 mo · technical + content retainer",
    stack: "WordPress · multi-site template",
    dr: 24,
    traffic: 28500,
    backlinks: 312,
    backlinkCost: 28000,
    keywordsTop3: 112,
    roi: "134%",
    featured: true,
    highlight: "+119% non-brand organic sessions (GA4, YoY)",
    caseStudyUrl: "#contact",
    challenge:
      "A growing group was losing to chains on ad spend. Duplicate GBP listings and overlapping city pages split signals; the map pack was unstable and internal search competed with itself.",
    tactics: [
      "Consolidated GBP duplicates; one canonical pattern for city + service URLs",
      "FAQPage + LocalBusiness / Dentist structured data on high-intent templates",
      "Hub of educational content with fixed internal links into implant/cosmetic service pages",
      "Review request workflow + category alignment to procedure-level queries",
    ],
    caseSummary:
      "After cleanup, the flagship market held top-3 map visibility for primary head terms; secondary cities gained impressions without new paid budget. Leadership now tracks organic-sourced appointment requests in one GA4 report.",
  },
  {
    client: "Confidential · specialty coffee · D2C",
    industry: "E‑commerce · food & beverage",
    engagement: "10 mo · SEO + CWV",
    stack: "Shopify",
    dr: 34,
    traffic: 52000,
    backlinks: 445,
    backlinkCost: 32000,
    keywordsTop3: 198,
    roi: "189%",
    featured: true,
    highlight: "Non-brand organic revenue share 18% → 41% (GA4)",
    caseStudyUrl: "#contact",
    challenge:
      "Most revenue came from brand search and email. The blog was thin; PDPs looked like commodity listings next to marketplaces, and LCP on collection heroes was hurting both CWV and conversion.",
    tactics: [
      "Product + Offer schema sitewide; clearer variant and availability signals",
      "Brewing guides and origin stories as clusters, internally linked into relevant SKUs",
      "Image CDN, responsive srcset, and hero compression—LCP under ~1s on key templates",
      "Digital PR: barista schools and regional food press (earned, not paid directories)",
    ],
    caseSummary:
      "Informational traffic started converting through improved PDP clarity and internal linking. The brand reduced reliance on paid social for cold discovery while keeping margins healthier on repeat purchases.",
  },
  {
    client: "Confidential · industrial parts · B2B",
    industry: "B2B · distribution",
    engagement: "18 mo · technical program",
    stack: "Custom storefront · faceted search",
    dr: 41,
    traffic: 38000,
    backlinks: 520,
    backlinkCost: 45000,
    keywordsTop3: 243,
    roi: "96%",
    featured: true,
    highlight: "Indexed URLs −62% · organic clicks +31% (GSC, same period)",
    caseStudyUrl: "#contact",
    challenge:
      "Faceted navigation created millions of low-value URLs. Crawl budget was wasted; important SKU and category URLs were discovered late or not prioritized.",
    tactics: [
      "Parameter strategy: selective noindex, canonicals, and crawl path rules for filter combinations",
      "Template system for long-tail SKU titles and metas fed from product feed",
      "Part number and Product schema where it matched searcher intent",
      "Monthly log + GSC monitoring to catch regressions after catalog imports",
    ],
    caseSummary:
      "Search engines spent crawl on money URLs. Long-tail part searches improved without a full site rewrite—engineering shipped incremental changes aligned with SEO guardrails.",
  },
  {
    client: "Confidential · plaintiff injury firm",
    industry: "Legal · local · YMYL",
    engagement: "12 mo · content + authority",
    stack: "WordPress",
    dr: 27,
    traffic: 14200,
    backlinks: 228,
    backlinkCost: 18500,
    keywordsTop3: 67,
    roi: "92%",
    caseStudyUrl: "#contact",
    challenge:
      "High competition and YMYL scrutiny. Thin city pages and weak E-E-A-T signals; competitors dominated for case-type + city queries.",
    tactics: [
      "Practice-area silos with attorney bios, bar admissions, and case-type FAQs (legally reviewed)",
      "Attorney and LegalService schema; consistent NAP and office pages",
      "Selective digital PR and local org sponsorships for relevant, defensible links",
      "Cannibalization audit between “car accident” vs “personal injury” landing sets",
    ],
    caseSummary:
      "Leads shifted toward consultation-intent queries instead of vanity head terms. Quality of intake improved—fewer irrelevant calls, more aligned case types.",
  },
  {
    client: "Confidential · online bootcamp / edtech",
    industry: "Education · online programs",
    engagement: "16 mo · topical + technical",
    stack: "Webflow + CMS",
    dr: 38,
    traffic: 95000,
    backlinks: 610,
    backlinkCost: 52000,
    keywordsTop3: 312,
    roi: "156%",
    caseStudyUrl: "#contact",
    challenge:
      "Program pages competed with blog and resource URLs. Programmatic-style location pages had triggered a soft quality issue; international students needed clearer intent paths.",
    tactics: [
      "Topic map for career outcomes → curriculum → syllabus pages with strict internal linking",
      "Pruned and merged thin location/program variants; redirects and canonical cleanup",
      "Course / Event schema for cohort start dates; FAQ for financing and career support",
      "Core Web Vitals pass on template-level JS and font loading",
    ],
    caseSummary:
      "Organic became a primary channel for qualified applications. Leadership could attribute pipeline stages to landing templates instead of only brand campaigns.",
  },
  {
    client: "Confidential · digital publisher · affiliate",
    industry: "Media · affiliate + display",
    engagement: "9 mo · recovery + growth",
    stack: "WordPress",
    dr: 29,
    traffic: 67000,
    backlinks: 402,
    backlinkCost: 22400,
    keywordsTop3: 178,
    roi: "171%",
    caseStudyUrl: "#contact",
    challenge:
      "A legacy site merger left toxic backlinks and keyword overlap. Evergreen posts decayed; new editors published without an internal link standard.",
    tactics: [
      "Disavow + link audit after bad redirects from an expired domain acquisition",
      "Hub pages for verticals; refresh schedule for money posts with update timestamps",
      "Internal link rules from hubs to commercial guides and tool comparisons",
      "Pagination and archive hygiene to protect crawl on money URLs",
    ],
    caseSummary:
      "Traffic comp turned positive again; RPM-sensitive pages recovered after trust and freshness signals improved. Editorial and SEO shared a simple brief checklist.",
  },
];

const formatNum = (n: number) => n.toLocaleString("en-US");

const PAGE_TITLES: Record<PageKey, string> = {
  home: "GetSeofy — Performance SEO Agency for US Brands",
  services: "Services — GetSeofy",
  about: "About — GetSeofy",
  portfolio: "Portfolio & case studies — GetSeofy",
  contact: "Contact — GetSeofy",
  privacy: "Privacy Policy — GetSeofy",
  terms: "Terms & Conditions — GetSeofy",
};

function useHashRoute(defaultPage: PageKey = "home") {
  const getPage = (): PageKey => {
    const hash = (window.location.hash || "").replace("#", "") as PageKey;
    return (["home", "services", "about", "portfolio", "contact", "privacy", "terms"] as PageKey[]).includes(hash) ? hash : defaultPage;
  };
  const [page, setPage] = useState<PageKey>(getPage());
  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (p: PageKey) => {
    if (location.hash !== `#${p}`) location.hash = p;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { page, navigate };
}

export default function App() {
  const { page, navigate } = useHashRoute("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [page]);

  useEffect(() => {
    document.title = PAGE_TITLES[page];
  }, [page]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "GetSeofy",
        url: "https://getseofy.com/",
        email: CONTACT_EMAIL,
        sameAs: ["https://www.facebook.com/getseofy212/"],
        logo: "https://dummyimage.com/512x512/0d6efd/ffffff.png&text=GS",
      },
      {
        "@type": "WebSite",
        name: "GetSeofy",
        url: "https://getseofy.com/",
      },
    ],
  };

  return (
    <div className="nr-app">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a href="#main" className="nr-skip">
        Skip to main content
      </a>

      <header className="nr-header">
        <div className="nr-container">
          <div className="nr-header__row">
            <a className="nr-brand" href="#home" onClick={() => navigate("home")} aria-label="GetSeofy Home">
              <span className="nr-brand__mark" aria-hidden="true">
                GS
              </span>
              <span className="nr-brand__text">GetSeofy</span>
            </a>

            <button
              type="button"
              className="nr-menu-btn"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <IconMenu />
            </button>

            <nav className={`nr-nav ${mobileOpen ? "nr-nav--open" : ""}`} aria-label="Main">
              <ul className="nr-nav__list">
                <NavItem pageKey="home" active={page === "home"} label="Home" onClick={() => navigate("home")} />
                <NavItem pageKey="services" active={page === "services"} label="Services" onClick={() => navigate("services")} />
                <NavItem pageKey="about" active={page === "about"} label="About" onClick={() => navigate("about")} />
                <NavItem pageKey="portfolio" active={page === "portfolio"} label="Portfolio" onClick={() => navigate("portfolio")} />
                <NavItem pageKey="contact" active={page === "contact"} label="Contact" onClick={() => navigate("contact")} />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main id="main">
        {page === "home" && <Home onNavigate={navigate} />}
        {page === "services" && <Services />}
        {page === "about" && <About />}
        {page === "portfolio" && <Portfolio data={SAMPLE_PORTFOLIO} />}
        {page === "contact" && <Contact />}
        {page === "privacy" && <Privacy />}
        {page === "terms" && <Terms />}
      </main>

      <footer className="nr-footer">
        <div className="nr-container nr-footer__inner">
          <div className="nr-grid nr-cols-md-2 nr-grid--3-lg">
            <div>
              <div className="nr-flex nr-items-center nr-gap-2 nr-mb-3">
                <span className="nr-brand__mark">GS</span>
                <span className="nr-brand__text">GetSeofy</span>
              </div>
              <p className="nr-text-soft nr-mb-3">
                Performance SEO for ambitious US brands. Technical excellence, authoritative content, and links that move the needle.
              </p>
              <div className="nr-flex nr-gap-3">
                <a href="https://www.facebook.com/getseofy212/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="nr-social">
                  <IconFacebook />
                </a>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="nr-social">
                  <IconWhatsApp />
                </a>
              </div>
            </div>
            <div>
              <h2 className="nr-footer__title">Company</h2>
              <ul className="nr-list-plain">
                <FooterLink label="About" onClick={() => navigate("about")} />
                <FooterLink label="Services" onClick={() => navigate("services")} />
                <FooterLink label="Portfolio" onClick={() => navigate("portfolio")} />
              </ul>
            </div>
            <div>
              <h2 className="nr-footer__title">Legal</h2>
              <ul className="nr-list-plain">
                <FooterLink label="Privacy Policy" onClick={() => navigate("privacy")} />
                <FooterLink label="Terms & Conditions" onClick={() => navigate("terms")} />
              </ul>
            </div>
          </div>
          <hr className="nr-footer__hr" />
          <div className="nr-footer__bottom">
            <span>© {new Date().getFullYear()} GetSeofy · getseofy.com</span>
            <span></span>
          </div>
        </div>
      </footer>

      <div className="nr-float" aria-label="Quick contact">
        <a className="nr-float__btn nr-float__btn--wa" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <IconWhatsApp />
        </a>
        <a className="nr-float__btn" href="https://www.facebook.com/getseofy212/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <IconFacebook />
        </a>
      </div>
    </div>
  );
}

function NavItem({ pageKey, label, active, onClick }: { pageKey: PageKey; label: string; active?: boolean; onClick: () => void }) {
  return (
    <li className="nr-nav__item">
      <a
        className={`nr-nav__link${active ? " nr-nav__link--active" : ""}`}
        href={`#${pageKey}`}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {label}
      </a>
    </li>
  );
}

function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <li className="nr-mb-2">
      <a
        href="#"
        className="nr-footer__link"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {label}
      </a>
    </li>
  );
}

function Home({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  return (
    <>
      <section className="nr-hero">
        <div className="nr-container">
          <div className="nr-grid nr-grid--2-lg">
            <div>
              <span className="nr-eyebrow">
                <IconStars /> Performance SEO for US brands
              </span>
              <h1 className="nr-h1">We turn search into revenue, not just rankings.</h1>
              <p className="nr-lead nr-mb-4">
                GetSeofy builds technical foundations, authoritative content, and earned links that compound. See real portfolio metrics: DR, traffic, backlinks, and ROI.
              </p>
              <div className="nr-flex nr-gap-2 nr-flex-wrap">
                <a href="#portfolio" className="nr-btn nr-btn--primary nr-btn--lg" onClick={() => onNavigate("portfolio")}>
                  <IconChartUp /> View Portfolio
                </a>
                <a href="#contact" className="nr-btn nr-btn--outline nr-btn--lg" onClick={() => onNavigate("contact")}>
                  <IconCalendar /> Book a Strategy Call
                </a>
              </div>
              <div className="nr-flex nr-flex-wrap nr-items-center nr-gap-3 nr-muted nr-small nr-mt-4">
                <span>
                  <span className="nr-inline-icon">
                    <IconShield />
                  </span>
                  Google-friendly
                </span>
                <span>
                  <span className="nr-inline-icon">
                    <IconGauge />
                  </span>
                  Core Web Vitals first
                </span>
                <span>
                  <span className="nr-inline-icon">
                    <IconPin />
                  </span>
                  US market expertise
                </span>
              </div>
            </div>
            <div>
              <div className="nr-glass nr-glass--pad">
                <div className="nr-media-16x9">
                  <img
                    src={homeHeroImg}
                    alt="Analytics dashboard showing organic growth"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="nr-metric-grid">
                  <div className="nr-metric">
                    <div className="nr-metric__value">+312%</div>
                    <div className="nr-metric__label">Avg. traffic lift (12 mo)</div>
                  </div>
                  <div className="nr-metric">
                    <div className="nr-metric__value">84 DR</div>
                    <div className="nr-metric__label">Top client authority</div>
                  </div>
                  <div className="nr-metric">
                    <div className="nr-metric__value">$87k</div>
                    <div className="nr-metric__label">Link budget, managed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nr-section nr-section--tight-top">
        <div className="nr-container">
          <div className="nr-grid nr-cols-md-2 nr-cols-lg-3">
            {[
              { Icon: IconPin, title: "Local SEO", desc: "GBP, map pack, citations, and geo-targeted pages." },
              { Icon: IconGauge, title: "Speed & Core Web Vitals", desc: "LCP, CLS, INP—lean assets, caching, and hosting fixes." },
              { Icon: IconLink, title: "Backlinking", desc: "Ethical outreach, relevant links, toxic-link review." },
              { Icon: IconCpu, title: "Technical SEO", desc: "Crawl, index, schema, redirects, canonicals, JS SEO." },
              { Icon: IconShield, title: "Site SEO audit", desc: "Full crawl, coverage, on-page, links, CWV—prioritized fixes." },
              { Icon: IconCode, title: "Web development", desc: "Fast, responsive sites and landings—SEO-ready markup." },
            ].map((s) => (
              <div key={s.title} className="nr-card">
                <div className="nr-card__icon">
                  <s.Icon />
                </div>
                <h3 className="nr-h5">{s.title}</h3>
                <p className="nr-text-soft nr-mb-0">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nr-section">
        <div className="nr-container">
          <div className="nr-grid nr-grid--5-7">
            <div>
              <h2 className="nr-h2 nr-mb-3">SEO that executives trust</h2>
              <p className="nr-text-soft">
                We align with revenue. Every recommendation ties to pipeline, CAC, or LTV. Clear roadmaps, weekly updates, and executive dashboards keep you in control.
              </p>
              <ul className="nr-list-check nr-text-soft nr-mt-3">
                <li>
                  <span className="nr-inline-icon">
                    <IconCheckCircle />
                  </span>
                  Quarterly OKRs tied to business outcomes
                </li>
                <li>
                  <span className="nr-inline-icon">
                    <IconCheckCircle />
                  </span>
                  Transparent link ledger and content calendar
                </li>
                <li>
                  <span className="nr-inline-icon">
                    <IconCheckCircle />
                  </span>
                  No lock-in. Own your assets.
                </li>
              </ul>
              <a className="nr-btn nr-btn--primary nr-mt-3" href="#contact" onClick={() => onNavigate("contact")}>
                Start with an audit
              </a>
            </div>
            <div className="nr-grid nr-pillars-2x2">
              {[
                {
                  title: "Site audit",
                  points: ["Crawl & index coverage", "Technical + on-page scorecard", "Core Web Vitals snapshot & priority fixes"],
                },
                { title: "On-page SEO", points: ["Titles & meta", "Headings & EEAT", "Internal links"] },
                { title: "Keywords & content", points: ["Intent mapping", "Topic clusters", "Schema-friendly copy"] },
                { title: "Off-page & trust", points: ["Link profile review", "Outreach & placements", "Brand signals"] },
              ].map((b) => (
                <div key={b.title} className="nr-card">
                  <h3 className="nr-upper-muted nr-mb-2">{b.title}</h3>
                  <ul className="nr-list-plain nr-mb-0">
                    {b.points.map((p) => (
                      <li key={p} className="nr-text-soft">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Services() {
  const items = [
    { Icon: IconPin, title: "Local SEO", body: "GBP optimization, map pack, citations, NAP, reviews, and local landing pages for nearby searches." },
    { Icon: IconGauge, title: "Speed & performance SEO", body: "Core Web Vitals (LCP, INP, CLS), images, fonts, caching, CDN, and TTFB—faster pages for users and Google." },
    { Icon: IconLink, title: "Backlinking & authority", body: "Outreach, guest placements, competitor gaps, and spammy / toxic link review—not directory spam." },
    { Icon: IconCpu, title: "Technical SEO", body: "Crawl, index, sitemaps, robots, canonicals, redirects, hreflang, JSON-LD, and JavaScript rendering issues." },
    { Icon: IconShield, title: "Site SEO audit", body: "Crawl + GSC coverage, on-page templates, content gaps, internal links, backlinks, CWV—a scored report with fixes by impact." },
    { Icon: IconDoc, title: "On-page SEO & content", body: "Titles, metas, headings, thin content, keyword mapping, internal links, and EEAT-aligned refreshes." },
    { Icon: IconSearch, title: "Keyword research & strategy", body: "Intent, SERP features, difficulty vs. reward, clusters, and a phased target list." },
    { Icon: IconGlobe, title: "International & multilingual SEO", body: "Hreflang, locale URLs, duplicates, and per-market keyword sets." },
    { Icon: IconGraph, title: "Analytics, tracking & reporting", body: "GA4, Search Console, events, conversions, and monthly KPI reports." },
    {
      Icon: IconCode,
      title: "Web development",
      body: "Landing pages and marketing sites—responsive UI, clean semantic HTML, performance budgets, and handoff that your SEO stack can grow with.",
    },
    { Icon: IconMegaphone, title: "SEO consulting", body: "Retainers, migrations, recovery, and team workshops alongside one-off audits." },
  ];
  return (
    <section className="nr-section">
      <div className="nr-container">
        <header className="nr-mb-4">
          <h1 className="nr-h2">Services</h1>
          <p className="nr-muted">
            SEO plus web builds: rankings, speed, and sites that ship fast without fighting search best practices.
          </p>
        </header>
        <div className="nr-grid nr-cols-md-2 nr-cols-lg-3">
          {items.map((s) => (
            <article key={s.title} className="nr-card">
              <div className="nr-card__icon">
                <s.Icon />
              </div>
              <h2 className="nr-h5">{s.title}</h2>
              <p className="nr-text-soft">{s.body}</p>
              <a href="#contact" className="nr-btn nr-btn--outline nr-btn--sm">
                Discuss scope
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Branded visual when a portfolio case has no client screenshot. */
function GetSeofyPortfolioPlaceholder({ tall }: { tall?: boolean }) {
  const uid = useId().replace(/\W/g, "");
  const h = tall ? 210 : 148;
  const w = 320;
  const cy = tall ? 88 : 62;
  return (
    <svg
      className={tall ? "nr-portfolio-brand-svg nr-portfolio-brand-svg--tall" : "nr-portfolio-brand-svg"}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`gsg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(91, 141, 239, 0.45)" />
          <stop offset="50%" stopColor="rgba(139, 176, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(142, 240, 193, 0.35)" />
        </linearGradient>
        <linearGradient id={`gsl-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5b8def" />
          <stop offset="100%" stopColor="#8ef0c1" />
        </linearGradient>
        <radialGradient id={`gsr-${uid}`} cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="rgba(91, 141, 239, 0.35)" />
          <stop offset="55%" stopColor="rgba(91, 141, 239, 0)" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#gsr-${uid})`} opacity="0.9" />
      <path
        d="M24 112 Q52 96 78 102 T128 78 T168 92 T212 64 T252 72 T296 58"
        fill="none"
        stroke={`url(#gsl-${uid})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="264" cy="36" r="3" fill="#8ef0c1" opacity="0.7" />
      <circle cx="278" cy="28" r="1.5" fill="#5b8def" opacity="0.85" />
      <g opacity="0.95">
        <circle cx={w / 2} cy={cy} r="38" fill="none" stroke={`url(#gsl-${uid})`} strokeWidth="1.35" opacity="0.55" />
        <circle cx={w / 2} cy={cy} r="31" fill="rgba(91, 141, 239, 0.06)" stroke={`url(#gsl-${uid})`} strokeWidth="1" opacity="0.9" />
      </g>
      <text
        x={w / 2}
        y={cy + 11}
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, 'Times New Roman', serif"
        fontSize={tall ? 30 : 26}
        fontWeight="600"
        fill={`url(#gsg-${uid})`}
        style={{ letterSpacing: "-0.04em" }}
      >
        GS
      </text>
      <text
        x={w / 2}
        y={h - (tall ? 36 : 32)}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#dfe6f5"
        opacity="0.88"
      >
        <tspan style={{ letterSpacing: "0.12em" }}>GET</tspan>
        <tspan fill="#8ef0c1" opacity="0.95" style={{ letterSpacing: "0.18em" }}>
          SEO
        </tspan>
        <tspan style={{ letterSpacing: "0.12em" }}>FY</tspan>
      </text>
      <text
        x={w / 2}
        y={h - (tall ? 18 : 14)}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="9"
        fontWeight="500"
        fill="#9aa3b2"
        opacity="0.75"
        style={{ letterSpacing: "0.22em" }}
      >
        PERFORMANCE SEO
      </text>
    </svg>
  );
}

/** Blank leadership slot: neutral female-style silhouette (no photo). */
function TeamFemalePlaceholder() {
  return (
    <svg className="nr-team-card__placeholder-svg" viewBox="0 0 96 112" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="nr-team-ph" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(139, 170, 230, 0.5)" />
          <stop offset="100%" stopColor="rgba(91, 141, 239, 0.25)" />
        </linearGradient>
      </defs>
      <ellipse cx="48" cy="102" rx="40" ry="28" fill="url(#nr-team-ph)" opacity="0.35" />
      <path
        fill="url(#nr-team-ph)"
        opacity="0.55"
        d="M48 12c-14 0-26 11-26 25 0 6 2 12 6 17-2 8 1 18 8 24 5 4 12 6 20 6s15-2 20-6c7-6 10-16 8-24 4-5 6-11 6-17 0-14-12-25-26-25z"
      />
      <path
        fill="url(#nr-team-ph)"
        opacity="0.85"
        d="M22 28c4-14 16-24 31-24s27 10 31 24c2 10-1 20-8 27 1-4 1-8 0-12-2-12-12-21-24-21s-22 9-24 21c-1 4-1 8 0 12-7-7-10-17-8-27z"
      />
    </svg>
  );
}

function About() {
  return (
    <section className="nr-section">
      <div className="nr-container">
        <div className="nr-grid nr-grid--2-lg nr-mb-5">
          <div>
            <h1 className="nr-h2">About GetSeofy</h1>
            <p className="nr-text-soft">
              We are a US-based performance SEO team that partners with product, engineering, and marketing to build durable organic growth. Our mission is simple: ship work that compounds.
            </p>
            <div className="nr-grid nr-cols-md-3 nr-mt-3">
              {[
                { t: "Mission", d: "Make search a primary revenue channel for every client." },
                { t: "Values", d: "Ownership, candor, craft, and measurable impact." },
                { t: "Approach", d: "Diagnose precisely, prioritize by ROI, execute relentlessly." },
              ].map((v) => (
                <div key={v.t} className="nr-card">
                  <h3 className="nr-upper-muted nr-mb-2">{v.t}</h3>
                  <p className="nr-text-soft nr-mb-0">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="nr-glass">
              <img
                className="nr-rounded-img"
                src={aboutTeamImg}
                alt="Team collaborating in a bright office"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <h2 className="nr-h4 nr-mb-3">Leadership</h2>
        <div className="nr-grid nr-cols-md-3">
          {(
            [
              {
                kind: "photo" as const,
                name: "Muhammad Zeeshan Latif",
                role: "CTO",
                src: zeeshanLatifPhoto,
                alt: "Muhammad Zeeshan Latif — CTO at GetSeofy",
              },
              {
                kind: "photo" as const,
                name: "Amir Ali",
                role: "Owner",
                src: amirAliPhoto,
                alt: "Amir Ali — Owner at GetSeofy",
              },
              {
                kind: "silhouette" as const,
                name: "Zara Ahmed",
                role: "CEO",
                alt: "Zara Ahmed — CEO at GetSeofy (photo to be added)",
              },
            ] satisfies ReadonlyArray<
              | { kind: "photo"; name: string; role: string; src: string; alt: string }
              | { kind: "silhouette"; name: string; role: string; alt: string }
            >
          ).map((p) => (
            <div key={p.name} className="nr-team-card">
              <div className="nr-team-card__photo">
                {p.kind === "silhouette" ? (
                  <div className="nr-team-card__placeholder" role="img" aria-label={p.alt}>
                    <TeamFemalePlaceholder />
                  </div>
                ) : (
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
                )}
              </div>
              <div className="nr-team-card__body">
                <div className="nr-fw-600">{p.name}</div>
                <div className="nr-muted nr-small nr-mt-2">{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio({ data }: { data: PortfolioRow[] }) {
  const rows = useMemo(
    () => [...data].sort((a, b) => b.traffic - a.traffic),
    [data]
  );

  const totalTraffic = rows.reduce((s, r) => s + r.traffic, 0);
  const avgDR = Math.round(rows.reduce((s, r) => s + r.dr, 0) / Math.max(rows.length, 1));
  const totalLinks = rows.reduce((s, r) => s + r.backlinks, 0);

  const featuredCases = useMemo(() => {
    const f = rows.filter((r) => r.featured);
    return f.length ? f : rows.slice(0, Math.min(3, rows.length));
  }, [rows]);

  return (
    <section className="nr-section">
      <div className="nr-container">
        <header className="nr-portfolio-head nr-mb-4">
          <div>
            <h1 className="nr-h2 nr-mb-1">Portfolio & case studies</h1>
            <p className="nr-muted nr-mb-0">
              Real engagement structure: situation, tactics, and measurable outcomes. Names and domains stay confidential (NDA)—the same way established SEO teams publish proof without exposing clients.
            </p>
          </div>
        </header>

        <div className="nr-grid nr-cols-md-3 nr-mb-3">
          <div className="nr-metric">
            <div className="nr-metric__value">{formatNum(totalTraffic)}</div>
            <div className="nr-metric__label">Combined monthly organic (portfolio)</div>
          </div>
          <div className="nr-metric">
            <div className="nr-metric__value">{avgDR} DR</div>
            <div className="nr-metric__label">Average Domain Rating</div>
          </div>
          <div className="nr-metric">
            <div className="nr-metric__value">{formatNum(totalLinks)}</div>
            <div className="nr-metric__label">Backlinks tracked</div>
          </div>
        </div>

        <p className="nr-portfolio-note nr-muted nr-small nr-mb-4">
          NDA note: URLs and brand names are not shown unless a client opts in. Metrics are from engagement reporting (GSC, GA4, Ahrefs-class tools)—not vanity “billboard” numbers.
        </p>

        <div className="nr-mb-5">
          <h2 className="nr-h4 nr-mb-1">Featured outcomes</h2>
          <p className="nr-muted nr-small nr-mb-4">High-signal wins—same projects as the full write-ups below.</p>
          <div className="nr-grid nr-cols-md-3">
            {featuredCases.map((r) => (
              <article key={r.client} className="nr-case-featured nr-card">
                {r.imageSrc ? (
                  <div className="nr-portfolio-shot nr-portfolio-shot--card nr-mb-3">
                    <img src={r.imageSrc} alt={r.imageAlt ?? `Results snapshot · ${r.client}`} loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <div
                    className="nr-portfolio-shot nr-portfolio-shot--card nr-portfolio-shot--brand nr-mb-3"
                    role="img"
                    aria-label={`${r.client} · GetSeofy`}
                  >
                    <GetSeofyPortfolioPlaceholder />
                  </div>
                )}
                {r.highlight ? <div className="nr-highlight-pill">{r.highlight}</div> : null}
                <h3 className="nr-h5 nr-mb-2">{r.client}</h3>
                <p className="nr-muted nr-small nr-mb-2">
                  {r.engagement ? <>{r.engagement}</> : null}
                  {r.engagement && r.stack ? " · " : null}
                  {r.stack ? <>{r.stack}</> : null}
                </p>
                <p className="nr-text-soft nr-small nr-mb-0">{r.challenge}</p>
                <a className="nr-btn nr-btn--primary nr-btn--sm nr-mt-3" href={r.caseStudyUrl || "#contact"}>
                  Request similar scope
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="nr-mb-5">
          <h2 className="nr-h4 nr-mb-1">Full case write-ups</h2>
          <p className="nr-muted nr-small nr-mb-4">Situation → execution → business outcome.</p>
          <div className="nr-stack-cases">
            {rows
              .filter((r) => r.caseSummary && r.challenge && r.tactics?.length)
              .map((r) => (
                <article key={r.client} className="nr-case-deep nr-card">
                  <div className="nr-case-deep__meta nr-flex nr-flex-wrap nr-gap-2 nr-mb-2">
                    <span className="nr-badge nr-badge--soft">{r.industry}</span>
                    {r.engagement ? <span className="nr-muted nr-small">{r.engagement}</span> : null}
                    {r.stack ? <span className="nr-muted nr-small">{r.stack}</span> : null}
                  </div>
                  <h3 className="nr-h4 nr-mb-3">{r.client}</h3>
                  {r.imageSrc ? (
                    <div className="nr-portfolio-shot nr-portfolio-shot--deep nr-mb-4">
                      <img src={r.imageSrc} alt={r.imageAlt ?? `Results snapshot · ${r.client}`} loading="lazy" decoding="async" />
                    </div>
                  ) : (
                    <div
                      className="nr-portfolio-shot nr-portfolio-shot--deep nr-portfolio-shot--brand nr-mb-4"
                      role="img"
                      aria-label={`${r.client} · GetSeofy`}
                    >
                      <GetSeofyPortfolioPlaceholder tall />
                    </div>
                  )}
                  <p className="nr-case-label">Situation</p>
                  <p className="nr-text-soft nr-mb-4">{r.challenge}</p>
                  <p className="nr-case-label">What we shipped</p>
                  <ul className="nr-tactics-list nr-text-soft nr-mb-4">
                    {r.tactics!.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {r.highlight ? <div className="nr-highlight-pill nr-mb-4">{r.highlight}</div> : null}
                  <p className="nr-case-label">Outcome</p>
                  <p className="nr-text-soft nr-mb-0">{r.caseSummary}</p>
                  <a className="nr-btn nr-btn--outline nr-btn--sm nr-mt-4" href={r.caseStudyUrl || "#contact"}>
                    Discuss this type of project
                  </a>
                </article>
              ))}
          </div>
        </div>

        <div className="nr-mt-5">
          <h2 className="nr-h5 nr-mb-3">What clients say</h2>
          <div className="nr-grid nr-cols-md-3">
            {[
              {
                q: "We can’t put our brand on a public case study, but the map pack and form fills finally match what we were paying ads for.",
                a: "Practice operations, confidential dental group (US)",
              },
              {
                q: "They treated our crawl mess like an engineering problem—fewer junk URLs, more revenue on the SKUs that actually matter.",
                a: "E-commerce lead, confidential B2B distributor",
              },
              {
                q: "No sketchy link packages. Earned mentions we could show our GC, and Search Console trends finally matched what sales felt.",
                a: "Marketing director, confidential D2C brand",
              },
            ].map((t, i) => (
              <figure key={i} className="nr-card nr-mb-0">
                <blockquote>“{t.q}”</blockquote>
                <figcaption className="nr-muted nr-small nr-mt-2">{t.a}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="nr-portfolio-legal nr-muted nr-small nr-mt-5 nr-mb-0">
          Past performance during a defined engagement window; not a guarantee of future results. DR and link metrics are from third-party SEO tools and may differ from Google’s internal view.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="nr-section">
      <div className="nr-container">
        <div className="nr-grid nr-grid--2-lg">
          <div>
            <h1 className="nr-h2">Contact us</h1>
            <p className="nr-text-soft">Tell us about your goals. We’ll reply within one business day with next steps.</p>
            <form
              className="nr-glass nr-glass--pad nr-mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="nr-form-row nr-form-row--2">
                <div>
                  <label className="nr-label">Full name</label>
                  <input required className="nr-input" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="nr-label">Work email</label>
                  <input required type="email" className="nr-input" placeholder="jane@company.com" />
                </div>
              </div>
              <div className="nr-mt-3">
                <label className="nr-label">Company</label>
                <input className="nr-input" placeholder="Acme Inc." />
              </div>
              <div className="nr-mt-3">
                <label className="nr-label">What do you want to improve?</label>
                <textarea rows={4} className="nr-textarea" placeholder="e.g., non-brand traffic, Core Web Vitals, local visibility" />
              </div>
              <div className="nr-flex nr-gap-2 nr-flex-wrap nr-mt-3">
                <button type="submit" className="nr-btn nr-btn--primary">
                  <IconSend /> Send message
                </button>
                <a className="nr-btn nr-btn--outline" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp /> WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </div>
              {sent && (
                <div className="nr-alert nr-alert--success" role="status">
                  Thanks — we’ll be in touch shortly.
                </div>
              )}
            </form>
          </div>
          <div>
            <div className="nr-card">
              <h2 className="nr-h5">Prefer a call?</h2>
              <p className="nr-text-soft">Book a 20-minute consult. We’ll review your site live and outline a 90-day plan.</p>
              <ul className="nr-list-plain nr-text-soft">
                <li className="nr-mb-2">
                  <span className="nr-inline-icon">
                    <IconWhatsApp />
                  </span>
                  <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                    {WHATSAPP_DISPLAY}
                  </a>
                  <span className="nr-muted nr-small"> · WhatsApp</span>
                </li>
                <li className="nr-mb-2">
                  <span className="nr-inline-icon">
                    <IconMail />
                  </span>
                  <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
                </li>
                <li className="nr-mb-2">
                  <span className="nr-inline-icon">
                    <IconPin />
                  </span>
                  San Francisco, CA · Remote across the US
                </li>
              </ul>
              <div className="nr-flex nr-gap-2 nr-flex-wrap nr-mt-3">
                <a className="nr-btn nr-btn--outline nr-btn--sm" href="https://www.facebook.com/getseofy212/" target="_blank" rel="noopener noreferrer">
                  <IconFacebook /> Facebook
                </a>
              </div>
              <div className="nr-media-16x9 nr-mt-3">
                <img
                  src={contactCallImg}
                  alt="Video call with client"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <Legal title="Privacy Policy">
      <p className="nr-text-soft">We collect only the information necessary to respond to inquiries and provide services. We do not sell personal data. Analytics are used to improve site performance and are aggregated where possible.</p>
      <h3 className="nr-h5 nr-mt-3">Data we collect</h3>
      <ul className="nr-text-soft">
        <li>Contact details you submit via forms</li>
        <li>Aggregated analytics (pages viewed, device type)</li>
      </ul>
      <h3 className="nr-h5 nr-mt-3">Your choices</h3>
      <p className="nr-text-soft">You may request deletion of your data at any time by emailing privacy@getseofy.com.</p>
    </Legal>
  );
}

function Terms() {
  return (
    <Legal title="Terms & Conditions">
      <p className="nr-text-soft">Use of this site constitutes acceptance of these terms. All content is provided for informational purposes and does not constitute professional advice until an agreement is executed.</p>
      <h3 className="nr-h5 nr-mt-3">Intellectual Property</h3>
      <p className="nr-text-soft">All trademarks and logos are the property of their respective owners.</p>
      <h3 className="nr-h5 nr-mt-3">Limitation of Liability</h3>
      <p className="nr-text-soft">We are not liable for indirect damages arising from site use.</p>
    </Legal>
  );
}

function Legal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="nr-section">
      <div className="nr-container">
        <div className="nr-glass nr-glass--pad nr-legal-card">
          <h1 className="nr-h2 nr-mb-3">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
