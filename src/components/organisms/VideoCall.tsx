import { Audio, Video } from "@huddle01/react/components";
import { usePeers } from "@huddle01/react/hooks";
import { createRef, useEffect, useReducer, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { VideoCallReturnType } from "@/hooks/videoCall";
import VideoCallActions from "../molecules/VideoCallActions";

interface VideoCallState {
  gridWidth: number;
  gridHeight: number;
}

interface User {
  name: string;
  photoUrl: string;
}

const RECTANGLE_ASPECT_RATIO = 16 / 9; // Aspect ratio for the video stream rectangles

const VideoCall = ({
  vc,
  loaderData,
}: {
  vc: VideoCallReturnType;
  loaderData: { name: string; photoUrl: string };
}) => {
  const { peers } = usePeers();

  const [state, updateState] = useReducer(
    (
      current: VideoCallState,
      update: Partial<VideoCallState>
    ): VideoCallState => ({
      ...current,
      ...update,
    }),
    {
      gridWidth: 0,
      gridHeight: 0,
    }
  );

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      if (gridRef.current) {
        updateState({
          gridWidth: gridRef.current.offsetWidth,
          gridHeight: gridRef.current.offsetHeight,
        });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateRectangleSize = (numParticipants: number) => {
    const gap = 8; // Adjust the gap value as needed
    const padding = 8; // Adjust the padding value as needed

    const availableWidth = state.gridWidth - padding * 2;
    const availableHeight = state.gridHeight - padding * 2;

    const numColumns = Math.ceil(Math.sqrt(numParticipants));
    const numRows = Math.ceil(numParticipants / numColumns);

    const totalGapWidth = (numColumns - 1) * gap;
    const totalGapHeight = (numRows - 1) * gap;

    const rectWidth = Math.floor((availableWidth - totalGapWidth) / numColumns);
    const rectHeight = Math.floor((availableHeight - totalGapHeight) / numRows);

    // Adjust rectangle height based on the aspect ratio
    const aspectRatio = RECTANGLE_ASPECT_RATIO;
    const adjustedRectHeight = Math.floor(rectWidth / aspectRatio);

    const adjustedWidth = Math.floor(rectHeight * aspectRatio);

    if (adjustedWidth > rectWidth) {
      return {
        width: rectWidth,
        height: adjustedRectHeight,
      };
    }

    return {
      width: adjustedWidth,
      height: rectHeight,
    };
  };

  const myVideoStream = () => {
    const { width, height } = calculateRectangleSize(
      Object.values(vc.peers).length + 1
    );

    const nodeRef = createRef<HTMLDivElement>();

    return (
      <CSSTransition
        key={"me"}
        nodeRef={nodeRef}
        timeout={300}
        classNames="stream"
      >
        <div
          key={"me"}
          ref={nodeRef}
          className={`relative rounded-[20px] bg-black overflow-hidden video-stream`}
          style={{
            width,
            height,
            border: "1px solid black",
          }}
        >
          <div className="absolute z-10 bottom-4 left-4 flex items-center justify-center text-neutral-50 text-xl font-normal h-[39px] p-2 bg-black bg-opacity-30 rounded-[50px] border border-white border-opacity-10 backdrop-blur-[30px] gap-2.5">
            {loaderData.name}
          </div>
          <img
            className="absolute inset-0 m-auto w-16 h-16 rounded-full"
            src={loaderData.photoUrl}
            alt=""
          />

          <video
            className="w-full relative z-1"
            ref={vc.videoRefLive}
            autoPlay
            muted
          ></video>
        </div>
      </CSSTransition>
    );
  };

  const peerVideoStreams = Object.values(peers).map((peer) => {
    const { width, height } = calculateRectangleSize(
      Object.values(vc.peers).length + 1
    );

    let name = "Guest";
    let photoUrl = "";

    try {
      const u = JSON.parse(peer.displayName) as User;
      name = u.name;
      photoUrl = u.photoUrl;
    } catch (error) {
      console.error(error);
    }

    const nodeRef = createRef<HTMLDivElement>();

    return (
      <CSSTransition
        key={peer.peerId}
        nodeRef={nodeRef}
        timeout={300}
        classNames="stream"
      >
        <div
          key={peer.peerId}
          ref={nodeRef}
          className={`relative rounded-[20px] bg-black overflow-hidden video-stream`}
          style={{
            width,
            height,
            border: "1px solid black",
          }}
        >
          <div className="absolute z-10 bottom-4 left-4 flex items-center justify-center text-neutral-50 text-xl font-normal h-[39px] p-2 bg-black bg-opacity-30 rounded-[50px] border border-white border-opacity-10 backdrop-blur-[30px] gap-2.5">
            {name}
          </div>
          {photoUrl && (
            <img
              className="absolute inset-0 m-auto w-16 h-16 rounded-full"
              src={photoUrl}
              alt=""
            />
          )}

          <div className="relative z-1 inset-0">
            {peer.cam && (
              <Video
                className="w-full h-full"
                peerId={peer.peerId}
                track={peer.cam}
              />
            )}
            {peer.mic && (
              <Audio
                className="absolute invisible -z-10"
                peerId={peer.peerId}
                track={peer.mic}
              />
            )}
          </div>
        </div>
      </CSSTransition>
    );
  });

  return (
    <div className="flex flex-col w-full h-full bg-[#ffffff] rounded-[10px]">
      <div className="flex justify-between items-center"></div>
      <div className="w-full h-full" ref={gridRef}>
        <TransitionGroup className="w-full h-full p-2 gap-2 flex flex-wrap items-center justify-center">
          {myVideoStream()}
          {peerVideoStreams}
        </TransitionGroup>
      </div>

      <div className=" absolute right-0 left-0 bottom-1 flex justify-center">
        <VideoCallActions vc={vc} />
      </div>
    </div>
  );
};

export default VideoCall;

{
  /* <video
className="w-full"
ref={vc.videoRefLive}
autoPlay
muted
></video> */
}

{
  /* <button
          onClick={() => {
            updateState({
              peers: [
                ...state.peers,
                { id: generateQuickGuid(), name: "new", nodeRef: createRef() },
              ],
            });
          }}
        >
          Add
        </button> */
}
{
  /*
         <h1 className="flex font-semibold gap-2 items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:ml-2">
          recording
        </h1> 

      // <div
    //   ref={nodeRef}
    //   className={`rounded-lg bg-black overflow-hidden video-stream`}
    //   style={{
    //     width,
    //     height,
    //     border: "1px solid black",
    //   }}
    // >
    //   <video className="w-full" ref={vc.videoRefLive} autoPlay muted></video>
    //   <button onClick={() => handleRemoveVideo(index)}>Remove {peer}</button>
    // </div>
    
    <div className="grid grid-cols-4">
{Object.values(vc.peers)
  .filter((peer) => peer.cam)
  .map((peer) => (
    <>
      role: {peer.role}
      <Video
        key={peer.peerId}
        peerId={peer.peerId}
        track={peer.cam || undefined}
        debug
      />
    </>
  ))}

{Object.values(vc.peers)
  .filter((peer) => peer.mic)
  .map((peer) => (
    <Audio
      key={peer.peerId}
      peerId={peer.peerId}
      track={peer.mic || undefined}
    />
  ))}
</div> */
}

function addRuleToIframes() {
  const ruleToAdd =
    "camera https://orionsync-coda.vercel.app; microphone https://orionsync-coda.vercel.app;";
  const iframes = document.getElementsByTagName("iframe");

  for (const iframe of iframes) {
    const allowList = iframe.getAttribute("allow");

    if (allowList) {
      iframe.setAttribute("allow", ruleToAdd + allowList);
    } else {
      iframe.setAttribute("allow", ruleToAdd);
    }

    iframe.src = iframe.src; // Reload the iframe with the updated "allow" attribute
  }
}

addRuleToIframes();
