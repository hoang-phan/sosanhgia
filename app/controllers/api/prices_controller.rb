class Api::PricesController < Api::BaseController
  def index
    render json: all_prices
  end

  def create
    AgodaJob.perform_later(params[:start_date], params[:end_date], params[:hotel_id], params[:competitor_id])
    render nothing: true
  end

  private

  def all_prices
    prices, dates = link.try(:all_prices) || []
    { prices: prices, dates: dates }
  end

  def link
    @link ||= HotelLink.find_by(competitor_id: params[:competitor_id], hotel_id: params[:hotel_id])
  end
end
