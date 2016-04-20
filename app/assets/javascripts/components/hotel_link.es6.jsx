class HotelLink extends React.Component {
  constructor (props) {
    super(props);
    this.state = { link: props.link };
  }

  onLinkChange (e) {
    this.setState({ link: e.target.value });
  }

  onReset (e) {
    e.preventDefault();
    this.setState({ link: '' });
    return false;
  }

  onSubmit (e) {
    e.preventDefault();
    link = this.state.link ? this.state.link.trim() : null;

    if (link) {
      this.props.onCreateOrUpdate(this.props.id, _.extend({ link: this.state.link }, _.pick(this.props, 'competitor_id', 'hotel_id')));
    } else if (this.props.id) {
      this.props.onDelete(this.props.id);
    }
    return false;
  }

  render () {
    return (
      <form className="form" onSubmit={this.onSubmit.bind(this)} onReset={this.onReset.bind(this)}>
        <div className="row form-group">
          <div className="col-sm-3">
            <p>{this.props.competitor_name}</p>
          </div>
          <div className="col-sm-5">
            <input className="form-control" placeholder="Link" value={this.state.link} onChange={this.onLinkChange.bind(this)}/>
          </div>
          <div className="col-sm-4 text-right">
            <input type='submit' className="btn btn-primary" value={this.props.id ? 'Cập nhật' : 'Tạo mới'}/>
            <input type='reset' className="btn btn-danger" value='Xóa'/>
          </div>
        </div>
      </form>
    );
  }
}
