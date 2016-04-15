class HotelLink < ActiveRecord::Base
  belongs_to :competitor
  belongs_to :hotel
end
