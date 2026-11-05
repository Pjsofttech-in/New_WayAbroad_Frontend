
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata = {
  metadataBase: new URL("https://www.wayabroad.in"),

  title: {
    default:
      "Study Abroad Consultants in Pune | Wayabroad",
    template: "%s | Wayabroad",
  },

  description:
    "Wayabroad helps students study abroad in Australia, Canada, UK and USA with university applications, visa assistance and free counselling.",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "AEYznB4tT0Wz1aBXErnytcqZ9018dSJ__HX5fZei9CY",
  },

  openGraph: {
    type: "website",
    siteName: "Wayabroad",
    title: "Study Abroad Consultants in Pune | Wayabroad",
    description:
      "Get expert guidance for studying abroad, university applications, visa assistance and free counselling.",
    url: "https://www.wayabroad.in/",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Wayabroad Study Abroad Consultants",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in Pune | Wayabroad",
    description:
      "Explore study abroad opportunities with Wayabroad.",
    images: ["/images/og-home.jpg"],
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
