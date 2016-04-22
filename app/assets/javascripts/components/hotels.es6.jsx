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
    area = getAreaById(this.props.areaOptions, hotel.area_id) || ['', 'Chưa chọn']

    return <Hotel name={hotel.name} key={hotel.id} id={hotel.id} url={this.props.url}
                  onDelete={this.props.onDelete} onModalOpen={this.onModalOpen.bind(this)}
                  areaId={area[0]} areaName={area[1]} areaOptions={this.props.areaOptions}/>
  }

  render () { 
    if (this.props.data.length == 0) {  
      return this.noHotelTemplate();
    }
    
    hotelRows = _.map(this.props.data, hotel => this.rowFor(hotel));

    return (
      <div className="hotels">
        <h3>Danh sách khách sạn</h3>
        <table className="table table-hover table-striped sortable" data-toggle="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Khu vực</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{ hotelRows }</tbody>
        </table>
        <LinksModal name={this.state.hotel_name} id={this.state.hotel_id} url={this.props.linksUrl} />
      </div>
    );
  }
}
