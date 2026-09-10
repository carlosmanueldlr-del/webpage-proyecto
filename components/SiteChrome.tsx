"use client";

import { ReactNode, useState } from "react";
import { MenuProvider } from "./MenuContext";
import Header from "./Header";
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
      <FullscreenMenu />
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <main>{children}</main>
      <Footer />
    </MenuProvider>
  );
}
