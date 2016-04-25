class Room extends React.Component {
  render () {
    datePrices = this.props.prices;
    payLater = this.props.payLater;

    datePriceRows = _.map(this.props.dates, function(date, index) {
      prices = datePrices[date];
      return <Price prices={prices} key={2 * index} payLater={payLater} type="price"/>;
    });
    
    return (
      <tr>
        <td>{this.props.room}</td>
        {datePriceRows}
      </tr>
    );
  }
}
