class Api::ReviewsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :upvote]
  
  def create
    @product = Product.find(params[:product_id])
    
    puts review_params[:stars]
    review_params[:stars] = review_params[:stars].to_f
	sum_rating = @product.sum_rating + review_params[:stars]
    number_reviews = @product.number_reviews + 1
    
    @review = @product.reviews.create(review_params.merge(user_id: current_user.id))
    if (@review.repurchase == true) then
      @product.increment!(:buyers)
    else 
      @product.increment!(:not_buyers)
    end
    buyers = @product.buyers
    not_buyers = @product.not_buyers
    
    
    @product.update_attributes({:product_stars => sum_rating/number_reviews, :rating => (buyers.to_f/(buyers + not_buyers).to_f)*100, :number_reviews => number_reviews, :sum_rating => sum_rating })
    

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
	 #@reviews =Review.where(:user_id => params[:user_id])
	 @reviews = Review.where("user_id = :user_id", {user_id: params[:user_id]})

	 respond_with @reviews;
  end
  
  def delete 
	    @review = Review.find_by_id(params[:id]);
	    @product =  Product.find_by_id(@review.product_id)
	    repurchase = @review.repurchase
	    begin
		  @product.transaction do
			  if repurchase == false 
				@product.decrement!(:not_buyers)		  
		      elsif repurchase == true 
		      	@product.decrement!(:buyers)
		      end
		      
		    @product.sum_rating = @product.sum_rating - @review.stars
		    @product.number_reviews -= 1
		  	@product.product_stars = @product.sum_rating / @product.number_reviews
		  	@product.rating =  (@product.buyers.to_f/(@product.buyers + @product.not_buyers).to_f)*100
		  	@product.save!
		  	@review.destroy
		  end
		rescue ActiveRecord::RecordInvalid => invalid
			respond_with({:msg => "Problem destroying de the review send a email to ekaitz@murnow.com"}, :status => 500)
		else
			repurchase_again_percent = (@product.buyers.to_f/(@product.buyers.to_f + @product.not_buyers.to_f))*100
			render json: {new_repurchase_percent: repurchase_again_percent, new_stars:  @product.product_stars}
		end 
  end
  
  def update
	  	# We have to calculate new average, new likes etc 
	  	# buyers, not_buyers, rating
	  
	  	@review = Review.find_by_id(params[:id])
	  	@product = Product.find_by_id(@review.product_id)
	  
	  	old_repurchase = @review.repurchase;
	  	new_repurchase = review_params[:repurchase];
	  
	  	begin		  
			@review.transaction do
			  
			  if(old_repurchase == true and  new_repurchase == false)
				  @product.decrement!(:buyers)
				  @product.increment!(:not_buyers)
			  elsif (old_repurchase == false and  new_repurchase == true)
				  @product.increment!(:buyers)
				  @product.decrement!(:not_buyers)
			  elsif (old_repurchase == false and  new_repurchase == false)
				  #continue
			  elsif(old_repurchase == true and  new_repurchase == true)
				  #continue
			  end
			  
			  
			  # explanation -> http://stackoverflow.com/questions/28504681/edit-rating-of-cumulative-average
			  @product.sum_rating = @product.sum_rating - @review.stars + review_params[:stars]
			  @product.product_stars = @product.sum_rating / @product.number_reviews;
			  @product.rating =  (@product.buyers.to_f/(@product.buyers + @product.not_buyers).to_f)*100
			  
			  @review.stars = review_params[:stars]
			  @review.body = review_params[:body]
			  @review.repurchase = review_params[:repurchase]
			  
			  @product.save!
			  @review.save!
			  
			end
		rescue ActiveRecord::RecordInvalid => invalid
			respond_with({:msg => "Problem updating de the review send a email to ekaitz@murnow.com"}, :status => 500)
		else 
			#respond_with({:msg => "Review updated"}, :status => 400)
			repurchase_again_percent = (@product.buyers.to_f/(@product.buyers.to_f + @product.not_buyers.to_f))*100
			render json: {new_repurchase_percent: repurchase_again_percent, new_stars:  @product.product_stars}
		end
  end
  
  
  private
  def review_params
    params.require(:review).permit(:body, :repurchase, :stars)
  end
end
