require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://www.murnow.com'
SitemapGenerator::Sitemap.create do
  (29202..33328).each do |i|
  	add '/products/'+i.to_s, :changefreq => 'weekly' 
  end
end
SitemapGenerator::Sitemap.ping_search_engines # Not needed if you use the rake tasks
