import { Nunito } from "next/font/google";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "Мацинка 💛 Жоржи",
  description: "Нашето споделено кътче със списъчета за двама",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
