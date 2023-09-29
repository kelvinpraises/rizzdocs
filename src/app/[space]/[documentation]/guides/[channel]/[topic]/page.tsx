"use client";
import BloggyView, { BloggyViewState } from "@/components/molecules/BloggyView";
import useLighthouse from "@/hooks/lighthouse";
import { useEffect, useReducer } from "react";

const page = () => {
  const { decrypt, fileURL } = useLighthouse();

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
        blocks: [],
        version: "2.26.4",
      },
      encrypted: false,
      subscribed: false,
    }
  );

  useEffect(() => {
    const subscribed = "";
    const { cid } = { cid: "" };

    if (!subscribed) {
      updateValues({
        data: {
          ...values.data,
          blocks: [
            {
              id: "404",
              type: "paragraph",
              data: {
                text: "📢 **Notice:** This content has been token gated to provide you with an exclusive learning experience. To unlock a treasure trove of valuable information, in-depth tutorials, and the latest industry insights, simply click the subscription button below and gain access to a world of knowledge. Don't miss out on this opportunity to supercharge your learning journey! Subscribe now. 🔓🚀",
              },
            },
          ],
        },
      });
    } else {
      decrypt(cid);
    }
  }, []);

  useEffect(() => {
    fileURL &&
      fetch(fileURL)
        .then((response) => response.json())
        .then((blocks) => {
          updateValues({ data: { ...values.data, blocks } });
        })
        .catch((error) => {
          console.error("Error fetching JSON data:", error);
        });
  }, [fileURL]);

  return (
    <div className=" flex flex-col items-center w-full">
      <BloggyView blogState={values} />
    </div>
  );
};

export default page;
