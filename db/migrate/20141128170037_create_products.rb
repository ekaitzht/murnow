class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :product_name
      t.string :hash_image_url
      t.integer :upvotes

      t.timestamps
    end
  end
end
