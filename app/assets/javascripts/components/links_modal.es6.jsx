class LinksModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = { data: [] }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id != 0) {
      $.ajax({
        dataType: 'json',
        url: this.props.url,
        data: {
          hotel_id: nextProps.id
        },
        success: function(response) {
          this.setState({data: response.resources});
        }.bind(this)
      });
    }
  }

  onDeleteLink(id) {
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

  onCreateOrUpdateLink(id, attrs) {
    if (id) {
      method = 'PUT';
      url = this.props.url + "/" + id;
    } else {
      method = 'POST';
      url = this.props.url;
    }

    $.ajax({
      dataType: 'json',
      type: method,
      url: url,
      data: { resource: attrs, hotel_id: this.props.id },
      success: function(response) {
        this.setState({data: response.resources});
        toastr.info('Đã cập nhật');
      }.bind(this),
      error: function() {
        toastr.error('Cập nhật thất bại');
      }
    });
  }

  rowFor(link, index) {
    return <HotelLink id={link.id} link={link.link} competitor_id={link.competitor_id} competitor_name={link.competitor_name}
                      key={link.id || -index} hotel_id={this.props.id}
                      onDelete={this.onDeleteLink.bind(this)} onCreateOrUpdate={this.onCreateOrUpdateLink.bind(this)} />;
  }

  render () {
    if (this.props.id == 0) {
      return null;
    }

    linkRows = _.map(this.state.data, (link, index) => this.rowFor(link, index));

    return (
      <div className="modal fade" role="dialog" id="links-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{this.props.name}</h4>
            </div>
            <div className="modal-body">{linkRows}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
