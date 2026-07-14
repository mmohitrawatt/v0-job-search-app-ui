"use client"

/* ─── Auto-scrolling company logo strip (below hero) ───
   Full-colour vector logos served locally from /public/logos. */

/* `h` = optical height in px — tuned per logo so wordmarks/icons read
   at the same visual weight despite different internal whitespace. */
const COMPANIES = [
  { name: "Google",     slug: "google",     h: 36 },
  { name: "Microsoft",  slug: "microsoft",  h: 36 },
  { name: "Amazon",     slug: "amazon",     h: 36 },
  { name: "Adobe",      slug: "adobe",      h: 38 },
  { name: "Deloitte",   slug: "deloitte",   h: 32 },
  { name: "TCS",        slug: "tcs",        h: 40 },
  { name: "KPMG",       slug: "kpmg",       h: 58 },
  { name: "Dell",       slug: "dell",       h: 40 },
  { name: "PhonePe",    slug: "phonepe",    h: 36 },
  { name: "Swiggy",     slug: "swiggy",     h: 44 },
  { name: "Zomato",     slug: "zomato",     h: 32 },
  { name: "Razorpay",   slug: "razorpay",   h: 36 },
  { name: "Zoho",       slug: "zoho",       h: 36 },
  { name: "Flipkart",   slug: "flipkart",   h: 36 },
  { name: "Paytm",      slug: "paytm",      h: 40 },
  { name: "Infosys",    slug: "infosys",    h: 34 },
  { name: "Wipro",      slug: "wipro",      h: 46 },
  { name: "Accenture",  slug: "accenture",  h: 40 },
]

export function LogoMarquee() {
  const row = [...COMPANIES, ...COMPANIES] // duplicated for a seamless loop

  return (
    <section style={{ background: "#ffffff", padding: "60px 0 60px" }}>
      <style>{`
        .lm-head {
          text-align: center; font-size: 12.5px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: #94a3b8; margin-bottom: 30px;
        }
        .lm-mask {
          position: relative; overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
        }
        .lm-track {
          display: flex; align-items: center; gap: 0; width: max-content;
          animation: lm-scroll 48s linear infinite;
        }
        .lm-mask:hover .lm-track { animation-play-state: paused; }
        .lm-item {
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0; width: 176px; height: 62px;
          transition: transform .3s ease, filter .3s ease;
          filter: saturate(1);
        }
        .lm-item:hover { transform: scale(1.12); filter: saturate(1.15); }
        .lm-item img { width: auto; object-fit: contain; display: block; }
        @keyframes lm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) { .lm-track { animation: none; } }
      `}</style>

      <p className="lm-head">Explore roles at leading companies</p>
      <div className="lm-mask">
        <div className="lm-track">
          {row.map((c, i) => (
            <span key={`${c.slug}-${i}`} className="lm-item" title={c.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${c.slug}.svg`} alt={`${c.name} logo`} loading="lazy" style={{ height: c.h }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
