class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name, index: true
      t.references :hotel, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps null: false
    end
  end
end
