class MytourJob < ActiveJob::Base
  include CapybaraWithPhantomJs

  queue_as :default

  def perform(start_date, end_date, hotel_id, competitor_id)
    hotel = Hotel.find(hotel_id)
    link = hotel.hotel_links.find_by(competitor_id: competitor_id)
    Price.delete_all(hotel_link: link)

    new_session
    visit link.link

    end_date = start_date if end_date.blank?

    (date_parse(start_date)..date_parse(end_date)).each do |date|
      search(date)

      page_info = Nokogiri::HTML(page.html)

      grid_table = page_info.css('#box-load-rooms .table-div').first

      grid_table.css('.tbody .tr').each do |room_type|
        room = hotel.rooms.find_or_create_by(name: room_type.css('.product-item .title-sm a').first.text.strip)
        Price.create(
          hotel_link: link, 
          room: room, 
          amount: room_type.css('.price').text.gsub(',', '').to_i, 
          date: date.strftime('%d/%m/%Y')
        )
      end
    end
  rescue => e
    p e
  end

  def date_parse(str)
    d, m, y = str.strip.split(/\D+/).map(&:to_i)
    y = [Date.today.year, y.to_i].max
    Date.new(y, m, d)
  end

  def search(date)
    tomorrow = date.tomorrow
    searchbox = first('#price-box-wrapper')
    searchbox.first('.check-in').set(date.strftime('%d/%m/%Y'))
    searchbox.first('.check-out').set(tomorrow.strftime('%d/%m/%Y'))
    searchbox.first('button.btn-yellow').trigger('click')
    sleep 1
  end
end
