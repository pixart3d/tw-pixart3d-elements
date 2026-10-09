import { css, html, LitElement, nothing } from "lit";

type ImageValue = string | { url?: string; src?: string } | null;
type StyleValue = string | { value?: string; selected?: unknown } | Array<string | { value?: string }> | null;
type HeroConfig = {
  title?: string;
  content?: string;
  hero_image?: ImageValue;
  button_text?: string;
  button_url?: string;
  design_style?: StyleValue;
  badge_text?: string;
  graphic_text?: string;
  button_color?: string;
  button_text_color?: string;
  background_color?: string;
  background_color_2?: string;
  background_color_3?: string;
  title_color?: string;
  description_color?: string;
  badge_text_color?: string;
  badge_background_color?: string;
  badge_border_color?: string;
  graphic_primary_color?: string;
  graphic_secondary_color?: string;
  graphic_text_color?: string;
  decoration_color?: string;
};

type DesignStyle = "classic" | "printing" | "gifts" | "tech" | "luxury" | "minimal";

export default class PixartHero extends LitElement {
  // Salla local demo passes config as a JSON attribute; Lit parses it into an object.
  static properties = { config: { type: Object } };
  declare config?: HeroConfig;

  static styles = css`
    :host { display: block; width: 100%; font-family: inherit; }
    *, *::before, *::after { box-sizing: border-box; }
    .hero {
      position: relative; isolation: isolate; overflow: hidden;
      display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr);
      align-items: center; gap: clamp(16px, 3vw, 40px);
      padding: clamp(30px, 5vw, 70px); min-height: 360px;
      border-radius: 22px; direction: rtl;
      background: linear-gradient(125deg,
        var(--bg-1, #003B49) 0%, var(--bg-2, #062C38) 52%, var(--bg-3, #091C32) 100%);
    }
    .hero::before, .hero::after {
      content: ""; position: absolute; z-index: -1; pointer-events: none;
    }
    /* The decoration follows the selected style while the three gradient colors stay editable. */
    .hero[data-style="classic"]::before {
      width: 370px; height: 370px; left: -135px; top: -185px;
      border-radius: 50%; background: var(--decoration, #5EEAD4); opacity: .12;
    }
    .hero[data-style="printing"]::before {
      inset: 0; background-image:
        linear-gradient(var(--decoration, #5EEAD4) 1px, transparent 1px),
        linear-gradient(90deg, var(--decoration, #5EEAD4) 1px, transparent 1px);
      background-size: 44px 44px; opacity: .09;
      transform: perspective(600px) rotateX(18deg) scale(1.2);
    }
    .hero[data-style="printing"]::after {
      width: 290px; height: 290px; right: -150px; bottom: -170px;
      border: 2px solid var(--decoration, #5EEAD4); border-radius: 40px;
      transform: rotate(45deg); opacity: .25;
    }
    .hero[data-style="gifts"]::before {
      width: 310px; height: 310px; top: -145px; left: -120px;
      border: 38px solid var(--decoration, #5EEAD4);
      border-radius: 35%; transform: rotate(24deg); opacity: .12;
    }
    .hero[data-style="gifts"]::after {
      width: 220px; height: 220px; right: -105px; bottom: -135px;
      border: 3px dashed var(--decoration, #5EEAD4);
      border-radius: 50%; opacity: .3;
    }
    .hero[data-style="tech"]::before {
      inset: 0; background-image:
        linear-gradient(90deg, var(--decoration, #5EEAD4) 1px, transparent 1px),
        linear-gradient(var(--decoration, #5EEAD4) 1px, transparent 1px);
      background-size: 60px 60px; opacity: .095;
    }
    .hero[data-style="tech"]::after {
      width: 350px; height: 350px; left: -180px; top: -180px;
      border: 1px solid var(--decoration, #5EEAD4); border-radius: 50%; opacity: .35;
      box-shadow: 0 0 0 50px color-mix(in srgb, var(--decoration, #5EEAD4) 10%, transparent);
    }
    .hero[data-style="luxury"]::before {
      inset: 17px; border: 1px solid var(--decoration, #D8BA78);
      border-radius: 13px; opacity: .38;
    }
    .hero[data-style="luxury"]::after {
      width: 250px; height: 250px; left: -120px; top: -135px;
      border: 1px solid var(--decoration, #D8BA78);
      transform: rotate(45deg); opacity: .32;
    }
    .hero[data-style="minimal"]::before {
      width: 340px; height: 340px; left: -120px; top: -165px;
      border-radius: 38% 62% 65% 35%; background: var(--decoration, #5EEAD4);
      opacity: .14; transform: rotate(-25deg);
    }
    .hero[data-style="minimal"]::after {
      width: 200px; height: 200px; right: -100px; bottom: -125px;
      border-radius: 50%; background: var(--decoration, #5EEAD4); opacity: .1;
    }
    .content { position: relative; z-index: 1; min-width: 0; }
    .badge {
      display: inline-flex; align-items: center; padding: 8px 16px;
      margin-bottom: 22px; border: 1px solid var(--badge-border, #237C86);
      background: var(--badge-bg, #0A4651); color: var(--badge-text, #9DF7E7);
      border-radius: 100px; font-size: 13px; line-height: 1.5; font-weight: 700;
    }
    h2 {
      margin: 0 0 16px; color: var(--title, #FFFFFF);
      font-size: clamp(28px, 4vw, 52px); line-height: 1.3;
      font-weight: 800; overflow-wrap: anywhere;
    }
    p {
      margin: 0 0 27px; max-width: 500px;
      color: var(--description, #C5DCE1);
      font-size: 16px; line-height: 1.9; overflow-wrap: anywhere;
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      min-height: 48px; gap: 14px; padding: 13px 27px; border-radius: 12px;
      background: var(--btn-bg, #64E6D0); color: var(--btn-text, #003B49);
      text-decoration: none; font-size: 15px; line-height: 1.5; font-weight: 700;
      transition: filter .2s, transform .2s;
    }
    .btn:hover { filter: brightness(1.1); transform: translateY(-2px); }
    .btn:focus-visible { outline: 3px solid var(--btn-text, #003B49); outline-offset: 3px; }
    .visual {
      display: flex; align-items: center; justify-content: center;
      min-width: 0; min-height: 240px;
    }
    .hero-image {
      width: 100%; max-width: 420px; max-height: 285px;
      object-fit: contain; border-radius: 16px;
      filter: drop-shadow(0 18px 30px rgba(0,0,0,.18));
    }
    .illustration { width: min(100%, 315px); height: 260px; display: flex; align-items: center; justify-content: center; }
    .illustration svg { display: block; width: 100%; max-width: 300px; height: 100%; overflow: visible; }
    .classic-card {
      display: flex; align-items: center; justify-content: center;
      width: min(72%, 210px); aspect-ratio: 1; border-radius: 38px;
      position: relative; transform: rotate(-12deg);
      background: linear-gradient(145deg, var(--art-1, #65F5DB), var(--art-2, #0597A6));
      box-shadow: 22px 24px 55px rgba(0,0,0,.24);
    }
    .classic-card::after {
      content: ""; position: absolute; inset: 14px;
      border: 2px solid var(--art-ink, #003B49); opacity: .25;
      border-radius: 27px;
    }
    .classic-card span { position: relative; z-index: 1; color: var(--art-ink, #003B49);
      font-size: clamp(24px, 3vw, 45px); font-weight: 900; transform: rotate(12deg);
      letter-spacing: -.02em; max-width: 85%; text-align: center; overflow-wrap: anywhere;
    }
    .s1 { fill: var(--art-1, #65F5DB); }
    .s2 { fill: var(--art-2, #0597A6); }
    .ink { fill: var(--art-ink, #003B49); }
    .ink-line { stroke: var(--art-ink, #003B49); }
    .s1-line { stroke: var(--art-1, #65F5DB); }
    .deco-line { stroke: var(--decoration, #5EEAD4); }
    .art-letter { fill: var(--art-ink, #003B49); font: 900 30px sans-serif; }
    @media (max-width: 768px) {
      .hero { grid-template-columns: minmax(0, 1fr); gap: 10px;
        padding: 33px 23px 29px; min-height: auto; text-align: center; }
      .badge { margin-bottom: 17px; }
      h2 { font-size: clamp(27px, 7vw, 37px); }
      p { margin: 0 auto 24px; font-size: 14px; }
      .visual { min-height: 165px; margin-top: 7px; }
      .illustration { height: 190px; }
      .hero-image { max-height: 215px; }
      .classic-card { width: 145px; border-radius: 29px; }
      .classic-card::after { border-radius: 20px; }
      .classic-card span { font-size: 30px; }
      .hero[data-style="luxury"]::before { inset: 10px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .btn { transition: none; }
      .btn:hover { transform: none; }
    }
  `;

