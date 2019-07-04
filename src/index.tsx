import * as React from 'react'
import Card from './card'

interface Props {
  cards: React.ReactElement[],
  style?: React.CSSProperties,
  className?: string,
  autoPlay?: boolean,
  duration?: number,
  interval?: number,
  hoverPause?: boolean,
  showSize?: number,
  translateRate?: number,
  scaleRate?: number,
  onJump?: (e: React.MouseEvent, index: number, cards: React.ReactElement[]) => void,
  defaultShowIndex?: number,
}

interface State {
  currentIndex: number,
  pause: boolean,
}

export default class CardCarousel extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    defaultShowIndex: 0,
    hoverPause: true,
    showSize: 3,
    interval: 3000,
    duration: 0.3,
  }

  state = {
    pause: false,
    currentIndex: this.props.defaultShowIndex,
  }

  componentDidMount () {
    const {cards , showSize} = this.props
    if (cards.length < showSize) {
      throw new Error('CardCarousel error: showSize must be less than or equal to cards length')
    }
    if (this.props.autoPlay) {
      this.autoPlay()
    }
  }

  onMouseMove = () => {
    this.setState({
      pause: true,
    })
  }

  onMouseOut = () => {
    this.setState({
      pause: false,
    })
  }

  autoPlay = () => {
    setInterval(() => {
      if (!this.state.pause) {
        this.next()
      }
    }, this.props.interval)
  }

  to = (e: React.MouseEvent, index) => {
    this.props.onJump && this.props.onJump(e, index, this.props.cards)
    this.setState({
      currentIndex: index,
    })
  }

  next = () => {
    let {currentIndex} = this.state
    currentIndex = currentIndex < this.props.cards.length - 1 ? currentIndex + 1 : 0
    this.setState({
      currentIndex,
    })
  }

  prev = () => {
    let {currentIndex} = this.state
    currentIndex = currentIndex === 0 ? this.props.cards.length - 1 : currentIndex - 1
    this.setState({
      currentIndex,
    })
  }

  calcTranslateX = (index) => {
    // todo simify translate calculate
  }

  calcScale = (index) => {
    // todo simify scale calculate
  }

  calcIndex = (i) => {
    const edge = Math.floor(this.props.showSize / 2)
    const cardLength = this.props.cards.length
    const { currentIndex } = this.state


    if (i === currentIndex) {
      return {
        differ: 0,
        carouselStatus: 'active',
        scale: 1,
        translateX: 0,
      }
    }

    if (i < currentIndex) {
      if (i < currentIndex - edge) {
        const extra = currentIndex + edge + 1 - cardLength
        if ( extra > 0 && i < extra) {
          const differ = cardLength + i - currentIndex
          return {
            differ,
            carouselStatus: 'show',
            scale: 1 - 0.1 - differ * 0.1,
            translateX: `${-5 * Math.pow(differ, 2) + 60 * differ}%`,
          }
        }
        return {
          differ: i - currentIndex,
          carouselStatus: 'disable',
          scale: 0.1,
          translateX: 0,
        }
      }

      return {
        differ: i - currentIndex,
        carouselStatus: 'show',
        scale: 1 - 0.1 - (currentIndex - i) * 0.1,
        translateX: `${5 * Math.pow(currentIndex - i, 2) + 60 * (i - currentIndex)}%`,
      }
    }

    if (i > currentIndex) {
      if (i > currentIndex + edge) {
        const extra = currentIndex - edge
        if ( extra < 0 && i >= cardLength + extra) {
          const differ = i - cardLength - currentIndex
          return {
            differ,
            carouselStatus: 'show',
            scale: 1 - 0.1 + differ * 0.1,
            translateX: `${5 * Math.pow(differ, 2) + 60 * differ}%`,
          }
        }

        return {
          differ: i - currentIndex,
          carouselStatus: 'disable',
          scale: 0.1,
          translateX: 0,
        }
      }

      return {
        differ: i - currentIndex,
        carouselStatus: edge - (i - currentIndex) >= 0 ? 'show' : 'disable',
        scale: 1 - 0.1 - (i - currentIndex) * 0.1,
        translateX: `${-5 * Math.pow(currentIndex - i, 2) + 60 * (i - currentIndex)}%`,
      }
    }
  }

  render () {
    const { cards, className, style } = this.props

    return (
      <div
        className={`card-carousel-container ${className}`}
        style={{...style, position: 'relative'}}
      >
        {
          cards.map((card, i) => {
            const cardInfo = this.calcIndex(i)

            return (<Card
              key={`card-${i}`}
              className={`card-${cardInfo.carouselStatus}`}
              onMouseMove={this.onMouseMove}
              onMouseOut={this.onMouseOut}
              style={{
                transform: `translateX(${cardInfo.translateX}) scale(${cardInfo.scale})`,
                zIndex: 99 - Math.abs(cardInfo.differ),
                transitionDuration: `${this.props.duration}s`,
                transitionProperty: 'transform, z-index',
                visibility: cardInfo.carouselStatus === 'disable' ? 'hidden' : 'visible',
                verticalAlign: 'baseline',
                position: 'absolute',
              }}
              onClick={(e) => this.to(e, i)}
            >{card}</Card>)
          })
        }
      </div>
    )
  }
}