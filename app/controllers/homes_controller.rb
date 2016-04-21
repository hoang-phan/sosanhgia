class HomesController < ApplicationController
  def show
    @tabs = [
      {
        id: 1,
        title: 'Đối thủ',
        attributes: {
          url: api_competitors_path
        }
      },
      {
        id: 2,
        title: 'Khu vực',
        attributes: {
          url: api_areas_path
        }
      },
      {
        id: 3,
        title: 'Khách sạn',
        attributes: {
          url: api_hotels_path,
          links_url: api_hotel_links_path,
          areas_url: api_areas_path
        }
      }
    ]
  end
end
