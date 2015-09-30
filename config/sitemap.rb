require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://www.murnow.com'
SitemapGenerator::Sitemap.create do

  Product.find_each do |product|
    add '/products/'+product.slug, :lastmod => product.updated_at, :priority => product.rating / 100
  end
end
SitemapGenerator::Sitemap.ping_search_engines # Not needed if you use the rake tasks