  private text(value: unknown, fallback: string) {
    return typeof value === "string" ? value : fallback;
  }
  private hex(value: unknown, fallback: string) {
    return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
  }
  private safeUrl(value: unknown, fallback = "") {
    if (typeof value !== "string") return fallback;
    const url = value.trim();
    if (/\s/.test(url)) return fallback;
    return /^https?:\/\/[^/\s]+/i.test(url) || /^\/(?!\/)/.test(url) ? url : fallback;
  }
  private styleName(value: StyleValue | undefined): DesignStyle {
    // Supports Salla dropdown values delivered as a string, selected array or object.
    const read = (item: unknown): unknown => {
      if (typeof item === "string") return item;
      if (Array.isArray(item)) return read(item[0]);
      if (item && typeof item === "object") {
        const obj = item as { value?: unknown; selected?: unknown };
        return read(obj.value ?? obj.selected);
      }
      return undefined;
    };
    const name = read(value);
    return name === "printing" || name === "gifts" || name === "tech" ||
      name === "luxury" || name === "minimal" ? name : "classic";
  }

  private draw(style: DesignStyle, label: string) {
    if (style === "classic") return html`
      <div class="classic-card" aria-hidden="true"><span>${label}</span></div>`;
    if (style === "printing") return html`
      <div class="illustration" aria-hidden="true">
        <svg viewBox="0 0 300 260">
          <ellipse cx="147" cy="223" rx="104" ry="17" fill="#000" opacity=".12"/>
          <g stroke-width="2.5" stroke-linejoin="round" class="ink-line">
            <path class="s1" d="M48 85 115 48 178 82 110 121Z"/>
            <path class="s2" d="M48 85 110 121V194L48 159Z"/>
            <path class="s1" d="M110 121 178 82V155L110 194Z"/>
            <path class="s2" d="M141 91 192 63 245 93 194 125Z"/>
            <path class="s1" d="M141 91 194 125V177L141 145Z"/>
            <path class="s2" d="M194 125 245 93V146L194 177Z"/>
          </g>
          <g fill="none" stroke-width="3" opacity=".55" class="s1-line">
            <path d="M63 151 110 178 162 149"/><path d="M63 137 110 164 162 135"/>
          </g>
          <g class="deco-line" stroke-width="3" stroke-linecap="round" fill="none">
            <path d="M27 53h28m-14-14v28M252 180h27m-13-14v28"/>
          </g>
        </svg>
      </div>`;
    if (style === "gifts") return html`
      <div class="illustration" aria-hidden="true">
        <svg viewBox="0 0 300 260">
          <ellipse cx="150" cy="229" rx="97" ry="14" fill="#000" opacity=".1"/>
          <g transform="rotate(-7 150 140)">
            <rect class="s2" x="69" y="116" width="162" height="108" rx="13"/>
            <rect class="s1" x="60" y="102" width="180" height="41" rx="9"/>
            <path class="ink" opacity=".85" d="M135 102h30v122h-30z"/>
            <path class="ink" opacity=".85" d="M60 116h180v14H60z"/>
            <path class="s1" d="M148 102C97 93 93 56 112 49c19-7 40 25 40 49 4-35 36-57 52-39 17 19-7 44-52 43Z"/>
            <path class="ink-line" fill="none" stroke-width="4" stroke-linecap="round" d="M151 101 121 73m30 28 32-28"/>
          </g>
          <g class="deco-line" stroke-width="4" stroke-linecap="round"><path d="M54 55v20m-10-10h20M242 62v25m-12-12h24"/></g>
        </svg>
      </div>`;
    if (style === "tech") return html`
      <div class="illustration" aria-hidden="true">
        <svg viewBox="0 0 300 260">
          <rect class="s2" x="26" y="53" width="245" height="166" rx="19" opacity=".62"/>
          <rect class="s1" x="42" y="40" width="219" height="157" rx="18"/>
          <rect class="ink" x="55" y="52" width="193" height="127" rx="10" opacity=".88"/>
          <path class="s1" d="M133 86 133 144 182 115Z"/>
          <rect class="s2" x="70" y="162" width="52" height="5" rx="3"/>
          <rect class="s2" x="128" y="162" width="25" height="5" rx="3"/>
          <rect class="s2" x="166" y="162" width="63" height="5" rx="3"/>
          <circle class="s1" cx="247" cy="210" r="27"/>
          <path class="ink-line" d="M234 210h26m-13-13v26" stroke-width="4" stroke-linecap="round"/>
          <path class="deco-line" d="M26 217h62M216 29h60" stroke-width="3" stroke-linecap="round" opacity=".6"/>
        </svg>
      </div>`;
    if (style === "luxury") return html`
      <div class="illustration" aria-hidden="true">
        <svg viewBox="0 0 300 260">
          <circle cx="150" cy="130" r="100" fill="none" stroke="var(--decoration, #D8BA78)" stroke-width="2" opacity=".55"/>
          <circle cx="150" cy="130" r="86" fill="none" stroke="var(--decoration, #D8BA78)" stroke-width="1" opacity=".55"/>
          <path class="s1" d="M88 110 118 77H184L215 110 152 192Z"/>
          <path class="s2" d="M88 110H215L152 192Z"/>
          <path class="ink" opacity=".32" d="M118 77 126 110H173l11-33ZM126 110l26 82 21-82"/>
          <path d="M88 110 118 77 126 110 152 192 173 110 184 77 215 110" class="ink-line" fill="none" stroke-width="2" opacity=".6"/>
          <path class="deco-line" d="M150 15v22m0 187v20M35 130h20m192 0h20" stroke-width="2" opacity=".65"/>
        </svg>
      </div>`;
    return html`
      <div class="illustration" aria-hidden="true">
        <svg viewBox="0 0 300 260">
          <circle class="s1" cx="130" cy="124" r="83" opacity=".93"/>
          <circle class="s2" cx="198" cy="121" r="70" opacity=".90"/>
          <circle fill="var(--decoration, #5EEAD4)" cx="162" cy="171" r="65" opacity=".8"/>
          <circle fill="none" class="ink-line" cx="132" cy="120" r="100" stroke-width="1.5" opacity=".25"/>
          <circle class="ink" cx="224" cy="55" r="10" opacity=".5"/>
        </svg>
      </div>`;
  }

