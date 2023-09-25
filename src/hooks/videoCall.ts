import { useEventListener } from "@huddle01/react";
import { useEffect, useReducer, useRef } from "react";

import useHuddle01 from "@/hooks/huddle01";
import { Console } from "console";

interface VideoCallState {
  initializeLoading: boolean;
  showDialog: boolean;
  blurMain: boolean;
  joinedLobby: boolean;
  joinedRoom: boolean;
  recording: boolean;
  showUpload: boolean;
  produceVideo: boolean;
  produceAudio: boolean;
}

export type VideoCallReturnType = ReturnType<typeof useVideoCall>;

export const useVideoCall = (data: {
  name: string;
  roomId: string;
  photoUrl: string;
}) => {
  const h = useHuddle01();

  const [state, updateState] = useReducer(
    (
      current: VideoCallState,
      update: Partial<VideoCallState>
    ): VideoCallState => ({
      ...current,
      ...update,
    }),
    {
      initializeLoading: true,
      showDialog: false,
      blurMain: true,
      joinedLobby: false,
      joinedRoom: false,
      recording: false,
      showUpload: false,
      produceVideo: false,
      produceAudio: false,
    }
  );

  const stateRef = useRef(state);
  const videoRefPreview = useRef<HTMLVideoElement>(null);
  const videoRefLive = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ showDialog: true });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    h.initialize(h.projectId);
    h.setDisplayNameText(data.name);
  }, [data.name, h.projectId]);

  useEffect(() => {
    if (!h.joinLobby.isCallable) return;
    h.joinLobby(data.roomId);
  }, [data.roomId, h.joinLobby.isCallable]);

  useEffect(() => {
    if (
      [
        h.setDisplayName.isCallable,
        h.fetchVideoStream.isCallable,
        h.fetchAudioStream.isCallable,
        h.joinRoom.isCallable,
      ].every(Boolean)
    ) {
      updateState({ joinedLobby: true });
      updateState({ initializeLoading: false });
    }
  }, [
    h.displayNameText,
    h.setDisplayName.isCallable,
    h.fetchVideoStream.isCallable,
    h.fetchAudioStream.isCallable,
    h.joinRoom.isCallable,
  ]);

  useEventListener("lobby:cam-on", () => {
    if (h.camStream && videoRefPreview.current) {
      videoRefPreview.current.srcObject = h.camStream;
    }
  });

  useEventListener("room:joined", () => {
    setUserInfo();
  });

  useEffect(() => {
    if (
      h.camStream &&
      videoRefLive.current &&
      stateRef.current.joinedRoom &&
      state.produceVideo
    ) {
      h.fetchVideoStream();
      videoRefLive.current.srcObject = h.camStream;
      h.produceVideo(h.camStream);
    } else if (
      !state.produceVideo &&
      videoRefLive.current &&
      state.joinedRoom
    ) {
      videoRefLive.current.srcObject = null;
      h.stopVideoStream();
    }
  }, [h.camStream, state.produceVideo]);

  useEffect(() => {
    if (h.micStream && state.produceAudio) {
      h.produceAudio(h.micStream);
    }
  }, [h.micStream, state.produceAudio]);

  const joinRoom = () => {
    h.joinRoom();
    updateState({ showDialog: false });
    updateState({ joinedRoom: true });
    updateState({ blurMain: false });
  };

  const leaveRoom = () => {
    stopProducingCamera();
    stopProducingAudio();
    h.leaveRoom();
    updateState({ showDialog: true });
    updateState({ joinedRoom: false });
    updateState({ blurMain: true });
  };

  const produceCamera = () => {
    h.fetchVideoStream();
    updateState({ produceVideo: true });
  };

  const stopProducingCamera = () => {
    updateState({ produceVideo: false });
    h.stopVideoStream();
    h.stopProducingVideo();
  };

  const produceAudio = () => {
    updateState({ produceAudio: true });
    h.fetchAudioStream();
  };

  const stopProducingAudio = () => {
    updateState({ produceAudio: false });
    h.stopAudioStream();
    h.stopProducingAudio();
  };

  const setUserInfo = () => {
    const user = {
      name: data.name,
      photoUrl: data.photoUrl,
    };

    h.setDisplayName(JSON.stringify(user));
  };

  return {
    state,
    updateState,
    peers: h.peers,
    videoRefPreview,
    videoRefLive,
    fetchVideoStream: h.fetchVideoStream,
    stopVideoStream: h.stopVideoStream,
    fetchAudioStream: h.fetchAudioStream,
    stopAudioStream: h.stopAudioStream,
    setUserInfo,
    produceCamera,
    stopProducingCamera,
    produceAudio,
    stopProducingAudio,
    joinRoom,
    leaveRoom,
  };
};
