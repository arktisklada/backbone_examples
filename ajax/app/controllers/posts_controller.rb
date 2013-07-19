class PostsController < ApplicationController

  respond_to :html, :json

  def index
    @posts = Post.select([:title, :slug])
    respond_with(@posts)
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def show
    @post = Post.find_by_slug(params[:id])
    respond_with(@post)
  end

  def destroy
  end

end