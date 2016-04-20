class HotelBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = { data: [] };
    this.getServerData();
  }

  onHotelCreated (hotel) {
    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: this.props.url,
      data: { resource: hotel },
      success: function(response) {
        this.setState({data: response.resources});
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
        toastr.info('Đã xóa');
      }.bind(this)
    });
  }

  getServerData () {
    $.ajax({
      dataType: 'json',
      url: this.props.url,
      success: function(response) {
        this.setState({data: response.resources});
      }.bind(this)
    });
  }

  render () {
    return (
      <div className="hotel-box">
        <HotelForm onSubmit={this.onHotelCreated.bind(this)} />
        <Hotels data={this.state.data} onDelete={this.onDelete.bind(this)} url={this.props.url} links_url={this.props.links_url}/>
      </div>
    )
  }
}
