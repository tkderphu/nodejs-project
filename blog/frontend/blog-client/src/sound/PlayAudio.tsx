import { useEffect, useRef } from "react";
import NotificationSound from "./notification-sound.mp3"

export default function PlayAudio(props: {uuid: string}) {
    const audioPlayer = useRef<any>(null);
  
    function playAudio() {
        audioPlayer.current?.play();
    }
  
    useEffect(() => {
        playAudio()
    }, [audioPlayer, props.uuid])

    return (
        <audio ref={audioPlayer} src={NotificationSound} />
    );
  }
  