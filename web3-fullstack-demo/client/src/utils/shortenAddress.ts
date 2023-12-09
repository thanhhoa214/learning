export const shortenAddress = (address: string, count = 5) =>
  `${address.slice(0, count)}...${address.slice(address.length - count, address.length)}`;
