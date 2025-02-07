export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
