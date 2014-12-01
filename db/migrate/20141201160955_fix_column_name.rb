class FixColumnName < ActiveRecord::Migration
  def change
	    rename_column :reviews, :prouduct_id, :product_id
  end
end
