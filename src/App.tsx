import { FormEvent, useEffect, useState } from "react";

type Page = "home" | "collections" | "bridal" | "services" | "about" | "contact" | "product";

const images = {
  bride:
    "https://images.unsplash.com/photo-1600685890506-593fdf55949b?auto=format&fit=crop&w=1600&q=88",
  bridePink:
    "https://images.unsplash.com/photo-1684868265715-03e19a3e0e00?auto=format&fit=crop&w=1200&q=86",
  brideRed:
    "https://images.unsplash.com/photo-1570212773364-e30cd076539e?auto=format&fit=crop&w=1200&q=86",
  rings:
    "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?auto=format&fit=crop&w=1200&q=86",
  pendant:
    "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=86",
  bracelet:
    "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=86",
  necklace:
    "https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=1200&q=86",
  emerald:
    "https://images.unsplash.com/photo-1592317295760-5c1f677dfc78?auto=format&fit=crop&w=1200&q=86",
  collection:
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=86",
  heritage:
    "https://images.unsplash.com/photo-1599475211349-f4c81b3216bc?auto=format&fit=crop&w=1400&q=88",
  bridalCampaign:
    "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=1800&q=92",
};

const products = [
  { id: "aarohi-polki-necklace", name: "Aarohi Polki Necklace", type: "Necklaces", price: "Price on request", image: images.bridePink, material: "22K Gold · Polki-inspired setting", occasion: "Wedding & bridal ceremonies", description: "A regal bridal composition inspired by North Indian wedding traditions, designed to frame the neckline with luminous detail and graceful proportion.", craft: "Hand-finished setting with intricate traditional detailing. The final weight and composition can be adapted around your preferred look and budget." },
  { id: "ziya-gemstone-ring", name: "Ziya Gemstone Ring", type: "Rings", price: "Available in 18K & 22K", image: images.emerald, material: "18K or 22K Gold · Coloured stone", occasion: "Celebrations & statement wear", description: "A richly coloured statement ring where a sculptural gold setting meets a striking centre stone—modern enough for today, timeless enough to keep.", craft: "Available with selected stone and size options. Our team will explain the stone, gold purity, approximate weight and final estimate before order confirmation." },
  { id: "meher-diamond-pendant", name: "Meher Diamond Pendant", type: "Pendants", price: "Certified natural diamonds", image: images.pendant, material: "18K Gold · Certified natural diamonds", occasion: "Gifting & evening wear", description: "A refined pendant designed to catch light from every angle, bringing quiet brilliance to festive dressing and meaningful gifting.", craft: "Crafted with carefully selected natural diamonds. Diamond and product certification details are shared at the time of purchase." },
  { id: "noor-gold-bracelet", name: "Noor Gold Bracelet", type: "Bracelets", price: "Available in multiple weights", image: images.bracelet, material: "22K Gold", occasion: "Daily wear & festive gifting", description: "A graceful gold bracelet with a warm, traditional character and an easy silhouette created for comfortable, repeat wear.", craft: "Available in different weight ranges depending on current stock. Fit, clasp and care guidance are provided in store." },
  { id: "tara-daily-wear-chain", name: "Tara Daily-Wear Chain", type: "Necklaces", price: "Lightweight collection", image: images.necklace, material: "18K or 22K Gold", occasion: "Everyday elegance", description: "An effortlessly elegant chain for daily dressing—light on the neckline, versatile with pendants and thoughtfully made for regular wear.", craft: "Offered in selected lengths, patterns and weight ranges. Ask our team to compare durability and styling options." },
  { id: "aayat-heirloom-set", name: "Aayat Heirloom Set", type: "Bridal", price: "Price on request", image: images.brideRed, material: "22K Gold · Bridal setting", occasion: "Wedding day", description: "A complete statement set created for the grandeur of the wedding day, balancing heritage-inspired richness with a beautifully composed silhouette.", craft: "Consultation-led design with options for coordinated earrings and bridal accessories. Timelines depend on customisation and wedding dates." },
];

type Product = typeof products[number];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, onClick, light = false, type = "button" }: { children: React.ReactNode; onClick?: () => void; light?: boolean; type?: "button" | "submit" }) {
  return <button type={type} onClick={onClick} className={`group inline-flex items-center justify-center gap-3 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.19em] transition-all ${light ? "bg-cream text-wine hover:bg-white" : "bg-wine text-cream hover:bg-gold hover:text-wine"}`}>{children}<Icon name="arrow" size={17} /></button>;
}

