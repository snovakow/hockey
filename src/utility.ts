export const roundToPercent = (num: number, places: number): string => {
  return (num * 100).toFixed(places) + "%";
};
