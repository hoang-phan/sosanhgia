class CompetitorForm extends React.Component {
  constructor () {
    super();
    this.state = { name: '', baseLink: '' }
  }

  handleNameChange (e) {
    this.setState({ name: e.target.value });
  }

  handleBaseLinkChange (e) {
    this.setState({ baseLink: e.target.value });
  }

  submit (e) {
    e.preventDefault();
    name = this.state.name.trim();
    baseLink = this.state.baseLink.trim();
    if (!name || !baseLink) {
      return false;
    }
    this.props.onSubmit({name: name, base_link: baseLink});
    this.setState({name: '', baseLink: ''});
    return false;
  }

  render () {
    return (
      <form className="form" onSubmit={this.submit.bind(this)}>
        <div className="form-group">
          <input className="form-control" placeholder="Tên" onChange={this.handleNameChange.bind(this)} value={this.state.name}/>
        </div>
        <div className="form-group">
          <input className="form-control" placeholder="Website" onChange={this.handleBaseLinkChange.bind(this)} value={this.state.baseLink}/>
        </div>
        <div className="form-group">
          <input type="submit" value="Thêm đối thủ" className="btn btn-primary"/>
        </div>
      </form>
    )
  }
}
