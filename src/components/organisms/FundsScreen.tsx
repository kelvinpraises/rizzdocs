"use client";
import useBackendAPI, { Project } from "@/hooks/backendAPI";
import { useStore } from "@/store/useStore";
import { usePathname } from "next/navigation";
import { Dispatch, useEffect, useReducer, useState } from "react";
import Button from "../atoms/Button";
import AllocationCard from "../molecules/AllocationCard";
import Card1 from "../molecules/Card1";

interface DocFundProjects {
  projectId: number;
  createdBy: string;
  tokensRequested: number;
  emoji: string;
  title: string;
  description: string;
}

interface ShowcaseSectionState {
  docFundProjects: DocFundProjects[];
  showPersonalProjects: boolean;
  projectId: number | undefined;
  personalProjects: ProjectWithId[];
}

interface ProjectWithId extends Project {
  projectId: number;
}

export interface AllocateSectionState {
  showAllocateSentiment: boolean;
  allocators: Allocation[];
  personalAllocations: Allocation["allocated"];
}

interface Allocation {
  name: string;
  address: string;
  allocated: {
    projectId: number;
    amount: number;
    title: string;
    createdBy: string;
  }[];
}

const PersonalProject = ({
  docFundId,
  project,
  updateValues,
  addProjectToDocFund,
}: {
  docFundId: number;
  project: ProjectWithId;
  updateValues: Dispatch<Partial<ShowcaseSectionState>>;
  addProjectToDocFund: (
    docFundId: number,
    projectId: number,
    callback: () => void
  ) => Promise<void>;
}) => {
  function handleClick() {
    addProjectToDocFund(docFundId, project.projectId, () => {
      alert("Project successfully added to DocFund");
    });
    updateValues({
      showPersonalProjects: false,
    });
  }
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      {project.title}
    </div>
  );
};

