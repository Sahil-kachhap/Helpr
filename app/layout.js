import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "Helpr",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="mx-6 md:mx-16">
            <Header />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
