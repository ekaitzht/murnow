class ReviewsController < ApplicationController
  def create
    review = product.reviews.create(review_params)
    respond_with product, review=
  end

  def upvote
    review = product.reviews.find(params[:id])
    review.increment!(:upvotes)

    respond_with product, review
  end


  private
  def review_params
    params.require(:review).permit(:body)
  end
end
