"use client";

type Variant = {
  name: string;
  value: string;
  image?: string;
};

interface VariantSelectorProps {
  title: string;
  variants: Variant[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  isAvailable?: boolean;
}

export default function VariantSelector({
  title,
  variants,
  selectedValue,
  onSelect,
  isAvailable = true,
}: VariantSelectorProps) {
  return (
    <dl className="mb-8">
      <dt className="mb-4 text-sm uppercase tracking-wide">{title}</dt>
      <dd className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = selectedValue === variant.value;
          const isDisabled = !isAvailable;

          return (
            <button
              key={variant.value}
              onClick={() => !isDisabled && onSelect(variant.value)}
              disabled={isDisabled}
              title={`${title} ${variant.name}${isDisabled ? " (Out of Stock)" : ""}`}
              className={`flex min-w-12 items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ${
                isSelected
                  ? "ring-2 ring-blue-600"
                  : "ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600"
              } ${
                isDisabled &&
                "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700"
              }`}
            >
              {variant.name}
            </button>
          );
        })}
      </dd>
    </dl>
  );
}
