import Link from "next/link";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Shipping & Return Policy", href: "/shipping-return-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "FAQ", href: "/frequently-asked-questions" },
];

export default function Footer() {
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        
        {/* Logo Section */}
        <div>
        <Link
      href="/"
      className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
    >
      <div className="flex flex-none items-center justify-center  bg-white mb-1 dark:bg-black">
        <img
          src="/icons/logo.png"
          alt="SpinX Logo"
          className="h-6 w-6"
        />
      </div>
      <span className=" mb-1">
        SpinX
      </span>
    </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Deploy Button */}
        <div className="md:ml-auto">
          <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Deploy on Vercel"
            href="https://vercel.com"
          >
          </a>
        </div>
      </div>
    </footer>
  );
}