  render() {
    const c = this.config ?? {};
    const style = this.styleName(c.design_style);
    const title = this.text(c.title, "اكتشف تشكيلتنا المميزة");
    const description = this.text(c.content, "تصاميم ومنتجات مختارة خصيصًا لك.");
    const badge = this.text(c.badge_text, "✨ اكتشف الجديد");
    const graphicLabel = this.text(c.graphic_text, "NEW");
    const buttonLabel = this.text(c.button_text, "تسوق الآن");
    const buttonUrl = this.safeUrl(c.button_url, "/");
    const rawImage = c.hero_image;
    const imageValue = typeof rawImage === "string" ? rawImage : rawImage?.url || rawImage?.src || "";
    const imageUrl = this.safeUrl(imageValue);
    const cssVars = [
      `--bg-1:${this.hex(c.background_color, "#003B49")}`,
      `--bg-2:${this.hex(c.background_color_2, "#062C38")}`,
      `--bg-3:${this.hex(c.background_color_3, "#091C32")}`,
      `--title:${this.hex(c.title_color, "#FFFFFF")}`,
      `--description:${this.hex(c.description_color, "#C5DCE1")}`,
      `--btn-bg:${this.hex(c.button_color, "#64E6D0")}`,
      `--btn-text:${this.hex(c.button_text_color, "#003B49")}`,
      `--badge-bg:${this.hex(c.badge_background_color, "#0A4651")}`,
      `--badge-border:${this.hex(c.badge_border_color, "#237C86")}`,
      `--badge-text:${this.hex(c.badge_text_color, "#9DF7E7")}`,
      `--art-1:${this.hex(c.graphic_primary_color, "#65F5DB")}`,
      `--art-2:${this.hex(c.graphic_secondary_color, "#0597A6")}`,
      `--art-ink:${this.hex(c.graphic_text_color, "#003B49")}`,
      `--decoration:${this.hex(c.decoration_color, "#5EEAD4")}`,
    ].join(";");
    return html`
      <section class="hero" data-style=${style} style=${cssVars} aria-label="بنر المتجر">
        <div class="content">
          ${badge.trim() ? html`<span class="badge">${badge}</span>` : nothing}
          <h2>${title}</h2>
          ${description.trim() ? html`<p>${description}</p>` : nothing}
          ${buttonLabel.trim() ? html`<a class="btn" href=${buttonUrl}>${buttonLabel}<span aria-hidden="true">←</span></a>` : nothing}
        </div>
        <div class="visual">
          ${imageUrl
            ? html`<img class="hero-image" src=${imageUrl} alt=${title} loading="lazy" />`
            : this.draw(style, graphicLabel)}
        </div>
      </section>`;
  }
}