const ShowcaseSection = ({ id }: { id: any }) => {
  const { getDocFundProjects, addProjectToDocFund, getProjects } =
    useBackendAPI();

  const userAddress = useStore((state) => state.userAddress);

  useEffect(() => {
    (async () => {
      const docFundProjects = await getDocFundProjects(id);
      const personalProjects = await getProjects(userAddress);

      updateValues({ docFundProjects, personalProjects });
    })();
  }, []);

  const [values, updateValues] = useReducer(
    (
      current: ShowcaseSectionState,
      update: Partial<ShowcaseSectionState>
    ): ShowcaseSectionState => {
      return {
        ...current,
        ...update,
      };
    },
    {
      docFundProjects: [],
      showPersonalProjects: false,
      projectId: undefined,
      personalProjects: [],
    }
  );

  return (
    <div className="flex flex-col gap-4">
      <div className=" flex justify-between">
        <p className=" text-sm">
          Submit a project to this showcase for a possible funded drip
        </p>
        <Button
          text={"Showcase Project"}
          handleClick={() => updateValues({ showPersonalProjects: true })}
        />
      </div>
      <div className="flex flex-col gap-8">
        <p className="font-bold text-xl">Projects</p>
        <div
          className="flex-1 bg-white rounded-[10px] p-8 overflow-x-scroll flex gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]"
          style={{ display: values.showPersonalProjects ? "flex" : "none" }}
        >
          {values.personalProjects.map((project) => {
            return (
              <PersonalProject
                addProjectToDocFund={addProjectToDocFund}
                updateValues={updateValues}
                project={project}
                docFundId={id}
              />
            );
          })}
        </div>
        <div className="w-[520px] flex flex-col gap-4">
          {values.docFundProjects?.map((x) => {
            return (
              <Card1
                title={x.title}
                description={x.description}
                buttonText={"Open Fund"}
                buttonImg={"enter.svg"}
                buttonOnclick={() => {
                  throw new Error("Function not implemented.");
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AllocateSection = ({ id }: { id: any }) => {
  const { getAllocators, getDocFundProjects, allocateFunds } = useBackendAPI();

  // TODO: take into consideration the previous allocations made by user, basicaly when user edits their prev choice
  useEffect(() => {
    (async () => {
      const allocators = await getAllocators("1");
      const docFundProjects: DocFundProjects[] = await getDocFundProjects(id);

      console.log(allocators);

      const personalAllocations = docFundProjects.map((docFund) => {
        return {
          projectId: docFund.projectId,
          amount: 0,
          title: docFund.title,
          createdBy: docFund.createdBy,
        };
      });

      updateValues({ allocators, personalAllocations });
    })();
  }, [id]);

  const [values, updateValues] = useReducer(
    (
      current: AllocateSectionState,
      update: Partial<AllocateSectionState>
    ): AllocateSectionState => {
      return {
        ...current,
        ...update,
      };
    },
    {
      showAllocateSentiment: false,
      allocators: [],
      personalAllocations: [],
    }
  );

  const userAddress = useStore((state) => state.userAddress);
  const userName = useStore((state) => state.userName);

  return (
    <div className="flex flex-col gap-4">
      <div className=" flex justify-between">
        <p className="text-sm">
          Sentiments determine what projects are worth, and are averaged for
          final voting
        </p>
        <Button
          text={"Allocate Sentiment"}
          handleClick={() => updateValues({ showAllocateSentiment: true })}
        />
      </div>

      <div className="flex flex-col gap-8">
        <p className="font-bold text-xl">Allocators</p>
        {values.showAllocateSentiment && (
          <AllocationCard
            docFundId={id}
            name={userName}
            address={userAddress}
            open
            allocated={values.personalAllocations}
            updateValues={updateValues}
            allocateFunds={allocateFunds}
          />
        )}
        {values.allocators.map(({ name, address, allocated }) => {
          return (
            <AllocationCard
              docFundId={id}
              name={name}
              address={address}
              allocated={allocated}
              readonly
            />
          );
        })}
      </div>
    </div>
  );
};

const VoteSection = ({ id }: { id: any }) => (
  <div className="flex flex-col gap-4">
    <div className=" flex justify-between">
      <p className=" text-sm">Vote for what counts for the ecosystem</p>
      <Button text={"Accept Proposals"} handleClick={undefined} />
      <Button text={"Reject Proposals"} handleClick={undefined} />
      <Button text={"Skip Proposals"} handleClick={undefined} />
    </div>
    <div className="flex flex-col gap-8">
      <p className="font-bold text-xl">Vote Info</p>
      <div className="w-[520px]">{}</div>
    </div>
  </div>
);

const FundsScreen = () => {
  const { getDocFundById } = useBackendAPI();
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const [data, setData] = useState<{
    id: string;
    title: string;
    description: string;
    tokenAmount: string;
    createdBy: string;
    createdAt: Date;
  }>();

  useEffect(() => {
    (async () => {
      const data = await getDocFundById(id);

      if (data) {
        setData({
          id,
          title: data.title,
          description: data.description,
          createdBy: data.createdBy,
          tokenAmount: data.tokenAmount,
          createdAt: new Date(data.createdAt * 1000),
        });
      }
    })();
  }, [id]);

  const [activeScreen, setActiveScreen] = useState("showcase");

  return (
    <div className="flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]">
      <div className="flex gap-4 items-center">
        <p className="text-[40px] font-semibold">{data?.title}</p>
        <p className="text-sm font-semibold">DocFund</p>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-4">
          <p className="text-sm">{data?.createdBy}</p>
          <p className="text-sm">{data?.tokenAmount} RDT</p>
          <p className="text-sm">{data?.createdAt.toDateString()}</p>
        </div>
        <p>{data?.description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center text-[#B1BAC1]">
          <button
            className={`font-medium text-xl ${
              activeScreen === "showcase" && "text-[#647684]"
            }`}
            onClick={() => setActiveScreen("showcase")}
          >
            Showcase
          </button>
          <button
            className={`font-medium text-xl ${
              activeScreen === "allocate" && "text-[#647684]"
            }`}
            onClick={() => setActiveScreen("allocate")}
          >
            Allocate
          </button>
          <button
            className={`font-medium text-xl ${
              activeScreen === "vote" && "text-[#647684]"
            }`}
            onClick={() => setActiveScreen("vote")}
          >
            Vote
          </button>
        </div>

        <div className="flex flex-col pt-4 pb-8 gap-8">
          {(() => {
            switch (activeScreen) {
              case "showcase":
                return <ShowcaseSection id={id} />;
              case "allocate":
                return <AllocateSection id={id} />;
              case "vote":
                return <VoteSection id={id} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default FundsScreen;
