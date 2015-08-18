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

  #get "*" => "application#angular"  #CHECK THIS IF YOU HAVE ERRORS AND TRY IT TO UNCOMMENT
  #get '(*url)' => 'application#angular'
   
  resources :products, only: [:create, :index, :show], defaults: { format: 'json' } do
    resources :reviews, only: [:show, :create], defaults: { format: 'json' } do
    
    end

    member do
      put '/upvote' => 'products#upvote'
    end
  end

  get 'search_autocomplete', to: 'search#autocomplete', defaults: { format: 'json' }
   get 'search', to: 'search#search', defaults: { format: 'json' }
  get 'amazon/policy', to: 'amazon#policy', defaults: { format: 'json' }


  # Association model between User and SkinProblem    User <=== UserSkinProblem ===> SkinProblem
  put 'users/:user_id/skin_problems/:skin_problem_id', to: 'skin_problems#create', defaults: { format: 'json' }
  delete 'users/:user_id/skin_problems/:skin_problem_id', to: 'skin_problems#destroy', defaults: { format: 'json' }
  get 'users/:user_id/skin_problems/', to: 'skin_problems#show', defaults: { format: 'json' }

  # Association model between User and Reviews for who is voting what review    User <=== Vote ===> Review
  put 'votes/:review_id/users/:user_id', to: 'votes#create', defaults: { format: 'json' }
  
  #Get a specific user this only should use for public_profile
  get 'users/:id/', to: 'users#show', defaults: { format: 'json' }
  
  
  get 'reviews_by_user/:user_id', to: 'reviews#reviews_by_user', defaults: { format: 'json' } 
  
  
  
  get 'most_popular_reviews_for_the_most_popular_products', to: 'products#most_popular_reviews_for_the_most_popular_products', defaults: { format: 'json' } 

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
