export function formatAddress(street, postalCode, city) {
  return `${street}, ${postalCode} ${city}`;
}

export function formatWebsiteUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `http://${url}`;
  }
  return url;
}

export function getWhoDoYouNeed(value) {
  switch (value) {
    case 'approved_auditor':
      return 'Approved Auditor';
    case 'bookkeeper':
      return 'Bookkeeper';
    case 'other':
      return 'Other';
    default:
      return 'N/A';
  }
}

export const titleOptions = [
  {
    value: "approved_auditor",
    label: "Approved Auditor",
  },
  {
    value: "bookkeeper",
    label: "Bookkeeper",
  },
  {
    value: "other",
    label: "Other",
  },
];