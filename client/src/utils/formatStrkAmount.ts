export const formatSTRKAmount = (weiAmount: number | null) => {
  if (!weiAmount) return '0';
  return (weiAmount / 1e18).toFixed(4);
};