function Header({ page, navigate }: { page: Page; navigate: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const navItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" }, { label: "Collections", page: "collections" },
    { label: "Bridal", page: "bridal" }, { label: "Services", page: "services" }, { label: "Our Story", page: "about" }, { label: "Visit Us", page: "contact" },
  ];
  const go = (target: Page) => { navigate(target); setOpen(false); };
  return <>
    <div className="bg-wine py-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.17em] text-cream sm:text-[10px]">Nakur’s trusted family jeweller · BIS hallmarked gold · Transparent pricing</div>
    <header className="sticky top-0 z-40 border-b border-wine/10 bg-ivory/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
        <button onClick={() => go("home")} className="min-w-fit text-center leading-none">
          <span className="block font-display text-[26px] font-semibold tracking-[0.03em] text-wine">ROHIT</span>
          <span className="mt-1 block text-[8px] font-semibold tracking-[0.42em] text-gold-dark">JEWELLERS</span>
        </button>
        <nav className="hidden items-center gap-7 lg:flex xl:gap-10">
          {navItems.map((item) => <button key={item.page} onClick={() => go(item.page)} className={`nav-link ${page === item.page ? "active" : ""}`}>{item.label}</button>)}
        </nav>
        <div className="flex items-center gap-5">
          <button aria-label="Search" onClick={() => setSearch(true)}><Icon name="search" /></button>
          <button aria-label="Shopping bag" className="hidden sm:block"><Icon name="bag" /></button>
        </div>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-50 overflow-y-auto bg-wine px-7 py-7 text-cream lg:hidden">
      <div className="flex items-center justify-between border-b border-cream/20 pb-6"><span className="font-display text-2xl">Rohit Jewellers</span><button onClick={() => setOpen(false)} aria-label="Close menu"><Icon name="close" /></button></div>
      <nav className="mt-10 flex flex-col items-start gap-7">{navItems.map((item, i) => <button key={item.page} onClick={() => go(item.page)} className="font-display text-4xl"><span className="mr-4 font-sans text-[10px] text-gold">0{i + 1}</span>{item.label}</button>)}</nav>
    </div>}
    {search && <div className="fixed inset-0 z-50 flex items-start justify-center bg-wine/95 px-5 pt-[18vh] text-cream">
      <button onClick={() => setSearch(false)} className="absolute right-7 top-7" aria-label="Close search"><Icon name="close" size={28} /></button>
      <div className="w-full max-w-3xl"><p className="mb-6 text-center text-[10px] uppercase tracking-[0.28em] text-gold">Find your forever piece</p><div className="flex border-b border-cream/50"><input autoFocus className="w-full bg-transparent py-5 font-display text-3xl outline-none placeholder:text-cream/40 md:text-5xl" placeholder="Search collections..." /><Icon name="search" size={28} /></div></div>
    </div>}
  </>;
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return <footer className="bg-wine text-cream">
    <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-10 md:py-20">
      <div><p className="font-display text-4xl">ROHIT</p><p className="mt-1 text-[9px] tracking-[0.4em] text-gold">JEWELLERS</p><p className="mt-6 max-w-xs text-sm leading-7 text-cream/65">Nakur’s family jeweller for gold, silver, diamond and bridal jewellery—serving generations with purity and personal care.</p></div>
      <div><p className="footer-title">Explore</p>{(["collections", "bridal", "services", "about"] as Page[]).map(p => <button key={p} onClick={() => navigate(p)} className="footer-link capitalize">{p === "about" ? "Our story" : p}</button>)}</div>
      <div><p className="footer-title">Client Care</p><button onClick={() => navigate("contact")} className="footer-link">Book an appointment</button><span className="footer-link">Gold exchange</span><span className="footer-link">Repairs & resizing</span><span className="footer-link">Custom orders</span></div>
      <div><p className="footer-title">The Rohit Journal</p><p className="mb-5 text-sm leading-6 text-cream/60">Private previews, new collections and stories from our atelier.</p><div className="flex border-b border-cream/40 pb-3"><input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cream/45" placeholder="Your email address" /><Icon name="arrow" size={18} /></div></div>
    </div>
    <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-cream/10 px-6 py-6 text-[10px] uppercase tracking-[0.15em] text-cream/45 md:flex-row md:justify-between md:px-10"><span>© 2025 Rohit Jewellers, Nakur. All rights reserved.</span><span>Saharanpur, Uttar Pradesh · BIS Hallmarked</span></div>
  </footer>;
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14"><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2>{text && <p className="mt-5 text-sm leading-7 text-ink/60 md:text-base">{text}</p>}</div>;
}

function ProductCard({ product, onDetails, onEnquire }: { product: Product; onDetails: (product: Product) => void; onEnquire: () => void }) {
  const [liked, setLiked] = useState(false);
  return <article className="product-card group">
    <div className="product-image relative aspect-[4/5] overflow-hidden bg-sand"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /><div className="product-sheen" /><button onClick={() => setLiked(!liked)} aria-label="Add to favourites" className={`favourite-button absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 transition ${liked ? "fill-wine text-wine" : "text-wine"}`}><Icon name="heart" size={18} /></button><div className="product-actions absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2"><button onClick={() => onDetails(product)} className="bg-cream px-3 py-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-wine">View details</button><button onClick={onEnquire} className="bg-wine px-3 py-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-cream">Enquire now</button></div></div>
    <div className="pt-5"><p className="text-[10px] uppercase tracking-[0.18em] text-gold-dark">{product.type}</p><h3 className="mt-2 font-display text-2xl text-wine transition-colors group-hover:text-gold-dark">{product.name}</h3><p className="mt-1 text-sm text-ink/60">{product.price}</p><button onClick={() => onDetails(product)} className="detail-link mt-5 inline-flex items-center gap-3 border-b border-wine/25 pb-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-wine">Discover this piece <Icon name="arrow" size={15} /></button></div>
  </article>;
}

