import { VideoCallReturnType } from "@/hooks/videoCall";
import * as Toggle from "@radix-ui/react-toggle";

const VideoCallActions = ({ vc }: { vc: VideoCallReturnType }) => {
  return (
    <div className="justify-start items-center gap-[30px] inline-flex">
      <div className="self-stretch justify-start items-start gap-6 flex">
        <Toggle.Root
          aria-label="Toggle video stream"
          className="group rounded-full m-0 p-4 border-[none] justify-center items-center gap-2.5 flex bg-zinc-800 shadow-[0_0px_1px_hsla(0,0%,0%,0.2),0_1px_2px_hsla(0,0%,0%,0.2)] hover:shadow-[0_0px_1px_hsla(0,0%,0%,0.6),0_1px_2px_hsla(0,0%,0%,0.2)] active:shadow-[0_0px_1px_hsla(0,0%,0%,0.4)] active:translate-y-px"
          pressed={vc.state.produceVideo}
          onPressedChange={(pressed) => {
            pressed ? vc.produceCamera() : vc.stopProducingCamera();
          }}
        >
          <div className="w-9 h-9 grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              fill="none"
              viewBox="0 0 30 24"
            >
              <path
                className="group-radix-state-on:text-white fill-current text-[#F95A39]"
                d="M6.17.75h8.688c3.633 0 6.17 2.504 6.17 6.091V17.16c0 3.587-2.537 6.091-6.17 6.091H6.17C2.537 23.25 0 20.746 0 17.159V6.84C0 3.254 2.537.75 6.17.75Zm20.767 3.568a2.074 2.074 0 0 1 2.06.096A2.145 2.145 0 0 1 30 6.244v11.513c0 .751-.375 1.435-1.003 1.83a2.098 2.098 0 0 1-1.115.324 2.09 2.09 0 0 1-.947-.23l-2.221-1.121a2.435 2.435 0 0 1-1.332-2.185v-8.75c0-.933.51-1.77 1.332-2.184l2.223-1.123Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </Toggle.Root>

        <Toggle.Root
          aria-label="Toggle audio stream"
          className="group rounded-full m-0 p-4 border-[none] justify-center items-center gap-2.5 flex bg-zinc-800 shadow-[0_0px_1px_hsla(0,0%,0%,0.2),0_1px_2px_hsla(0,0%,0%,0.2)] hover:shadow-[0_0px_1px_hsla(0,0%,0%,0.6),0_1px_2px_hsla(0,0%,0%,0.2)] active:shadow-[0_0px_1px_hsla(0,0%,0%,0.4)] active:translate-y-px"
          pressed={vc.state.produceAudio}
          onPressedChange={(pressed) => {
            pressed ? vc.produceAudio() : vc.stopProducingAudio();
          }}
        >
          <div className="w-9 h-9 grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="30"
              fill="none"
              viewBox="0 0 26 30"
            >
              <path
                className="group-radix-state-on:text-white fill-current text-[#F95A39]"
                d="M13.262 19.826h-.524c-3.606 0-6.528-2.887-6.528-6.446V6.446C6.21 2.886 9.132 0 12.738 0h.524c3.605 0 6.529 2.886 6.529 6.446v6.934c0 3.56-2.924 6.446-6.529 6.446Zm9.582-6.652c0-.793.65-1.435 1.453-1.435.802 0 1.453.642 1.453 1.435 0 6.456-4.95 11.787-11.296 12.503v2.888c0 .792-.651 1.435-1.453 1.435a1.444 1.444 0 0 1-1.453-1.435v-2.889C5.199 24.962.25 19.63.25 13.175c0-.793.651-1.435 1.453-1.435s1.453.642 1.453 1.435c0 5.36 4.416 9.72 9.845 9.72 5.427 0 9.843-4.36 9.843-9.72Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </Toggle.Root>

        <button
          onClick={() => vc.leaveRoom()}
          className="group rounded-full m-0 p-4 border-[none] justify-center items-center gap-2.5 flex bg-red-500 shadow-[0_0px_1px_hsla(0,0%,0%,0.2),0_1px_2px_hsla(0,0%,0%,0.2)] hover:shadow-[0_0px_1px_hsla(0,0%,0%,0.6),0_1px_2px_hsla(0,0%,0%,0.2)] active:shadow-[0_0px_1px_hsla(0,0%,0%,0.4)] active:translate-y-px"
        >
          <div className="w-9 h-9 grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="12"
              fill="none"
              viewBox="0 0 33 12"
            >
              <path
                fill="#fff"
                d="M8.838 10.94c.76-.497.964-1.292 1.149-1.992.187-.72.348-2.284 1.014-2.6 3.534-1.491 8.08-1.657 11.612-.143.68.323.85 1.89 1.044 2.613.187.7.402 1.493 1.162 2 .684.454 4.128.873 5.192.864.702-.005 1.255-.178 1.658-.523 1.458-1.355 1.154-4.824.981-5.553-.265-1.658-1.535-2.936-3.763-3.788C23.092-.665 10.549-.564 4.676 1.87c-1.121.412-1.998.937-2.626 1.573-.613.621-.989 1.348-1.119 2.168-.15.566-.453 4.191 1.033 5.593.397.34.954.516 1.652.527 1.064.017 4.542-.342 5.222-.792Z"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoCallActions;
