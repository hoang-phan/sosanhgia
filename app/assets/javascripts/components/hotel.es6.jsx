class Hotel extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editing: false, name: props.name, areaId: props.areaId, areaName: props.areaName };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name, areaId: nextProps.areaId, areaName: nextProps.areaName });
  }

  onDelete (e) {
    this.props.onDelete(this.props.id);
    return false;
  }

  onEdit(e) {
    this.setState({ editing: true });
    return false;
  }

  onLinksEdit(e) {
    this.props.onModalOpen(this.props.name, this.props.id);
    return false;
  }

  onUpdate(e) {
    $.ajax({
      dataType: 'json',
      type: 'PUT',
      data: {
        resource: {
          name: this.state.name,
          area_id: this.state.areaId
        }
      },
      url: this.props.url + "/" + this.props.id,
      success: function(response) {
        toastr.info('Cập nhật thành công');
      },
      failure: function(response) {
        toastr.info('Cập nhật thất bại');
      }
    });
    this.setState({editing: false});
    return false;
  }

  handleNameChange (e) {
    this.setState({ name: e.target.value });
  }

  onAreaSelect (areaId) {
    this.setState({ areaId: areaId, areaName: getAreaById(this.props.areaOptions, areaId)[1] });
  }

  render () {
    if (this.state.editing) {
      return (
        <tr className="editing">
          <td>
            <input className="form-control" placeholder="Tên" onChange={this.handleNameChange.bind(this)} value={this.state.name}/>
          </td>
          <td>
            <Select className={"form-control" + (this.state.areaId ? "" : " placeholder")} value={this.state.areaId} options={this.props.areaOptions} onChange={this.onAreaSelect.bind(this)} placeholder='- Chọn khu vực -'/>
          </td>
          <td className="text-right"><button className="btn btn-default" onClick={this.onUpdate.bind(this)}>Lưu thay đổi</button></td>
        </tr>
      )
    }

    return (
      <tr>
        <td>{this.state.name}</td>
        <td>{this.state.areaName}</td>
        <td className="text-right">
          <a onClick={this.onEdit.bind(this)}><i className="glyphicon glyphicon-pencil" /></a>
          <a onClick={this.onLinksEdit.bind(this)}><i className="glyphicon glyphicon-link" /></a>
          <a onClick={this.onDelete.bind(this)}><i className="glyphicon glyphicon-trash" /></a>
        </td>
      </tr>
    );
  }
}
