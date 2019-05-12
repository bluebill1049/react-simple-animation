// @flow
export type Style = { [string]: string | number };

export type AnimationType = {
  play: boolean,
  start: Style,
  end: Style,
  complete: Style,
  overlay?: number,
  duration: number,
  delay: number,
  easeType?: string,
  children?: any,
  register?: any => void,
};

export type AnimationStateType = { [string | number]: AnimationType };