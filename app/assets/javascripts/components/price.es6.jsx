class Price extends React.Component {
  render () {
    if (!this.props.prices) {
      return <td />
    }

    price = this.props.payLater ? (_.filter(this.props.prices, price => price[2])[0] || this.props.prices[0]) : this.props.prices[0];

    return <td className="text-right">{price[1]}</td>;
  }
}
