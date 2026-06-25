export const getImageUrl = (path) => {
  if (!path) return "";
  return `/assets/${path}`;
};