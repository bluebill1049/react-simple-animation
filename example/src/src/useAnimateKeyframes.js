// @flow
// $FlowIgnoreLine
import { useState, useEffect } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';
import type { AnimateKeyframesProps } from './animateKeyframes';
import deleteRules from './style/deleteRules';

export default function useAnimateKeyframes(props: AnimateKeyframesProps) {
  const {
    durationSeconds = 0.3,
    delaySeconds = 0,
    easeType = 'linear',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    playState = 'running',
    keyframes,
  } = props;

  const [animateProps, setPlay] = useState(props);

  const playFunction = (playValue: boolean, animationName: string) => {
    setPlay({
      ...props,
      animationName,
      play: playValue,
    });
  };

  const { play, animationName } = animateProps;

  useEffect(() => {
    const name = createRandomName();
    const { styleTag } = createTag({ animationName: name, keyframes });
    const localStyleTag: any = styleTag;

    setPlay({
      ...props,
      animationName: name,
    });

    return () => {
      deleteRules(localStyleTag.sheet, name);
    };
  }, []);

  const style = play
    ? {
        animation: `${durationSeconds}s ${easeType} ${delaySeconds}s ${iterationCount} ${direction} ${fillMode} ${playState} ${animationName}`,
      }
    : null;

  return [
    {
      style,
      play,
    },
    playValue => playFunction(playValue, animationName),
  ];
}
