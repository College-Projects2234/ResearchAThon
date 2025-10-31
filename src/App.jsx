import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Beams from './Beams';
import zb from './img/image.png'
import xl from './img/tx.svg'
import hack from './img/img2.jpg'
import guidelinePDF from './assets/ResearchAThon_Guidelines.pdf';
import posterPDF from './assets/Poster.pdf';

function Home() {
const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});
const [eventStarted, setEventStarted] = useState(false);

// Set your event date here
const eventDate = new Date('2025-11-05T09:00:00').getTime();

useEffect(() => {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;
    // console.log(distance)
    if (distance <= 0) {
      clearInterval(timer);
      setEventStarted(true);
      return;
    }

    setTimeLeft({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    });
  }, 1000);

  return () => clearInterval(timer);
}, [eventDate]);




const handleDownloadGuidelines = () => {
  const link = document.createElement('a');
  link.href = guidelinePDF;
  link.download = 'ResearchAThon_Guidelines.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const handleDownloadGuideliness = () => {
  const link = document.createElement('a');
  link.href = posterPDF;
  link.download = 'Poster.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ResearchAThon',
          text: 'Join us at ResearchAThon - An Innovation Challenge!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
          {/* Beams Background */}
        <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <Beams
            beamWidth={2}
            beamHeight={18}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.25}
            rotation={0}
          />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.zgb}>
              {/* <img className={styles.logo} src={zb}></img> */}
              <span className={styles.zgbHighlight}>Zigbee </span><span className={styles.presents}>Presents </span>
            </h1>
            <h1 className={styles.title}>
              Rezo<span className={styles.titleHighlight}>N</span>ix
            </h1>
            <h1 className={styles.sub}>
              ResearchThon
            </h1>
            <p className={styles.tagline}>Research. Transform. Publish.</p>
          </div>

          {/* Countdown Timer */}
{/* Countdown Timer */}
{eventStarted ? (
  <div className={styles.eventStarted}>
    <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1.5rem'}}>
      Event Started! 🎉<br/>
    </h2>
  </div>
) : (
  <div className={styles.countdown}>
    <div className={styles.timeBlock}>
      <span className={styles.timeNumber}>{timeLeft.days}</span>
      <span className={styles.timeLabel}>Days</span>
    </div>
    <div className={styles.timeSeparator}>:</div>
    <div className={styles.timeBlock}>
      <span className={styles.timeNumber}>{timeLeft.hours}</span>
      <span className={styles.timeLabel}>Hours</span>
    </div>
    <div className={styles.timeSeparator}>:</div>
    <div className={styles.timeBlock}>
      <span className={styles.timeNumber}>{timeLeft.minutes}</span>
      <span className={styles.timeLabel}>Minutes</span>
    </div>
    <div className={styles.timeSeparator}>:</div>
    <div className={styles.timeBlock}>
      <span className={styles.timeNumber}>{timeLeft.seconds}</span>
      <span className={styles.timeLabel}>Seconds</span>
    </div>
  </div>
)}

          {/* CTA Button */}
{/* CTA Button - Only show before event starts */}
{!eventStarted && (
  <button className={styles.ctaButton} onClick={() => window.open("https://forms.gle/2CBuPh26GHBUCZLz8", "_blank")}>
    <span>Register Now - Don't Miss Out!</span>
    <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </button>
)}

        </div>
{/* 
        <div className={styles.heroAnimation}>
          <div className={styles.floatingCircle}></div>
          <div className={styles.floatingCircle}></div>
          <div className={styles.floatingCircle}></div>
        </div> */}
      </section>

      {/* Guidelines Section */}
<section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About Event</h2>          
          <div className={styles.actionButtons}>
            <button className={styles.downloadBtn} onClick={handleDownloadGuidelines}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Poster
            </button>
            <button className={styles.shareBtn} onClick={handleShare}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
        
        <div className={styles.guidelinesGrid}>
          <div className={styles.guidelineCard}>
          <div className={styles.guidelineIcon}>
            <h1 className={styles.subb}>
              ResearchThon
            </h1>
          </div>
          <p>This event aims to encourage innovation and research among CSE students. Participants will showcase their original ideas and findings through a short presentation and paper submission. It’s a platform to share knowledge, explore emerging technologies, and inspire creative problem-solving within the computing community.</p>
        </div>

        </div>
