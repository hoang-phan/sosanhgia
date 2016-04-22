require 'capybara/dsl'
require 'capybara/poltergeist'

module CapybaraWithPhantomJs
  include Capybara::DSL

  def new_session
    Capybara.configure do |config|
      config.run_server = false
      config.default_driver = :poltergeist
      config.app_host = 'http://www.agoda.com'
    end

    Capybara.register_driver :poltergeist do |app|
      Capybara::Poltergeist::Driver.new(app, js_errors: false, timeout: 10000, phantomjs_options: ['--load-images=no', '--ignore-ssl-errors=yes', '--ssl-protocol=any'])
    end

    Capybara.ignore_hidden_elements = false

    page.driver.browser.url_blacklist = ['https://www.youtube.com']

    @session = Capybara::Session.new(:poltergeist)

    @session.driver.headers = { 'User-Agent' =>
      "Mozilla/5.0 (Macintosh; Intel Mac OS X)" }

    @session
  end

  def html
    session.html
  end
end
