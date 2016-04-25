class AgodaJob < ActiveJob::Base
  include CapybaraWithPhantomJs

  queue_as :default

  def perform(start_date, end_date, hotel_id, competitor_id)
    hotel = Hotel.find(hotel_id)
    link = hotel.hotel_links.find_by(competitor_id: competitor_id)
    Price.delete_all(hotel_link: link)

    new_session
    visit link.link

    prices = []

    (date_parse(start_date)..date_parse(end_date)).each do |date|
      search(date)

      page_info = Nokogiri::HTML(page.html)

      grid_table = page_info.css('#room-grid-table').first

      grid_table.css('tr.room-type').each do |room_type|
        room = hotel.rooms.find_or_create_by(name: room_type.css('.room-name span').first.text)
        additional_info = room_type.css('.excluded-pricing-info').first.try(:text).to_s
        prices << Price.new(
          hotel_link: link, 
          room: room, 
          amount: (room_type.css('.sellprice').text.gsub('.', '').to_i * 1.155).round, 
          onsite: room_type.css('.ROOMMIXING .paylater').first.present?,
          date: date.strftime('%d/%m/%Y')
        )
      end
    end

    Price.import(prices)
  rescue => e
    p e
  end

  def date_parse(str)
    d, m, y = str.strip.split(/\D+/).map(&:to_i)
    y = [Date.today.year, y.to_i].max
    Date.new(y, m, d)
  end

  def search(date)
    if page.has_css?('#searchbox-monthyear')
      select "Thg#{date.month}, #{date.year}", from: 'searchbox-monthyear'
      select date.day.to_s.rjust(2, '0'), from: 'searchbox-day'
      first('#searchbox-nights option', text: '1').select_option
      click_on 'searchbox-searchbutton'
    else
      tomorrow = date.tomorrow
      searchbox = first('.oneline-searchbox')
      searchbox.first('.oneline-checkout.checkout-input').set("#{tomorrow.day} Tháng #{tomorrow.month} #{tomorrow.year}')")
      searchbox.first('.oneline-checkin.checkin-input').set("#{date.day} Tháng #{date.month} #{date.year}')")
      searchbox.first('.oneline-search-button').click
    end
  end
end
