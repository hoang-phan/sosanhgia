require 'capybara/dsl'

class Crawler
  include Capybara::DSL

  def crawl(hotel)
    visit '/'
    fill_in 'SearchInput', with: hotel
    click_on 'Search'
  end
end
