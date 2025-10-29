import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Beams from './Beams';
import zb from './img/image.png'

function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your event date here
  const eventDate = new Date('2025-10-29T11:07:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
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

  const handleRegister = () => {
    // Navigate to registration page or open registration form
    window.location.href = '/register';
  };

  const handleDownloadGuidelines = () => {
    // Create guidelines PDF content
    const guidelinesText = `
ResearchAThon Guidelines

1. Team Formation
   - Teams can have 1-5 members
   - Each team must have a faculty guide
   - All team members must be from the same institution

2. Eligibility
   - Open to undergraduate and postgraduate students
   - Valid student ID required
   - All disciplines welcome

3. Project Requirements
   - Original research work
   - Clear problem statement and methodology
   - Implementation or prototype preferred
   - Proper documentation required

4. Submission Guidelines
   - Submit project abstract (500 words max)
   - Include project timeline
   - Mention technologies/methodologies used
   - List all team members and guide details

5. Evaluation Criteria
   - Innovation and originality (30%)
   - Technical implementation (25%)
   - Social impact (20%)
   - Presentation quality (15%)
   - Feasibility (10%)

6. Important Dates
   - Registration deadline: Check website
   - Abstract submission: Check website
   - Final presentation: Check website

7. Rules and Regulations
   - Plagiarism will lead to disqualification
   - Decision of judges is final
   - Code of conduct must be followed
   - All participants must be present during presentation

For more information, contact the organizing committee.
    `;

    const blob = new Blob([guidelinesText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ResearchAThon_Guidelines.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };


// const handleDownloadGuidelines = () => {
//   const link = document.createElement('a');
//   link.href = 'https://example.com/ResearchAThon_Guidelines.pdf';
//   link.download = 'ResearchAThon_Guidelines.pdf';
//   link.target = '_blank'; // optional — opens new tab
//   link.click();
// };



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
            <h1 className={styles.title}>
              Research<span className={styles.titleHighlight}>A</span>Thon
            </h1>
            <p className={styles.tagline}>Innovate. Research. Transform.</p>
          </div>

          {/* Countdown Timer */}
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

          {/* CTA Button */}
          <button className={styles.ctaButton}   onClick={() => window.open("https://forms.gle/2CBuPh26GHBUCZLz8", "_blank")}
>
            <span>Register Now - Don't Miss Out!</span>
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <div className={styles.heroAnimation}>
          <div className={styles.floatingCircle}></div>
          <div className={styles.floatingCircle}></div>
          <div className={styles.floatingCircle}></div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Guidelines</h2>
          <div className={styles.actionButtons}>
            <button className={styles.downloadBtn} onClick={handleDownloadGuidelines}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
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
            <div className={styles.guidelineIcon}>👥</div>
            <h3>Team Formation</h3>
            <p>Teams can have 1-5 members with a faculty guide. All members must be from the same institution.</p>
          </div>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineIcon}>✅</div>
            <h3>Eligibility</h3>
            <p>Open to all undergraduate and postgraduate students with valid student ID.</p>
          </div>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineIcon}>💡</div>
            <h3>Project Requirements</h3>
            <p>Original research work with clear problem statement, methodology, and proper documentation.</p>
          </div>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineIcon}>📝</div>
            <h3>Submission</h3>
            <p>Submit project abstract (500 words max), timeline, technologies used, and team details.</p>
          </div>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineIcon}>⭐</div>
            <h3>Evaluation</h3>
            <p>Judged on innovation, technical implementation, social impact, presentation, and feasibility.</p>
          </div>
          <div className={styles.guidelineCard}>
            <div className={styles.guidelineIcon}>📋</div>
            <h3>Rules</h3>
            <p>No plagiarism. Follow code of conduct. All team members must be present during presentation.</p>
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
            </div>
          </div>\

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Briefing and Commencement</h3>
              <p>-Expert Faculties will be interacting with the students and educating them about the process from Format to Publishing.<br/> -Start working on your Reasearch Paper.</p>
              <span className={styles.timelineDate}>Week 1</span>
              <span className={styles.timelineDate}>Briefing</span>
              <span className={styles.timelineDate}>Goodies</span>
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
            </div>
          </div>
        </div>
      </section>

      {/* Organizing Club Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Organized By</h2>
        <div className={styles.clubCard}>
          <div className={styles.clubLogo}>
            {/* <div className={styles.logoCircle}>RC</div> */}
            <img className={styles.logo} src={zb}></img>
          </div>
          <div className={styles.clubInfo}>
            <h3>The Zigbee Club</h3>
            <p>Fostering innovation and research excellence among students. We organize hackathons, workshops, and research seminars to promote technological advancement and creative problem-solving.</p>
            <div className={styles.clubStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Members</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Events</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📧</div>
            <h3>Email</h3>
            <p>researchathon@college.edu</p>
            <p>innovationclub@college.edu</p>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📱</div>
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
            <p>+91 98765 43211</p>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>📍</div>
            <h3>Location</h3>
            <p>Main Auditorium</p>
            <p>College Campus, City</p>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>🌐</div>
            <h3>Social Media</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>Instagram</a>
              <a href="#" className={styles.socialLink}>LinkedIn</a>
              <a href="#" className={styles.socialLink}>Twitter</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 ResearchAThon. All rights reserved.</p>
        <p>Organized by Research & Innovation Club</p>
      </footer>
    </div>
  );
}

export default Home;