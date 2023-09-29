import dynamic from "next/dynamic";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(
  () => import("@/components/organisms/EditorBlock"),
  {
    ssr: false,
  }
);


const BlogEditor = () => {
  
  const uploadJsonContent = () => {
    const jsonData = JSON.stringify(values.data.blocks);
    const blob = new Blob([jsonData], { type: "application/json" });
    const file = new File([blob], `${values.title}-rizz-docs.json`, {
      type: "application/json",
    });
  
    const fileInput = document.createElement("input");
    fileInput.type = "file";
  
    const filesArray: File[] = [file];
  
    uploadFileEncrypted(filesArray);
  };
  return <div></div>;
};

export default BlogEditor;
