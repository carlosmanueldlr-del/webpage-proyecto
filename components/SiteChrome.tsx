"use client";

import { ReactNode, useState } from "react";
import { MenuProvider } from "./MenuContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FullscreenMenu from "./FullscreenMenu";
import CustomCursor from "./CustomCursor";
import Intro from "./Intro";
import Footer from "./Footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <MenuProvider>
      <CustomCursor />
      <Header />
      <Sidebar />
      <FullscreenMenu />
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <div className="lg:pl-72">
        <main>{children}</main>
        <Footer />
      </div>
    </MenuProvider>
  );
}
