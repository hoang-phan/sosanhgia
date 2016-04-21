window.getAreaById = function(collection, id) {
  return _.filter(collection, function(area) {
    return area[0].toString() == id.toString();
  })[0];
}

window.getCurrentTab = function() {
  return parseInt(location.hash.substring(2)) || parseInt(location.pathname.substring(1)) || 1;
}
