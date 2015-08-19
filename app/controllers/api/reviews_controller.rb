class Api::ReviewsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :upvote]
  
  def create
    @product = Product.find(params[:product_id])
    
    puts review_params[:stars]
    review_params[:stars] = review_params[:stars].to_f
    puts 'hola'
    puts review_params[:stars]
    @review = @product.reviews.create(review_params.merge(user_id: current_user.id))
    if (@review.repurchase == true) then
      @product.increment!(:buyers)
    else 
      @product.increment!(:not_buyers)
    end
    buyers = @product.buyers
    not_buyers = @product.not_buyers
    number_reviews = @product.number_reviews + 1
    
    @product.update_attributes({:product_stars => ((review_params[:stars] + @product.product_stars)/2), :rating => (buyers.to_f/(buyers + not_buyers).to_f)*100, :number_reviews => number_reviews })
    

	render json: @review
  end
  

  def upvote
    @product = Product.find(params[:product_id])
    review = @product.reviews.find(params[:id])
    review.increment!(:upvotes)
    respond_with @product, review
  end

  def show
    @product = Product.find(params[:product_id])
    review = @product.reviews.find(params[:id])
    respond_with review
  end
  
  def reviews_by_user
	 @reviews =Review.where(:user_id => params[:user_id])
	 respond_with @reviews;
  end

  private
  def review_params
    params.require(:review).permit(:body, :repurchase, :stars)
  end
end
