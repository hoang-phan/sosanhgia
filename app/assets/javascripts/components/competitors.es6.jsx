class Competitors extends React.Component {
  render () { 
    if (this.props.data.length == 0) {
      return (
        <div className="competitors">
          <h3>Danh sách đối thủ</h3>
          <p><em>Không có đối thủ nào</em></p>
        </div>
      )
    }
    
    competitorRows = _.map(this.props.data, competitor => <Competitor name={competitor.name} baseLink={competitor.base_link} url={this.props.url} key={competitor.id} id={competitor.id} onDelete={this.props.onDelete}/>)

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
