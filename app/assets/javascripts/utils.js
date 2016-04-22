window.getAreaById = function(collection, id) {
  return _.filter(collection, function(area) {
    return id && area[0].toString() == id.toString();
  })[0];
}

window.getCurrentTab = function() {
  return location.hash.substring(2) || location.pathname.substring(1) || 'trang-chu';
}
