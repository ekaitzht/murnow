class Api::RequestProductController < ApplicationController
	before_action :authenticate_user!,:only => [:create]
	
	def create
	      
		CustomMailer.request_product(request_params);
		respond_with(status: 200)

	end
	
	
	private
	def request_params
    	params.require(:application).permit(:product_name, :brand_name, :optional_message)
  	end
end

