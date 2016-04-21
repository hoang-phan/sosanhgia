class Select extends React.Component {
  onSelect (e) {
    this.props.onChange(e.target.value);
  }

  rowFor (option) {
    return <option value={option[0]} key={option[0]}>{option[1]}</option>
  }

  render () {
    optionRows = _.map(this.props.options, (option) => this.rowFor(option));

    return (
      <select className={this.props.className} onChange={this.onSelect.bind(this)} defaultValue={this.props.value}>
        <option value=''>{this.props.placeholder}</option>
        {optionRows}
      </select>
    )
  }
}