</section>
<section className={styles.section}>
        <div className={styles.sectionHeader}>          
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.cardCont}>
            <div className={styles.guidelineCardd}>
              <ul>
                <li><i class="fa-regular fa-circle-check"></i>  Open to all B.Tech and M.Tech CSE students.</li>
                <li><i class="fa-regular fa-circle-check"></i>  Participants can compete individually or in teams.</li>
                <li><i class="fa-regular fa-circle-check"></i>  Teams may include members from different years or specializations.</li>
                <li><i class="fa-regular fa-circle-check"></i>  Each team must have a faculty mentor/guide.</li>
                <li><i class="fa-regular fa-circle-check"></i>  Participants can choose their own research topic with mentor approval.</li>
                <li><i class="fa-regular fa-circle-check"></i>  Research work must be original, innovative, and plagiarism-free.</li>
                <li><i class="fa-regular fa-circle-check"></i>  The event flow and evaluation process will be explained during Week 1.</li>
                <li><i class="fa-regular fa-circle-check"></i>  Plagiarism beyond acceptable limits will lead to disqualification.</li>
              </ul>
            </div>
            <div>
            <div className={styles.xll}>
              <img src={xl}/>
            </div>
            </div>
          </div>


        </div>

</section>

      {/* Event Flow Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Event Flow</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Registration & Team Formation</h3>
              <p>Register your team & faculty guide details and Topic .</p>
              <span className={styles.timelineDate}>Registration</span>
              <span className={styles.timelineDate}>Team Formation</span>
              <span className={styles.lineDate}><span className={styles.tx}>Closes</span> on  05-11-2025</span>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Briefing and Commencement</h3>
              <p>-Expert Faculties will be interacting with the students and educating them about the process from Format to Publishing.<br/> -Start working on your Reasearch Paper.</p>
              <span className={styles.timelineDate}>Week 1</span>
              <span className={styles.timelineDate}>Briefing</span>
              <span className={styles.timelineDate}>Goodies</span>
              <span className={styles.lineDate}>05-11-2025</span>

            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Abstract Submission</h3>
              <p>- Stuents will present the basic idea behind their project and present it.<br/>-Participants will come with their half completed paper and interact with the mentors to get feedbacks, doubts and improvements.</p>
              <span className={styles.timelineDate}>Week 2</span>
              <span className={styles.timelineDate}>Presentation</span>
              <span className={styles.timelineDate}>Quiz</span>
              <span className={styles.lineDate}>12-11-2025</span>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Final Presentation</h3>
              <p>-Present your research work to the jury. Showcase your innovation and implementation.<br/>-Judges will evaluate the scores.</p>
              <span className={styles.timelineDate}>Week 3</span>
              <span className={styles.timelineDate}>Quiz</span>
              <span className={styles.timelineDate}>Evaluation</span>
              <span className={styles.lineDate}>19-11-2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Organizing Club Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Organized By</h2>
        <div className={styles.clubCard}>
          <div className={styles.clubLogo}>
            <img className={styles.logo} src={zb}></img>
          </div>
          <div className={styles.clubInfo}>
            <h3>The <span className={styles.zgbHighlight}>Zigbee </span> Club</h3>
            <p>Fostering innovation and research excellence among students. We organize hackathons, workshops, and research seminars to promote technological advancement and creative problem-solving.</p>
            <div className={styles.clubStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>55+</span>
                <span className={styles.statLabel}>Members</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Events</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>45+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.section}>
        {/* <h2 className={styles.sectionTitle}>Contact Us</h2> */}
        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📍</div>
            <h3>Venue</h3>
            <p>Seminar Hall - FET</p>
            {/* <p>Room no-001</p> */}
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>🌐</div>
            <h3>Social Media</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/zigbee_ju?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank' rel='noopener noreferrer' className={styles.socialLink}><i class="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/company/zigbee-club-fetju/" target='_blank' rel='noopener noreferrer' className={styles.socialLink}><i class="fab fa-linkedin"></i></a>
              {/* <a href="https://chat.whatsapp.com/KaxOWNmnWx5C7niGCgd7s0" target='_blank' rel='noopener noreferrer' className={styles.socialLink}><i class="fab fa-whatsapp"></i></a> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 RezoNix. All rights reserved.</p>
        <p>Organized by The Zigbee Club</p>
      </footer>
    </div>
  );
}

export default Home;