"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MobileDonationModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const MobileDonationModalContext = createContext<MobileDonationModalContextValue | null>(null);

export function MobileDonationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <MobileDonationModalContext.Provider value={value}>{children}</MobileDonationModalContext.Provider>
  );
}

export function useMobileDonationModal(): MobileDonationModalContextValue {
  const ctx = useContext(MobileDonationModalContext);
  if (!ctx) {
    throw new Error("useMobileDonationModal must be used within MobileDonationModalProvider");
  }
  return ctx;
}
