interface Props {
  merchant: string;
  amount: string;
  date: string;
  icon: string;
  iconBg?: string;
  type?: "credit" | "debit";
  description?: string;
}

const TransactionItem: React.FC<Props> = ({
  merchant,
  amount,
  date,
  icon,
  iconBg = "#009DFF1A",
  type,
  description,
}) => {
  const isCredit = type === "credit" || amount.startsWith("+");

  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-[#F5F5F5]">
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <img src={icon} alt={merchant} className="w-6 h-6" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="text-[14px] text-[#222222] font-medium">{merchant}</div>
        <div className="text-[13px] text-[#AAAAAA]">{date}</div>
        {description && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-6 h-5 rounded bg-[#325BAF] flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">💳</span>
            </div>
            <span className="text-[12px] text-[#325BAF]">{description}</span>
          </div>
        )}
      </div>

      {/* Amount */}
      <div className="flex items-center gap-1 shrink-0">
        <span
          className={`text-[14px] font-bold ${
            isCredit ? "text-[#01D167]" : "text-[#222222]"
          }`}
        >
          {amount}
        </span>
        <svg
          className="w-4 h-4 text-[#325BAF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  );
};

export default TransactionItem;
