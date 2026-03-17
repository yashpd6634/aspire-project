import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCardStore } from "../../store/cardStore";
import aspireLogo from "../../assets/Aspire Logo (1).svg";

const cardSchema = z.object({
  cardholderName: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

type CardFormData = z.infer<typeof cardSchema>;

interface Props {
  onClose: () => void;
}

const AddCardModal: React.FC<Props> = ({ onClose }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const addCard = useCardStore((state) => state.addCard);

  const formMethods = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    mode: "onChange",
    defaultValues: { cardholderName: "" },
  });

  const cardholderName = formMethods.watch("cardholderName");

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const onSubmit = (data: CardFormData) => {
    addCard(data.cardholderName.trim());
    handleClose();
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <ModalHeader />
        <CardPreview cardholderName={cardholderName} />
        <AddCardForm
          formMethods={formMethods}
          onSubmit={onSubmit}
          onCancel={handleClose}
        />
      </div>
    </div>
  );
};

const ModalHeader: React.FC = () => (
  <div className="bg-linear-to-r from-[#0C365A] to-[#1a4a7a] px-6 py-5">
    <h2 className="text-white text-xl font-bold">Add New Card</h2>
    <p className="text-white/60 text-sm mt-1">
      Create a new virtual debit card
    </p>
  </div>
);

const CardPreview: React.FC<{ cardholderName: string }> = ({
  cardholderName,
}) => (
  <div className="px-6 pt-5">
    <div
      className="w-full h-44 rounded-xl p-5 text-white shadow-lg transform transition-transform hover:scale-[1.02]"
      style={{
        background: "linear-gradient(135deg, #01D167 0%, #00a854 100%)",
      }}
    >
      <div className="flex justify-end mb-4">
        <img src={aspireLogo} className="h-6" alt="Aspire" />
      </div>
      <div className="text-lg font-bold tracking-wide mb-4 min-h-7">
        {cardholderName || "Your Name"}
      </div>
      <div className="text-sm tracking-[3px] font-medium opacity-90">
        •••• •••• •••• ••••
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="text-xs">
          <span className="opacity-60">Thru: </span>
          <span className="font-semibold">12/26</span>
        </div>
        <div className="text-xs">
          <span className="opacity-60">CVV: </span>
          <span className="font-semibold">•••</span>
        </div>
      </div>
    </div>
  </div>
);

const InfoBox: React.FC = () => (
  <div className="bg-[#F5F9FF] rounded-lg p-4">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[#01D167]/10 flex items-center justify-center shrink-0 mt-0.5">
        <svg
          className="w-4 h-4 text-[#01D167]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-[#0C365A]">
          Virtual Card Benefits
        </p>
        <p className="text-xs text-[#666] mt-1 leading-relaxed">
          Instant activation • No annual fee • Secure online payments • Easy
          freeze/unfreeze
        </p>
      </div>
    </div>
  </div>
);

const FormActions: React.FC<{
  onCancel: () => void;
  isDisabled: boolean;
}> = ({ onCancel, isDisabled }) => (
  <div className="flex gap-3 mt-6">
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 py-3.5 cursor-pointer rounded-lg border-2 border-gray-200 text-[#666] font-semibold hover:bg-gray-50 transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isDisabled}
      className="flex-1 py-3.5 cursor-pointer rounded-lg bg-[#01D167] text-white font-semibold
        disabled:bg-gray-200 disabled:text-gray-400 hover:bg-[#00b858] transition-colors"
    >
      Create Card
    </button>
  </div>
);

interface AddCardFormProps {
  formMethods: ReturnType<typeof useForm<CardFormData>>;
  onSubmit: (data: CardFormData) => void;
  onCancel: () => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({
  formMethods,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-5">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#222] mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("cardholderName")}
            autoFocus
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-[15px] ${
              errors.cardholderName
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-[#01D167]"
            }`}
          />
          {errors.cardholderName && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.cardholderName.message}
            </p>
          )}
        </div>

        <InfoBox />
      </div>

      <FormActions onCancel={onCancel} isDisabled={!isValid} />
    </form>
  );
};

export default AddCardModal;
