class Api::PricesController < Api::BaseController
  def index
    render json: all_prices
  end

  def create
    competitor = Competitor.find(params[:competitor_id])
    case competitor.name.downcase
    when 'agoda'
      AgodaJob.perform_later(*job_params)
    when 'mytour'
      MytourJob.perform_later(*job_params)
    end

    render json: { success: true }
  end

  private

  def all_prices
    prices, dates = link.try(:all_prices) || []
    { prices: prices, dates: dates }
  end

  def link
    @link ||= HotelLink.find_by(competitor_id: params[:competitor_id], hotel_id: params[:hotel_id])
  end

  def job_params
    [params[:start_date], params[:end_date], params[:hotel_id], params[:competitor_id]]
  end
end
