Rails.application.routes.draw do
  
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :registrations => "users/registrations"}

  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
  	root to: 'application#angular'
  	
  	namespace :api, defaults: {format: :json} do

	  resources :products, only: [:create, :index, :show] do
	    resources :reviews, only: [:show, :create] do
	    
	    end
	
	    member do
	      put '/upvote' => 'products#upvote'
	    end
	  end
	  
	  
	  
	  resources :votes, only: [:create, :destroy, :show] do
	  
	  
	  
	  end
	  
	  
	 # Remove review
	 delete 'reviews/:id', to: 'reviews#delete'
	 put 'reviews/:id', to: 'reviews#update'

	
	  get 'search_autocomplete', to: 'search#autocomplete'
	  get 'search', to: 'search#search'
	  get 'trending', to: 'search#trending'
	  get 'amazon/policy', to: 'amazon#policy'
	
	  # Association model between User and SkinProblem    User <=== UserSkinProblem ===> SkinProblem
	  put 'users/:user_id/skin_problems/:skin_problem_id', to: 'skin_problems#create'
	  delete 'users/:user_id/skin_problems/:skin_problem_id', to: 'skin_problems#destroy'
	  get 'users/:user_id/skin_problems/', to: 'skin_problems#show'
	
	 


	  #Get a specific user this only should use for public_profile
	  get 'users/:id/', to: 'users#show'
	  
	  
	  # Routes for who is following and followers
	  get 'users/:id/following/', to: 'users#following'
	  get 'users/:id/followers/', to: 'users#followers'
	  get 'users/:id/feed/', to: 'users#feed'
	    
	  get 'reviews_by_user/:user_id', to: 'reviews#reviews_by_user'
	  get 'most_popular_reviews_for_the_most_popular_products', to: 'products#most_popular_reviews_for_the_most_popular_products'
	  
	  #generate invitation,request invitation 
	  post 'generateinvitation/', to: 'invitations#create'
	  post 'request_invitation', to: 'invitations#request_invitation'
	  get 'check_register_token/:token', to: 'invitations#check_register_token'

	  #request product
	  put 'requests/', to: 'request_product#create'
	  
	  
	  #relationships
	  resources :relationships, only: [:create]
	  delete 'relationships/:followed_id', to: 'relationships#destroy'

	end 

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
