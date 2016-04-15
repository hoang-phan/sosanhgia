class CreateHotelLinks < ActiveRecord::Migration
  def change
    create_table :hotel_links do |t|
      t.references :competitor, index: true, foreign_key: { on_delete: :cascade }
      t.references :hotel, index: true, foreign_key: { on_delete: :cascade }
      t.string :link

      t.timestamps null: false
    end
  end
end
