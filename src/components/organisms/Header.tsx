"use client";
import useSIWE from "@/hooks/siwe";
import { useStore } from "@/store/useStore";
import Button from "../atoms/Button";

const Header = () => {
  const { connectWallet, disconnectWallet } = useSIWE();

  const appActive = useStore((store) => store.appActive);
  const setAppActive = useStore((store) => store.setAppActive);

  return (
    <div className=" flex justify-between items-center px-4 min-h-[70px] bg-white pr-8">
      <img src="/logo.svg" alt="" />
      <Button
        text={appActive ? "disconnect wallet" : "Connect wallet"}
        handleClick={() =>
          appActive
            ? disconnectWallet(() => setAppActive(false))
            : connectWallet(() => setAppActive(true))
        }
      />
    </div>
  );
};

export default Header;
