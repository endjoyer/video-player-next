'use client';
import { Modal, Button } from 'antd';
import {
  CaretRightOutlined,
  ShrinkOutlined,
  PauseOutlined,
  ArrowsAltOutlined,
} from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';

type PlayerModalProps = {
  isOpen: boolean;
  currentState: 'full' | 'mini' | 'closed';
  onClose: () => void;
  onToggleSize: () => void;
  onTogglePlayPause: () => void;
  isPlaying: boolean;
};

export default function PlayerModal({
  isOpen,
  currentState,
  onClose,
  onToggleSize,
  onTogglePlayPause,
  isPlaying,
}: PlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const player = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (isOpen && videoRef.current && !player.current) {
      player.current = videojs(videoRef.current, {
        sources: [
          {
            src: 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8',
            type: 'application/x-mpegURL',
          },
        ],
        autoplay: true,
        controls: false,
        fluid: false,
        loop: true,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (player.current) {
      if (isPlaying) {
        player.current.play();
      } else {
        player.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <Modal
      open={isOpen}
      width={currentState === 'full' ? '80%' : '45%'}
      style={{ maxWidth: currentState === 'full' ? '1000px' : '500px' }}
      onCancel={onClose}
      title="PLAYER"
      footer={[
        <Button
          key="screen-size"
          shape="circle"
          onClick={onToggleSize}
          icon={
            currentState === 'full' ? <ShrinkOutlined /> : <ArrowsAltOutlined />
          }
        />,
        <Button
          key="play-pause"
          shape="circle"
          onClick={onTogglePlayPause}
          icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
        />,
      ]}
    >
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-hidden-controls"
      ></video>
    </Modal>
  );
}
