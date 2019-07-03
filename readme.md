# Card Carousel

React Component for card carousel with animation

<video id="video" controls="" autoplay loop poster="./card.png">
  <source id="mp4" src="./card.mp4" type="video/mp4">
  <source id="webm" src="./card.webm" type="video/webm">
  <p>Your user agent does not support the HTML5 Video element.</p>
</video>

## Install 安装

```shell
npm i card-carousel -S
```

## Usage 用法

```js
import React from 'react'
import CardCarousel from 'card-carousel'

const style = {
  width: '100px',
  height: '100px',
  padding: '50px',
  background: '#db639b',
  fontSize: '28px',
  color: '#fff',
}

const cards = [
  <div style={style}>card 1</div>,
  <div style={style}>card 2</div>,
  <div style={style}>card 3</div>,
]

class Carousel extends React.Component {
  render () {
    return (<CardCarousel autoPlay showSize={3} cards={cards} />)
  }
}
```

## Property 属性

```tsx
  // cards
  cards: React.ReactElement[],
  // custom card carousel css style
  style?: React.CSSProperties,
  // custom card carousel className
  className?: string,
  // allow auto play， 是否开启自动轮播
  autoPlay?: boolean,
  // animation duration, 动画过渡时间
  duration?: number,
  // animation stop interval, 动画停留时间
  interval?: number,
  // allow hover stop carousel，是否开启悬浮停止动画
  hoverPause?: boolean,
  // show card size, 展示的卡片数
  showSize?: number,
  // todo
  translateRate?: number,
  // todo
  scaleRate?: number,
  // event hook for jumpping to one card, 点击某卡片时的回调
  onJump?: (e: React.MouseEvent, index: number,
  // default show index, 初始展示的卡片下标
  defaultShowIndex?: number,
```
