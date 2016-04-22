require 'capybara/dsl'
require 'capybara/poltergeist'

module CapybaraWithPhantomJs
  include Capybara::DSL

  def new_session
    Capybara.register_driver :poltergeist_errorless do |app|
      Capybara::Poltergeist::Driver.new(app, js_errors: false, timeout: 10000, phantomjs_options: ['--load-images=no', '--ignore-ssl-errors=yes', '--ssl-protocol=any'])
    end

    Capybara.default_driver = :poltergeist_errorless
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
