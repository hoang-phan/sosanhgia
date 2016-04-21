class HomesController < ApplicationController
  def show
    @tabs = [
      {
        id: 'doi-thu',
        title: 'Đối thủ',
        attributes: {
          url: api_competitors_path
        }
      },
      {
        id: 'khu-vuc',
        title: 'Khu vực',
        attributes: {
          url: api_areas_path
        }
      },
      {
        id: 'khach-san',
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
