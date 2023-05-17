const periods = {
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

export function formatTime(createdAt: string): string {
  const timestamp = Date.parse(createdAt);
  const diff = Date.now() - timestamp;

  if (diff > periods.week) {
    const weeks = Math.floor(diff / periods.week);
    return weeks === 1 ? weeks + ` week ago` : weeks + ` weeks ago`;
  }

  if (diff > periods.day) {
    const days = Math.floor(diff / periods.day);
    return days === 1 ? days + ` day ago` : days + ` days ago`;
  }

  if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + ` hours ago`;
  }

  if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + ` minutes ago`;
  }

  return `Just now`;
}
