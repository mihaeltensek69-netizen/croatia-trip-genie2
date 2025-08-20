import "./globals.css";

export const metadata = {
  title: "Croatia Trip Genie",
  description: "AI-powered Croatia travel planner and Airbnb chatbot.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}