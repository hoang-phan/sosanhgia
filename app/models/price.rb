class Price < ActiveRecord::Base
  belongs_to :room
  belongs_to :hotel_link
end
