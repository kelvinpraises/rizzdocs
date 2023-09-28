"use client";
import GrantCarousel from "@/components/organisms/GrantCarousel";
import MainScreen from "@/components/organisms/MainScreen";
import useBackendAPI, { DocFund } from "@/hooks/backendAPI";
import { useEffect, useState } from "react";
interface DocFundWithId extends DocFund {
  docFundId: number;
}

const page = () => {
  const { getDocFunds } = useBackendAPI();
  const [docFunds, setDocFunds] = useState<any[]>();

  useEffect(() => {
    (async () => {
      const docFunds: DocFundWithId[] = await getDocFunds("");
      const newDocFunds = docFunds.map((docFund) => {
        return {
          typeIsLink: true,
          href: `/grants/docfunds/${docFund.docFundId}`,
          title: docFund.title,
          description: docFund.description,
          buttonText: "Open Fund",
          buttonClick: "",
          buttonImg: "enter.svg",
        };
      });
      setDocFunds(newDocFunds);
    })();
  }, []);

  const data = {
    title: "Ecosystem DocFunds",
    subtitle:
      "Supporting impactful retroactive project fundings for stakeholders and builders",
    cardArray: docFunds,
  };

  return (
    <>
      <GrantCarousel />
      <MainScreen {...data} />
    </>
  );
};

export default page;
