class RemoveAdditionalInfoFromPrices < ActiveRecord::Migration
  def change
    remove_column :prices, :additional_info, :string
    remove_column :prices, :additional_percent, :float
  end
end
