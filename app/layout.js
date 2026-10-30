import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata = {
  title: "Wayabroad",
  description: "Study abroad website",

  verification: {
    google: "AEYznB4tT0Wz1aBXErnytcqZ9018dSJ__HX5fZei9CY",
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}