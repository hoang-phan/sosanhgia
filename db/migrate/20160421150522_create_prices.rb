class CreatePrices < ActiveRecord::Migration
  def change
    create_table :prices do |t|
      t.integer :amount
      t.string :additional_info
      t.float :additional_percent
      t.boolean :onsite, index: true, default: false
      t.references :room, index: true, foreign_key: { on_delete: :cascade }
      t.references :hotel_link, index: true, foreign_key: { on_delete: :cascade }
      t.string :date, index: true

      t.timestamps null: false
    end
  end
end
