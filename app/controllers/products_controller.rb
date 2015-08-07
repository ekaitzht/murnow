class ProductsController < ApplicationController
  def index
    respond_with Product.all
  end

  def create
    respond_with Product.create(product_params)
  end

  def show
    @product = Product.find(params[:id])
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
		response = ActiveRecord::Base.connection.execute("SELECT users.username, users.id AS user_id,
       users.hash_url_image, 
       reviews.body, 
       reviews.stars, 
	   reviews.repurchase, 
	   reviews.created_at,
	   reviews.id,
	   max_votes_user.number_votes AS votes,
       products.product_name,
       products.brand_name,
       products.id AS product_id
       
FROM   ( 
                SELECT   Count(*) AS number_reviews, 
                         product_id 
                FROM     reviews 
                GROUP BY product_id 
                ORDER BY number_reviews DESC limit 4 ) AS most_famous_products, 
       ( 
                       SELECT DISTINCT 
                       ON ( 
                                                       product_id) product_id, 
                                       user_id, 
                                       number_votes,
                                       review_id 
                       FROM            ( 
                                              SELECT DISTINCT ON(product_id) product_id, review_id, user_id, number_votes
											  FROM    (SELECT   Count(*) number_votes, 
                                                                       r.product_id, 
                                                                       v.review_id, 
                                                                       r.user_id 
                                                              FROM     votes v, 
                                                                       reviews r 
                                                              WHERE    v.review_id = r.id 
                                                              GROUP BY r.product_id, 
                                                                       v.review_id, 
                                                                       r.user_id 
                                                                       ORDER BY product_id, number_votes DESC) AS number_votes_per_user) AS aux) AS max_votes_user,
       users, 
       reviews, 
       products 
WHERE  most_famous_products.product_id = max_votes_user.product_id 
AND    max_votes_user.user_id = users.id 
AND    reviews.id = max_votes_user.review_id 
AND    products.id = reviews.product_id
	 "
	);
	
	respond_with response
  end

  private
  def product_params
    params.require(:product).permit(:link, :title)
  end
end

