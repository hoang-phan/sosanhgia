handleHashChange = function() {
  tabs = $('#react-placeholder').data('tabs');
  ReactDOM.render(<App data={tabs}/>, document.getElementById('react-placeholder'));
}

handleHashChange();
$(window).on('popstate', handleHashChange);
