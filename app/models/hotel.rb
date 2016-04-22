class Hotel < ActiveRecord::Base
  belongs_to :area
  has_many :hotel_links
  has_many :competitors, through: :hotel_links
  has_many :rooms
end
