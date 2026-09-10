/* =============================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT DAY TO DAY.

   It has three parts:
     1. SITE       -> your business name, phone, address, hours
     2. CATEGORIES -> the department list (TVs, Jewellery, etc.)
     3. PRODUCTS   -> every item you want to show

   Everything below is SAMPLE data so the site looks real.
   Replace it with your relative's actual store info and stock.
   ============================================================= */


/* -------------------------------------------------------------
   1. YOUR BUSINESS DETAILS
   Change the text inside the quotes. Keep the quotes and commas.
   ------------------------------------------------------------- */
const SITE = {
  name: "Meridian",                  // the wordmark in the header
  tagline: "Home & Style",           // small line under the wordmark
  currency: "$",                     // e.g. "$", "JMD ", "GYD ", "TT$"

  // Show real prices on the site, or ask customers to call?
  //   false -> every price is replaced with "Call for price"
  //   true  -> prices show as normal
  // Either way you still fill in the price field on each product, so you
  // can switch this over later without redoing any work.
  showPrices: false,

  // The thin dark strip along the very top of every page.
  announcement: "Showroom open six days a week · Delivery available",

  // The big banner photo on the home page.
  // Drop a wide photo (about 2000px across) into images/ and put its
  // name here, e.g. "images/showroom.jpg". Left empty, the banner
  // shows as a plain cream panel — which still looks fine.
  heroImage: "",

  phone: "(555) 012-3456",           // shown as a clickable call link
  whatsapp: "15550123456",           // digits only, with country code. Leave "" to hide
  email: "hello@meridianhome.example",
  address: "128 Waterfront Road, Georgetown",
  addressLine2: "Opposite the old market square",

  // Used for the "Get directions" link. Any Google Maps link works.
  mapsUrl: "https://www.google.com/maps",

  // Social links. Leave any of them as "" to hide that link.
  facebook: "",
  instagram: "",

  hours: [
    { day: "Monday",    time: "9:00 AM – 6:00 PM" },
    { day: "Tuesday",   time: "9:00 AM – 6:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 6:00 PM" },
    { day: "Thursday",  time: "9:00 AM – 6:00 PM" },
    { day: "Friday",    time: "9:00 AM – 7:00 PM" },
    { day: "Saturday",  time: "9:00 AM – 5:00 PM" },
    { day: "Sunday",    time: "Closed" }
  ],

  // The four points in the thin bar under the banner.
  // "icon" must be one of: label, truck, shield, chat, phone, pin, clock, mail
  services: [
    { icon: "label",  title: "Genuine brands",    text: "Authorised stock only" },
    { icon: "truck",  title: "Delivery",          text: "Ask us about your area" },
    { icon: "shield", title: "Warranty support",  text: "On all major items" },
    { icon: "chat",   title: "Real advice",       text: "From people who know the stock" }
  ]
};


/* -------------------------------------------------------------
   2. CATEGORIES (your departments)

   id       -> short lowercase name, no spaces. Products point at this.
   name     -> what customers see
   image    -> optional photo for the department tile on the home page,
               e.g. "images/dept-tvs.jpg". A square-ish photo works best.
   keywords -> other words customers might type in the search box.
               Everything in this department becomes findable by them,
               so you only write them once here, not on every product.
   ------------------------------------------------------------- */
const CATEGORIES = [
  { id: "tvs",         name: "TVs & Audio",       image: "", keywords: "television televisions tv smart tv soundbar speaker" },
  { id: "appliances",  name: "Appliances",        image: "", keywords: "fridge refrigerator freezer washing machine washer stove cooker oven range microwave air conditioner ac unit" },
  { id: "jewellery",   name: "Jewellery",         image: "", keywords: "jewelry gold silver chain necklace ring earrings bangle bracelet watch diamond" },
  { id: "mattresses",  name: "Mattresses",        image: "", keywords: "bed beds sleep spring foam single double queen king" },
  { id: "fragrances",  name: "Fragrances",        image: "", keywords: "cologne colognes perfume perfumes scent aftershave edt edp spray" },
  { id: "furniture",   name: "Furniture",         image: "", keywords: "sofa couch settee dining table chairs console living room" },
  { id: "electronics", name: "Small Electronics", image: "", keywords: "fan kettle blender ups inverter water heater gadget appliance" }
];


