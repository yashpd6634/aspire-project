import TransactionItem from "./TransactionItem";

import fileStorageIcon from "../../assets/file-storage.svg";
import flightsIcon from "../../assets/flights.svg";
import megaphoneIcon from "../../assets/megaphone.svg";

const TRANSACTIONS = [
  {
    id: "1",
    merchant: "Hamleys",
    amount: "+ S$ 150",
    date: "20 May 2020",
    type: "credit" as const,
    icon: fileStorageIcon,
    iconBg: "#009DFF1A",
    description: "Refund on debit card",
  },
  {
    id: "2",
    merchant: "Hamleys",
    amount: "- S$ 150",
    date: "20 May 2020",
    type: "debit" as const,
    icon: flightsIcon,
    iconBg: "#00D6B51A",
    description: "Charged to debit card",
  },
  {
    id: "3",
    merchant: "Hamleys",
    amount: "- S$ 150",
    date: "20 May 2020",
    type: "debit" as const,
    icon: megaphoneIcon,
    iconBg: "#F251951A",
    description: "Charged to debit card",
  },
  {
    id: "4",
    merchant: "Hamleys",
    amount: "- S$ 150",
    date: "20 May 2020",
    type: "debit" as const,
    icon: fileStorageIcon,
    iconBg: "#009DFF1A",
    description: "Charged to debit card",
  },
];

const TransactionList = () => {
  return (
    <div className="border-x border-[#FCFCFC]">
      {TRANSACTIONS.map((tx) => (
        <TransactionItem key={tx.id} {...tx} />
      ))}

      <div className="text-center py-4 text-[13px] text-[#01D167] font-semibold bg-[#EDFFF5] rounded-b-none md:rounded-b-[14px] cursor-pointer hover:bg-[#01D1671A] transition-colors">
        View all card transactions
      </div>
    </div>
  );
};

export default TransactionList;
