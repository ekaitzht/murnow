class ProductsController < ApplicationController
  def index
    respond_with Product.all
  end

  def create
    respond_with Product.create(product_params)
  end

  def show
    respond_with Product.find(params[:id])
  end

  def upvote
    product = Product.find(params[:id])
    product.increment!(:upvotes)
    respond_with product
  end

  private
  def product_params
    params.require(:product).permit(:link, :title)
  end
end
