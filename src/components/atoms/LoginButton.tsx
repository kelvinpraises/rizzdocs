import useSIWE from "@/hooks/siwe";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import Button from "./Button";
import useBackendAPI from "@/hooks/backendAPI";

const LoginButton = () => {
  const { connectWallet, disconnectWallet } = useSIWE();

  const { createUser } = useBackendAPI();

  const appActive = useStore((store) => store.appActive);
  const setAppActive = useStore((store) => store.setAppActive);
  const setUserName = useStore((store) => store.setUserName);
  const setUserAddress = useStore((store) => store.setUserAddress);
  const setUserAvatarUrl = useStore((store) => store.setUserAvatarUrl);

  const handlePrompt = () => {
    const name = prompt("please enter your name:");
    const avatarUrl = prompt("Please enter the url to your avatar:");
    if (!name || !avatarUrl) {
    //   handlePrompt();
    } else {
      createUser({ name, avatarUrl }, () => {
        setUserName(name);
        setUserAvatarUrl(avatarUrl);
      });
    }
  };

  return (
    <Button
      text={appActive ? "disconnect wallet" : "Connect wallet"}
      handleClick={() =>
        appActive
          ? disconnectWallet(() => setAppActive(false))
          : connectWallet(
              (data: { name: string; address: string; avatarUrl: string }) => {
                const { name, avatarUrl, address } = data;

                if (!name || !avatarUrl) {
                  handlePrompt();
                }

                setUserName(name);
                setUserAddress(address);
                setUserAvatarUrl(avatarUrl);
                setAppActive(true);
              }
            )
      }
    />
  );
};

export default LoginButton;
