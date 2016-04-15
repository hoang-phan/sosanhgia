class CreateHotels < ActiveRecord::Migration
  def change
    create_table :hotels do |t|
      t.string :name, index: true
      t.references :area, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps null: false
    end
  end
end
