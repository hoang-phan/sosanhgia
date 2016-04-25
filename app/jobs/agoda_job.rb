class AgodaJob < ActiveJob::Base
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

      page.find('#room-grid-table').all('tr.room-type').each do |room_type|
        room = hotel.rooms.find_or_create_by(name: room_type.first('.room-name span').text)
        additional_info = room_type.first('.excluded-pricing-info').try(:text).to_s
        prices << Price.new(
          hotel_link: link, 
          room: room, 
          amount: room_type.first('.sellprice').text.gsub('.', '').to_i, 
          onsite: room_type.has_css?('.ROOMMIXING .paylater'),
          additional_info: additional_info,
          additional_percent: additional_info.scan(/\d+%/).sum(&:to_i),
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
      page.execute_script("$('.oneline-checkout.checkout-input').val('#{tomorrow.day} Tháng #{tomorrow.month} #{tomorrow.year}')")
      page.execute_script("$('.oneline-checkin.checkin-input').val('#{date.day} Tháng #{date.month} #{date.year}')")
      first('.oneline-search-button').click
    end
    sleep 1
  end
end
