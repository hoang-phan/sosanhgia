class AreaBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = { data: [] };
    this.getServerData();
  }

  getServerData() {
    $.ajax({
      dataType: 'json',
      url: this.props.url,
      success: function(response) {
        this.setState({data: response.resources});
        $.bootstrapSortable(true);
      }.bind(this)
    })
  }

  onAreaCreated (area) {
    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: this.props.url,
      data: { resource: area },
      success: function(response) {
        this.setState({data: response.resources});
        $.bootstrapSortable(true);
        toastr.info('Cập nhật thành công');
      }.bind(this),
      failure: function(response) {
        toastr.info('Cập nhật thất bại');
      }
    });
  }

  onDelete (id) {
    $.ajax({
      dataType: 'json',
      type: 'DELETE',
      url: this.props.url + "/" + id,
      success: function(response) {
        this.setState({data: response.resources});
        $.bootstrapSortable(true);
        toastr.info('Đã xóa');
      }.bind(this)
    })
  }

  render () {
    return (
      <div className="area-box">
        <AreaForm onSubmit={this.onAreaCreated.bind(this)} />
        <Areas data={this.state.data} onDelete={this.onDelete.bind(this)} url={this.props.url} />
      </div>
    )
  }
}
