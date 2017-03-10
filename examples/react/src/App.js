import React, { Component } from 'react';
import fett from '../../../src/fett';
import clone from './clone.jpg'

fett.startCounting('coolKey');

class App extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <div className='header'>
          <h1>Fett</h1>
          <p>This is a demo of the npm library <a href='https://www.npmjs.com/package/fett-tracker'>fett-tracker</a> (view the code on <a href='https://github.com/seangoedecke/fett'>Github</a>).
          <em> Fett</em> tracks how many instances of your web app are running in a browser.</p>
        </div>
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
    <h4>Current number of clones: <em>{ instances }</em>. Open and close other instances of this page and watch the number change!</h4>
      { [...Array(Number(instances))].map( (n, i) => (
        <img key={i} src={clone} alt='stormtrooper' />
      ))}
  </div>
)

export default App;
