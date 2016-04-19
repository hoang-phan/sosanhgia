class Tab extends React.Component {
  onClick (e) {
    this.props.onClick();
    return false;
  }

  render () { 
    return (
      <li className={this.props.isCurrent ? 'active' : null}><a onClick={this.onClick.bind(this)}>{this.props.title}</a></li>
    );
  }
}
