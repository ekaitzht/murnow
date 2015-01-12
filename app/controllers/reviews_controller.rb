class ReviewsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  
  def create
    @product = Product.find(params[:product_id])
    review = @product.reviews.create(review_params.merge(user_id: current_user.id))
    respond_with @product, review
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
    params.require(:review).permit(:body)
  end
end
