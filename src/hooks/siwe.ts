import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider((window as any).ethereum);
const BACKEND_ADDR = "http://localhost:3002";

const useSIWE = () => {
  function connectWallet() {
    provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
  }

  async function createSiweMessage(address: string, statement: string) {
    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
      credentials: "include",
    });
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      nonce: await res.text(),
    });
    return message.prepareMessage();
  }

  async function signInWithEthereum() {
    const signer = await provider.getSigner();

    const message = await createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    const signature = await signer.signMessage(message);

    const res = await fetch(`${BACKEND_ADDR}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, signature }),
      credentials: "include",
    });
    console.log(await res.text());
  }

  async function getInformation() {
    const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
      credentials: "include",
    });
    console.log(await res.text());
  }
  return { connectWallet, signInWithEthereum };
};

export default useSIWE;
