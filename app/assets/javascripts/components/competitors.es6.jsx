class Competitors extends React.Component {
  noCompetitorTemplate () {
    return (
      <div className="competitors">
        <h3>Danh sách đối thủ</h3>
        <p><em>Không có đối thủ nào</em></p>
      </div>
    )
  }

  rowFor (competitor) {
    return <Competitor name={competitor.name} baseLink={competitor.base_link} id={competitor.id}
                       key={competitor.id} url={this.props.url} onDelete={this.props.onDelete}/>
  }

  render () { 
    if (this.props.data.length == 0) {
      return this.noCompetitorTemplate();
    }
    
    competitorRows = _.map(this.props.data, competitor => this.rowFor(competitor));

    return (
      <div className="competitors">
        <h3>Danh sách đối thủ</h3>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Website</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{ competitorRows }</tbody>
        </table>
      </div>
    );
  }
}
