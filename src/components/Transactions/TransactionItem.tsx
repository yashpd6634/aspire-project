import card from "../../assets/business-and-finance.svg";
import nextArrowIcon from "../../assets/next.svg";

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
    <div className="flex items-start gap-3 px-3 md:px-4 py-3 border-b border-[#F5F5F5]">
      <IconContainer iconBg={iconBg} icon={icon} merchant={merchant} />

      <TransationDetails
        merchant={merchant}
        description={description}
        date={date}
      />

      <AmountDetails isCredit={isCredit} amount={amount} />
    </div>
  );
};

const IconContainer = ({
  iconBg,
  icon,
  merchant,
}: {
  iconBg?: string;
  icon: string;
  merchant: string;
}) => (
  <div
    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0"
    style={{ backgroundColor: iconBg }}
  >
    <img src={icon} alt={merchant} className="w-4 h-4 md:w-4 md:h-4" />
  </div>
);

const TransationDetails = ({
  merchant,
  description,
  date,
}: {
  merchant: string;
  description?: string;
  date: string;
}) => (
  <div className="flex-1 min-w-0">
    <div className="text-[13px] md:text-[14px] text-[#222222] font-medium">
      {merchant}
    </div>
    <div className="text-[12px] md:text-[13px] text-[#AAAAAA]">{date}</div>
    {description && (
      <div className="flex items-center gap-1.5 mt-1.5 md:mt-2">
        <div className="w-5 h-4 md:w-6 md:h-5 rounded-4xl bg-[#325BAF] flex items-center justify-center">
          <span className="text-white text-[7px] md:text-[8px] font-bold">
            <img src={card} alt="info" className="w-2.5 h-2.5" />
          </span>
        </div>
        <span className="text-[11px] md:text-[12px] font-semibold text-[#325BAF]">
          {description}
        </span>
      </div>
    )}
  </div>
);

const AmountDetails = ({
  isCredit,
  amount,
}: {
  isCredit: boolean;
  amount: string;
}) => (
  <div className="flex items-center gap-1 shrink-0">
    <span
      className={`text-[13px] md:text-[14px] font-bold ${
        isCredit ? "text-[#01D167]" : "text-[#222222]"
      }`}
    >
      {amount}
    </span>
    <img src={nextArrowIcon} alt="details" className="w-3 h-3 md:w-4 md:h-4" />
  </div>
);

export default TransactionItem;
