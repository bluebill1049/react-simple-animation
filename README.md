<p align="center">
    <img width="675" src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/logo.png" alt="React Simple Animate Logo - UI Animation Made Simple" />
</p>

[![npm version](https://img.shields.io/npm/v/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)
[![npm downloads](https://img.shields.io/npm/dm/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)
[![npm](https://img.shields.io/npm/dt/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)
[![npm](https://img.shields.io/npm/l/react-simple-animate.svg?style=flat-square)](https://www.npmjs.com/package/react-simple-animate)

> **Make web animation simple** :clap:

Features:

* Simple animation from inline style A to style B
* easily chain up animation sequences (New)
* Support add and remove child
* Make animation toggle easy
* Tiny size without other dependency

## Install

    $ yarn add react-simple-animate
    or
    $ npm install react-simple-animate -S

## Example

[Check out the interactive demo.](https://react-simple-animate.herokuapp.com/) 😍

Navigate into `example` folder and install

    $ yarn && yarn start
    or
    $ npm install && npm run start

Screenshot of the example app below

<img src="https://raw.githubusercontent.com/bluebill1049/react-simple-animate/master/example/screenShot.png" alt="Screenshots" width="400"/>

## Quick start

    import react from 'react';
    import { Animate, AnimateGroup } from 'react-simple-animate';

    const props = {
        startAnimation: true,
        startStyle: { opacity: 0 }
        endStyle={ opacity: 1 }
    };

    export default function SexyComponent() {
        return (
            // This example demonstrate animate **individual** element.
            <Animate {...props}>
                <h1>React simple animate</h1>
            </Animate>

            // This example demonstrate animate group of animation with sequenceIndex.
            <AnimateGroup startAnimation>
                <Animate {...props} sequenceIndex={0} />
                <p>Next animation below: </p>
                <Animate {...props} sequenceIndex={1} />
            </AnimateGroup>
        );
    }

## Animate API

| Prop                     | Type     | Required | Description                                                                            |
| :----------------------- | :------- | :------: | :------------------------------------------------------------------------------------- |
| `startAnimation`         | boolean  |    ✓     | Defaults to false. Set to true to start the animation.                                 |
| `children`               | node     |          | Child component to be animated.                                                        |
| `render`                 | Function |          | Element animation attributes as argument eg. `(attributes) => <div {...attributes} />` |
| `startStyle`             | string   |          | Component initial inline style.                                                        |
| `endStyle`               | string   |    ✓     | Component transition to inline style.                                                  |
| `onCompleteStyle`        | string   |          | Style to be applied after the animation is completed.                                  |
| `durationSeconds`        | number   |          | How long the animation takes in seconds.                                               |
| `delaySeconds`           | number   |          | How much delay should apply before animation starts.                                   |
| `reverseDurationSeconds` | number   |          | How long the reverse/toggle animation takes in seconds.                                |
| `reverseDelaySeconds`    | number   |          | How much delay should apply when reverse/toggle animation.                             |
| `onComplete`             | function |          | Call back function after animation complete.                                           |
| `sequenceIndex`          | number   |          | `AnimateGroup`: Animate will be trigger from 0 to n number                             |
| `sequenceId`             | string   |          | `AnimateGroup`: Unique id to associate with AnimationGroup sequences                   |
| `overlaySeconds`         | number   |          | `AnimateGroup`: When animation need to play ahead and overlay on top of the previous   |
| `easeType`               | string   |          | Easing type refer to http://easings.net/                                               |
| `className`              | string   |          | To specify a CSS class.                                                                |

## AnimateGroup API

| Prop             | Type            | Required | Description                                                                                        |
| :--------------- | :-------------- | :------: | :------------------------------------------------------------------------------------------------- |
| `startAnimation` | boolean         |    ✓     | Defaults to false. Set to true to start the group animation.                                       |
| `children`       | node            |    ✓     | Components(<Animate />) to be animated. (children can contains other components and html elements. |
| `sequences`      | Array<{Object}> |          | Array with animation props, it can contain `sequenceId` to reference with Animation sequenceId.    |

## Advance Example

Set up animation sequence with id😘

    import react from 'react';
    import { Animate, AnimateGroup } from 'react-simple-animate';

    const animation = {
        startStyle: { opacity: 0 }
        endStyle={ opacity: 1 }
    };

    export default () => {
        return (
            <AnimateGroup startAnimation sequences=[
                { sequenceId: 'header', ...animation } // play first
                { sequenceId: 'content', ...animation, overlaySeconds: 0.1 } // play during header animation and overlay by 0.1s
                { sequenceId: 'footer', ...animation, delaySeconds: 0.4 } // play after content with 0.4s seconds delay
            ]>
                <Animate sequenceId="header" />
                <Animate sequenceId="content" />
                <Animate sequenceId="footer" />
            </AnimateGroup>
        );
    };

## Reference

https://medium.com/jsdownunder/react-ui-animation-made-simple-c2ff98056659
