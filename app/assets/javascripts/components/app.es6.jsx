class App extends React.Component {
  constructor () {
    super();
    this.state = { currentTab: 1 };
  }

  changeTab (id) {
    this.setState({ currentTab: id });
  }

  getComponentClass (id) {
    switch (id) {
      case 2:
        return CompetitorBox;
    }

    return HotelBox;
  }

  render () { 
    tabs = _.map(this.props.data, tab => <Tab title={tab.title} key={tab.title} url={tab.url} isCurrent={this.state.currentTab == tab.id} onClick={this.changeTab.bind(this, tab.id)}/>)

    currentTab = this.state.currentTab;
    current = this.props.data.filter(tab => tab.id == currentTab)[0];
    currentContainer = React.createElement(this.getComponentClass(current.id), current.attributes);

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">KumaChudu</a>
            </div>
            <ul className="nav navbar-nav">{tabs}</ul>
          </div>
        </nav>
        <div className='container'>{currentContainer}</div>
      </div>
    );
  }
}
