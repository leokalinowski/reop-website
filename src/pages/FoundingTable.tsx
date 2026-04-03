import { useEffect, useRef } from 'react';
import './FoundingTable.css';
import SEO from '@/components/SEO';

const APPLY_URL = 'https://buy.stripe.com/14A4gBgz08mGgCx2js0x200';

const FoundingTable = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    pageRef.current.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="founding-table-page" ref={pageRef}>
      <SEO
        title="The Founding Table — SphereSync"
        description="A personal invitation to join the SphereSync Founding Table. 50 seats. Six months. Prove the sphere model works."
      />

      {/* TOP MARK */}
      <div className="top-mark">
        <span className="top-mark-brand">SphereSync · Real Estate on Purpose</span>
        <span className="top-mark-label">By Invitation Only</span>
      </div>

      {/* HERO */}
      <div className="ft-hero fade-up">
        <div className="invite-flag">
          <div className="invite-flag-dot"></div>
          <span className="invite-flag-text">A personal invitation from Pam &amp; JJ</span>
        </div>
        <h1 className="hero-headline">
          We didn't get into real estate to be treated like a commodity —<br />
          like our <em>experience doesn't matter.</em>
        </h1>
        <div className="hero-rule"></div>
        <p className="scroll-hint">Read my letter <span className="scroll-arrow">↓</span></p>
      </div>

      {/* LETTER GRID */}
      <div className="letter-grid fade-up">
        <div>
          <img src="/images/pam-obryant.jpg" alt="Pam" className="letter-photo" />
          <p className="photo-caption">28 years · Keller Williams<br />MREA Mastermind<br />Real Estate on Purpose</p>
        </div>
        <div className="letter-body">
          <p>And yet — here we are. Interviewing against agents with six months of experience. Competing on commission with people who don't know the neighborhood, don't know the client, and won't be around in two years. The industry told us to buy more leads, build a farm, go viral — and we did. And somewhere in all of that, we stopped calling the people who would actually choose us.</p>
          <p><strong>Here's what I know: your best clients didn't come from Zillow.</strong> They just think you forgot about them.</p>
          <p>I built SphereSync to do one thing: replace the energy-stealing noise with a simple system. Every Monday, your list is waiting — the right people, this week, already screened. No strategy to figure out. No guilt. No wondering what to say. Just your people, ready to hear from you.</p>
          <div className="pullquote">
            <p>"Do you like working with people who beat you up on commission? Who don't trust or value you? No? Then why, if I looked at how you actually spend your time and money, would I still see that?"</p>
          </div>
          <p>The room always gets quiet when I ask that. Because we already know the answer. The problem was never knowledge or motivation. It was the <em>system</em> — consistently, automatically, without adding another thing to an already overwhelming week.</p>
          <p>And now I'm inviting a small group of people — people I know and trust, people who've sat in rooms with me — to be part of what we're calling <strong>The Founding Table.</strong> Not as customers. As collaborators.</p>
        </div>
      </div>

      {/* CTA 1 */}
      <div className="btn-wrap fade-up">
        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="ft-btn">Reserve My Seat at the Founding Table</a>
        <p className="btn-sub">Have a question first? Text Pam: <a href="sms:+12102628919">210-262-8919</a></p>
      </div>

      <hr className="ft-divider" />

      {/* STATS */}
      <div className="stats-row fade-up">
        <div className="stat-block">
          <div className="stat-num">8–15</div>
          <div className="stat-label">inactive relationships found in a single Rolling Audit</div>
        </div>
        <div className="stat-block">
          <div className="stat-num">1+</div>
          <div className="stat-label">transaction waiting on average in that first session</div>
        </div>
        <div className="stat-block">
          <div className="stat-num">$15K</div>
          <div className="stat-label">average commission per sphere transaction</div>
        </div>
      </div>

      {/* WHAT WE'RE BUILDING */}
      <div className="section-head fade-up">
        <div className="section-label">What we're building together</div>
        <h2 className="section-headline">The Founding Table isn't a course. It's a small group of agents who already know this works — finally with the system behind them.</h2>
        <p className="section-sub">You're the first group getting access to SphereSync. Until now we've only used it with premium clients.</p>
      </div>

      <div className="cards-grid fade-up">
        <div className="ft-card">
          <div className="card-icon">📋</div>
          <div className="card-title">The Rolling Audit — every week</div>
          <div className="card-body">Your letter range, your contacts, handed to you every Monday. DNC checked automatically. You make the calls — the system does everything else.</div>
        </div>
        <div className="ft-card">
          <div className="card-icon">🤝</div>
          <div className="card-title">Direct access to me</div>
          <div className="card-body">Three private sessions — onboarding, 90 days, 180 days. You, me, your business. Helping you fall in love with real estate again.</div>
        </div>
        <div className="ft-card">
          <div className="card-icon">🛠️</div>
          <div className="card-title">Weekly office hours — the whole team</div>
          <div className="card-body">Marketing, tech, operations, and me — each of us takes a week. Real answers, every week, for six months. Never figure it out alone.</div>
        </div>
        <div className="ft-card">
          <div className="card-icon">🪑</div>
          <div className="card-title">A seat at the table — and a point to prove</div>
          <div className="card-body">There are voices saying the sphere model is dead. We're going to prove them wrong — together, with real numbers, from real agents.</div>
        </div>
      </div>

      {/* DASHBOARD PREVIEW */}
      <div className="section-head fade-up" style={{ paddingBottom: '1rem' }}>
        <div className="section-label">What Monday morning looks like</div>
        <h2 className="section-headline" style={{ fontSize: '1.4rem' }}>Your list is already waiting. You just show up.</h2>
      </div>

      <div className="dashboard-wrap fade-up">
        <div className="dashboard">
          <div className="db-header">
            <span className="db-brand">SphereSync</span>
            <span className="db-badge">Week 14 · Current</span>
          </div>
          <div className="db-stats">
            <div className="db-stat">
              <div className="db-stat-label">This Week</div>
              <div className="db-stat-val">S, X</div>
              <div className="db-stat-sub">Calls: S, X · Text: S</div>
            </div>
            <div className="db-stat">
              <div className="db-stat-label">Call Tasks</div>
              <div className="db-stat-val">8</div>
              <div className="db-stat-sub">Ready to go</div>
            </div>
            <div className="db-stat">
              <div className="db-stat-label">Text Tasks</div>
              <div className="db-stat-val">8</div>
              <div className="db-stat-sub">Ready to go</div>
            </div>
            <div className="db-stat">
              <div className="db-stat-label">DNC Screened</div>
              <div className="db-stat-val">✓</div>
              <div className="db-stat-sub">All contacts checked</div>
            </div>
          </div>
          <div className="db-tabs">
            <div className="db-tab on">Calls (8)</div>
            <div className="db-tab off">Texts (8)</div>
          </div>
          <div className="db-row">
            <div className="db-left">
              <div className="db-check"></div>
              <div><div className="db-name">Laura Schwartz</div><div className="db-phone">703-283-6120</div></div>
            </div>
            <div className="db-right"><span className="ft-badge badge-cat">Cat: S</span><span className="ft-badge badge-dnc">DNC</span></div>
          </div>
          <div className="db-row">
            <div className="db-left">
              <div className="db-check"></div>
              <div><div className="db-name">Veronica Seva-Gonzalez</div><div className="db-phone">703-266-7277</div></div>
            </div>
            <div className="db-right"><span className="ft-badge badge-cat">Cat: S</span></div>
          </div>
          <div className="db-row">
            <div className="db-left">
              <div className="db-check"></div>
              <div><div className="db-name">Ashley Spencer</div><div className="db-phone">703-598-9385</div></div>
            </div>
            <div className="db-right"><span className="ft-badge badge-cat">Cat: S</span><span className="ft-badge badge-dnc">DNC</span></div>
          </div>
          <div className="db-opener">
            <span className="db-opener-label">Suggested opener</span>
            <span className="db-opener-text">"Hey — you came to mind today. How have you been?"</span>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="section-head fade-up" style={{ paddingBottom: '1rem' }}>
        <div className="section-label">What happens when you sign up</div>
        <h2 className="section-headline" style={{ fontSize: '1.4rem' }}>From sign-up to first Rolling Audit — here's the path.</h2>
      </div>

      <div className="timeline-wrap fade-up">
        <div className="timeline">
          <div className="timeline-step">
            <div className="timeline-dot"><span>1</span></div>
            <div className="timeline-content">
              <div className="timeline-title">Within 24 hours — your Hub access arrives</div>
              <div className="timeline-body">Your SphereSync Hub login lands in your inbox. Upload up to 500 contacts and the system begins calculating your Sphere Yield, Opportunity Gap, and Uncaptured GCI.</div>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-dot"><span>2</span></div>
            <div className="timeline-content">
              <div className="timeline-title">Need help? Implementation Lab — Mon &amp; Thu</div>
              <div className="timeline-body">JJ and Leonardo run live sessions to walk you through exporting your CRM and uploading your CSV. Most founders are fully set up after one session.</div>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-dot active"><span>3</span></div>
            <div className="timeline-content">
              <div className="timeline-title">Your Opportunity Audit unlocks automatically</div>
              <div className="timeline-body">Once processed, your booking link opens. We review your Sphere Yield and Opportunity Gap together — and turn the numbers into a weekly activation plan.</div>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-dot active"><span>4</span></div>
            <div className="timeline-content">
              <div className="timeline-title">First Monday — your Rolling Audit is waiting</div>
              <div className="timeline-body">Your first list is ready. The right people, this week, DNC screened. You make the calls. The system tracks everything and hands you the next group next week.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA before offer */}
      <div className="btn-wrap fade-up">
        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="ft-btn">Reserve My Seat at the Founding Table</a>
        <p className="btn-sub">Have a question first? Text Pam: <a href="sms:+12102628919">210-262-8919</a></p>
      </div>

      {/* OFFER */}
      <div className="section-head fade-up">
        <div className="section-label">Your seat at the Founding Table</div>
        <h2 className="section-headline">This is a mission, not a subscription.</h2>
        <p className="section-sub">We're going to prove — with real numbers, from real agents — that you can still build a thriving business on trust, not transactions. Here's what we're doing together for six months.</p>
      </div>

      <div className="offer-wrap fade-up">
        <div className="offer-card">
          <div className="offer-header">
            <span className="offer-name">SphereSync — Founding Table</span>
            <div className="offer-price">
              <span className="offer-price-num">$997</span>
              <span className="offer-price-note">one-time · six months included</span>
            </div>
          </div>
          <div className="offer-body">
            <div className="offer-items">
              <div className="offer-item">
                <span className="offer-num">01</span>
                <div>
                  <div className="offer-item-title">Six months of SphereSync</div>
                  <div className="offer-item-body">Weekly Rolling Audits, DNC screening, conversation starters, contact tracking. Your list is ready every Monday.</div>
                  <span className="offer-item-tag">Starts your first Monday after upload</span>
                </div>
              </div>
              <div className="offer-item">
                <span className="offer-num">02</span>
                <div>
                  <div className="offer-item-title">Three private strategy sessions with Pam</div>
                  <div className="offer-item-body">One-on-one. Not a group call. Not a recording. You, me, your business — helping you fall in love with real estate again.</div>
                  <span className="offer-item-tag">Onboarding · 90 days in · 180 days in</span>
                </div>
              </div>
              <div className="offer-item">
                <span className="offer-num">03</span>
                <div>
                  <div className="offer-item-title">Weekly office hours — the whole team</div>
                  <div className="offer-item-body">Marketing, tech, operations, and Pam — each of us takes a week. Real answers, every week, for six months.</div>
                  <span className="offer-item-tag">Never figure it out alone</span>
                </div>
              </div>
              <div className="offer-item">
                <span className="offer-num">04</span>
                <div>
                  <div className="offer-item-title">Founding Table designation — permanent</div>
                  <div className="offer-item-body">You're a founder. Your $149/mo rate is locked — forever. That's our commitment to the people who believed in this first.</div>
                  <span className="offer-item-tag">Locked pricing · never increases</span>
                </div>
              </div>
              <div className="offer-item">
                <span className="offer-num">05</span>
                <div>
                  <div className="offer-item-title">Sphere Opportunity Audit</div>
                  <div className="offer-item-body">Sphere Yield, Opportunity Gap, Uncaptured GCI — calculated from your database, reviewed together, turned into a plan.</div>
                  <span className="offer-item-tag">Unlocks automatically after upload</span>
                </div>
              </div>
            </div>
            <div className="offer-after">
              After six months, your rate stays at <strong>$149/month</strong> — locked in, no increases, ever. Founding Table pricing is permanent.
            </div>
          </div>
        </div>
      </div>

      {/* FOR / NOT FOR */}
      <div className="section-head fade-up" style={{ paddingBottom: '1rem' }}>
        <div className="section-label">Is this for you?</div>
      </div>
      <div className="fnf-grid fade-up">
        <div className="fnf-col">
          <div className="fnf-label yes">This is for you if…</div>
          <div className="fnf-item yes"><span>→</span><span>You believe your best business comes from people who already know you</span></div>
          <div className="fnf-item yes"><span>→</span><span>You're tired of competing on commission with agents who don't know the client</span></div>
          <div className="fnf-item yes"><span>→</span><span>You want a system that tells you what to do — not more things to figure out</span></div>
          <div className="fnf-item yes"><span>→</span><span>You want to be part of proving this model still works</span></div>
        </div>
        <div className="fnf-col">
          <div className="fnf-label no">Probably not if…</div>
          <div className="fnf-item no"><span>→</span><span>You love calling expireds and FSBOs</span></div>
          <div className="fnf-item no"><span>→</span><span>You're looking for a lead generation system</span></div>
        </div>
      </div>

      {/* SCARCITY */}
      <div className="scarcity-wrap fade-up">
        <div className="scarcity">
          <span className="scarcity-icon">🪑</span>
          <div>
            <div className="scarcity-title">50 seats. That's it. That's the whole table.</div>
            <div className="scarcity-sub">I'm introducing SphereSync publicly on April 22nd. I wanted you to have a seat before the room finds out it exists. Founding Table seats close April 22nd — or when all 50 are filled.</div>
          </div>
        </div>
      </div>

      {/* CTA 2 */}
      <div className="btn-wrap fade-up">
        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="ft-btn ft-btn--block" style={{ maxWidth: 440, margin: '0 auto', display: 'block' }}>Reserve My Seat at the Founding Table</a>
        <p className="btn-sub">Have a question? Text Pam: <a href="sms:+12102628919">210-262-8919</a></p>
      </div>

      <hr className="ft-divider" />

      {/* JJ SECTION */}
      <div className="jj-section fade-up">
        <div className="jj-inner">
          <div>
            <img src="/images/jj-camera.jpg" alt="JJ" className="jj-photo" />
          </div>
          <div className="jj-content">
            <div className="jj-label">A note from JJ</div>
            <p className="jj-quote">"I've worked alongside real estate agents for years, and I've seen the care, hard work, and value you bring to your clients every day. I've also seen how hard it's gotten to communicate that value while juggling everything else in your business. SphereSync was built to cut through the noise and give you a clear weekly system for growth. It's the system that finally lets your work speak for itself."</p>
            <div className="jj-sig">JJ</div>
            <div className="jj-role">CMO · Real Estate on Purpose</div>
          </div>
        </div>
      </div>

      <hr className="ft-divider" />

      {/* SIGNATURE SECTION */}
      <div className="sig-section fade-up">
        <div className="sig-body">
          <p>For twenty-eight years I've been standing in rooms saying the same thing: call your sphere, be their person, stop chasing strangers. And for twenty-eight years I've watched us all nod — and then go home and get pulled right back into the noise.</p>
          <p>I got tired of beating us up about it. There was just too much in the way — too much noise, too many tools, too many gurus selling the next shiny thing. So instead of another class, another framework, another thing to feel guilty about not doing — <strong>I decided to build the fix.</strong></p>
          <p>The loudest agents rarely build the best businesses. SphereSync is how you stay the one your clients call first. That's what we're building infrastructure for.</p>
          <p>If that's the agent you want to be — or the agent you already are but haven't been able to sustain — <strong>this is for you.</strong></p>
        </div>
        <div className="signatures">
          <div className="sig-block">
            <span className="sig-name">Pam</span>
            <span className="sig-role">Founder · Real Estate on Purpose</span>
            <span className="sig-role">28 Years · KW · MREA Mastermind</span>
          </div>
          <div className="sig-block">
            <span className="sig-name">JJ</span>
            <span className="sig-role">CMO · Real Estate on Purpose</span>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="final-band fade-up">
        <p className="final-quote">The loudest agents rarely build the best businesses.</p>
        <p className="final-sub">SphereSync is how you stay the one your clients call first.</p>
        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="ft-btn ft-btn--block" style={{ maxWidth: 440, margin: '0 auto', display: 'block' }}>Reserve My Seat at the Founding Table</a>
        <p className="btn-sub" style={{ marginTop: '.75rem' }}>Text Pam: <a href="sms:+12102628919">210-262-8919</a></p>
        <p className="final-tagline">Fall in love with real estate again.</p>
      </div>

      {/* FOOTER */}
      <footer className="ft-footer">
        <p className="footer-text">SphereSync · Real Estate on Purpose · <a href="https://realestateonpurpose.com">realestateonpurpose.com</a></p>
      </footer>
    </div>
  );
};

export default FoundingTable;
