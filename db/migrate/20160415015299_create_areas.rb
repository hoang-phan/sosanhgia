class CreateAreas < ActiveRecord::Migration
  def change
    create_table :areas do |t|
      t.string :name, index: true

      t.timestamps null: false
    end
  end
end
