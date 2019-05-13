import * as React from 'react';
import createTag from './logic/createTag';
import createRandomName from './utils/createRandomName';
import deleteRule from './logic/deleteRules';
import { AnimateContext } from './animateGroup';
import { AnimationType, AnimationStateType, Keyframes } from './types';

const { useRef, useEffect, useContext, useState } = React;

export type Props = {
  keyframes: Keyframes;
  playState?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: string | number;
  animationStates: AnimationStateType;
} & AnimationType;

export default function AnimateKeyframesChild(props: Props) {
  const {
    children,
    play,
    render,
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    playState = 'running',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    keyframes,
  } = props;
  const animationNameRef = useRef('');
  const styleTagRef = useRef({
    sheet: {},
  });
  const { register } = useContext(AnimateContext);
  const forceUpdate = useState(false)[1];

  useEffect(() => {
    animationNameRef.current = createRandomName();
    const { styleTag } = createTag({
      animationName: animationNameRef.current,
      keyframes,
    });
    styleTagRef.current = styleTag;
    register(props);

    if (play) forceUpdate(true);
    return (): void => deleteRule(styleTagRef.current.sheet, animationNameRef.current);
  }, []);

  const style = play
    ? {
        animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${playState} ${animationNameRef.current ||
          ''}`,
      }
    : null;

  return render ? render({ style }) : <div style={style || {}}>{children}</div>;
}