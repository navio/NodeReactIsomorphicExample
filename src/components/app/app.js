import React from 'react';

class App {

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }
  
  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  render() {

    return (
      <div>
         Render Components! on {this.props.path}
      </div>
    )
  }

  handlePopState(event) {

    AppActions.navigateTo(window.location.pathname, {replace: !!event.state});
  }

}

export default App;
