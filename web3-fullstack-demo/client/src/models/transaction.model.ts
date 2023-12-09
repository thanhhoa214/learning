import { BigNumber } from 'ethers';

export interface Transaction {
  from: string;
  to: string;
  amount: BigNumber;
  message: string;
  timestamp: BigNumber;
  keyword: string;
}
