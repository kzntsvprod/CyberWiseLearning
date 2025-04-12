import React, { useEffect, useRef } from "react";
import style from "../style/YouTubePlayer.module.css";

const YouTubePlayer = ({ videoId }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        const createPlayer = () => {
            new window.YT.Player(playerRef.current, {
                height: "315",
                width: "450",
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                },
            });
        };

        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => createPlayer();
        } else {
            createPlayer();
        }
    }, [videoId]);

    return <div ref={playerRef} className={style.videoWrapper}></div>;
};

export default YouTubePlayer;