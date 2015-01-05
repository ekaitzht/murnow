class SearchController < ApplicationController
	def search
	  if params[:q].nil?
	    respond_with = []
	  else
	    respond_with Product.search(params[:q]).records
	  end
	end
end
