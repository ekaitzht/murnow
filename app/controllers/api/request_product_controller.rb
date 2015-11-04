class Api::RequestProductController < ApplicationController
	
	
	def create
	      
		CustomMailer.request_product(request_params).deliver
		respond_with(status: 200)
	end
	
	
	private
	def request_params
    	params.require(:application).permit(:product_name, :brand_name, :optional_message,:email)
  	end
end

