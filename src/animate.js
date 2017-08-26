// @flow
import React, { createElement } from 'react';

export const defaultState = {
  animationWillEnd: false,
  animationWillStart: false,
  played: false,
};

type Style = { [string]: string | number };

type Props = {
  startAnimation: boolean,
  children: any,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  durationSeconds: number,
  delaySeconds?: number,
  reverseDelaySeconds?: number,
  easeType: string,
  forceUpdate?: boolean,
  tag?: ?string,
  onComplete?: () => mixed,
  className?: string,
  transition?: string,
};

type State = {
  animationWillEnd: boolean,
  animationWillStart: boolean,
  played: boolean,
};

export default class Animate extends React.Component<Props, State> {
  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    reverseDelaySeconds: 0,
    tag: 'div',
  };

  state = defaultState;

  animationTimeout = null;

  animationCompleteTimeout = null;

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
    clearTimeout(this.animationCompleteTimeout);
    this.animationTimeout = null;
    this.animationCompleteTimeout = null;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // only situation that should trigger a re-render
    return (
      JSON.stringify(nextProps.startStyle) !==
        JSON.stringify(this.props.startStyle) ||
      JSON.stringify(nextProps.endStyle) !==
        JSON.stringify(this.props.endStyle) ||
      nextProps.startAnimation !== this.props.startAnimation ||
      nextProps.children !== this.props.children ||
      nextState.animationWillEnd !== this.state.animationWillEnd ||
      nextState.animationWillStart !== this.state.animationWillStart ||
      !!nextProps.forceUpdate
    );
  }

  setAnimationDelay = (
    condition: boolean,
    durationSeconds: number,
    isReverse: boolean = false,
  ): void => {
    if (!condition) return;
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.setState({
        ...(isReverse ? { animationWillStart: true } : null),
        ...(!isReverse ? { animationWillEnd: true } : null),
      });
    }, parseFloat(durationSeconds) * 1000);
  };

  setAnimationDelayAndOnComplete(props: Props, isReverse: boolean = false) {
    const {
      delaySeconds,
      startAnimation,
      onCompleteStyle,
      durationSeconds,
      onComplete,
      reverseDelaySeconds,
    } = props;

    const delayTotalSeconds =
      parseFloat(delaySeconds) + parseFloat(durationSeconds);

    // delay animation
    this.setAnimationDelay(!!delaySeconds && startAnimation, delaySeconds || 0);
    // reverse animation
    this.setAnimationDelay(
      !!reverseDelaySeconds && isReverse && !startAnimation,
      reverseDelaySeconds || 0,
      true,
    );
    // onComplete style
    this.setAnimationDelay(
      !!onCompleteStyle && startAnimation,
      delayTotalSeconds,
      false,
    );

    if (!onComplete) return;

    this.animationCompleteTimeout = setTimeout(() => {
      onComplete();
    }, delayTotalSeconds);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { startAnimation } = nextProps;
    const isAnimationStatusChanged =
      startAnimation !== this.props.startAnimation;

    if (isAnimationStatusChanged) {
      this.setState({
        animationWillEnd: false,
        animationWillStart: false,
        played: isAnimationStatusChanged && startAnimation,
      });
    }

    this.setAnimationDelayAndOnComplete(
      nextProps,
      isAnimationStatusChanged && !startAnimation,
    );
  }

  componentDidMount() {
    this.setAnimationDelayAndOnComplete(this.props);
  }

  render() {
    const { animationWillEnd, animationWillStart, played } = this.state;
    const {
      children,
      startAnimation,
      startStyle,
      endStyle,
      onCompleteStyle,
      durationSeconds,
      reverseDelaySeconds,
      delaySeconds,
      easeType,
      className,
      transition: transitionValue,
      tag,
    } = this.props;
    let style = startStyle;
    let transition = transitionValue || `${durationSeconds}s all ${easeType}`;

    if (!played && reverseDelaySeconds && !startAnimation) {
      style = animationWillStart ? startStyle : endStyle;
    } else if (animationWillEnd || (startAnimation && !delaySeconds)) {
      if (onCompleteStyle && animationWillEnd) {
        style = onCompleteStyle;
        transition = null;
      } else {
        style = endStyle;
      }
    }

    const propsToChild = {
      className,
      style: {
        ...{
          ...style,
          transition,
        },
      },
    };

    return createElement(tag || 'div', propsToChild, children);
  }
}
