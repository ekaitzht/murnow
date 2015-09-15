class AddMaterializedViewTopReviews < ActiveRecord::Migration
def up
    execute "CREATE MATERIALIZED VIEW top_reviews AS SELECT users.username, users.id AS user_id,
       users.hash_url_image, 
       reviews.body,
       reviews.stars, 
   reviews.repurchase::VARCHAR, 
   reviews.created_at,
   reviews.id,
   most_famous_products.number_reviews,
   max_votes_user.number_votes AS votes,
       products.product_name,
       products.brand_name,
       products.id AS product_id       
FROM   ( 
                SELECT   Count(*) AS number_reviews, 
                         product_id 
                FROM     reviews 
                GROUP BY product_id 
                ORDER BY number_reviews DESC) AS most_famous_products, 
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
AND    products.id = reviews.product_id;
"
  end
  def down
   execute "DROP MATERIALIZED VIEW top_reviews;"
  end

end
