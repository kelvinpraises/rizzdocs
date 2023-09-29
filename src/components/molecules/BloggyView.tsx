import { OutputData } from "@editorjs/editorjs";
import Blocks from "editorjs-blocks-react-renderer";
import Button from "../atoms/Button";

export interface BloggyViewState {
  loading: true;
  title: string;
  date: string;
  description: string;
  data: OutputData;
  encrypted: boolean;
  subscribed: boolean;
}

const BloggyView = ({ blogState }: { blogState: BloggyViewState }) => {
  return (
    <>
      <div className=" mt-28 mb-16 w-full flex flex-col gap-4">
        <p className=" text-[35px] font-semibold text-[#020f18b5] text-center">
          {blogState.title}
        </p>
        <p className=" text-sm text-center">{blogState.date}</p>
      </div>

      <div className="container max-w-4xl w-full bg-white h-min p-8 rounded-[10px] shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]">
        <Blocks
          data={blogState.data as any}
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

        <div className=" flex gap-6 py-8 items-center mt-8 border-[#5c93bb2b] border-t-[1px]">
          {/* <Image
              src={"/author.svg"}
              alt={""}
              width={80}
              height={80}
              className=" rounded-full max-w-[80px] w-full"
            /> */}
          <div className=" flex flex-col gap-2">
            {/* <p className=" font-semibold text-lg">Contributors Name</p> */}
            <p>{blogState.description}</p>
          </div>
        </div>

        <Button text={"Edit Content"} handleClick={() => {}} />
      </div>
    </>
  );
};

export default BloggyView;
