"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

/* export const metadata: Metadata = {
  title: "Home - MyStore",
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1e2833",
                color: "#fff",
                borderRadius: "8px",
                padding: "8px 16px",
              },
            }}
          />
        </Provider>
      </body>
    </html>
  );
}
