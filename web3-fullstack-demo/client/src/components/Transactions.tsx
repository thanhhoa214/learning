import {
  useContext,
  useEffect,
  useRef
} from 'react';

import { ethers } from 'ethers';

import { TransactionContext } from '../context/TransactionContext';
import { Transaction } from '../models/transaction.model';
import { shortenAddress } from '../utils';
import { compareCaseInsensitive } from '../utils/compareCaseInsensitive';

const TransactionsCard = ({ to, from, timestamp, message, keyword, amount }: Transaction) => {
  const { currentAccount = '' } = useContext(TransactionContext);

  // const gifUrl = useFetch({ keyword })

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${from}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">
              <strong className="text-sm text-gray-500">From</strong> {shortenAddress(from, 7)}{' '}
              {compareCaseInsensitive(from, currentAccount) && '(me)'}{' '}
            </p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${to}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">
              <strong className="text-sm text-gray-500">To</strong> {shortenAddress(to, 7)}{' '}
              {compareCaseInsensitive(to, currentAccount) && '(me)'}
            </p>
          </a>
          <p className="text-white text-base">
            <strong className="text-sm text-gray-500">Amount</strong>{' '}
            {ethers.utils.formatEther(amount)} ETH
          </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">
                <strong className="text-sm text-gray-500">Message</strong> {message}
              </p>
            </>
          )}
        </div>
        {/* <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        /> */}
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-cyan-400 font-bold">{timestamp.toNumber()}</p>
        </div>
      </div>
    </div>
  );
};

function Transactions() {
  const {
    isScrollToTransactionsSection,
    currentAccount,
    transactionCount,
    transactionList = []
  } = useContext(TransactionContext);
  const transactionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScrollToTransactionsSection) transactionContainerRef.current?.scrollIntoView();
  }, [isScrollToTransactionsSection]);

  return (
    <div
      className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions"
      ref={transactionContainerRef}>
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions ({transactionCount})
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactionList
            ?.slice() // Slice for get another memory space, not mutate origin transactionList
            .reverse()
            .map((transaction, i) => (
              <TransactionsCard key={i} {...transaction} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
