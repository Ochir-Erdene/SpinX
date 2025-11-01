import Image from "next/image";
import Link from "next/link";

type CardSize = "hero" | "large" | "carousel" | "grid";

interface CardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: CardSize;
  className?: string;
}

export default function Card({
  id,
  name,
  price,
  image,
  size = "grid",
  className = "",
}: CardProps) {
  // Define size-specific classes and configurations
  const sizeConfig = {
    hero: {
      containerClass: "",
      imageSizes: "(min-width: 768px) 66vw, 100vw",
      priceTagClass: "lg:px-20 lg:pb-[35%]",
    },
    large: {
      containerClass: "",
      imageSizes: "(min-width: 768px) 33vw, 100vw",
      priceTagClass: "",
    },
    carousel: {
      containerClass:
        "relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3",
      imageSizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
      priceTagClass: "",
    },
    grid: {
      containerClass: "aspect-square transition-opacity animate-fadeIn",
      imageSizes:
        "(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw",
      priceTagClass: "",
    },
  };

  const config = sizeConfig[size];

  const cardContent = (
    <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
      <Image
        alt={name}
        src={image}
        fill
        sizes={config.imageSizes}
        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
        priority={size === "hero"}
      />
      <div
        className={`absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label ${config.priceTagClass}`}
      >
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
            {name}
          </h3>
          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
            ${price.toFixed(2)}
            <span className="ml-1 hidden @[275px]/label:inline">USD</span>
          </p>
        </div>
      </div>
    </div>
  );

  // For carousel and grid, wrap in li and link
  if (size === "carousel") {
    return (
      <li className={config.containerClass}>
        <Link href={`/product/${id}`} className="relative h-full w-full">
          {cardContent}
        </Link>
      </li>
    );
  }

  if (size === "grid") {
    return (
      <li className={`${config.containerClass} ${className}`}>
        <Link
          href={`/product/${id}`}
          className="relative inline-block h-full w-full"
        >
          {cardContent}
        </Link>
      </li>
    );
  }

  // For hero and large, just return the card with optional link wrapper
  return (
    <Link
      href={`/product/${id}`}
      className={`${config.containerClass} ${className}`}
    >
      {cardContent}
    </Link>
  );
}
