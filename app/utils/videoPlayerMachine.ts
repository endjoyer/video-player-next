import { createMachine, assign } from 'xstate';

export const videoPlayerMachine = createMachine(
  {
    id: 'videoPlayer',
    initial: 'closed',
    context: {
      isPlaying: false,
    },
    states: {
      closed: {
        on: {
          OPEN_MODAL: { target: 'opened', actions: 'playAction' },
        },
      },
      opened: {
        type: 'parallel',
        states: {
          size: {
            initial: 'full',
            states: {
              mini: { on: { OPEN_FULL: 'full' } },
              full: { on: { OPEN_MINI: 'mini' } },
            },
          },
          playPause: {
            initial: 'play',
            states: {
              play: {
                on: {
                  TOGGLE_PAUSE: { target: 'pause', actions: 'pauseAction' },
                },
              },
              pause: {
                on: { TOGGLE_PLAY: { target: 'play', actions: 'playAction' } },
              },
            },
          },
        },
        on: { CLOSE: { target: 'closed', actions: 'pauseAction' } },
      },
    },
  },
  {
    actions: {
      playAction: assign({ isPlaying: () => true }),
      pauseAction: assign({ isPlaying: () => false }),
    },
  }
);
