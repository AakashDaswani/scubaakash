/* =============================================================
   SITE ENGINE
   Takes the information from data.js and draws it on the page.
   You should not need to change anything in here.
   ============================================================= */

/* ---------- Line icons (drawn in code, so there is nothing to download) ---------- */
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M16.4 16.4 21 21"/>',
  menu:   '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close:  '<path d="M5 5l14 14M19 5 5 19"/>',
  phone:  '<path d="M5 3h4l2 5-2.5 1.6a12.5 12.5 0 0 0 5.9 5.9L16 13l5 2v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3z"/>',
  mail:   '<rect x="3" y="5" width="18" height="14"/><path d="m3 7 9 6 9-6"/>',
  pin:    '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  chat:   '<path d="M4 5h16v11H9.5L4 20V5z"/>',
  truck:  '<path d="M2 6h12v10H2zM14 9h4.2L21 12v4h-7"/><circle cx="6.5" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>',
  shield: '<path d="M12 3l8 3v5.2c0 4.9-3.4 8.6-8 9.8-4.6-1.2-8-4.9-8-9.8V6z"/>',
  label:  '<path d="M3 12.5 12.5 3H21v8.5L11.5 21z"/><circle cx="16.6" cy="7.4" r="1.3"/>',
  image:  '<rect x="3" y="5" width="18" height="14"/><path d="m3 16 5-4 4 3 3-3 6 5"/><circle cx="8.5" cy="9.5" r="1.3"/>',
  arrow:  '<path d="M4 12h15M13 6l6 6-6 6"/>'
};

function icon(name, size) {
  const d = ICONS[name] || "";
  const s = size || 24;
  return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none"
    stroke="currentColor" stroke-width="1.3" stroke-linecap="round"
    stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}

/* ---------- Small helpers ---------- */

// Turns 1249 into "$1,249"
function money(amount) {
  return SITE.currency + Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2
  });
}

// Makes text safe to drop inside an HTML attribute (handles quotes)
function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getCategory(id) { return CATEGORIES.find(c => c.id === id); }
function getProduct(id)  { return PRODUCTS.find(p => p.id === id); }

// Reads something like ?category=tvs out of the web address
function urlParam(key) {
  return new URLSearchParams(window.location.search).get(key) || "";
}

function countIn(categoryId) {
  return PRODUCTS.filter(p => p.category === categoryId).length;
}

/* ---------- Contact links ---------- */

function telHref() {
  return "tel:" + SITE.phone.replace(/[^\d+]/g, "");
}

