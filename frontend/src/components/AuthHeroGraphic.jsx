import React from 'react';
import { Users } from 'lucide-react';

const styles = {
  wrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0.75rem',
    marginBottom: '0.15rem',
  },
  ring: {
    width: 'clamp(14.25rem, 62vw, 19.5rem)',
    height: 'clamp(14.25rem, 62vw, 19.5rem)',
    borderRadius: '9999px',
    background:
      'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 55%), linear-gradient(180deg, rgba(219,234,254,0.2) 0%, rgba(180,197,255,0.35) 100%)',
    border: '4px solid rgba(255,255,255,0.95)',
    boxShadow: '0 16px 50px rgba(11,28,48,0.08)',
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    width: '86%',
    height: '86%',
    borderRadius: '9999px',
    background:
      'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.65) 55%, rgba(211,228,254,0.35) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  platform: {
    position: 'absolute',
    left: '50%',
    bottom: '18%',
    transform: 'translateX(-50%)',
    width: '70%',
    height: '14%',
    borderRadius: '9999px',
    background: 'linear-gradient(180deg, rgba(219,234,254,0.9), rgba(211,228,254,0.55))',
    boxShadow: '0 10px 30px rgba(11,28,48,0.08)',
  },
  bubble: {
    position: 'absolute',
    width: '3.1rem',
    height: '2.45rem',
    borderRadius: '9999px',
    background: 'rgba(255,255,255,0.55)',
    border: '1px solid rgba(255,255,255,0.65)',
    boxShadow: '0 8px 18px rgba(11,28,48,0.08)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    animation: 'float-y 4s ease-in-out infinite',
  },
  dot: {
    width: '0.32rem',
    height: '0.32rem',
    borderRadius: '9999px',
    background: 'rgba(81,96,112,0.65)',
  },
  pill: {
    position: 'absolute',
    left: '50%',
    bottom: '-0.95rem',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.9rem 1.1rem',
    borderRadius: '1.25rem',
    background: 'rgba(255,255,255,0.9)',
    border: '1px solid rgba(211,228,254,0.75)',
    boxShadow: '0 18px 45px rgba(11,28,48,0.12)',
    minWidth: 'clamp(13.5rem, 72vw, 15.5rem)',
    justifyContent: 'center',
  },
  avatars: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '2rem',
    height: '2rem',
    borderRadius: '9999px',
    background: 'linear-gradient(180deg, rgba(33,49,69,0.9), rgba(11,28,48,0.75))',
    border: '2px solid rgba(255,255,255,0.95)',
    boxShadow: '0 8px 18px rgba(11,28,48,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.9)',
  },
  pillText: {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#004ac6',
    letterSpacing: '-0.01em',
    lineHeight: 1,
  },
};

const Bubble = ({ style }) => (
  <div style={{ ...styles.bubble, ...style }}>
    <span style={styles.dot} />
    <span style={styles.dot} />
    <span style={styles.dot} />
  </div>
);

export default function AuthHeroGraphic({ connectedText = '12M+  Connected' }) {
  return (
    <div style={styles.wrap} aria-hidden="true">
      <div style={styles.ring}>
        <div style={styles.scene}>
          <Bubble style={{ left: '16%', top: '40%', transform: 'rotate(-6deg)' }} />
          <Bubble
            style={{
              left: '40%',
              top: '28%',
              width: '2.8rem',
              height: '2.15rem',
              opacity: 0.9,
              animationDelay: '0.8s',
            }}
          />
          <Bubble style={{ right: '18%', top: '30%', transform: 'rotate(8deg)', animationDelay: '1.4s' }} />
          <div style={styles.platform} />
        </div>

        <div style={styles.pill}>
          <div style={styles.avatars}>
            <div style={styles.avatar}>
              <Users size={16} />
            </div>
            <div style={{ ...styles.avatar, marginLeft: '-0.6rem', opacity: 0.92 }}>
              <Users size={16} />
            </div>
          </div>
          <div style={styles.pillText}>{connectedText}</div>
        </div>
      </div>
    </div>
  );
}
