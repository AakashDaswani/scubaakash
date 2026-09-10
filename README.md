# Store Display Site — how to use it

A simple website that shows off what the shop sells. **There is no cart and no
checkout** — customers browse, then call, WhatsApp or walk in.

There is nothing to install. No Node, no npm, no build step. It is plain
HTML, CSS and JavaScript, which is exactly what you want for a site like this.

---

## 1. How to open it

**The quickest way:** double-click `index.html`. It opens in your browser. Done.

**The better way while you're editing** (auto-refreshes when you save):

1. Open this folder in VS Code — `File → Open Folder…`
2. Click the Extensions icon in the left sidebar (the four squares)
3. Search for **Live Server** by Ritwick Dey, click Install
4. Right-click `index.html` in the file list → **Open with Live Server**

Now every time you press save, the browser updates itself.

---

## 2. What each file does

| File | What it is |
|---|---|
| `index.html` | The home page |
| `products.html` | The big grid with search and filters |
| `product.html` | One single item's page |
| `contact.html` | Address, phone, opening hours |
| **`js/data.js`** | **Your shop's info and all your products — this is the one you edit** |
| `js/site.js` | The code that draws the pages. Leave it alone. |
| `css/styles.css` | All the colours and layout. Colours are at the very top. |
| `images/` | Put your product photos here |

**99% of the time, `js/data.js` is the only file you touch.**

---

## 3. Change the shop's name, phone and address

Open `js/data.js`. The very first block is `SITE`. Change the text between the
quotes:

```js
const SITE = {
  name: "Meridian",                // <- the big wordmark in the header
  tagline: "Home & Style",         // <- the small line under it
  announcement: "Showroom open six days a week · Delivery available",
  phone: "(555) 012-3456",
  whatsapp: "15550123456",         // digits only + country code, no + or spaces
  address: "128 Waterfront Road, Georgetown",
  ...
};
```

Keep the wordmark short — one or two words. It is set in wide letterspaced
capitals, so a long name will crowd the header.

### Showing prices, or not

In the same `SITE` block:

```js
showPrices: false,
```

`false` (the current setting) replaces every price on the site with **Call for
price**, and hides the "sort by price" options. `true` shows real prices.

You still fill in the `price` on every product either way — the number is just
not displayed. That means you can flip this to `true` one day and every price
appears instantly, with no re-typing. Keep the prices in the file accurate even
while they're hidden, or that switch becomes a big job later.

Save, refresh the browser. The name and number update everywhere on every page
at once — header, footer, buttons, all of it.

> **Rules that will save you pain:** keep the `"quotes"`, keep the `,` comma at
> the end of each line, and don't delete the `{` `}` brackets. If the page
> suddenly goes blank, you deleted one of those. Press `Ctrl+Z` / `Cmd+Z`.

---

## 4. Add a product

Still in `js/data.js`, scroll down to `PRODUCTS`. Copy one whole block —
from `{` to `},` — paste it, and edit it:

```js
  {
    id: "tv-lg-32-smart",                    // must be unique, no spaces
    name: 'LG 32" HD Smart TV',
    category: "tvs",                         // must match a category id
    brand: "LG",
    price: 199,
    oldPrice: 249,                           // optional — the crossed-out price
    image: "images/lg-32-tv.jpg",            // optional — leave out for a plain tile
    badge: "Sale",                           // optional — "Sale" turns the tag red
    keywords: "telly flatscreen",            // optional — extra search words
    featured: true,                          // optional — puts it on the home page
    inStock: true,                           // optional — false shows "ask about availability"
    description: "A short paragraph about it.",
    specs: {                                 // optional
      "Screen size": "32 inches",
      "Warranty": "1 year"
    }
  },
```

Only `id`, `name`, `category`, and `price` are required. Everything else is
optional and the page still looks right without it.

**Careful with quotes in names.** `"LG 32" HD TV"` breaks, because the `"` in
`32"` ends the text early. Use single quotes around the outside instead:
`'LG 32" HD TV'`. That's why some names in the file use `'` and some use `"`.

