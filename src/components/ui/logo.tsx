import Link from "next/link";

interface LogoProps {
  size?: "small" | "default";
}

export default function Logo({ size = "default" }: LogoProps) {
  const isSmall = size === "small";

  return (
    <Link
      href="/"
      className={
        isSmall
          ? "flex items-center gap-2 text-black md:pt-1 dark:text-white"
          : "mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
      }
    >
      <div
        className={`flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black ${
          isSmall ? "h-[30px] w-[30px] rounded-lg" : "h-10 w-10 rounded-xl"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Acme Store logo"
          viewBox="0 0 32 28"
          className={`fill-black dark:fill-white ${
            isSmall ? "h-2.5 w-2.5" : "h-4 w-4"
          }`}
        >
          <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
          <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
        </svg>
      </div>
      <span
        className={
          isSmall
            ? "uppercase"
            : "ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block"
        }
      >
        Acme Store
      </span>
    </Link>
  );
}
