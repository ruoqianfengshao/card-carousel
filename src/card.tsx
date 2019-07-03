import * as React from 'react'

interface Props {
  index?: number,
  status?: string,
  style: React.CSSProperties,
  className?: string,
  onMouseMove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  onMouseOut: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export default class Card extends React.Component<Props> {
  render () {
    const {
      className,
      onClick,
      style = {},
      children,
      onMouseMove,
      onMouseOut,
    } = this.props
    return (
      <div
        className={className}
        style={style}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}