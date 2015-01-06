class SearchController < ApplicationController
	def search
	  if params[:q].nil?
	    respond_with = []
	  else
	  	response = Product.search(params[:q])

	  	filteringMetaData = Array.new   # We should improve this to retrive directlly _source instead using .results.map

		response.results.map { |r| filteringMetaData << r._source }
	    respond_with filteringMetaData
	  end
	end
end
