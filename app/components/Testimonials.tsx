import { Play } from 'lucide-react'

// FEATURE FLAG — testimonials are OFF until real, client-approved reviews exist.
//
// The section below is complete and styled, but every slot in it is empty
// ("Client-approved written review will be added here", "Written review slot").
// Rendering it tells every visitor that nobody has bought anything yet, so it is
// switched off rather than deleted.
//
// To switch it back on: set SHOW_TESTIMONIALS to true, fill the cards with real
// approved reviews, and restore the "Testimonials" link in app/components/SiteHeader.tsx
// and in the footer of app/layout.tsx.
//
// Do NOT turn this on with example, sample, or "coming soon" content in the slots.
export const SHOW_TESTIMONIALS = false

export default function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null

  return (
    <section className="testimonials-section section-narrow" id="testimonials">
      <div className="launch-section-head testimonial-head">
        <div className="section-label">Client stories</div>
        <h2>Real experiences will live here.</h2>
        <p>Written reviews, training reviews, and mobility-session videos will only be published after each client gives permission.</p>
      </div>
      <div className="testimonial-grid intentional-two">
        <article className="testimonial-card">
          <div className="testimonial-top"><span className="testimonial-service">Mobility</span><span className="testimonial-name">Client first name</span></div>
          <div className="testimonial-quote-mark">“</div>
          <p>Client-approved written review will be added here.</p>
          <small>Written review slot</small>
        </article>
        <article className="testimonial-card video-card">
          <div className="video-placeholder" role="img" aria-label="Vertical client video placeholder">
            <div className="video-phone"><Play size={28}/><span>9:16 client video</span></div>
          </div>
          <div className="testimonial-top"><span className="testimonial-service">Mobility session</span><span className="testimonial-name">Client first name</span></div>
          <p>Approved phone-shot training or mobility footage can be placed here with a poster image, native controls, captions when available, and no autoplay.</p>
          <small>Video loads only when real approved media is added.</small>
        </article>
      </div>
    </section>
  )
}
