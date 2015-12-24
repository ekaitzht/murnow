class Api::ReviewsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :upvote]
  
  def create
    @product = Product.find(params[:product_id])
    
    puts review_params[:stars]
    review_params[:stars] = review_params[:stars].to_f

    
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
	 #@reviews =Review.where(:user_id => params[:user_id])
	 @reviews = Review.where("user_id = :user_id AND review_removed = false", {user_id: params[:user_id]})

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
		  	@product.product_stars = (@product.product_stars * 2) - @review.stars 
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
	  
	  @review = Review.find_by_id(params[:id]);
	  @product = Product.find_by_id(@review.product_id);
	  
	  old_repurchase = @review.repurchase;
	  new_repurchase = review_params[:repurchase];
	  
	  buyers = @product.buyers;
	  not_buyers = @product.not_buyers;
	  
	  if(old_repurchase == true and  new_repurchase == false)
		  buyers.downto(1);
		  not_buyers.upto(1);
	  elsif (old_repurchase == false and  new_repurchase == true)
		  buyers.upto(1);
		  not_buyers.downto(1);
	  elsif (old_repurchase == false and  new_repurchase == false)
		  #continue
	  elsif(old_repurchase == true and  new_repurchase == true)
		  #continue
	  end
	  revert_product_stars = @product.product_stars * 2 - @review.stars 
	  
	  	
	  @review.transaction do
	  	@review.update_attributes({:stars =>review_params[:stars],:body =>review_params[:body],:repurchase =>review_params[:repurchase] })
	  	@product.update_attributes({:product_stars => ((review_params[:stars] + revert_product_stars)/2), :rating => (buyers.to_f/(buyers + not_buyers).to_f)*100})  
	  end
  end
  
  
  private
  def review_params
    params.require(:review).permit(:body, :repurchase, :stars)
  end
end
