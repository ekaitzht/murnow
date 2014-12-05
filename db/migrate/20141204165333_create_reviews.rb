class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :body
      t.integer :upvotes
      t.references :product, index: true

      t.timestamps
    end
  end
end
