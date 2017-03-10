import React, { Component } from 'react';
import fett from '../../../src/fett';

fett.startCounting('coolKey');

class App extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <h1>Fett demo</h1>
        <h3>Open and close other instances of this page and watch the number change</h3>
        <Listener>
          <ChangeReporter />
        </Listener>
      </div>
    );
  }
}

class Listener extends Component {
  constructor() {
    super();
    this.state = { instances: fett.numInstances() }
  }
  componentWillMount() {
    fett.addListener(this.handleStorageChange)
  }
  componentWillUnmount() {
    fett.removeListener(this.handleStorageChange)
  }

  handleStorageChange = (e) => {
    if (e.key !== 'coolKey') { return }
    this.setState({ instances: e.newValue })
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, { instances: this.state.instances })
    )
    return (
      <div ref="localStorageListener">
        { childrenWithProps }
      </div>
    )
  }
}

const ChangeReporter = ({ instances }) => (
  <div>
      There are { instances } of me!
  </div>
)

export default App;
