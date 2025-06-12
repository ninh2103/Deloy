//

import React from 'react'

interface WelcomeProps {
  name: string
}

interface WelcomeState {
  time: number
}

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  constructor(props: WelcomeProps) {
    super(props)
    this.state = {
      time: new Date().getTime()
    }
  }
  getTime = () => {
    this.setState({ time: new Date().getTime() })
  }
  render() {
    return (
      <div>
        <h1>Hello, {this.state.time}</h1>
        <button onClick={this.getTime}>Get Time</button>
      </div>
    )
  }
}
export default Welcome
