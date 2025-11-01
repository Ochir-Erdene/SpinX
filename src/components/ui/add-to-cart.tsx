"use client";

interface AddToCartProps {
  disabled?: boolean;
  onClick?: () => void;
}

export default function AddToCart({ disabled = false, onClick }: AddToCartProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={disabled ? "Please select an option" : "Add to cart"}
      className={`relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white ${
        disabled && "cursor-not-allowed opacity-60 hover:opacity-60"
      }`}
    >
      <div className="absolute left-0 ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      Add To Cart
    </button>
  );
}
