require 'capybara/dsl'
require 'capybara/poltergeist'

module CapybaraWithPhantomJs
  include Capybara::DSL

  def new_session
    Capybara.default_driver = :poltergeist
    Capybara.ignore_hidden_elements = false

    @session = Capybara::Session.new(:poltergeist)

    @session.driver.headers = { 'User-Agent' =>
      "Mozilla/5.0 (Macintosh; Intel Mac OS X)" }

    @session
  end

  def html
    session.html
  end
end
