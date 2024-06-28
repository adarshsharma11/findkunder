export function formatAddress(street, postalCode, city) {
  return `${street}, ${postalCode} ${city}`;
}

export function formatWebsiteUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `http://${url}`;
  }
  return url;
}