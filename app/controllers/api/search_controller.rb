class Api::SearchController < ApplicationController
	def autocomplete
	  if params[:q].nil?
	    respond_with = []
	  else
	  	response = Product.autocomplete_search(params[:q])
	    respondSearchData(response)
	  end
	end
	
	def search
	  if params[:q].nil?
	    respond_with = []
	  else
	  	response = Product.search(params[:q],  params[:from])
	  	respondSearchData(response)
	  end
	end
	
	def respondSearchData(response) 
		filteringMetaData = Array.new   # We should improve this to retrive directlly _source instead using .results.map

		response.results.map { |r| filteringMetaData << r._source }
		
		
	    respond_with filteringMetaData
	end
end




