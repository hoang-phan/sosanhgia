class Areas extends React.Component {
  noAreaTemplate () {
    return (
      <div className="areas">
        <h3>Danh sách khu vực</h3>
        <p><em>Không có khu vực nào</em></p>
      </div>
    )
  }

  rowFor (area) {
    return <Area name={area.name} id={area.id}
                       key={area.id} url={this.props.url} onDelete={this.props.onDelete}/>
  }

  render () { 
    if (this.props.data.length == 0) {
      return this.noAreaTemplate();
    }
    
    areaRows = _.map(this.props.data, area => this.rowFor(area));

    return (
      <div className="areas">
        <h3>Danh sách khu vực</h3>
        <table className="table table-hover table-striped sortable">
          <thead>
            <tr>
              <th>Tên</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{ areaRows }</tbody>
        </table>
      </div>
    );
  }
}
