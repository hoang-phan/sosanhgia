class App extends React.Component {
  constructor () {
    super();
    this.state = { currentTab: getCurrentTab() };
  }

  componentDidUpdate(prevProps, prevState) {
    currentTab = getCurrentTab();
    if (currentTab != prevState.currentTab) {
      this.setState({ currentTab: currentTab });
    }
  }

  changeTab (id) {
    history.pushState({}, 'changeTab', '/' + id);
    this.setState({ currentTab: id });
  }

  getComponentClass (id) {
    switch (id) {
      case 'khu-vuc':
        return AreaBox;
      case 'khach-san':
        return HotelBox;
    }

    return CompetitorBox;
  }

  getCurrentContainer () {
    currentTab = this.state.currentTab;
    current = this.props.data.filter(tab => tab.id == currentTab)[0];
    if (current) {
      return React.createElement(this.getComponentClass(current.id), current.attributes);
    } {
      return <ErrorPage />
    }
  }

  rowFor (tab) {
    return <Tab title={tab.title} key={tab.title} url={tab.url} isCurrent={this.state.currentTab == tab.id} 
                onClick={this.changeTab.bind(this, tab.id)}/>
  }

  render () { 
    tabs = _.map(this.props.data, tab => <Tab title={tab.title} key={tab.title} url={tab.url} isCurrent={this.state.currentTab == tab.id} onClick={this.changeTab.bind(this, tab.id)}/>)
    currentContainer = this.getCurrentContainer();

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">KumaChudu</a>
            </div>
            <ul className="nav navbar-nav">{tabs}</ul>
          </div>
        </nav>
        <div className='container'>{currentContainer}</div>
      </div>
    );
  }
}
