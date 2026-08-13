export const theme = {
  colors: {
    dark: {
      background: '#0a0a0a',
      surface: '#111111',
      card: '#171717',
      elevated: '#1d1d1d',
      border: '#292929',
      muted: '#a1a1aa',
      foreground: '#fafafa',
    },

    light: {
      background: '#f7f7f5',
      surface: '#ffffff',
      card: '#ffffff',
      elevated: '#f1f1ef',
      border: '#e5e5e2',
      muted: '#71717a',
      foreground: '#171717',
    },

    success: '#22c55e',
    danger: '#ef4444',
    warning: '#eab308',
  },

  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
  },

  transition: 'transition-all duration-200 ease-out',

  shadow: {
    card: 'shadow-sm',
    elevated: 'shadow-lg',
  },

  layout: {
    sidebarWidth: 'w-64',
    headerHeight: 'h-16',
  },
} as const;
