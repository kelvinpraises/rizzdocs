import { VideoCallReturnType } from "@/hooks/videoCall";
import * as Toggle from "@radix-ui/react-toggle";

const JoinCall = ({
  vc,
  loaderData: data,
}: {
  vc: VideoCallReturnType;
  loaderData: { name: string; photoUrl: string };
}) => {
  return (
    <div data-joined={vc.state.joinedLobby} className="group">
      <div className="absolute inset-0 hidden items-center justify-center group-data-[joined=false]:flex">
        Loading...
      </div>
      <div className="flex gap-4 p-4 group-data-[joined=false]:opacity-25 group-data-[joined=false]:transition-opacity group-data-[joined=false]:duration-200 group-data-[joined=false]:delay-200 group-data-[joined=false]:pointer-events-none">
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <div
              className={`w-full aspect-video rounded-lg bg-black overflow-hidden`}
            >
              <video
                className="h-full w-full object-cover"
                ref={vc.videoRefPreview}
                autoPlay
                muted
              ></video>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Toggle.Root
              aria-label="Toggle video"
              className="
            data-[state=on]:bg-blue-500 data-[state=on]:text-white text-gray-300 bg-gray-500  text-base shadow-[0_0px_1px_hsla(0,0%,0%,0.2),0_1px_2px_hsla(0,0%,0%,0.2)] leading-normal m-0 px-3 py-2 rounded-lg border-[none] hover:shadow-[0_0px_1px_hsla(0,0%,0%,0.6),0_1px_2px_hsla(0,0%,0%,0.2)] active:shadow-[0_0px_1px_hsla(0,0%,0%,0.4)] active:translate-y-px"
              onPressedChange={(pressed) => {
                pressed ? vc.fetchVideoStream() : vc.stopVideoStream();
              }}
            >
              Share Video
            </Toggle.Root>

            <Toggle.Root
              aria-label="Toggle audio"
              className="
            data-[state=on]:bg-blue-500 data-[state=on]:text-white text-gray-300 bg-gray-500  text-base shadow-[0_0px_1px_hsla(0,0%,0%,0.2),0_1px_2px_hsla(0,0%,0%,0.2)] leading-normal m-0 px-3 py-2 rounded-lg border-[none] hover:shadow-[0_0px_1px_hsla(0,0%,0%,0.6),0_1px_2px_hsla(0,0%,0%,0.2)] active:shadow-[0_0px_1px_hsla(0,0%,0%,0.4)] active:translate-y-[1px]"
              onPressedChange={(pressed) => {
                pressed ? vc.fetchAudioStream() : vc.stopAudioStream();
              }}
            >
              Share Audio
            </Toggle.Root>
          </div>
        </div>
        <div className="flex gap-4 flex-col w-[240px]">
          <div className="flex gap-2 items-center rounded-lg border max-w-full p-2 border-dashed">
            <img className="w-8 h-8 rounded-full" src={data.photoUrl} alt="" />
            <p>{data.name}</p>
          </div>
          <button
            className="
          bg-blue-500 text-white text-base shadow-[0_0px_1px_hsla(0,0%,0%,0.2),0_1px_2px_hsla(0,0%,0%,0.2)] leading-normal m-0 px-3 py-2 rounded-lg w-full border-[none] hover:shadow-[0_0px_1px_hsla(0,0%,0%,0.6),0_1px_2px_hsla(0,0%,0%,0.2)] active:shadow-[0_0px_1px_hsla(0,0%,0%,0.4)] active:translate-y-[1px]"
            onClick={() => vc.joinRoom()}
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCall;
