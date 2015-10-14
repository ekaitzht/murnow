namespace :sitemap do
	task :generate => :environment do
				SitemapGenerator::Sitemap.default_host = 'http://www.murnow.com'
		SitemapGenerator::Sitemap.create do
		
		  Product.find_each do |product|
		    add '/products/' + product.id.to_s, :lastmod => product.updated_at, :priority => product.rating / 100
		  end
		end
	end
end