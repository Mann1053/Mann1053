import "./../../globals.css";
import { Providers } from "@/store/provider";

export default function RootLayout({ children }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
