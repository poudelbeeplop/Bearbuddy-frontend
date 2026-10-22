import React from 'react';
import CircularCarousel from '../components/CircularCarousel.jsx';
import logoImg from '../logo.png';

const ITEMS = [
  { 
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop', 
    alt: 'Tangeman University Center', 
    title: 'Tangeman Center', 
    subtitle: 'Campus Dining & Student Hub' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop', 
    alt: 'Langsam Library', 
    title: 'Langsam Library', 
    subtitle: 'Study Spaces & Tech Lab' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop', 
    alt: 'Campus Recreation Center', 
    title: 'Campus Rec', 
    subtitle: 'Fitness & Wellness' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', 
    alt: 'Nippert Stadium Area', 
    title: 'Nippert Quad', 
    subtitle: 'Student Walkways & Events' 
  },
];

export default function WelcomePage({ onOpenLogin, onGuest }) {
  return (
    <div style={styles.welcomePage}>
      <header style={styles.header}>
        <img src={logoImg} alt="BearBuddy Logo" style={styles.logo} />
        <p style={styles.subtext}>CAMPUS NAVIGATION & COMPANION</p>
      </header>

      <div style={styles.carouselContainer}>
        <CircularCarousel 
          items={ITEMS} 
          intro="rise" 
          captions 
          tilt={-4} 
          cardWidth={180} 
          fadeColor="#000000"
        />
      </div>

      <div style={styles.actionContainer}>
        <button style={styles.signInButton} onClick={onOpenLogin}>
          Sign in
        </button>
        <button style={styles.guestButton} onClick={onGuest}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

const styles = {
  welcomePage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 16px',
    boxSizing: 'border-box',
    backgroundColor: '#000000',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '8px',
  },
  logo: {
    width: '190px',
    height: 'auto',
    objectFit: 'contain',
    mixBlendMode: 'screen',
  },
  subtext: {
    color: '#8e8e93',
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
    margin: '4px 0 0 0',
  },
  carouselContainer: {
    width: '100%',
    height: '320px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '8px',
  },
  signInButton: {
    width: '100%',
    height: '48px',
    backgroundColor: '#e00122',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(224, 1, 34, 0.4)',
  },
  guestButton: {
    width: '100%',
    height: '38px',
    backgroundColor: 'transparent',
    color: '#a1a1aa',
    border: 'none',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
};