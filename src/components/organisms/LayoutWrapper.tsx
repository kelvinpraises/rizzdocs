"use client";
import useSIWE from "@/hooks/siwe";
import { useStore } from "@/store/useStore";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  // check login and update state
  const { verifyAuthentication } = useSIWE();

  const setAppActive = useStore((store) => store.setAppActive);

  verifyAuthentication(async (res: Response) => {
    const data = await res.json();
    setAppActive(data.authenticated);
  });

  return <>{children}</>;
};

export default LayoutWrapper;