function whatsappHref(productName) {
  if (!SITE.whatsapp) return "";
  const message = productName
    ? `Hi ${SITE.name}, I'd like to ask about: ${productName}`
    : `Hi ${SITE.name}, I have a question about your stock.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

function emailHref(productName) {
  const subject = productName ? `Enquiry: ${productName}` : "Enquiry";
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}

/* ---------- Picture areas ---------- */

// Shown while a product has no photo yet. Deliberately plain so the
// grid still reads as a proper catalogue rather than looking broken.
function placeholder(label) {
  return `<div class="ph">
    <span style="color:#cfc9c0">${icon("image", 26)}</span>
    ${label ? `<b>${esc(label)}</b>` : ""}
  </div>`;
}

function mediaHtml(product, isDetail) {
  const inner = product.image
    ? `<img src="${esc(product.image)}" alt="${esc(product.name)}" loading="lazy">`
    : placeholder(product.brand || "");

  if (isDetail) return `<div class="detail-main">${inner}</div>`;

  let tag = "";
  if (product.badge) {
    const kind = /sale|off|reduced/i.test(product.badge) ? "sale" : "";
    tag = `<span class="tag ${kind}">${esc(product.badge)}</span>`;
  }
  return `<div class="card-media">${inner}${tag}</div>`;
}

/* ---------- One product card ---------- */

// Either the real price, or "Call for price" — controlled by SITE.showPrices
function priceHtml(product) {
  if (SITE.showPrices === false) {
    return `<span class="price-ask">Call for price</span>`;
  }
  return product.oldPrice
    ? `<span class="price reduced">${money(product.price)}</span><span class="was">${money(product.oldPrice)}</span>`
    : `<span class="price">${money(product.price)}</span>`;
}

function cardHtml(product) {
  const priceBlock = priceHtml(product);

  return `
    <a class="card" href="product.html?id=${encodeURIComponent(product.id)}">
      ${mediaHtml(product, false)}
      <div class="card-body">
        ${product.brand ? `<span class="card-brand">${esc(product.brand)}</span>` : ""}
        <h3 class="card-title">${esc(product.name)}</h3>
        <div class="card-price">${priceBlock}</div>
      </div>
    </a>`;
}

/* ---------- Header, footer and business details ---------- */

function applySiteInfo() {
  // Any element with data-site="phone" gets SITE.phone as its text, etc.
  document.querySelectorAll("[data-site]").forEach(el => {
    const value = SITE[el.dataset.site];
    if (value) el.textContent = value;
  });

  // Any element with data-site-href="phone" becomes a clickable link
  document.querySelectorAll("[data-site-href]").forEach(el => {
    const kind = el.dataset.siteHref;
    if (kind === "phone") el.href = telHref();
    if (kind === "email") el.href = emailHref();
    if (kind === "maps")  el.href = SITE.mapsUrl;
    if (kind === "whatsapp") {
      const link = whatsappHref();
      if (link) el.href = link;
      else (el.closest("li") || el).style.display = "none";   // no number set: hide the link
    }
  });

  // Any element with data-icon="phone" gets that line icon drawn into it
  document.querySelectorAll("[data-icon]").forEach(el => {
    el.innerHTML = icon(el.dataset.icon, el.dataset.iconSize || 24);
  });

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // The small print in the footer changes with the price setting
  document.querySelectorAll("[data-price-note]").forEach(el => {
    el.textContent = SITE.showPrices === false
      ? "Call or message us for current prices"
      : "Prices are a guide only — please confirm in store";
  });

  // Department links in the top nav
  const deptNav = document.getElementById("deptNav");
  if (deptNav) {
    const current = urlParam("category");
    const onProducts = /products\.html/.test(location.pathname);
    deptNav.innerHTML =
      `<li><a href="products.html" class="${onProducts && !current ? "active" : ""}">All products</a></li>` +
      CATEGORIES.map(cat => `
        <li><a href="products.html?category=${encodeURIComponent(cat.id)}"
               class="${current === cat.id ? "active" : ""}">${esc(cat.name)}</a></li>`).join("") +
      `<li><a href="contact.html" class="${/contact\.html/.test(location.pathname) ? "active" : ""}">Visit us</a></li>`;
  }

  // Department list in the footer
  const footerCats = document.getElementById("footerCats");
  if (footerCats) {
    footerCats.innerHTML = CATEGORIES.map(cat =>
      `<li><a href="products.html?category=${encodeURIComponent(cat.id)}">${esc(cat.name)}</a></li>`
    ).join("");
  }

  document.title = document.title.replace("{{store}}", SITE.name);
}

/* ---------- Menu button and search drawer ---------- */

function setupChrome() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".dept-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const searchToggle = document.querySelector(".search-toggle");
  const drawer = document.querySelector(".search-drawer");
  if (searchToggle && drawer) {
    searchToggle.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      searchToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) drawer.querySelector("input").focus();
    });
  }
}

/* =============================================================
   HOME PAGE
   ============================================================= */

function renderHome() {
  // --- hero banner ---
  const hero = document.getElementById("hero");
  if (hero && SITE.heroImage) {
    hero.classList.add("has-image");
    hero.style.backgroundImage = `url("${SITE.heroImage}")`;
  }

  // --- service bar ---
  const services = document.getElementById("serviceBar");
  if (services) {
    services.innerHTML = SITE.services.map(s => `
      <li>${icon(s.icon, 22)}
        <div><b>${esc(s.title)}</b><span>${esc(s.text)}</span></div>
      </li>`).join("");
  }

  // --- department tiles ---
  const catGrid = document.getElementById("categoryGrid");
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(cat => {
      const media = cat.image
        ? `<div class="cat-media" style="background-image:url('${esc(cat.image)}')"></div>`
        : `<div class="cat-media">${placeholder("")}</div>`;
      return `
        <a class="cat-tile" href="products.html?category=${encodeURIComponent(cat.id)}">
          ${media}
          <div class="cat-caption">
            <b>${esc(cat.name)}</b>
            <span>${countIn(cat.id)} item${countIn(cat.id) === 1 ? "" : "s"}</span>
          </div>
        </a>`;
    }).join("") +
    // a final tile so the grid always ends on a full row
    `<a class="cat-tile" href="products.html">
       <div class="cat-media all"><span>View<br>everything</span></div>
       <div class="cat-caption"><b>All products</b><span>${PRODUCTS.length} items</span></div>
     </a>`;
  }

  // --- featured ---
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    let picks = PRODUCTS.filter(p => p.featured);
    if (picks.length === 0) picks = PRODUCTS.slice(0, 8);   // fallback if nothing is marked
    featuredGrid.innerHTML = picks.slice(0, 8).map(cardHtml).join("");
  }

  // --- reduced items ---
  const dealsGrid = document.getElementById("dealsGrid");
  if (dealsGrid) {
    const deals = PRODUCTS.filter(p => p.oldPrice).slice(0, 4);
    const section = document.getElementById("dealsSection");
    if (deals.length === 0 && section) section.style.display = "none";
    dealsGrid.innerHTML = deals.map(cardHtml).join("");
  }

  // --- the two editorial panels ---
  document.querySelectorAll("[data-panel-image]").forEach(el => {
    const src = el.dataset.panelImage;
    if (src) {
      el.style.backgroundImage = `url("${src}")`;
      el.classList.add("has-image");
    }
  });
}

/* =============================================================
   PRODUCTS PAGE (the big grid with filters)
   ============================================================= */

let activeCategory = "all";

function renderProductsPage() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const chips = document.getElementById("categoryChips");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const brandSelect = document.getElementById("brandSelect");

  // Start from whatever the web address asked for, e.g. ?category=tvs
  activeCategory = urlParam("category") || "all";
  if (urlParam("q") && searchInput) searchInput.value = urlParam("q");

  const heading = document.getElementById("pageTitle");
  if (heading && activeCategory !== "all" && getCategory(activeCategory)) {
    heading.textContent = getCategory(activeCategory).name;
  }

  // --- category chips ---
  const all = [{ id: "all", name: "All" }].concat(CATEGORIES);
  chips.innerHTML = all.map(cat => `
    <button class="chip ${cat.id === activeCategory ? "active" : ""}" data-cat="${esc(cat.id)}">
      ${esc(cat.name)}
    </button>`).join("");

  chips.addEventListener("click", event => {
    const button = event.target.closest(".chip");
    if (!button) return;
    activeCategory = button.dataset.cat;
    chips.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === button));
    draw();
  });

  // --- brand dropdown, built from the products themselves ---
  // With prices hidden, "sort by price" would be meaningless — drop those options
  if (SITE.showPrices === false) {
    sortSelect.querySelectorAll('option[value="low"], option[value="high"]').forEach(o => o.remove());
  }

  const brands = [...new Set(PRODUCTS.map(p => p.brand).filter(Boolean))].sort();
  brandSelect.innerHTML = `<option value="all">All</option>` +
    brands.map(b => `<option value="${esc(b)}">${esc(b)}</option>`).join("");

  [searchInput, sortSelect, brandSelect].forEach(el => {
    el.addEventListener("input", draw);
    el.addEventListener("change", draw);
  });

  function draw() {
    const query = searchInput.value.trim().toLowerCase();
    const brand = brandSelect.value;

    const list = PRODUCTS.filter(p => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (query) {
        // Search the name, brand, description, and the department's own
        // name and synonyms — so "cologne" finds the fragrances.
        const cat = getCategory(p.category);
        const haystack = [
          p.name, p.brand, p.description, p.keywords,
          cat && cat.name, cat && cat.keywords
        ].filter(Boolean).join(" ").toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const sort = sortSelect.value;
    if (sort === "low")  list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    document.getElementById("resultCount").textContent =
      `${list.length} item${list.length === 1 ? "" : "s"}`;

    grid.innerHTML = list.length
      ? list.map(cardHtml).join("")
      : `<div class="empty" style="grid-column:1/-1">
           <h3>Nothing matched</h3>
           <p>Try another department, or clear the search.</p>
         </div>`;
  }

  draw();
}

/* =============================================================
   SINGLE PRODUCT PAGE
   ============================================================= */

function renderProductPage() {
  const holder = document.getElementById("productDetail");
  if (!holder) return;

  const product = getProduct(urlParam("id"));

  if (!product) {
    holder.innerHTML = `
      <div class="empty" style="grid-column:1/-1">
        <h3>We couldn't find that item</h3>
        <p>It may have been renamed or removed.</p>
        <p style="margin-top:26px"><a class="btn btn-solid" href="products.html">All products</a></p>
      </div>`;
    return;
  }

  document.title = `${product.name} — ${SITE.name}`;

  const cat = getCategory(product.category);
  const crumbs = document.getElementById("crumbs");
  if (crumbs && cat) {
    crumbs.innerHTML = `<a href="index.html">Home</a> &nbsp;/&nbsp;
      <a href="products.html?category=${encodeURIComponent(cat.id)}">${esc(cat.name)}</a> &nbsp;/&nbsp;
      <span>${esc(product.name)}</span>`;
  }

  // When prices are hidden we show one "Call for price" line and drop the
  // savings figure, so no numbers leak.
  const priceRow = SITE.showPrices === false
    ? `<span class="price-ask">Call for price</span>`
    : `<span class="price${product.oldPrice ? " reduced" : ""}">${money(product.price)}</span>` +
      (product.oldPrice
        ? `<span class="was">${money(product.oldPrice)}</span>
           <span class="save-note">Save ${money(product.oldPrice - product.price)}</span>`
        : "");

  const inStock = product.inStock !== false;
  const stockLine = inStock
    ? `<div class="stock"><span class="dot"></span> In store now</div>`
    : `<div class="stock out"><span class="dot"></span> Ask us about availability</div>`;

  const specs = product.specs
    ? `<div class="spec-title">Details</div>
       <table class="spec-table">
         ${Object.entries(product.specs).map(([k, v]) =>
           `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}
       </table>`
    : "";

  const waLink = whatsappHref(product.name);
  const whatsappButton = waLink
    ? `<a class="btn" href="${esc(waLink)}" target="_blank" rel="noopener">${icon("chat", 15)} WhatsApp</a>` : "";

  holder.innerHTML = `
    <div>${mediaHtml(product, true)}</div>
    <div class="detail-info">
      ${product.brand ? `<span class="kicker">${esc(product.brand)}</span>` : ""}
      <h1>${esc(product.name)}</h1>
      <div class="price-row">${priceRow}</div>
      ${stockLine}
      ${product.description ? `<p class="detail-desc">${esc(product.description)}</p>` : ""}

      <div class="enquire">
        <b>Enquire about this item</b>
        <p>Prices and stock change. Call or message us and we'll confirm it for you, or put it aside.</p>
        <div class="enquire-actions">
          <a class="btn btn-solid" href="${esc(telHref())}">${icon("phone", 15)} <span data-site="phone"></span></a>
          ${whatsappButton}
          <a class="btn" href="${esc(emailHref(product.name))}">${icon("mail", 15)} Email</a>
        </div>
      </div>

      ${specs}
    </div>`;

  applySiteInfo();   // fills the phone number into the button we just made

  // --- related products from the same department ---
  const related = document.getElementById("relatedGrid");
  if (related) {
    const others = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const section = document.getElementById("relatedSection");
    if (others.length === 0 && section) section.style.display = "none";
    related.innerHTML = others.map(cardHtml).join("");
  }
}

/* =============================================================
   CONTACT PAGE
   ============================================================= */

function renderContactPage() {
  const hours = document.getElementById("hoursList");
  if (!hours) return;

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  hours.innerHTML = SITE.hours.map(row => `
    <div class="hours-row ${row.day === todayName ? "today" : ""}">
      <b>${esc(row.day)}</b>
      <span>${esc(row.time)}</span>
    </div>`).join("");
}

/* =============================================================
   START EVERYTHING
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applySiteInfo();
  setupChrome();
  renderHome();
  renderProductsPage();
  renderProductPage();
  renderContactPage();
});
