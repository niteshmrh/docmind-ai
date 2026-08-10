export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

export const ACCEPTED_DOCUMENT_TYPES = {
  'application/pdf': [],
  'text/plain': [],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
  'text/csv': [],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
};
