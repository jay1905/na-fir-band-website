const theme = {
  colors: {
    primary: '#2d3436',
    accent: '#0984e3',
    background: '#1a1a1a',
    cardBg: '#2d2d2d',
    text: '#dfe6e9',
    lightText: '#b2bec3',
    border: '#4d4d4d',
    error: '#d63031',
    success: '#00b894',
    warning: '#fdcb6e',
  },

  fonts: {
    body: "'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    heading: "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },

  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },

  headerHeight: '80px',
  maxWidth: '1200px',
  sidebarWidth: '250px',

  transitions: {
    standard: '0.3s ease',
    slow: '0.6s ease',
    fast: '0.15s ease',
  },

  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },

  gradients: {
    primary: 'linear-gradient(135deg, #0984e3 0%, #6c5ce7 100%)',
    dark: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
  },

  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600,
  },
};

export default theme;
