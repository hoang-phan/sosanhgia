class Api::PricesController < Api::BaseController
  def index
    Crawler.new.crawl(params[:hotel])
    render nothing: true
  end
end
