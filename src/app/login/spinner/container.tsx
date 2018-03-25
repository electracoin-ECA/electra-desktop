import * as React from 'react'

interface ComponentProps {
  text: string
}

export default class Spinner extends React.PureComponent<ComponentProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <img src={'https://cdn.dribbble.com/users/74103/screenshots/946841/squarespace-logo-symbol-black.gif'} />
        <p>{this.props.text}</p>
      </div>
    )
  }
}
