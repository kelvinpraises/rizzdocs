"use client";
import useSIWE from "@/hooks/siwe";
import { useStore } from "@/store/useStore";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  // check login and update state
  const { verifyAuthentication } = useSIWE();

  const setAppActive = useStore((store) => store.setAppActive);
  const setUserName = useStore((store) => store.setUserName);
  const setUserAddress = useStore((store) => store.setUserAddress);
  const setUserAvatarUrl = useStore((store) => store.setUserAvatarUrl);

  verifyAuthentication(async (res: Response) => {
    const data = await res.json();
    setAppActive(data.authenticated);
    setUserName(data.name);
    setUserAddress(data.address);
    setUserAvatarUrl(data.avatarUrl);
  });

  return <>{children}</>;
};

export default LayoutWrapper;
