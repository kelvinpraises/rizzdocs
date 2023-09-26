"use client"
import Button from "@/components/atoms/Button";
import EmojiPicker from "@/components/organisms/EmojiPicker";
import { OutputData } from "@editorjs/editorjs";
import Blocks from "editorjs-blocks-react-renderer";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(
  () => import("@/components/organisms/EditorBlock"),
  {
    ssr: false,
  }
);

const page = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<OutputData>({
    time: 1695628736888,
    blocks: [
      {
        id: "Dxa_T_eSmA",
        type: "header",
        data: {
          text: "Editor.js",
          level: 2,
        },
      },
      {
        id: "A_ITZPFxrY",
        type: "paragraph",
        data: {
          text: "Hey. Meeting the new Editor. On this page you can see it in action — try to edit this text.",
        },
      },
      {
        id: "IPeUQXmy0Y",
        type: "header",
        data: {
          text: "Key features",
          level: 3,
        },
      },
      {
        id: "Nwr2mU2nGg",
        type: "list",
        data: {
          style: "unordered",
          items: [
            "It is a block-styled editor",
            "It returns clean data output in JSON",
            "Designed to be extendable and pluggable with a simple API",
          ],
        },
      },
      {
        id: "6W3cl3mSFR",
        type: "header",
        data: {
          text: "What does it mean «block-styled editor»",
          level: 3,
        },
      },
      {
        id: "KSTZ-C-tOV",
        type: "paragraph",
        data: {
          text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
        },
      },
      {
        id: "XpbCt_Yzih",
        type: "paragraph",
        data: {
          text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
        },
      },
      {
        id: "0HYxmVoyOc",
        type: "header",
        data: {
          text: "What does it mean clean data output",
          level: 3,
        },
      },
      {
        id: "Wc_aeFk43C",
        type: "paragraph",
        data: {
          text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
        },
      },
      {
        id: "rp3LwI95Qt",
        type: "paragraph",
        data: {
          text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
        },
      },
      {
        id: "HQ0cbafgD-",
        type: "paragraph",
        data: {
          text: "Clean data is useful to sanitize, validate and process on the backend.",
        },
      },
      {
        id: "o4qBSxnQP4",
        type: "delimiter",
        data: {},
      },
      {
        id: "k8Zp066wrh",
        type: "paragraph",
        data: {
          text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
        },
      },
      {
        id: "k8Zp066wrh",
        type: "quote",
        data: {
          text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
        },
      },

      {
        id: "V4Zozs0LSq",
        type: "image",
        data: {
          file: {
            url: "https://codex.so/public/app/img/external/codex2x.png",
          },
          caption: "",
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      {
        id: "V4Zozs0Lfq",
        type: "image",
        data: {
          file: {
            url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
          },
          caption: "Roadster // tesla.com",
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
    ],
    version: "2.26.4",
  });

  return (
    <>
      <div className="container max-w-4xl bg-white h-min p-8 rounded-[20px]">
        {edit ? (
          <EditorBlock
            data={data}
            onChange={setData}
            holder="editorjs-container"
          />
        ) : (
          <Blocks
            data={data as any}
            config={{
              code: {
                className: "language-js",
              },
              delimiter: {
                className: "border-[#5c93bb2b] border-2 w-[60%] my-8 mx-auto",
              },
              embed: {
                className: "border-0",
              },
              header: {
                className:
                  "font-semibold text-2xl pb-2 my-7 text-[#020f18b5]  border-[#5c93bb2b] border-b-[1px]",
              },
              image: {
                className: "w-full max-w-screen-md mx-auto m-8",
                actionsClassNames: {
                  stretched: "w-full h-80 object-cover",
                  withBorder: "border border-2",
                  withBackground: "p-2",
                },
              },
              list: {
                className: "list-inside pl-8 leading-9 list-disc",
              },
              paragraph: {
                className: "text-base text-opacity-85 leading-8 py-2 ",
                actionsClassNames: {
                  alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
                },
              },
              quote: {
                className: "py-4 px-6 italic font-serif",
              },
              table: {
                className: "table-auto",
              },
            }}
          />
        )}
        {!edit && (
          <div className=" flex gap-6 py-8 items-center mt-8 border-[#5c93bb2b] border-t-[1px]">
            <Image
              src={"/author.svg"}
              alt={""}
              width={80}
              height={80}
              className=" rounded-full max-w-[80px] w-full"
            />
            <div className=" flex flex-col gap-2">
              <p className=" font-semibold text-lg">T.N</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus ad doloremque quod praesentium impedit, deserunt
                mollitia ducimus laudantium. Ad, voluptas?
              </p>
            </div>
          </div>
        )}
      </div>

      <div className=" w-[300px] p-8 h-min flex flex-col rounded-[10px] bg-white shadow-[0px4px15px5px,rgba(226,229,239,0.25)] items-start sticky top-0">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div className=" flex gap-3" key={index}>
            <div className=" flex flex-col items-center">
              <div className=" bg-[#b0d3f9] w-3  h-3 rounded-full border-2 border-white" />
              <div className=" bg-[#b0d3f9] w-[2px]  h-8" />
            </div>
            <h2 className=" font-bold text-sm mt-[-5px]">{item}</h2>
          </div>
        ))}
        <Button text={"change view"} handleClick={() => setEdit(!edit)} />
      </div>
    </>
  );
};

export default page;
