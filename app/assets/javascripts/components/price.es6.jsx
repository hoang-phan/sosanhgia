class Price extends React.Component {
  render () {
    if (!this.props.prices) {
      return <td />
    }

    price = this.props.payLater ? (_.filter(this.props.prices, price => price[4])[0] || this.props.prices[0]) : this.props.prices[0];

    if (this.props.type == "price") {
      calculated = this.props.included ? Math.round(price[1] * (1 + price[3] / 100.0)) : price[1]
      return (
        <td className="text-right">{calculated}</td>
      );
    }

    info = price[3].toString() != '0' ? <i className="glyphicon glyphicon-info-sign pull-right" data-toggle="tooltip" data-placement="bottom" title={price[2]}/> : null;

    return (
      <td>
        <span>{price[3]}%</span>
        {info}
      </td>
    )
  }
}