function Home({ navigate, onDetails }: { navigate: (page: Page) => void; onDetails: (product: Product) => void }) {
  return <>
    <section className="home-hero overflow-hidden bg-wine">
      <div className="grid lg:min-h-[720px] lg:grid-cols-[0.43fr_0.57fr]">
        <div className="order-2 flex items-center px-7 py-16 text-cream md:px-12 md:py-20 lg:order-1 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
          <div className="mb-7 flex items-center gap-4"><span className="h-px w-11 bg-gold" /><p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">The Rohit Bridal Edit · Nakur</p></div>
          <h1 className="font-display text-6xl leading-[0.9] md:text-7xl xl:text-[86px]">Jewels for<br /><em className="font-light text-gold">your forever.</em></h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-cream/72">A considered bridal collection of gold, polki-inspired and diamond jewellery—personally curated for every ceremony, outfit and family budget.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Button light onClick={() => navigate("bridal")}>Enter the bridal edit</Button><button onClick={() => navigate("contact")} className="border border-cream/35 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-gold hover:bg-gold hover:text-wine">Plan a family visit</button></div>
          <div className="mt-11 grid max-w-md grid-cols-3 border-t border-cream/15 pt-5"><div><strong className="font-display text-xl font-medium text-gold">Bridal</strong><span className="mt-1 block text-[7px] uppercase tracking-[0.16em] text-cream/45">Consultations</span></div><div className="border-l border-cream/15 pl-5"><strong className="font-display text-xl font-medium text-gold">Custom</strong><span className="mt-1 block text-[7px] uppercase tracking-[0.16em] text-cream/45">Order support</span></div><div className="border-l border-cream/15 pl-5"><strong className="font-display text-xl font-medium text-gold">Local</strong><span className="mt-1 block text-[7px] uppercase tracking-[0.16em] text-cream/45">After-sales care</span></div></div>
          </div>
        </div>
        <div className="order-1 relative min-h-[510px] overflow-hidden bg-blush lg:order-2 lg:min-h-[720px]">
          <img src={images.bridalCampaign} alt="Indian bride wearing traditional gold wedding jewellery" className="hero-main-image absolute inset-0 h-full w-full object-cover object-[center_26%]" />
          <div className="absolute bottom-6 right-6 bg-cream px-5 py-4 text-wine shadow-[0_15px_40px_rgba(66,16,28,0.16)] md:bottom-8 md:right-8"><p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gold-dark">The Bridal Edit</p><p className="mt-1 font-display text-xl">For every beautiful beginning</p></div>
        </div>
      </div>
    </section>

    <section className="border-b border-wine/10 bg-cream">
      <div className="mx-auto grid max-w-[1380px] grid-cols-2 px-6 py-9 md:grid-cols-4 md:px-10 md:py-12">{[{n:"100%",t:"BIS Hallmarked Gold"},{n:"18K & 22K",t:"Gold Choices"},{n:"Certified",t:"Diamond Jewellery"},{n:"Local",t:"After-Sales Care"}].map((item, i) => <div key={item.t} className={`px-3 py-4 text-center ${i > 0 ? "border-l border-wine/10" : ""}`}><strong className="block font-display text-2xl font-medium text-wine md:text-3xl">{item.n}</strong><span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/50 md:text-[9px]">{item.t}</span></div>)}</div>
    </section>

    <section className="bg-ivory px-6 py-20 md:px-10 md:py-28"><SectionHead eyebrow="For every family, for every occasion" title="Jewellery for every chapter" text="From a child’s first silver keepsake and everyday gold to the complete bridal trousseau, discover designs for every budget, generation and celebration." />
      <div className="mx-auto grid max-w-[1380px] gap-5 md:grid-cols-3">
        {[{ title: "Bridal Heirlooms", image: images.brideRed, page: "bridal" as Page }, { title: "Everyday Elegance", image: images.rings, page: "collections" as Page }, { title: "Gold & Silver", image: images.necklace, page: "collections" as Page }].map((item, i) => <button key={item.title} onClick={() => navigate(item.page)} className={`image-tile group relative overflow-hidden text-left ${i === 1 ? "md:mt-10" : ""}`}><img src={item.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-cream"><span className="text-[9px] uppercase tracking-[0.22em] text-gold">0{i + 1} / Collection</span><h3 className="mt-2 font-display text-3xl">{item.title}</h3><span className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] opacity-80">Explore <Icon name="arrow" size={15} /></span></div></button>)}
      </div>
    </section>

    <section className="bg-blush px-6 py-20 md:px-10 md:py-28"><SectionHead eyebrow="Curated for you" title="Objects of desire" />
      <div className="mx-auto grid max-w-[1380px] gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{products.slice(1, 5).map(product => <ProductCard key={product.name} product={product} onDetails={onDetails} onEnquire={() => navigate("contact")} />)}</div>
      <div className="mt-14 text-center"><Button onClick={() => navigate("collections")}>View all creations</Button></div>
    </section>

    <section className="bg-ivory px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1380px]"><SectionHead eyebrow="More than a jewellery store" title="Care that stays with you" text="Jewellery is personal. That is why every purchase at Rohit Jewellers comes with clear guidance, patient service and dependable support close to home." />
        <div className="grid border border-wine/10 md:grid-cols-4">{[{n:"01",t:"Old Gold Exchange",d:"Bring your old gold for transparent evaluation and exchange against a new design."},{n:"02",t:"Custom Orders",d:"Choose your design, gold purity, weight and budget with guidance from our team."},{n:"03",t:"Repair & Resizing",d:"Local assistance for polishing, chain repair, ring sizing and jewellery care."},{n:"04",t:"Wedding Consultation",d:"A complete family appointment for bride, groom, gifting and trousseau planning."}].map((item, i) => <div key={item.t} className={`p-8 md:p-9 ${i > 0 ? "border-t border-wine/10 md:border-l md:border-t-0" : ""}`}><span className="font-display text-3xl text-gold">{item.n}</span><h3 className="mt-8 font-display text-2xl text-wine">{item.t}</h3><p className="mt-4 text-sm leading-7 text-ink/55">{item.d}</p></div>)}</div>
        <div className="mt-10 text-center"><Button onClick={() => navigate("services")}>Explore all services</Button></div>
      </div>
    </section>

    <section className="bg-ivory px-6 py-16 md:px-10 md:py-20">
      <div className="story-card mx-auto grid max-w-[1260px] overflow-hidden bg-wine shadow-[0_24px_70px_rgba(66,16,28,0.13)] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="story-image relative h-[380px] overflow-hidden sm:h-[440px] lg:h-[500px]">
          <img src={images.heritage} alt="Traditional gold necklace displayed in an elegant jewellery box" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-wine/35 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 border border-cream/30 bg-wine/75 px-5 py-4 text-cream backdrop-blur-md md:bottom-7 md:left-7">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gold">Jewellery with meaning</p>
            <p className="mt-1 font-display text-xl">Chosen for generations</p>
          </div>
        </div>
        <div className="flex items-center px-8 py-12 text-cream md:px-12 lg:px-16">
          <div><p className="eyebrow text-gold">Rooted in Nakur</p><h2 className="font-display text-5xl leading-[0.98] md:text-6xl">A local name,<br /><em className="font-light text-gold">a lasting bond.</em></h2><p className="mt-6 max-w-lg text-sm leading-7 text-cream/65">In Nakur, jewellery is more than an ornament—it is a blessing, an investment and a memory carried across generations. We offer genuine guidance, transparent pricing and respect for every budget.</p><div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-cream/15 pt-5 text-[8px] font-semibold uppercase tracking-[0.16em] text-cream/50"><span>BIS hallmarked</span><span>Personal guidance</span><span>Local care</span></div><button onClick={() => navigate("about")} className="detail-link mt-7 flex items-center gap-3 border-b border-gold pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Discover our story <Icon name="arrow" size={16} /></button></div>
        </div>
      </div>
    </section>

    <section className="bg-blush px-6 py-20 md:px-10 md:py-28"><SectionHead eyebrow="Words from our community" title="Trusted for life’s special moments" /><div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-3">{[{q:"The team explained the weight, purity and making charges clearly. We felt comfortable throughout our daughter’s wedding shopping.",n:"A bridal family, Nakur"},{q:"Beautiful designs without needing to travel to a big city. The after-sales support and personal attention make all the difference.",n:"A family customer, Saharanpur district"},{q:"They patiently helped us select lightweight pieces within our budget. The entire experience felt respectful and genuine.",n:"A customer from the Nakur area"}].map(item => <blockquote key={item.n} className="bg-ivory p-8 md:p-10"><span className="font-display text-5xl leading-none text-gold">“</span><p className="mt-3 font-display text-2xl leading-9 text-wine">{item.q}</p><footer className="mt-7 text-[9px] font-semibold uppercase tracking-[0.17em] text-ink/45">{item.n}</footer></blockquote>)}</div></section>
  </>;
}

function Collections({ navigate, onDetails }: { navigate: (page: Page) => void; onDetails: (product: Product) => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Necklaces", "Rings", "Pendants", "Bracelets", "Bridal"];
  const visible = filter === "All" ? products : products.filter(p => p.type === filter);
  return <main className="bg-ivory">
    <div className="border-b border-wine/10 px-6 py-16 text-center md:py-24"><p className="eyebrow">Gold · Silver · Diamond · Bridal</p><h1 className="page-title">Our Collections</h1><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink/60">From lightweight daily wear to complete wedding sets, explore jewellery selected for Nakur’s traditions, modern tastes and different budgets. Visit the store to see current designs and receive the day’s gold rate.</p></div>
    <div className="sticky top-20 z-20 overflow-x-auto border-b border-wine/10 bg-ivory/95 px-5"><div className="mx-auto flex w-max max-w-full justify-center gap-7 py-5 md:gap-12">{filters.map(item => <button key={item} onClick={() => setFilter(item)} className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${filter === item ? "text-wine underline decoration-gold decoration-2 underline-offset-8" : "text-ink/45"}`}>{item}</button>)}</div></div>
    <section className="mx-auto grid max-w-[1380px] gap-x-6 gap-y-14 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3 md:px-10 md:py-24">{visible.map(product => <ProductCard key={product.name} product={product} onDetails={onDetails} onEnquire={() => navigate("contact")} />)}</section>
    <div className="bg-blush px-6 py-20 text-center"><p className="eyebrow">Your choice, your budget</p><h2 className="section-title">Create something entirely yours</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ink/60">Bring a reference, choose from our catalogue, or adapt an existing design. Our team will guide you on purity, approximate weight, making and delivery time before confirming your order.</p><div className="mt-8"><Button>Discuss a custom order</Button></div></div>
  </main>;
}

function Bridal({ navigate }: { navigate: (page: Page) => void }) {
  return <main>
    <section className="border-b border-wine/10 bg-ivory px-6 py-20 text-center md:px-10 md:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">The Nakur bridal destination</p>
        <h1 className="page-title">Your forever,<br /><em className="font-light">beautifully begun.</em></h1>
        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-ink/55 md:text-base">Complete bridal jewellery for every ceremony—thoughtfully selected around your outfits, traditions, wedding dates and family budget.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3"><Button onClick={() => navigate("contact")}>Plan a bridal visit</Button><button onClick={() => document.getElementById("bridal-story")?.scrollIntoView({ behavior: "smooth" })} className="border border-wine/20 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-wine transition hover:border-gold hover:bg-blush">Explore the collection</button></div>
        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-wine/10 pt-6 text-[8px] font-semibold uppercase tracking-[0.17em] text-ink/40 md:gap-x-10"><span>Family consultations</span><span className="hidden h-1 w-1 rounded-full bg-gold md:block" /><span>Custom orders</span><span className="hidden h-1 w-1 rounded-full bg-gold md:block" /><span>Multiple budgets</span></div>
      </div>
    </section>
    <section id="bridal-story" className="bg-ivory px-6 py-20 md:px-10 md:py-28"><div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-20"><div className="order-2 md:order-1"><p className="eyebrow">The Rohit bride</p><h2 className="section-title">Your wedding, beautifully planned</h2><p className="mt-6 text-sm leading-7 text-ink/60">Shop comfortably with your family in Nakur. We help coordinate the bride’s necklace, earrings, maang tikka, bangles, rings and gifting pieces while keeping your preferred budget and wedding dates in mind.</p><ul className="mt-6 space-y-3 text-sm text-ink/60"><li>— Traditional gold, kundan-inspired and diamond designs</li><li>— Lightweight to statement options</li><li>— Bride, groom and family gifting</li><li>— Order planning and fitting support</li></ul><div className="mt-8"><Button onClick={() => navigate("contact")}>Book a family appointment</Button></div></div><div className="order-1 aspect-[4/5] overflow-hidden md:order-2"><img src={images.bridePink} alt="Bride in handcrafted jewellery" className="h-full w-full object-cover" /></div></div></section>
    <section className="bg-blush px-6 py-20 md:px-10 md:py-28"><SectionHead eyebrow="A jewel for every ritual" title="The bridal trousseau" /><div className="mx-auto grid max-w-[1380px] gap-5 md:grid-cols-3">{["The Wedding Day", "The Mehendi", "The Reception"].map((title, i) => <div key={title} className="group relative aspect-[4/5] overflow-hidden"><img src={[images.brideRed, images.bracelet, images.rings][i]} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-wine/75 to-transparent" /><div className="absolute bottom-0 p-7 text-cream"><p className="text-[9px] uppercase tracking-[0.2em] text-gold">Chapter 0{i + 1}</p><h3 className="mt-2 font-display text-3xl">{title}</h3></div></div>)}</div></section>
  </main>;
}

function Services({ navigate }: { navigate: (page: Page) => void }) {
  const services = [
    { number: "01", title: "Old Gold Exchange", text: "Give unworn jewellery a new life. We assess your old gold in front of you, explain the evaluation clearly and help you exchange its value toward a new piece.", note: "Identity and purchase documentation may be required." },
    { number: "02", title: "Custom Jewellery", text: "Share a reference or choose an in-store design. We help define gold purity, approximate weight, stone choice, budget and expected delivery before the order begins.", note: "Ideal for wedding sets, name pendants and family designs." },
    { number: "03", title: "Repairs & Resizing", text: "Visit us for ring sizing, chain and clasp repair, stone checks, polishing and general care. Our team will inspect the piece and explain the work before proceeding.", note: "Service availability depends on design and condition." },
    { number: "04", title: "Bridal Planning", text: "A relaxed family consultation to plan jewellery for the bride, groom and close family. We can help organise purchases by ceremony, outfit and budget.", note: "Advance appointments are recommended during wedding season." },
    { number: "05", title: "Gold & Silver Gifting", text: "Mark weddings, anniversaries, births, festivals and housewarmings with thoughtful coins, silver articles and jewellery gifting options.", note: "Ask in store about current availability and gift packing." },
    { number: "06", title: "Jewellery Care", text: "Receive practical advice on storage, cleaning and regular checks so your jewellery remains secure and beautiful through years of wear.", note: "Bring your Rohit Jewellers purchase for an in-store inspection." },
  ];
  return <main className="bg-ivory">
    <section className="overflow-hidden bg-wine text-cream">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative flex min-h-[560px] items-center px-7 py-20 md:px-14 lg:px-20 xl:px-28">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,#d5ad69_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative max-w-2xl">
            <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold"><span className="h-px w-10 bg-gold" />Before and after every purchase</p>
            <h1 className="font-display text-6xl leading-[0.92] text-cream md:text-8xl xl:text-[96px]">Service that feels<br /><em className="font-light text-gold">personal.</em></h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-cream/70 md:text-base">Expert guidance, transparent conversations and dependable support—available right here at our Nakur store, whenever your jewellery needs attention.</p>
            <div className="mt-9"><Button light onClick={() => navigate("contact")}>Speak with our team</Button></div>
          </div>
        </div>
        <div className="relative min-h-[480px] lg:min-h-[560px]">
          <img src={images.rings} alt="Fine jewellery consultation at Rohit Jewellers" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-wine/45 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 divide-x divide-cream/15 border border-cream/20 bg-wine/85 py-5 text-center backdrop-blur-md md:inset-x-8 md:bottom-8">
            <div className="px-2"><strong className="block font-display text-2xl text-gold md:text-3xl">Local</strong><span className="mt-1 block text-[7px] uppercase tracking-[0.14em] text-cream/60 md:text-[8px]">After-sales care</span></div>
            <div className="px-2"><strong className="block font-display text-2xl text-gold md:text-3xl">Clear</strong><span className="mt-1 block text-[7px] uppercase tracking-[0.14em] text-cream/60 md:text-[8px]">Cost guidance</span></div>
            <div className="px-2"><strong className="block font-display text-2xl text-gold md:text-3xl">Family</strong><span className="mt-1 block text-[7px] uppercase tracking-[0.14em] text-cream/60 md:text-[8px]">Consultations</span></div>
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-24"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Complete jewellery care</p><h2 className="section-title max-w-2xl">Everything you need,<br />under one roof</h2></div><p className="max-w-md text-sm leading-7 text-ink/55">From giving old jewellery a new life to planning a complete bridal trousseau, our team helps you make every decision with confidence.</p></div><div className="grid gap-px overflow-hidden border border-wine/10 bg-wine/10 md:grid-cols-2">{services.map(item => <article key={item.number} className="group bg-ivory p-8 transition hover:bg-blush md:p-10"><div className="flex items-start justify-between"><span className="font-display text-4xl text-gold">{item.number}</span><span className="grid h-10 w-10 place-items-center rounded-full border border-wine/15 text-wine transition group-hover:border-gold group-hover:bg-gold"><Icon name="arrow" size={17} /></span></div><h3 className="mt-7 font-display text-3xl text-wine md:text-4xl">{item.title}</h3><p className="mt-4 text-sm leading-7 text-ink/60">{item.text}</p><p className="mt-5 border-l-2 border-gold pl-4 text-xs leading-6 text-ink/45">{item.note}</p></article>)}</div></section>
    <section className="bg-blush px-6 py-20 md:px-10"><div className="mx-auto grid max-w-[1100px] items-center gap-10 md:grid-cols-[1.4fr_0.6fr]"><div><p className="eyebrow">Need personal guidance?</p><h2 className="section-title">Speak with our Nakur team</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-ink/60">Tell us what you are looking for, your occasion and your comfortable budget. We will help you prepare for a productive store visit without pressure.</p></div><div className="md:text-right"><Button onClick={() => navigate("contact")}>Plan your visit</Button></div></div></section>
  </main>;
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  return <main className="bg-ivory">
    <section className="px-6 py-20 text-center md:py-28"><p className="eyebrow">A jeweller close to home</p><h1 className="page-title mx-auto max-w-4xl">Rooted in Nakur.<br /><em className="font-light">Made for generations.</em></h1><p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-ink/60">Rohit Jewellers is a local jewellery destination serving Nakur and nearby communities across Saharanpur district, Uttar Pradesh.</p></section>
    <section className="mx-auto grid max-w-[1440px] md:grid-cols-2"><img src={images.collection} alt="Fine jewellery at Rohit Jewellers" className="h-full min-h-[520px] w-full object-cover" /><div className="flex items-center bg-wine px-8 py-20 text-cream md:px-16 lg:px-24"><div><p className="eyebrow text-gold">What we believe</p><h2 className="font-display text-5xl">Built on trust.<br />Defined by care.</h2><p className="mt-7 text-sm leading-8 text-cream/65">In a close-knit town, reputation is earned one family at a time. We believe customers deserve to understand what they are buying—from purity and weight to stones and making charges—without hurried decisions or confusing language.</p><p className="mt-5 text-sm leading-8 text-cream/65">Our aim is to bring the choice and presentation of a premium jewellery showroom together with the familiar service of a local family business. Whether your purchase is small or significant, you receive the same attention and respect.</p></div></div></section>
    <section className="px-6 py-20 md:px-10 md:py-28"><SectionHead eyebrow="The Rohit promise" title="Confidence in every purchase" /><div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-3">{[{n:"01",t:"Purity explained",d:"BIS hallmarking, gold purity, weight and product details are explained before you purchase."},{n:"02",t:"Transparent guidance",d:"We help you understand the day’s rate, making and available choices for your budget."},{n:"03",t:"Local support",d:"For care, repair or a simple question, our team is available right here in Nakur."}].map(x => <div key={x.n} className="border-t border-gold pt-6"><span className="text-[10px] tracking-[0.2em] text-gold-dark">{x.n}</span><h3 className="mt-7 font-display text-3xl text-wine">{x.t}</h3><p className="mt-4 text-sm leading-7 text-ink/60">{x.d}</p></div>)}</div></section>
    <section className="bg-blush px-6 py-20 text-center md:py-24"><h2 className="section-title">Come, be part of our story</h2><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-ink/60">We would be honoured to help you mark your next beautiful chapter.</p><div className="mt-8"><Button onClick={() => navigate("contact")}>Visit our boutique</Button></div></section>
  </main>;
}

function ProductDetail({ product, navigate, onDetails }: { product: Product; navigate: (page: Page) => void; onDetails: (product: Product) => void }) {
  const [purity, setPurity] = useState(product.material.includes("18K") ? "18K Gold" : "22K Gold");
  const related = products.filter(item => item.id !== product.id).slice(0, 3);
  return <main className="bg-ivory">
    <div className="mx-auto max-w-[1440px] px-6 py-6 md:px-10"><button onClick={() => navigate("collections")} className="detail-link inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-ink/55"><span className="rotate-180"><Icon name="arrow" size={15} /></span>Back to collections</button></div>
    <section className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-20 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-28">
      <div className="grid gap-4 sm:grid-cols-[88px_1fr]">
        <div className="order-2 flex gap-3 sm:order-1 sm:flex-col"><button className="aspect-square w-20 overflow-hidden border-2 border-gold sm:w-full"><img src={product.image} alt="" className="h-full w-full object-cover" /></button><button className="aspect-square w-20 overflow-hidden border border-wine/10 bg-blush sm:w-full"><img src={images.collection} alt="" className="h-full w-full object-cover opacity-70" /></button></div>
        <div className="order-1 product-detail-image relative aspect-[4/5] overflow-hidden bg-sand sm:order-2"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /><div className="absolute bottom-5 left-5 bg-ivory/90 px-4 py-3 backdrop-blur-md"><span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-wine">Hover to explore details</span></div></div>
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">{product.type} · Rohit Jewellers Nakur</p>
        <h1 className="font-display text-5xl leading-[0.95] text-wine md:text-7xl">{product.name}</h1>
        <p className="mt-5 text-sm font-medium uppercase tracking-[0.12em] text-gold-dark">{product.price}</p>
        <p className="mt-7 max-w-xl text-sm leading-8 text-ink/60">{product.description}</p>
        <div className="mt-9 border-y border-wine/10 py-7">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-wine">Preferred gold purity</p>
          <div className="mt-4 flex gap-3">{["18K Gold", "22K Gold"].map(option => <button key={option} onClick={() => setPurity(option)} className={`border px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] transition-all ${purity === option ? "border-wine bg-wine text-cream" : "border-wine/15 text-ink/55 hover:border-gold"}`}>{option}</button>)}</div>
          <p className="mt-4 text-xs leading-5 text-ink/40">Availability depends on the design. Our team will recommend the most suitable purity for setting, durability and budget.</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-b border-wine/10 py-7">
          <div><dt className="text-[8px] font-semibold uppercase tracking-[0.17em] text-ink/40">Material</dt><dd className="mt-2 text-sm leading-6 text-wine">{product.material}</dd></div>
          <div><dt className="text-[8px] font-semibold uppercase tracking-[0.17em] text-ink/40">Best for</dt><dd className="mt-2 text-sm leading-6 text-wine">{product.occasion}</dd></div>
          <div><dt className="text-[8px] font-semibold uppercase tracking-[0.17em] text-ink/40">Assurance</dt><dd className="mt-2 text-sm leading-6 text-wine">Applicable BIS hallmarking</dd></div>
          <div><dt className="text-[8px] font-semibold uppercase tracking-[0.17em] text-ink/40">Availability</dt><dd className="mt-2 text-sm leading-6 text-wine">Confirm at Nakur store</dd></div>
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={() => navigate("contact")}>Enquire about this piece</Button><button className="inline-flex items-center justify-center gap-3 border border-wine/20 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-wine transition hover:border-gold hover:bg-blush"><Icon name="heart" size={17} />Save to favourites</button></div>
        <div className="mt-8 flex items-start gap-3 bg-blush p-5"><span className="mt-1 text-gold"><Icon name="pin" size={18} /></span><p className="text-xs leading-6 text-ink/55"><strong className="block text-wine">See it in person</strong>Visit Rohit Jewellers in Nakur, Saharanpur district. We recommend confirming availability before travelling.</p></div>
      </div>
    </section>
    <section className="bg-wine px-6 py-20 text-cream md:px-10 md:py-28"><div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20"><div><p className="eyebrow text-gold">The making</p><h2 className="font-display text-5xl leading-none md:text-6xl">Crafted with<br /><em className="font-light text-gold">consideration.</em></h2></div><div><p className="text-base leading-8 text-cream/70">{product.craft}</p><div className="mt-10 grid gap-6 sm:grid-cols-3">{[{n:"01",t:"Purity first",d:"Gold details explained clearly."},{n:"02",t:"Made personal",d:"Options around fit and budget."},{n:"03",t:"Local care",d:"Support available in Nakur."}].map(item => <div key={item.n} className="border-t border-gold/50 pt-5"><span className="font-display text-2xl text-gold">{item.n}</span><h3 className="mt-4 font-display text-2xl">{item.t}</h3><p className="mt-2 text-xs leading-6 text-cream/50">{item.d}</p></div>)}</div></div></div></section>
    <section className="bg-blush px-6 py-20 md:px-10 md:py-28"><SectionHead eyebrow="Continue exploring" title="You may also love" /><div className="mx-auto grid max-w-[1180px] gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map(item => <ProductCard key={item.id} product={item} onDetails={onDetails} onEnquire={() => navigate("contact")} />)}</div></section>
  </main>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <main className="bg-ivory">
    <section className="px-6 py-16 text-center md:py-24"><p className="eyebrow">Your local jewellery destination</p><h1 className="page-title">Visit Rohit Jewellers</h1><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink/60">Visit us in Nakur to view our latest gold, silver, diamond and bridal collections. Come with your family, ask questions freely and take your time choosing.</p></section>
    <section className="mx-auto grid max-w-[1320px] px-6 pb-24 md:grid-cols-[0.85fr_1.15fr] md:px-10">
      <div className="bg-wine px-8 py-14 text-cream md:px-12"><p className="eyebrow text-gold">Rohit Jewellers, Nakur</p><h2 className="font-display text-4xl">We look forward<br />to welcoming you.</h2><div className="mt-10 space-y-8"><div className="flex gap-4"><Icon name="pin" /><p className="text-sm leading-6 text-cream/70">Nakur<br />District Saharanpur<br />Uttar Pradesh, India</p></div><div className="flex gap-4"><Icon name="phone" /><p className="text-sm leading-6 text-cream/70">For directions and store contact,<br />send an enquiry using this form.</p></div></div><div className="mt-12 border-t border-cream/20 pt-8"><p className="text-[10px] uppercase tracking-[0.2em] text-gold">Before you visit</p><p className="mt-4 text-sm leading-7 text-cream/70">For bridal consultations, custom orders and old gold exchange, booking ahead helps us give your family dedicated time.</p></div><div className="mt-10 border border-gold/40 p-5"><p className="text-[10px] uppercase tracking-[0.18em] text-gold">Local service area</p><p className="mt-3 text-xs leading-6 text-cream/60">Welcoming customers from Nakur and neighbouring towns and villages across Saharanpur district.</p></div></div>
      <div className="bg-blush px-7 py-14 md:px-14"><p className="eyebrow">Plan your store visit</p><h2 className="font-display text-4xl text-wine">How may we assist you?</h2>{sent ? <div className="mt-10 border border-gold bg-ivory p-8"><p className="font-display text-3xl text-wine">Thank you.</p><p className="mt-3 text-sm leading-6 text-ink/60">Your request has been received. Our store team will contact you on the phone number provided.</p><button onClick={() => setSent(false)} className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-wine underline underline-offset-4">Send another request</button></div> : <form onSubmit={submit} className="mt-9 grid gap-6 sm:grid-cols-2"><label className="field">Full name<input required placeholder="Your name" /></label><label className="field">Phone / WhatsApp<input required placeholder="+91" /></label><label className="field">Your town or village<input required placeholder="Nakur" /></label><label className="field">I’m interested in<select defaultValue=""><option value="" disabled>Select a service</option><option>Bridal jewellery</option><option>Gold jewellery</option><option>Silver jewellery & articles</option><option>Diamond jewellery</option><option>Old gold exchange</option><option>Custom order or repair</option></select></label><label className="field sm:col-span-2">Preferred visit date<input type="date" required /></label><label className="field sm:col-span-2">Tell us what you need<textarea rows={4} placeholder="Occasion, jewellery type, preferred budget or any questions..." /></label><div className="sm:col-span-2"><Button type="submit">Request a store visit</Button><p className="mt-4 text-xs leading-5 text-ink/40">Submitting this form does not confirm a purchase or appointment. Our team will call to coordinate.</p></div></form>}</div>
    </section>
    <section className="bg-blush px-6 py-20 md:px-10"><SectionHead eyebrow="Helpful answers" title="Before you come in" /><div className="mx-auto grid max-w-[1100px] gap-x-12 gap-y-8 md:grid-cols-2">{[{q:"Do I need an appointment?",a:"Walk-ins are welcome. An appointment is useful for bridal shopping, custom orders or a detailed old gold evaluation."},{q:"Can I shop within a fixed budget?",a:"Yes. Tell us your preferred range and we will show suitable designs, weights and purity options without pressure."},{q:"Do you offer hallmarked jewellery?",a:"Our gold jewellery is sold with applicable BIS hallmarking and product details. Please ask our team to explain the marks on your piece."},{q:"Can my family shop together?",a:"Absolutely. We encourage family visits, especially for wedding shopping, so everyone can view and compare comfortably."}].map(item => <article key={item.q} className="border-t border-gold pt-6"><h3 className="font-display text-2xl text-wine">{item.q}</h3><p className="mt-3 text-sm leading-7 text-ink/55">{item.a}</p></article>)}</div></section>
  </main>;
}

export default function App() {
  const getPage = (): Page => {
    const hash = window.location.hash.replace("#/", "");
    if (hash.startsWith("product/")) return "product";
    const value = hash as Page;
    return ["home", "collections", "bridal", "services", "about", "contact"].includes(value) ? value : "home";
  };
  const [page, setPage] = useState<Page>(getPage);
  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    const id = window.location.hash.replace("#/product/", "");
    return products.find(product => product.id === id) ?? products[0];
  });
  const navigate = (next: Page) => { window.location.hash = `/${next}`; setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const viewProduct = (product: Product) => { setSelectedProduct(product); window.location.hash = `/product/${product.id}`; setPage("product"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  useEffect(() => {
    const handler = () => {
      const nextPage = getPage();
      if (nextPage === "product") {
        const id = window.location.hash.replace("#/product/", "");
        const match = products.find(product => product.id === id);
        if (match) setSelectedProduct(match);
      }
      setPage(nextPage);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>("main > section, main article, main .image-tile");
      elements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      });
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px" });
      elements.forEach(element => observer.observe(element));
    }, 30);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [page, selectedProduct.id]);
  return <div className="min-h-screen bg-ivory text-ink"><Header page={page} navigate={navigate} /><div key={`${page}-${selectedProduct.id}`} className="page-transition">{page === "home" && <Home navigate={navigate} onDetails={viewProduct} />}{page === "collections" && <Collections navigate={navigate} onDetails={viewProduct} />}{page === "bridal" && <Bridal navigate={navigate} />}{page === "services" && <Services navigate={navigate} />}{page === "about" && <About navigate={navigate} />}{page === "product" && <ProductDetail product={selectedProduct} navigate={navigate} onDetails={viewProduct} />}{page === "contact" && <Contact />}</div><Footer navigate={navigate} /></div>;
}
