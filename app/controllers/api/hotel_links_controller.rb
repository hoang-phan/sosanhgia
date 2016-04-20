class Api::HotelLinksController < Api::ResourcesController
  def all_resources
    HotelLink.links_for_all_competitors(params[:hotel_id])
  end
end
