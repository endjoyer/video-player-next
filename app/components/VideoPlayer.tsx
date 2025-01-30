'use client';
import { useMachine } from '@xstate/react';
import { videoPlayerMachine } from '../utils/videoPlayerMachine';
import { PlayCircleOutlined } from '@ant-design/icons';
import PlayerModal from './PlayerModal';

export default function VideoPlayer() {
  const [state, send] = useMachine(videoPlayerMachine);
  const isOpen = state.value !== 'closed';
  const isPlaying = state.context.isPlaying;
  const currentState = state.matches({ opened: { size: 'full' } })
    ? 'full'
    : 'mini';

  return (
    <>
      {!isOpen && (
        <div className="closed-modal">
          <PlayCircleOutlined
            className="playing-icon"
            onClick={() => send({ type: 'OPEN_MODAL' })}
          />
        </div>
      )}
      <PlayerModal
        isOpen={isOpen}
        currentState={currentState}
        isPlaying={isPlaying}
        onClose={() => send({ type: 'CLOSE' })}
        onToggleSize={() =>
          send(
            currentState === 'full'
              ? { type: 'OPEN_MINI' }
              : { type: 'OPEN_FULL' }
          )
        }
        onTogglePlayPause={() =>
          send(isPlaying ? { type: 'TOGGLE_PAUSE' } : { type: 'TOGGLE_PLAY' })
        }
      />
    </>
  );
}
