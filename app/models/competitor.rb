class Competitor < ActiveRecord::Base
  has_many :hotel_links
  has_many :hotels, through: :hotel_links
end
