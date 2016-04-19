class Competitor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editing: false, name: props.name, baseLink: props.baseLink }
  }

  onDelete (e) {
    this.props.onDelete(this.props.id);
    return false;
  }

  onEdit(e) {
    this.setState({ editing: true });
    return false;
  }

  onUpdate(e) {
    $.ajax({
      dataType: 'json',
      type: 'PUT',
      data: {
        resource: {
          name: this.state.name,
          base_link: this.state.baseLink
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

  handleBaseLinkChange (e) {
    this.setState({ baseLink: e.target.value });
  }

  render () {
    if (this.state.editing) {
      return (
        <tr className="editing">
          <td>
            <input className="form-control" placeholder="Tên" onChange={this.handleNameChange.bind(this)} value={this.state.name}/>
          </td>
          <td>
            <input className="form-control" placeholder="Website" onChange={this.handleBaseLinkChange.bind(this)} value={this.state.baseLink}/>
          </td>
          <td className="text-right"><button className="btn btn-default" onClick={this.onUpdate.bind(this)}>Lưu thay đổi</button></td>
        </tr>
      )
    }

    return (
      <tr>
        <td>{this.state.name}</td>
        <td>{this.state.baseLink}</td>
        <td className="text-right">
          <a onClick={this.onEdit.bind(this)}><i className="glyphicon glyphicon-pencil" /></a>
          <a onClick={this.onDelete.bind(this)}><i className="glyphicon glyphicon-trash" /></a>
        </td>
      </tr>
    );
  }
}
