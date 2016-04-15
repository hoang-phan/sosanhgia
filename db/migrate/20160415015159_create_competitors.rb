class CreateCompetitors < ActiveRecord::Migration
  def change
    create_table :competitors do |t|
      t.string :name, index: true
      t.string :base_link

      t.timestamps null: false
    end
  end
end
