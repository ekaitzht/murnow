class ReviewsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @product = Product.find(params[:product_id])
    @product.update_attributes(:product_stars => ((review_params[:stars] + @product.product_stars)/2))
    
    @review = @product.reviews.create(review_params.merge(user_id: current_user.id))
    if (@review.repurchase == true) then
      @product.increment!(:buyers)
    else 
      @product.increment!(:not_buyers)
    end
	
	respond_with({
	  :product => @product.as_json(:only => [:buyers, :not_buyers, :product_stars]),
	  :review =>  @review
	}, :location => nil)
	
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

  private
  def review_params
    params.require(:review).permit(:body, :repurchase, :stars)
  end
end
