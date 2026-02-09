import { Inter } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/provider";

const inter = Inter({ subsets: ["latin"] });
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "E Police Dashboard",
  description: "E Police Dashboard for Law Enforcement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className}  antialiased dark:bg-neutral-800 bg-neutral-100 dark:text-white`}
      >
        <Providers>{children}</Providers>
        {/* */}
      </body>
    </html>
  );
}
