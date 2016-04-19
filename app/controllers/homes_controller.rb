class HomesController < ApplicationController
  def show
    @tabs = [
      {
        id: 1,
        title: 'Khách sạn',
        attributes: {
          url: api_hotels_path
        }
      },
      {
        id: 2,
        title: 'Đối thủ',
        attributes: {
          url: api_competitors_path
        }
      }
    ]
  end
end
