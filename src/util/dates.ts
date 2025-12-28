export const getYear = (date: string): number => {
  return new Date(`${date}T00:00:00Z`).getFullYear();
};

export const formatDate = (date: string): string => {
  try {
    const options = { year: "numeric", month: "long" } as const;
    const formatter = new Intl.DateTimeFormat("en-US", options); // 'en-US' for English (United States)
    return formatter.format(new Date(date)); // e.g., "August 2024"
  } catch (e) {
    return date;
  }
};

export const formatTime = (time: string): string => {
  const parts = time.split(":"); // Splits "04:51:04" into ["04", "51", "04"]
  const hour = Number(parts[0]); // Converts "04" to 4
  // Join the reformatted hour with the remaining minutes and seconds
  return `${hour}:${parts[1]}:${parts[2]}`;
};


