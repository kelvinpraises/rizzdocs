"use client";
import useLighthouse from "@/hooks/lighthouse";
import { useEffect, useRef, useState } from "react";

function App() {
  const {
    uploadFileEncrypted,
    encryptionSignature,
    account,
    cid,
    applyAccessConditions,
    fileURL,
    decrypt,
  } = useLighthouse();

  const jsonInputRef = useRef<HTMLTextAreaElement>(null);
  const [jsonData, setJsonData] = useState(null);

  const simulateFileSelection = () => {
    if (jsonInputRef.current) {
      const jsonData = jsonInputRef.current.value;
      const blob = new Blob([jsonData], { type: "application/json" });
      const file = new File([blob], "user_data.json", {
        type: "application/json",
      });

      const fileInput = document.createElement("input");
      fileInput.type = "file";

      const filesArray: File[] = [file];

      // Append the input element to the document (optional)
      uploadFileEncrypted(filesArray);
      // Trigger the package's functionality that relies on file input
      // (This part would depend on the specific package's API)
    }
  };

  useEffect(() => {
    fileURL &&
      fetch(fileURL)
        .then((response) => response.json())
        .then((data) => {
          setJsonData(data);
        })
        .catch((error) => {
          console.error("Error fetching JSON data:", error);
        });
  }, [fileURL]);

  return (
    <div className="App">
      <textarea ref={jsonInputRef} rows={10} cols={50}></textarea>
      <button onClick={simulateFileSelection}>Simulate File Selection</button>
      <div className="text-center flex justify-center items-center mt-1">
        <div>
          {account !== "" ? (
            <p>Connected Account: {account}</p>
          ) : (
            <button onClick={() => encryptionSignature()}>
              Connect Metmask
            </button>
          )}
        </div>
        {cid}
      </div>
      <input
        onChange={(e) => uploadFileEncrypted(e.target.files)}
        type="file"
      />
      <a href={`https://files.lighthouse.storage/viewFile/${cid}`}>View File</a>
      <div className="App">
        <button
          onClick={() => {
            applyAccessConditions(cid);
          }}
        >
          Apply Access Conditions
        </button>
      </div>
      <button onClick={() => decrypt(cid)}>decrypt</button>{" "}
      {fileURL ? (
        <a href={fileURL} target="_blank">
          viewFile
        </a>
      ) : null}
    </div>
  );
}

export default App;


