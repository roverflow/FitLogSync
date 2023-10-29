import "@/styles/fonts.css";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import AppLayout from "@/layout/AppLayout";

export const metadata = {
  title: "Fitlog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="titillium-web">
        <AuthContextProvider>
          <AppLayout>{children}</AppLayout>
        </AuthContextProvider>
      </body>
    </html>
  );
}