The valid `category` values are the `id:` values in the `CATEGORIES` block just
above: `tvs`, `appliances`, `jewellery`, `mattresses`, `fragrances`,
`furniture`, `electronics`.

---

## 5. Add photos

There are three places photos go. All of them are optional, and all of them
work the same way: drop the file into `images/`, then point at it in `data.js`.

**A product photo** — in that product's block:
```js
image: "images/samsung-65-tv.jpg",
```

**A department photo** (the tiles on the home page) — in `CATEGORIES`:
```js
{ id: "tvs", name: "TVs & Audio", image: "images/dept-tvs.jpg", keywords: "..." },
```

**The big banner photo** at the top of the home page — in `SITE`:
```js
heroImage: "images/showroom.jpg",
```
Use something wide (about 2000px across). The site darkens it automatically and
switches the banner text to white, so it stays readable. Left empty, the banner
is a plain cream panel — which also looks fine.

Tips:
- Name files simply — `samsung-65-tv.jpg`. No spaces, no capitals.
- Resize to about **1000 pixels wide** before adding them. Photos straight off a
  phone are 5MB each and will make the site painfully slow on mobile data.
  <https://squoosh.app> does this for free in the browser.
- A plain white background looks best in the grid.

Any product **without** a photo automatically shows a tinted tile with the
category emoji, so the site never looks broken while you work through them.

---

## 6. Add or rename a department

In `js/data.js`, the `CATEGORIES` block:

```js
{ id: "toys", name: "Toys & Games", image: "", keywords: "toy game puzzle doll" },
```

- `id` — short, lowercase, no spaces. Products refer to this.
- `name` — what customers see
- `image` — optional photo for the home page tile
- `keywords` — other words customers might type in the search box

**Keywords are worth five minutes of your time.** Someone looking for a cologne
types "cologne", not "fragrance". Someone wants a "fridge", not a
"refrigerator". Write those words once here and every item in the department
becomes findable by them — you don't repeat them on each product.

The department appears in the top menu, the home page, the filter row and the
footer automatically.

---

## 7. Change the colours

Top of `css/styles.css`:

```css
:root {
  --ink:    #141414;   /* near-black: text, announcement bar, solid buttons */
  --cream:  #f2ebe1;   /* the header band and footer */
  --cream-2:#faf7f2;   /* soft sections */
  --wash:   #f4f3f0;   /* the panel behind product photos */
  --accent: #8a1c1c;   /* sale red */
}
```

Change those and the whole site re-skins. Two things are worth keeping if you
want it to stay looking professional: **square corners** and **no drop
shadows**. Rounded, floating cards are what make a site look like a template.
Real shops — including the two you showed me — sit everything flat on the page
and let the photographs do the work.

---

## 8. Put it on the internet (free)

**Easiest — Netlify Drop:**

1. Go to <https://app.netlify.com/drop>
2. Drag this whole folder onto the page
3. It gives you a live link in about 20 seconds

To update it later, drag the folder on again. You can attach a real domain name
(like `meridianhome.com`) later from Netlify's settings for about $12/year.

**Alternative — GitHub Pages** is also free and works well if you want the files
version-controlled, but Netlify Drop is genuinely a 30-second job.

---

## 9. Things worth knowing

- **Nothing on this site is secret.** Anyone can view the price list. That's the
  point of a display site — just don't put cost prices or supplier info in it.
- **The prices are sample numbers** I filled in so the site looks real. Replace
  them with actual prices before you show anyone. The footer already says
  "prices are a guide only", which protects you from arguments.
- **The header and footer are copied into all four HTML pages.** If you change
  the menu, change it in all four. That's the trade-off for having no build step
  — worth it for how simple everything else is.
- **Test on a phone.** Most customers will look at this on a phone. In Chrome:
  right-click → Inspect → click the little phone icon at the top of the panel.

---

## 10. When something breaks

Press `F12` in the browser and click the **Console** tab. Red text there tells
you what's wrong, and it is almost always one of:

- a missing comma between two products
- a missing `}` bracket
- a `"` inside a name that should have been `'` (see section 4)
- a photo filename that doesn't match the actual file (capital letters count!)
