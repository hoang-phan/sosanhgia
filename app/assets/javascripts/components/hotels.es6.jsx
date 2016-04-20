class Hotels extends React.Component {
  constructor () {
    super();
    this.state = { hotel_name: "", hotel_id: 0 };
  }

  onModalOpen (hotel_name, hotel_id) {
    this.setState({ hotel_name: hotel_name, hotel_id: hotel_id });
  }

  componentDidUpdate () {
    if (this.state.hotel_id != 0) {
      $('#links-modal').modal('show');
    }
  }

  noHotelTemplate() {
    return (
      <div className="hotels">
        <h3>Danh sách khách sạn</h3>
        <p><em>Không có khách sạn nào</em></p>
      </div>
    )
  }

  rowFor (hotel) {
    return <Hotel name={hotel.name} key={hotel.id} id={hotel.id} url={this.props.url} 
                  onDelete={this.props.onDelete} onModalOpen={this.onModalOpen.bind(this)}/>
  }

  render () { 
    if (this.props.data.length == 0) {
      return this.noHotelTemplate();
    }
    
    hotelRows = _.map(this.props.data, hotel => this.rowFor(hotel));

    return (
      <div className="hotels">
        <h3>Danh sách khách sạn</h3>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Tên</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{ hotelRows }</tbody>
        </table>
        <LinksModal name={this.state.hotel_name} id={this.state.hotel_id} url={this.props.links_url} />
      </div>
    );
  }
}
