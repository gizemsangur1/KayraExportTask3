"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "../components/Navbar";

/* export const metadata: Metadata = {
  title: "Home - MyStore",
}; */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          <div className="pt-16">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
