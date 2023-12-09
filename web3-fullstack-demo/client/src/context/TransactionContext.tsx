import {
  createContext,
  FunctionComponent,
  useEffect,
  useState
} from 'react';

import { ethers } from 'ethers';

import { Maybe } from '@metamask/providers/dist/utils';

import { Transaction } from '../models/transaction.model';
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS
} from '../utils';
import { SendFormProperties } from './WelcomeContext';

const { ethereum } = window;
const getTransactionContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export interface TransactionContextValue {
  isSending: boolean;
  isScrollToTransactionsSection: boolean;
  currentAccount?: string;
  transactionCount: number;
  transactionList?: Transaction[];
  connectWallet?: () => Promise<void>;
  sendEth?: (properties: SendFormProperties) => Promise<void>;
}
export const TransactionContext = createContext<TransactionContextValue>({
  transactionCount: 0,
  isScrollToTransactionsSection: false,
  isSending: false
});
export const TransactionProvider: FunctionComponent<JSX.ElementChildrenAttribute> = ({
  children
}) => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [isSending, setIsSending] = useState(false);
  const [isScrollToTransactionsSection, setScrollToTransactionsSection] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactionList, setTransactionList] = useState<Transaction[]>();

  const setUpInfo = async (accounts: Maybe<string[]>) => {
    if (accounts?.length) {
      const account = accounts?.[0];
      setCurrentAccount(account);

      const contract = getTransactionContract();

      const count = await contract.getTransactionCount();
      setTransactionCount(count.toNumber());

      const transactionList = await contract.getAllTransactions();
      setTransactionList(transactionList);
    } else console.log('No accounts found');
  };

  const connectWallet = async () => {
    if (!ethereum) return alert('Please install Metamask before continuing');
    try {
      const accounts = await ethereum.request<string[]>({ method: 'eth_requestAccounts' });
      await setUpInfo(accounts);
    } catch (e) {
      console.error(e);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('Please install Metamask before continuing');

    const accounts = await ethereum.request<string[]>({ method: 'eth_accounts' });
    await setUpInfo(accounts);
  };

  const sendEth = async ({ addressTo, amount, keyword, message }: SendFormProperties) => {
    if (!ethereum) return alert('Please install Metamask before continuing');
    try {
      const parsedAmount = ethers.utils.parseEther(amount + '');
      console.log(amount, parsedAmount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000 GWEI
            value: parsedAmount._hex
          }
        ]
      });

      const contract = getTransactionContract();
      const transactionHash = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsSending(true);
      console.log(`Sending with hash: ${transactionHash.hash}`);
      await transactionHash.wait();

      const count = await contract.getTransactionCount();
      setTransactionCount(count.toNumber());

      const transactionList = await contract.getAllTransactions();
      setTransactionList(transactionList);

      setIsSending(false);
      setScrollToTransactionsSection(true);
      console.log(`Sent successfully with hash: ${transactionHash.hash}`);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        isSending,
        transactionCount,
        transactionList,
        isScrollToTransactionsSection,
        connectWallet,
        sendEth
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
