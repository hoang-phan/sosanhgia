class Room extends React.Component {
  render () {
    datePrices = this.props.prices;
    payLater = this.props.payLater;
    included = this.props.included;
    datePriceRows = [];

    this.props.dates.forEach(function(date, index) {
      prices = datePrices[date];
      datePriceRows.push(<Price prices={prices} key={2 * index} payLater={payLater} included={included} type="price"/>)
      datePriceRows.push(<Price prices={prices} key={2 * index + 1} type="excluded"/>)
    });
    
    return (
      <tr>
        <td>{this.props.room}</td>
        {datePriceRows}
      </tr>
    );
  }
}
