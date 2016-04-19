class CompetitorBox extends React.Component {
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
      }.bind(this)
    })
  }

  onCompetitorCreated (competitor) {
    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: this.props.url,
      data: { resource: competitor },
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
    })
  }

  render () {
    return (
      <div className="competitor-box">
        <CompetitorForm onSubmit={this.onCompetitorCreated.bind(this)} />
        <Competitors data={this.state.data} onDelete={this.onDelete.bind(this)} url={this.props.url} />
      </div>
    )
  }
}
