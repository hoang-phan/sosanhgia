class NewHotelLink < Struct.new(:competitor_id, :competitor_name)
end

class HotelLink < ActiveRecord::Base
  belongs_to :competitor
  belongs_to :hotel
  has_many :prices
  has_many :rooms, through: :prices

  def self.links_for_all_competitors(hotel_id)
    hotel_links = HotelLink.joins(:competitor).where(hotel_id: hotel_id).select(:id, :link, :competitor_id, 'competitors.name AS competitor_name').to_a
    competitors = Hash[Competitor.pluck(:id, :name)]
    (competitors.keys - hotel_links.map(&:competitor_id)).inject(hotel_links) do |result, id|
      result << NewHotelLink.new(id, competitors[id])
    end.sort_by(&:competitor_id)
  end

  def all_prices
    result = {}
    prices.joins(:room).pluck('rooms.name AS room_name', :amount, :additional_info, :additional_percent, :onsite, :date).group_by(&:first).each do |room_name, raw_record|
      result[room_name] = raw_record.group_by(&:last)
    end

    [result, prices.pluck(:date).uniq]
  end
end
