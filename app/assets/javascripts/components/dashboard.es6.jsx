class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = { 
      hotels: [], competitors: [], 
      hotel_id: props.hotelId, competitor_id: props.competitorId,
      start_date: '', end_date: '', 
      prices: [], dates: [],
      payLater: false, included: true
    }
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(nextProps) {
    $.ajax({
      dataType: 'json',
      url: nextProps.hotels_url,
      success: function(response) {
        if (response.resources) {
          hotels = _.map(response.resources, (hotel) => [hotel.id.toString(), hotel.name]);
          this.setState({ hotels: hotels });
        }
      }.bind(this)
    });

    $.ajax({
      dataType: 'json',
      url: nextProps.competitors_url,
      success: function(response) {
        if (response.resources) {
          competitors = _.map(response.resources, (competitor) => [competitor.id.toString(), competitor.name]);
          this.setState({ competitors: competitors });
        }
      }.bind(this)
    });

    return false;
  }

  onCrawlPrices (e) {
    e.preventDefault();
    $.ajax({
      dataType: 'json',
      type: 'POST',
      data: _.pick(this.state, 'hotel_id', 'competitor_id', 'start_date', 'end_date'),
      url: this.props.url,
      success: function(response) {
        toastr.info('Send request success, please come back later');
      }
    });
    return false;
  }

  onCompetitorSelect (id) {
    if (this.state.hotel_id) {
      this.getPrices(this.state.hotel_id, id);
    }
    this.setState({ competitor_id: id });
  }

  onHotelSelect (id) {
    if (this.state.competitor_id) {
      this.getPrices(id, this.state.competitor_id);
    }
    
    this.setState({ hotel_id: id });
  }

  getPrices(hotelId, competitorId) {
    $.ajax({
      dataType: 'json',
      data: { hotel_id: hotelId, competitor_id: competitorId },
      url: this.props.url,
      success: function(response) {
        this.setState({ prices: response.prices, dates: response.dates });
      }.bind(this)
    });
  }

  onStartDateChange (e) {
    this.setState({ start_date: e.target.value });
  }

  onEndDateChange (e) {
    this.setState({ end_date: e.target.value });
  }

  onPayLaterChange (e) {
    this.setState({ payLater: e.target.checked });
  }

  onIncludedChange (e) {
    this.setState({ included: e.target.checked });
  }

  renderTable () {
    if (!this.state.dates || this.state.dates.length == 0) {
      return <p className="margin-top-small"><em>Không có dữ liệu.</em></p>;
    }

    dateRows = _.map(this.state.dates, (date, index) => <th colSpan="2" key={index}>{date}</th>)
    subRows = []
    this.state.dates.forEach(function(date, index) {
      subRows.push(<th key={- 2 * index}>Giá</th>)
      subRows.push(<th key={- 2 * index - 1}>Phụ phí</th>)
    });
    roomRows = _.map(this.state.prices, (prices, room) => <Room key={room} room={room} prices={prices} dates={this.state.dates} payLater={this.state.payLater} included={this.state.included} />)
    return (
      <table className="table table-hover table-striped table-bordered margin-top-small">
        <thead>
          <tr>
            <th rowSpan="2" className="vertical-middle">Loại phòng</th>
            {dateRows}
          </tr>
          <tr>{subRows}</tr>
        </thead>
        <tbody>{roomRows}</tbody>
      </table>
    )
  }

  render () {
    table = this.renderTable();

    return (
      <div className="dashboard">
        <form className="add-form" onSubmit={this.onCrawlPrices.bind(this)}>
          <div className="form-group row">
            <div className="col-sm-8">
              <Select className="form-control" value='' options={this.state.hotels} onChange={this.onHotelSelect.bind(this)} placeholder="- Chọn khách sạn -"/>
            </div>
            <div className="col-sm-4">
              <Select className="form-control" value='' options={this.state.competitors} onChange={this.onCompetitorSelect.bind(this)} placeholder="- Chọn đối thủ -"/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-4">
              <input className="form-control" placeholder="Từ ngày" onChange={this.onStartDateChange.bind(this)}/>
            </div>
            <div className="col-sm-4">
              <input className="form-control" placeholder="Đến ngày" onChange={this.onEndDateChange.bind(this)}/>
            </div>
            <div className="col-sm-4 text-center">
              <input type='submit' className="btn btn-primary btn-small" value="Xem trên website" />
            </div>
          </div>
        </form>

        <div className="form-group row">
          <div className="col-sm-4">
            <div className="checkbox">
              <label><input type="checkbox" defaultChecked={this.state.payLater} onChange={this.onPayLaterChange.bind(this)}/>Thanh toán tại khách sạn</label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="checkbox">
              <label><input type="checkbox" defaultChecked={this.state.included} onChange={this.onIncludedChange.bind(this)}/>Giá có phụ phí</label>
            </div>
          </div>
        </div>
        {table}
      </div>
    )
  }
}
