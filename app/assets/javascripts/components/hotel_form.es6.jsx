class HotelForm extends React.Component {
  constructor () {
    super();
    this.state = { name: '' }
  }

  handleOnChange (e) {
    this.setState({ name: e.target.value });
  }

  submit (e) {
    e.preventDefault();
    name = this.state.name.trim();
    if (!name) {
      return false;
    }
    this.props.onSubmit({name: name});
    this.setState({name: ''});
    return false;
  }

  render () {
    return (
      <form className="add-form" onSubmit={this.submit.bind(this)}>
        <div className="form-group">
          <input className="form-control" placeholder='Tên' onChange={this.handleOnChange.bind(this)} value={this.state.name} autoFocus={true} />
        </div>
        <div className="form-group">
          <input type="submit" value="Thêm khách sạn" className="btn btn-primary" />
        </div>
      </form>
    )
  }
}
