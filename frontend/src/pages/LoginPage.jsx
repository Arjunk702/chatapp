import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthHeroGraphic from '../components/AuthHeroGraphic';

/* ─── Inline styles that mirror the reference HTML ─────────────────────────── */
const styles = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 'calc(1.25rem + 4rem) 1rem 1.25rem',
    background: '#f8f9ff',
    backgroundImage:
      'radial-gradient(at 0% 0%, hsla(220,100%,95%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(210,100%,90%,1) 0, transparent 50%)',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
    position: 'relative',
    gap: '1rem',
  },
  blob1: {
    position: 'absolute',
    top: '15%',
    left: '-1rem',
    width: '3rem',
    height: '3rem',
    background: 'rgba(164,201,255,0.3)',
    borderRadius: '9999px',
    filter: 'blur(20px)',
    animation: 'pulse-soft 3s ease-in-out infinite',
  },
  blob2: {
    position: 'absolute',
    bottom: '15%',
    right: '-1rem',
    width: '4rem',
    height: '4rem',
    background: 'rgba(180,197,255,0.4)',
    borderRadius: '9999px',
    filter: 'blur(20px)',
    animation: 'pulse-soft 3s ease-in-out infinite 1s',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '2rem',
  },
  brandIcon: {
    width: '2.5rem',
    height: '2.5rem',
    background: '#2563eb',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(0,74,198,0.35)',
  },
  brandName: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#004ac6',
    letterSpacing: '-0.02em',
    lineHeight: 1,
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    textAlign: 'center',
    marginTop: '0.1rem',
  },
  headline: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#0b1c30',
    letterSpacing: '-0.02em',
    lineHeight: '2rem',
    margin: 0,
  },
  subline: {
    fontSize: '1rem',
    color: '#434655',
    lineHeight: '1.5rem',
    margin: 0,
    padding: '0 1.5rem',
  },
  form: {
    width: '100%',
    maxWidth: '24rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '0.35rem',
  },
  fieldLabel: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#0b1c30',
    marginBottom: '0.375rem',
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: '1rem',
    color: '#737686',
    pointerEvents: 'none',
    display: 'flex',
  },
  input: {
    width: '100%',
    height: '3.25rem',
    padding: '0 1rem 0 2.75rem',
    border: '1.5px solid #d3e4fe',
    borderRadius: '9999px',
    background: 'rgba(211,228,254,0.25)',
    fontSize: '0.9375rem',
    color: '#0b1c30',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: '#004ac6',
    boxShadow: '0 0 0 3px rgba(0,74,198,0.12)',
  },
  eyeBtn: {
    position: 'absolute',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#737686',
    display: 'flex',
    padding: 0,
  },
  primaryBtn: {
    width: '100%',
    height: '3.5rem',
    background: '#004ac6',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '0.9375rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 20px rgba(0,74,198,0.25)',
    transition: 'transform 0.15s, box-shadow 0.15s',
    marginTop: '0.25rem',
  },
  secondaryBtn: {
    width: '100%',
    maxWidth: '24rem',
    height: '3.5rem',
    background: 'rgba(255,255,255,0.75)',
    color: '#004ac6',
    border: '1px solid rgba(211,228,254,0.95)',
    borderRadius: '9999px',
    fontSize: '0.9375rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(11,28,48,0.08)',
    transition: 'transform 0.15s, box-shadow 0.15s',
    textDecoration: 'none',
  },
  footer: {
    fontSize: '0.8125rem',
    color: '#737686',
    textAlign: 'center',
    marginTop: '0.25rem',
  },
  link: {
    color: '#004ac6',
    fontWeight: 600,
    textDecoration: 'none',
    marginLeft: '0.25rem',
  },
  termsText: {
    fontSize: '0.75rem',
    color: '#737686',
    textAlign: 'center',
    padding: '0 2rem',
    lineHeight: '1.4',
    marginTop: '0.5rem',
  },
  termsLink: {
    color: '#004ac6',
    fontWeight: 600,
    textDecoration: 'none',
  },
};

const FocusInput = ({ style, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      style={{ ...style, ...(focused ? styles.inputFocus : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoggingIn } = useAuthStore();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!formData.email.trim()) next.email = 'Email is required';
    if (!formData.password.trim()) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(formData);
  };

  return (
    <>
      <div style={styles.page}>
        {/* Decorative blobs */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        <AuthHeroGraphic />

        {/* Hero copy */}
        <div style={styles.hero}>
          <h1 style={styles.headline}>Welcome back</h1>
          <p style={styles.subline}>Sign in to continue your conversations</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form} aria-busy={isLoggingIn}>
          {/* Email */}
          <div>
            <label style={styles.fieldLabel}>Email</label>
            <div style={styles.inputWrap}>
              <span style={styles.iconLeft}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>
                  mail
                </span>
              </span>
              <FocusInput
                type="text"
                style={styles.input}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoggingIn}
              />
            </div>
            {errors.email ? (
              <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: '#ba1a1a' }}>
                {errors.email}
              </div>
            ) : null}
          </div>

          {/* Password */}
          <div>
            <label style={styles.fieldLabel}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.iconLeft}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>
                  lock
                </span>
              </span>
              <FocusInput
                type={showPassword ? 'text' : 'password'}
                style={{ ...styles.input, paddingRight: '3rem' }}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoggingIn}
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoggingIn}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password ? (
              <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: '#ba1a1a' }}>
                {errors.password}
              </div>
            ) : null}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={styles.primaryBtn}
            disabled={isLoggingIn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,74,198,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,74,198,0.25)';
            }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        <Link
          to="/signup"
          style={{
            ...styles.secondaryBtn,
            ...(isLoggingIn ? { pointerEvents: 'none', opacity: 0.6 } : {}),
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.01)';
            e.currentTarget.style.boxShadow = '0 14px 34px rgba(11,28,48,0.10)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(11,28,48,0.08)';
          }}
        >
          Create account
        </Link>

        <p style={styles.termsText}>
          By tapping Sign In, you agree to our{' '}
          <a href="#" style={styles.termsLink}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" style={styles.termsLink}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default LoginPage;
