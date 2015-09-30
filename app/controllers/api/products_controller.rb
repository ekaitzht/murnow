class Api::ProductsController < ApplicationController
  
=begin
  def index
    respond_with Product.all
  end
  
  def create
    respond_with Product.create(product_params)
  end
=end

  def show
    @product = Product.friendly.find(params[:id])
    respond_with  @product
  end

  def upvote
    product = Product.find(params[:id])
    product.increment!(:upvotes)
    respond_with product
  end
  
  #becareful when we are trying to get the most popular reviews in a product if only we have one review with 0 votes this producdt is not going 
  #to return in the respone. To resolve this we should do like a left join or right join
  def most_popular_reviews_for_the_most_popular_products
    response = ActiveRecord::Base.connection.execute("SELECT username,user_id ,                                                             hash_url_image , body   ,stars ,repurchase, created_at,id ,number_reviews ,votes ,        product_name  ,brand_name ,product_id, hash_image_product  FROM top_reviews;");
    respond_with response
  end
  
  
  



  private
  def product_params
    params.require(:product).permit(:link, :title)
  end
end