/* -------------------------------------------------------------
   3. PRODUCTS

   Copy one whole { ... }, block and change it to add a new item.

   Required : id, name, category, price
   Optional : brand, oldPrice, image, gallery, badge, featured,
              inStock, description, specs

   id       -> must be different for every product
   category -> must match one of the ids in CATEGORIES above
   oldPrice -> the crossed-out "was" price. Leave it out for no sale.
   image    -> "images/my-photo.jpg". Leave it out to show an emoji tile.
   badge    -> "New", "Sale", "Last one"... or leave it out
   featured -> true puts it on the home page
   inStock  -> false shows "Ask about availability"
   ------------------------------------------------------------- */
const PRODUCTS = [

  /* ---------------- TVs & Audio ---------------- */
  {
    id: "tv-samsung-65-crystal",
    name: 'Samsung 65" Crystal UHD 4K Smart TV',
    category: "tvs",
    brand: "Samsung",
    price: 899,
    oldPrice: 1099,
    badge: "Sale",
    featured: true,
    description: "A big, bright 4K screen built for a family living room. Crystal Processor 4K keeps colours clean, and the smart apps are all built in — Netflix, YouTube and the rest, straight out of the box.",
    specs: {
      "Screen size": "65 inches",
      "Resolution": "4K UHD (3840 × 2160)",
      "Smart platform": "Tizen",
      "HDMI ports": "3",
      "Warranty": "1 year"
    }
  },
  {
    id: "tv-lg-55-oled",
    name: 'LG 55" OLED evo C-Series 4K TV',
    category: "tvs",
    brand: "LG",
    price: 1349,
    featured: true,
    description: "OLED means every pixel makes its own light, so blacks are genuinely black. The one to show someone who wants the best picture in the store.",
    specs: {
      "Screen size": "55 inches",
      "Panel": "OLED evo",
      "Refresh rate": "120Hz",
      "Best for": "Movies and gaming",
      "Warranty": "1 year"
    }
  },
  {
    id: "tv-tcl-43-smart",
    name: 'TCL 43" FHD Android Smart TV',
    category: "tvs",
    brand: "TCL",
    price: 279,
    badge: "Best value",
    description: "The practical bedroom or shop-counter TV. Full HD, Android built in, and a price that is easy to say yes to.",
    specs: {
      "Screen size": "43 inches",
      "Resolution": "Full HD (1920 × 1080)",
      "Smart platform": "Android TV",
      "Warranty": "1 year"
    }
  },
  {
    id: "audio-jbl-soundbar",
    name: "JBL Bar 500 Soundbar with Wireless Subwoofer",
    category: "tvs",
    brand: "JBL",
    price: 429,
    oldPrice: 499,
    description: "Sits under the TV and instantly fixes thin television sound. The subwoofer is wireless, so it can go wherever there is a plug.",
    specs: {
      "Channels": "5.1",
      "Power": "590W total",
      "Subwoofer": "Wireless, 10 inch",
      "Connection": "HDMI eARC, Bluetooth"
    }
  },
  {
    id: "tv-hisense-75",
    name: 'Hisense 75" ULED 4K Smart TV',
    category: "tvs",
    brand: "Hisense",
    price: 1099,
    inStock: false,
    description: "Our largest screen on the floor. Great for anyone furnishing a big open living room.",
    specs: {
      "Screen size": "75 inches",
      "Panel": "ULED with local dimming",
      "Resolution": "4K UHD",
      "Warranty": "1 year"
    }
  },

  /* ---------------- Appliances ---------------- */
  {
    id: "app-samsung-fridge",
    name: "Samsung 18 cu.ft. Inverter Fridge with Water Dispenser",
    category: "appliances",
    brand: "Samsung",
    price: 1249,
    featured: true,
    badge: "Popular",
    description: "Digital inverter compressor, so it runs quieter and uses less current — which matters when the meter is yours. Built-in water dispenser on the door.",
    specs: {
      "Capacity": "18 cu.ft.",
      "Type": "Top freezer",
      "Compressor": "Digital inverter",
      "Finish": "Stainless steel",
      "Warranty": "1 year / 10 years compressor"
    }
  },
  {
    id: "app-lg-washer",
    name: "LG 11kg Front Load Washer with Steam",
    category: "appliances",
    brand: "LG",
    price: 899,
    oldPrice: 1049,
    badge: "Sale",
    description: "Handles a full family load in one go. The steam cycle is genuinely good on bedding and school uniforms.",
    specs: {
      "Capacity": "11 kg",
      "Type": "Front loading",
      "Motor": "Direct drive inverter",
      "Warranty": "1 year / 10 years motor"
    }
  },
  {
    id: "app-ninja-airfryer",
    name: "Ninja Foodi 8-Quart Dual Zone Air Fryer",
    category: "appliances",
    brand: "Ninja",
    price: 189,
    featured: true,
    description: "Two baskets, two different foods, both finished at the same time. The one customers come back and tell us about.",
    specs: {
      "Capacity": "8 quarts (2 × 4)",
      "Functions": "Air fry, roast, reheat, dehydrate",
      "Power": "1690W"
    }
  },
  {
    id: "app-whirlpool-stove",
    name: "Whirlpool 30\" 4-Burner Gas Range",
    category: "appliances",
    brand: "Whirlpool",
    price: 649,
    description: "A straightforward, hard-wearing gas range with a proper oven underneath. Cast iron grates you can actually scrub.",
    specs: {
      "Width": "30 inches",
      "Burners": "4 sealed",
      "Oven": "5.0 cu.ft.",
      "Ignition": "Electronic"
    }
  },
  {
    id: "app-split-ac",
    name: "Midea 12,000 BTU Inverter Split Air Conditioner",
    category: "appliances",
    brand: "Midea",
    price: 579,
    badge: "New",
    description: "Cools a standard bedroom fast and then eases off, which is where the inverter saves you money. Installation can be arranged.",
    specs: {
      "Cooling": "12,000 BTU",
      "Type": "Inverter split",
      "Room size": "Up to 550 sq.ft.",
      "Warranty": "1 year"
    }
  },

  /* ---------------- Jewellery ---------------- */
  {
    id: "jew-gold-rope-chain",
    name: "14K Yellow Gold Rope Chain — 22 inch",
    category: "jewellery",
    brand: "In-house",
    price: 749,
    featured: true,
    description: "A solid 14K rope chain with a lobster clasp. Comes boxed, and we can size it while you wait.",
    specs: {
      "Metal": "14K yellow gold",
      "Length": "22 inches",
      "Width": "3 mm",
      "Clasp": "Lobster"
    }
  },
  {
    id: "jew-diamond-studs",
    name: "0.50ct Diamond Stud Earrings in White Gold",
    category: "jewellery",
    brand: "In-house",
    price: 1199,
    oldPrice: 1450,
    badge: "Sale",
    description: "Half a carat total weight, four-prong setting, in 14K white gold. The safe gift when you are not sure what someone likes.",
    specs: {
      "Total weight": "0.50 ct",
      "Metal": "14K white gold",
      "Setting": "4-prong basket",
      "Clarity": "SI, near colourless"
    }
  },
  {
    id: "jew-silver-bangle",
    name: "Sterling Silver Cuff Bangle with Hand Engraving",
    category: "jewellery",
    brand: "In-house",
    price: 129,
    description: "Hand-engraved sterling silver cuff. Slips on, holds its shape, and does not need much looking after.",
    specs: {
      "Metal": "925 sterling silver",
      "Width": "12 mm",
      "Finish": "Polished, hand engraved"
    }
  },
  {
    id: "jew-citizen-watch",
    name: "Citizen Eco-Drive Stainless Steel Watch",
    category: "jewellery",
    brand: "Citizen",
    price: 329,
    description: "Charges off any light, so it never needs a battery. A proper everyday watch that still dresses up.",
    specs: {
      "Movement": "Eco-Drive (light powered)",
      "Case": "42 mm stainless steel",
      "Water resistance": "100 m",
      "Warranty": "5 years"
    }
  },

  /* ---------------- Mattresses ---------------- */
  {
    id: "mat-sealy-queen",
    name: "Sealy Posturepedic Queen Mattress — Medium Firm",
    category: "mattresses",
    brand: "Sealy",
    price: 799,
    oldPrice: 999,
    badge: "Sale",
    featured: true,
    description: "Reinforced support down the centre third, which is exactly where most mattresses give out first. Medium firm suits most back and side sleepers.",
    specs: {
      "Size": "Queen (60\" × 80\")",
      "Feel": "Medium firm",
      "Height": "12 inches",
      "Warranty": "10 years"
    }
  },
  {
    id: "mat-serta-king",
    name: "Serta Perfect Sleeper King Pillow-Top Set",
    category: "mattresses",
    brand: "Serta",
    price: 1149,
    description: "King size mattress and base sold together. The pillow top adds a soft layer without losing the support underneath.",
    specs: {
      "Size": "King (76\" × 80\")",
      "Feel": "Plush pillow top",
      "Includes": "Mattress + foundation",
      "Warranty": "10 years"
    }
  },
  {
    id: "mat-memory-foam-double",
    name: "12\" Gel Memory Foam Mattress — Double",
    category: "mattresses",
    brand: "SleepWell",
    price: 429,
    badge: "Best value",
    description: "Gel-infused foam that sleeps cooler than plain memory foam. Arrives compressed in a box and opens out in a few hours.",
    specs: {
      "Size": "Double (54\" × 75\")",
      "Height": "12 inches",
      "Fill": "Gel memory foam over support base",
      "Warranty": "10 years"
    }
  },
  {
    id: "mat-single-orthopedic",
    name: "Orthopedic Firm Single Mattress",
    category: "mattresses",
    brand: "SleepWell",
    price: 219,
    description: "The workhorse single — firm bonnell spring unit, good for a child's room or a guest bed.",
    specs: {
      "Size": "Single (39\" × 75\")",
      "Feel": "Firm",
      "Springs": "Bonnell coil",
      "Warranty": "5 years"
    }
  },

  /* ---------------- Fragrances ---------------- */
  {
    id: "fra-versace-eros",
    name: "Versace Eros Parfum for Men — 100ml",
    category: "fragrances",
    brand: "Versace",
    price: 149,
    featured: true,
    description: "Mint, green apple and vanilla over a warm woody base. Strong projection — one or two sprays is plenty.",
    specs: {
      "Size": "100 ml",
      "Concentration": "Parfum",
      "Family": "Aromatic fougère",
      "Lasts": "8–10 hours"
    }
  },
  {
    id: "fra-dior-sauvage",
    name: "Dior Sauvage Eau de Toilette — 100ml",
    category: "fragrances",
    brand: "Dior",
    price: 139,
    badge: "Bestseller",
    description: "The one everybody asks for. Bergamot up top, pepper and ambroxan underneath. Hard to get wrong as a gift.",
    specs: {
      "Size": "100 ml",
      "Concentration": "Eau de Toilette",
      "Family": "Fresh spicy",
      "Lasts": "6–8 hours"
    }
  },
  {
    id: "fra-armaf-club-de-nuit",
    name: "Armaf Club de Nuit Intense Man EDT — 105ml",
    category: "fragrances",
    brand: "Armaf",
    price: 59,
    oldPrice: 79,
    badge: "Sale",
    featured: true,
    description: "Famous for smelling far more expensive than it is. Pineapple and blackcurrant opening, smoky birch dry-down.",
    specs: {
      "Size": "105 ml",
      "Concentration": "Eau de Toilette",
      "Family": "Woody fruity",
      "Lasts": "8+ hours"
    }
  },
  {
    id: "fra-lancome-la-vie",
    name: "Lancôme La Vie Est Belle EDP — 75ml",
    category: "fragrances",
    brand: "Lancôme",
    price: 119,
    description: "Iris, praline and vanilla — sweet without being heavy. Our most requested women's fragrance.",
    specs: {
      "Size": "75 ml",
      "Concentration": "Eau de Parfum",
      "Family": "Sweet gourmand",
      "Lasts": "8 hours"
    }
  },

  /* ---------------- Furniture ---------------- */
  {
    id: "fur-sectional-sofa",
    name: "6-Seater L-Shape Fabric Sectional Sofa",
    category: "furniture",
    brand: "Casa Living",
    price: 1099,
    oldPrice: 1299,
    badge: "Sale",
    description: "Seats six comfortably with a chaise on either end depending on how you set it up. Hard-wearing woven fabric in a warm grey.",
    specs: {
      "Seats": "6",
      "Frame": "Kiln-dried hardwood",
      "Upholstery": "Textured polyester weave",
      "Configuration": "Reversible chaise"
    }
  },
  {
    id: "fur-dining-set",
    name: "7-Piece Dining Set with Upholstered Chairs",
    category: "furniture",
    brand: "Casa Living",
    price: 849,
    featured: true,
    description: "Rectangular table and six padded chairs. Solid enough for daily family meals, smart enough for guests.",
    specs: {
      "Includes": "1 table + 6 chairs",
      "Table size": "70\" × 38\"",
      "Material": "Rubberwood with veneer top",
      "Assembly": "Required, tools included"
    }
  },
  {
    id: "fur-tv-console",
    name: "70\" Media Console with Storage Doors",
    category: "furniture",
    brand: "Casa Living",
    price: 329,
    description: "Fits up to a 75 inch TV, with cable holes at the back and closed storage for the boxes and remotes.",
    specs: {
      "Width": "70 inches",
      "Fits TV up to": "75 inches",
      "Storage": "2 cabinets, 1 open shelf",
      "Finish": "Matte walnut"
    }
  },

  /* ---------------- Small Electronics ---------------- */
  {
    id: "ele-solar-fan",
    name: "16\" Solar Rechargeable Fan with USB Light",
    category: "electronics",
    brand: "BrightPower",
    price: 89,
    badge: "New",
    featured: true,
    description: "Runs off the wall or off its own battery, and charges a phone while it does. The thing people buy the day after a long outage.",
    specs: {
      "Blade size": "16 inches",
      "Battery life": "Up to 8 hours",
      "Extras": "USB charging port, LED light, radio",
      "Charging": "Mains or solar panel"
    }
  },
  {
    id: "ele-apc-ups",
    name: "APC Back-UPS 1200VA Battery Backup",
    category: "electronics",
    brand: "APC",
    price: 179,
    description: "Keeps a router, a laptop and a light going through a cut, and protects everything from surges when the power comes back.",
    specs: {
      "Capacity": "1200VA / 650W",
      "Outlets": "6",
      "Voltage": "120V",
      "Protection": "Surge + battery backup"
    }
  },
  {
    id: "ele-blender-set",
    name: "7-Piece Blender, Chopper & Grinder Set",
    category: "electronics",
    brand: "Starline",
    price: 69,
    oldPrice: 89,
    badge: "Sale",
    description: "One motor, three jars — smoothies, seasoning and dry spices all from the same base. A very common wedding gift here.",
    specs: {
      "Pieces": "7",
      "Power": "500W",
      "Jars": "Blender, chopper, grinder",
      "Blades": "Stainless steel"
    }
  },
  {
    id: "ele-water-heater",
    name: "Tankless Electric Water Heater 9kW",
    category: "electronics",
    brand: "AquaFlow",
    price: 149,
    description: "Heats on demand, so there is no tank sitting there using current. Needs a proper 240V line — ask us before you buy.",
    specs: {
      "Power": "9 kW",
      "Voltage": "240V",
      "Display": "Digital temperature",
      "Best for": "Single shower"
    }
  }
];
