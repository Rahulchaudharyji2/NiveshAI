# NiveshAI Redesign Prompt (Puzzle/Ramotion-inspired dark fintech UI)

> Paste this whole thing into Claude Code / Cursor / v0 / Windsurf as your instruction. It assumes Next.js + Tailwind CSS (adjust the class-based instructions to plain CSS / CSS Modules / styled-components if that's not your stack).

---

## Role & Goal

You are a senior front-end engineer and UI designer. Redesign the visual system of the NiveshAI app (Next.js, routes: `/`, `/StockDashboard`, `/MFDashboard`, `/CryptoDashboard`, `/Courses`) into a **dark, premium fintech aesthetic** inspired by Ramotion's Puzzle.io case study — glassmorphic cards, purple/green gradient glow, bold geometric type, animated micro-interactions. **Do not change any routing, data-fetching, auth logic (`/api/auth/login`), or component functionality — this is a visual/CSS/markup-structure pass only.** Keep all existing copy unless a section explicitly needs restructuring below.

---

## 1. Design Tokens

Add these as CSS custom properties in `globals.css` (or extend `tailwind.config` colors) — don't hardcode hex values in components:

```css
:root {
  /* Base */
  --bg-primary: #06050B;      /* page background, near-black */
  --bg-secondary: #0D0A16;    /* section/panel background, one step up */
  --bg-elevated: #14101F;     /* cards before glass effect */

  /* Glass surface */
  --surface-glass: rgba(255, 255, 255, 0.04);
  --surface-glass-hover: rgba(255, 255, 255, 0.07);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(30, 253, 104, 0.35);

  /* Accents */
  --purple-deep: #2D1B45;     /* gradient blob base */
  --purple-accent: #834AA4;   /* secondary CTA, links */
  --magenta-glow: #D857E0;    /* gradient blob highlight */
  --blue-accent: #2CA4FA;     /* icons, secondary highlights */
  --green-primary: #1EFD68;   /* PRIMARY CTA, positive numbers, growth charts */
  --green-primary-dim: #19C559;

  /* Text */
  --text-primary: #F1ECFB;
  --text-muted: #A9A3CA;
  --text-faint: #6E6889;
}
```

Text/heading colors should use `--text-primary` and `--text-muted` only — never pure white or pure gray, it'll clash with the purple undertone.

---

## 2. Typography

I can't pull Puzzle's exact licensed font, so use these close, free matches for the same "modern SaaS grotesk" feel:

- **Headings:** `Space Grotesk` (600/700) — or `General Sans` from Fontshare if you want it closer to premium Webflow sites. Tight letter-spacing (`-0.02em`) on large display text.
- **Body/UI:** `Inter` or `Manrope`, 400/500, normal letter-spacing, `line-height: 1.6` for paragraphs.
- **Numbers/stats** (portfolio values, % growth): use a tabular-nums variant so digits don't jitter — `font-variant-numeric: tabular-nums;`

Scale: Hero H1 `clamp(2.75rem, 5vw, 4.5rem)` / weight 600 / tight leading. Section H2 `clamp(2rem, 3vw, 3rem)`. Body `1rem–1.125rem`.

---

## 3. Atmosphere / Lighting

This is the signature of the reference shot — don't skip it:

- Add 2–3 large, blurred radial-gradient "blobs" (purple → magenta → transparent, and a subtle green one) positioned absolutely behind the hero and behind major section breaks. `filter: blur(120px); opacity: 0.35;` — they create the glow without being loud.
- Apply a very subtle noise/grain texture overlay (1–2% opacity) on `body` to kill flat-black banding — a tiny base64 SVG noise pattern works, no image request needed.
- Cards use **glassmorphism**: `background: var(--surface-glass); backdrop-filter: blur(20px); border: 1px solid var(--border-subtle); border-radius: 20px;`
- On hover, cards get `border-color: var(--border-glow)` and a soft `box-shadow: 0 0 40px rgba(30,253,104,0.08)` — a glow, not a hard shadow.

---

## 4. Navbar

- Sticky, `position: fixed`, transparent at top of page.
- On scroll (`>50px`), transition background to `rgba(6,5,11,0.7)` with `backdrop-filter: blur(16px)` and a 1px bottom border in `--border-subtle`. Animate with CSS transition, not a hard cut.
- Logo left. Nav links (Features, Stock, MutualFund, Crypto, EducationHub) centered or right, `--text-muted` default, `--text-primary` on hover, small underline-slide-in transition.
- CTA button ("Get Started") stays pill-shaped, green, right-aligned, always visible.

---

## 5. Buttons

- **Primary:** pill shape (`border-radius: 999px`), background `linear-gradient(135deg, var(--green-primary), var(--green-primary-dim))`, dark text (`#06050B`, not white — green buttons read better with near-black text), subtle `box-shadow: 0 0 24px rgba(30,253,104,0.25)`. On hover: scale `1.03`, shadow intensifies.
- **Secondary/ghost:** transparent background, 1px `--border-subtle`, `--text-primary` text, on hover border brightens to `--purple-accent` and background gets `--surface-glass-hover`.
- Add a 150–200ms `ease-out` transition on all interactive elements — no instant snaps.

---

## 6. Section-by-section (mapped to your actual current sections)

**Hero ("Empower Your Financial Future with NiveshAI")**
- Keep centered layout. Make "NiveshAI" or the key phrase in the headline a gradient text span (`background: linear-gradient(90deg, var(--green-primary), var(--blue-accent)); -webkit-background-clip: text; color: transparent;`).
- Below the CTA, float the product screenshot (`ss.png`) inside a glass frame with a subtle green glow border and a slight `perspective`/tilt on load (settles to flat on scroll or on mount) — mirrors the "animated dashboard mockup" pattern from the reference.
- Add a thin row of trust indicators under the CTA if you have any (e.g. "Trusted by 2,300+ investors" — reuse a stat like Puzzle's stats band).

**Feature blocks (Portfolio Tracking / AI Insights / Learn with NiveshAI / Global Connectivity)**
- Replace the four Unsplash stock photos — they clash hard with this aesthetic. Swap for: (a) simple line-icon illustrations in a glass tile, or (b) UI-mockup style cards (mini chart, mini chat bubble, mini globe graphic) rendered as actual small components rather than photos. This single change will do more for the "premium fintech" feel than any color tweak.
- Alternate image/content left-right per block, add a small uppercase eyebrow tag above each heading (e.g. "AI-POWERED") in `--green-primary`, small caps, letter-spacing `0.1em`.
- Each block's icon/graphic sits in a glass card with its own colored glow (green for AI insights, blue for portfolio tracking, purple for education, magenta for global) — this reuses the reference's multi-accent-color system per feature instead of one flat color everywhere.

**"Learn with NiveshAI" chat demo**
- Style as a floating glass chat widget, message bubbles: user message in `--surface-glass-hover`, AI response bubble with a thin `--green-primary` left border or subtle green-tinted background (`rgba(30,253,104,0.06)`).

**Testimonials carousel**
- Cards get the standard glass treatment. Add a subtle gradient border on the active/centered card only, so it visually "pops" as it scrolls into focus. Keep avatars, add small 5-star rating row in `--green-primary` if you want extra polish.

**Stats/social proof**
- If not present yet, add a compact stats band (2–3 large numbers) styled like Puzzle's "15% / 2,300+" — big gradient numbers, small muted label underneath. Use real or placeholder metrics (e.g. "₹XX Cr tracked", "X,000+ investors", "XX% avg portfolio growth").

**Closing CTA ("Transforming complex finance into Simple, Smart decisions")**
- Full-width section, darker background (`--bg-secondary`), one big blob glow behind the text, gradient-text on "Simple, Smart decisions", single centered green pill CTA.

**Footer**
- Keep minimal/dark, `--text-muted` links, `--text-primary` on hover, thin top border in `--border-subtle`. No change needed structurally.

---

## 7. Micro-interactions

- Scroll-reveal: sections fade + translateY(16px→0) on entering viewport (Framer Motion `whileInView` or a simple Intersection Observer + CSS class toggle — don't add a heavy library just for this if you're time-boxed).
- Card hover: `translateY(-4px)` + glow shadow, 200ms ease-out.
- Button hover: scale + shadow as described in §5.
- Keep all animations subtle — this aesthetic reads as "expensive" specifically because motion is restrained, not flashy.

---

## 8. Responsiveness & guardrails

- Test at 375px, 768px, 1440px. Blobs/glows should shrink or be cropped out on mobile rather than causing horizontal scroll — clip with `overflow: hidden` on section wrappers.
- Maintain WCAG-reasonable contrast: `--text-muted` on `--bg-primary` should stay readable for body copy; don't drop below ~4.5:1 for anything that isn't purely decorative.
- Don't touch the Auth0 login route, dashboard data logic, or existing component props — only restyle.
- Ship incrementally: globals.css tokens → Navbar → Hero → Feature blocks → Testimonials → CTA → Footer. Show me each section as you go rather than one giant diff, so I can catch issues early before the demo.

---

## Notes for you (not part of the prompt above)
- I inferred the color palette from Ramotion's official published swatches for this exact Dribbble shot series — those hexes are real. The font names are my closest free-alternative recommendation, not a confirmed match, since Dribbble doesn't expose font metadata.
- Biggest single visual win for a hackathon judge: swapping the 4 Unsplash stock photos for icon/mockup tiles + adding the background glow blobs. Do those two things first if you're short on time.
