export const walletCut = (address: string): string => {
  const cutAddress = `${address.slice(0, 5)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;

  return cutAddress;
};
