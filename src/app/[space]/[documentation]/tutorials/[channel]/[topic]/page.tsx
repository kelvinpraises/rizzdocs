"use client";
import BloggyView, { BloggyViewState } from "@/components/molecules/BloggyView";
import useLighthouse from "@/hooks/lighthouse";
import { useReducer } from "react";

const page = () => {
  const [values, updateValues] = useReducer(
    (
      current: BloggyViewState,
      update: Partial<BloggyViewState>
    ): BloggyViewState => ({
      ...current,
      ...update,
    }),
    {
      loading: true,
      title: "Hello",
      date: "",
      description: "",
      data: {
        blocks: [
          {
            id: "k8Zp066wrh",
            type: "paragraph",
            data: {
              text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
            },
          },
        ],
        version: "2.26.4",
      },
      encrypted: false,
      subscribed: false,
    }
  );

  const { cid, decrypt } = useLighthouse();

  const getJsonContent = () => {};

  return (
    <div className="flex flex-col items-center w-full">
      <BloggyView blogState={values} />
    </div>
  );
};

export default page;


