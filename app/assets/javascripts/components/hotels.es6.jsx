class Hotels extends React.Component {
  render () { 
    if (this.props.data.length == 0) {
      return (
        <div className="hotels">
          <h3>Danh sách khách sạn</h3>
          <p><em>Không có khách sạn nào</em></p>
        </div>
      )
    }
    
    hotelRows = _.map(this.props.data, hotel => <Hotel name={hotel.name} key={hotel.id} id={hotel.id} url={this.props.url} onDelete={this.props.onDelete}/>)

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
      </div>
    );
  }
}
