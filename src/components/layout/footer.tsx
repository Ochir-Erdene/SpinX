import Link from "next/link";
import Logo from "@/components/ui/logo";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
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
          <Logo size="small" />
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
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="Deploy on Vercel"
            href="https://vercel.com/templates/next.js/nextjs-commerce"
          >
            <span className="px-3">�</span>
            <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
            <span className="px-3">Deploy</span>
          </a>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>© 2023-2025 ACME, Inc. All rights reserved.</p>
          <hr className="mx-4 hidden h-4 w-px border-l border-neutral-400 md:inline-block" />
          <p>
            <a href="https://github.com/vercel/commerce">View the source</a>
          </p>
          <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-black dark:text-white">
              Created by Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
