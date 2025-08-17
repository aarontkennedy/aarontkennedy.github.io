export const getYear = (date: string): number => {
  return new Date(`${date}T00:00:00Z`).getFullYear();
};
