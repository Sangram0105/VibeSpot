export const formatTimeAgo = (date: string) => {
  const now = new Date().getTime();
  const checkedIn = new Date(date).getTime();

  const minutes = Math.floor((now - checkedIn) / 60000);

  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 minute ago";

  return `${minutes} minutes ago`;
};