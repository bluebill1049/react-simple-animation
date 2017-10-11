// @flow
import React from 'react';
import propsGenerator from './propsGenerator';
import type { Props, State } from '../animate';

let componentProps = null;

function filterUnMountChildren(children: Array<React$Element<any>>) {
  return children.filter((child: Object) => !child.willUnmount);
}

export default function mapChildren(props: Props, state: State) {
  const { childrenStoreInState, animationWillLeave } = state;

  const tempChildren = childrenStoreInState.length
    ? childrenStoreInState
    : props.children;

  const children = animationWillLeave
    ? filterUnMountChildren(childrenStoreInState)
    : tempChildren;

  return (
    children &&
    children.map((child: Object) => {
      if (!child) return null;

      const { willMount = false, willUnmount = false } = child;

      componentProps = propsGenerator(
        {
          ...props,
        },
        state,
        {
          willUnmount,
          willMount,
        },
      );

      return React.cloneElement(child, {
        ...{ ...child.props },
        style: componentProps.style,
      });
    })
  );
}
