class HotelBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = { data: [], areaOptions: [] };
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
    });
  }

  getServerData () {
    $.ajax({
      dataType: 'json',
      url: this.props.url,
      success: function(response) {
        this.setState({data: response.resources});
        $.bootstrapSortable(true);
      }.bind(this)
    });

    $.ajax({
      dataType: 'json',
      url: this.props.areas_url,
      success: function(response) {
        areaOptions = _.map(response.resources, (area) => [area.id, area.name]);
        this.setState({areaOptions: areaOptions});
      }.bind(this)
    });
  }

  render () {
    return (
      <div className="hotel-box">
        <HotelForm onSubmit={this.onHotelCreated.bind(this)} areaOptions={this.state.areaOptions}/>
        <Hotels data={this.state.data} onDelete={this.onDelete.bind(this)} url={this.props.url} linksUrl={this.props.links_url} areaOptions={this.state.areaOptions}/>
      </div>
    )
  }
}
