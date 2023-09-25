"use client"
import EditorBlock from "@/components/organisms/EditorBlock";
import { OutputData } from "@editorjs/editorjs";
import Blocks from "editorjs-blocks-react-renderer";
import { useState } from "react";

const page = () => {
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
          text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
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
    ],
    version: "2.26.4",
  });

  return (
    <div className="container max-w-4xl">
      <EditorBlock data={data} onChange={setData} holder="editorjs-container" />
      <Blocks
        data={data as any}
        config={{
          code: {
            className: "language-js",
          },
          delimiter: {
            className: "border border-2 w-16 mx-auto",
          },
          embed: {
            className: "border-0",
          },
          header: {
            className: "font-bold",
          },
          image: {
            className: "w-full max-w-screen-md",
            actionsClassNames: {
              stretched: "w-full h-80 object-cover",
              withBorder: "border border-2",
              withBackground: "p-2",
            },
          },
          list: {
            className: "list-inside",
          },
          paragraph: {
            className: "text-base text-opacity-75",
            actionsClassNames: {
              alignment: "text-{alignment}", // This is a substitution placeholder: left or center.
            },
          },
          quote: {
            className: "py-3 px-5 italic font-serif",
          },
          table: {
            className: "table-auto",
          },
        }}
      />
    </div>
  );
};

export default page;
