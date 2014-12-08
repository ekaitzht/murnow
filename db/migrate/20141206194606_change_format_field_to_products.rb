class ChangeFormatFieldToProducts < ActiveRecord::Migration
  def change
  	    change_column :products, :image_url, :text

  end
end
