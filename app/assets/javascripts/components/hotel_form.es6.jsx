class HotelForm extends React.Component {
  constructor () {
    super();
    this.state = { name: '', areaId: '' }
  }

  onNameChange (e) {
    this.setState({ name: e.target.value });
  }

  onAreaSelect (areaId) {
    this.setState({ areaId: areaId });
  }

  submit (e) {
    e.preventDefault();
    name = this.state.name.trim();
    areaId = this.state.areaId;
    if (!name || !areaId) {
      return false;
    }
    this.props.onSubmit({name: name, area_id: areaId});
    this.setState({name: '', areaId: ''});
    return false;
  }

  render () {
    return (
      <form className="add-form" onSubmit={this.submit.bind(this)}>
        <div className="form-group">
          <input className="form-control" placeholder='Tên' onChange={this.onNameChange.bind(this)} value={this.state.name} autoFocus={true} />
        </div>
        <div className="form-group">
          <Select className={"form-control" + (this.state.areaId ? "" : " placeholder")} value={this.state.areaId} options={this.props.areaOptions} onChange={this.onAreaSelect.bind(this)} placeholder='- Chọn khu vực -'/>
        </div>
        <div className="form-group">
          <input type="submit" value="Thêm khách sạn" className="btn btn-primary" />
        </div>
      </form>
    )
  }
}
