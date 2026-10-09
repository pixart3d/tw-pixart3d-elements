import { css, html, LitElement } from "lit";

type HeroImage = string | { url?: string; src?: string } | null;

type HeroConfig = {
  title?: string;
  content?: string;
  hero_image?: HeroImage;
  button_text?: string;
  button_url?: string;
  button_color?: string;
  button_text_color?: string;
  background_color?: string;
  background_color_2?: string;
  background_color_3?: string;
  title_color?: string;
  description_color?: string;
};

export default class PixartHero extends LitElement {
  // Important: Salla's local preview sends config as a JSON HTML attribute.
  // Lit parses it automatically when we declare the property this way.
  static properties = {
    config: { type: Object },
  };

  declare config?: HeroConfig;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: inherit;
    }

    * {
      box-sizing: border-box;
    }

    .hero {
      position: relative;
      isolation: isolate;
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
      align-items: center;
      gap: 28px;
      min-height: 360px;
      padding: clamp(30px, 5vw, 70px);
      overflow: hidden;
      border-radius: 22px;
      direction: rtl;
      background: linear-gradient(
        125deg,
        var(--pixart-bg-1, #003b49) 0%,
        var(--pixart-bg-2, #062c38) 55%,
        var(--pixart-bg-3, #091c32) 100%
      );
    }

    .hero::before {
      content: "";
      position: absolute;
      width: 350px;
      height: 350px;
      top: -160px;
      left: -100px;
      border-radius: 50%;
      background: #5eead4;
      opacity: 0.09;
      z-index: -1;
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      min-width: 0;
    }

    .tag {
      display: inline-block;
      margin-bottom: 22px;
      padding: 8px 16px;
      border: 1px solid rgba(94, 234, 212, 0.35);
      border-radius: 30px;
      background: #0a4651;
      color: #9df7e7;
      font-size: 13px;
      font-weight: 600;
    }

    h2 {
      margin: 0 0 18px;
      color: var(--pixart-title-color, #ffffff);
      font-size: clamp(28px, 4vw, 52px);
      font-weight: 800;
      line-height: 1.3;
      overflow-wrap: anywhere;
    }

    p {
      max-width: 500px;
      margin: 0 0 28px;
      color: var(--pixart-description-color, #c5dce1);
      font-size: 16px;
      line-height: 1.9;
      overflow-wrap: anywhere;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      min-height: 48px;
      padding: 14px 28px;
      border-radius: 12px;
      background: var(--pixart-button-bg, #64e6d0);
      color: var(--pixart-button-text, #003b49);
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      transition: filter 0.2s, transform 0.2s;
    }

    .btn:hover {
      filter: brightness(1.08);
      transform: translateY(-2px);
    }

    .btn:focus-visible {
      outline: 3px solid currentColor;
      outline-offset: 4px;
    }

    .visual {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      min-height: 240px;
    }

    .hero-image {
      display: block;
      width: 100%;
      max-width: 430px;
      max-height: 280px;
      object-fit: contain;
      border-radius: 16px;
      filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.16));
    }

    .art {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 210px;
      height: 210px;
      border-radius: 40px;
      background: linear-gradient(145deg, #65f5db, #0597a6);
      transform: rotate(-12deg);
      box-shadow: 25px 25px 65px rgba(0, 0, 0, 0.3);
    }

    .art::after {
      content: "";
      position: absolute;
      inset: 15px;
      border: 2px solid rgba(255, 255, 255, 0.35);
      border-radius: 30px;
    }

    .art span {
      color: #003b49;
      font-size: 48px;
      font-weight: 900;
      letter-spacing: -3px;
      transform: rotate(12deg);
    }

    @media (max-width: 768px) {
      .hero {
        grid-template-columns: minmax(0, 1fr);
        gap: 10px;
        min-height: auto;
        padding: 35px 24px;
        text-align: center;
      }

      .visual {
        min-height: 170px;
        margin-top: 14px;
      }

      .hero-image {
        max-height: 230px;
      }

      .art {
        width: 150px;
        height: 150px;
        border-radius: 30px;
      }

      .art span {
        font-size: 34px;
      }

      p {
        margin-left: auto;
        margin-right: auto;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .btn {
        transition: none;
      }

      .btn:hover {
        transform: none;
      }
    }
  `;

  private text(value: unknown, fallback: string): string {
    return typeof value === "string" && value.trim() ? value : fallback;
  }

  private hex(value: unknown, fallback: string): string {
    return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value)
      ? value
      : fallback;
  }

  private url(value: unknown, fallback = ""): string {
    if (typeof value !== "string") return fallback;
    const url = value.trim();
    if (/\s/.test(url)) return fallback;
    return /^https?:\/\/[^/\s]+/i.test(url) || /^\/(?!\/)/.test(url)
      ? url
      : fallback;
  }

  render() {
    const config = this.config ?? {};
    const title = this.text(config.title, "اكتشف عالم Pixart3D");
    const description = this.text(
      config.content,
      "منتجات مميزة وتصاميم إبداعية تناسب ذوقك."
    );
    const buttonText = this.text(config.button_text, "اكتشف المتجر");
    const buttonUrl = this.url(config.button_url, "/");

    const selectedImage = config.hero_image;
    const imageValue =
      typeof selectedImage === "string"
        ? selectedImage
        : selectedImage?.url || selectedImage?.src || "";
    const imageUrl = this.url(imageValue);

    // Only validated HEX values are interpolated into CSS variables.
    const cssVariables = [
      `--pixart-bg-1: ${this.hex(config.background_color, "#003B49")}`,
      `--pixart-bg-2: ${this.hex(config.background_color_2, "#062C38")}`,
      `--pixart-bg-3: ${this.hex(config.background_color_3, "#091C32")}`,
      `--pixart-title-color: ${this.hex(config.title_color, "#FFFFFF")}`,
      `--pixart-description-color: ${this.hex(config.description_color, "#C5DCE1")}`,
      `--pixart-button-bg: ${this.hex(config.button_color, "#64E6D0")}`,
      `--pixart-button-text: ${this.hex(config.button_text_color, "#003B49")}`,
    ].join("; ");

    return html`
      <section class="hero" aria-label="بنر المتجر" style=${cssVariables}>
        <div class="content">
          <span class="tag">✦ مرحباً بك في Pixart3D</span>
          <h2>${title}</h2>
          <p>${description}</p>
          <a class="btn" href=${buttonUrl}>
            ${buttonText}
            <span aria-hidden="true">←</span>
          </a>
        </div>

        <div class="visual">
          ${imageUrl
            ? html`<img class="hero-image" src=${imageUrl} alt=${title} />`
            : html`<div class="art" aria-hidden="true"><span>P3D</span></div>`}
        </div>
      </section>
    `;
  }
}
