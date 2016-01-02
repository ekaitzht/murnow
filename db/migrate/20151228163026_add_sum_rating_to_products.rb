class AddSumRatingToProducts < ActiveRecord::Migration
  def change
	  	   add_column :products, :sum_rating, :decimal 

  end
end
