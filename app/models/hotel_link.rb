class NewHotelLink < Struct.new(:competitor_id, :competitor_name)
end

class HotelLink < ActiveRecord::Base
  belongs_to :competitor
  belongs_to :hotel

  def self.links_for_all_competitors(hotel_id)
    hotel_links = HotelLink.joins(:competitor).where(hotel_id: hotel_id).select(:id, :link, :competitor_id, 'competitors.name AS competitor_name').to_a
    competitors = Hash[Competitor.pluck(:id, :name)]
    (competitors.keys - hotel_links.map(&:competitor_id)).inject(hotel_links) do |result, id|
      result << NewHotelLink.new(id, competitors[id])
    end.sort_by(&:competitor_id)
  end
end
