export const theme = {
  colors: {
    primary: 'violet',
    secondary: 'blue',
  },

  gradients: {
    primary: 'from-violet-600 via-fuchsia-500 to-blue-600',
    text: 'from-violet-400 via-fuchsia-400 to-blue-400',
    background: 'from-violet-600/20 via-fuchsia-500/10 to-blue-600/20',
  },

  radius: {
    card: 'rounded-3xl',
    button: 'rounded-xl',
    input: 'rounded-xl',
  },

  shadow: {
    glow: 'shadow-violet-600/20',
  },
} as const;
