class HomeController < ApplicationController

  #respond_to :html, :json

  def index
    @posts = Post.all

    puts @posts[0].inspect

    #respond_with(@posts)
    respond_to do |format|
      format.html
      format.json { render :json => @posts }
    end
  end

  def view
    @post = Post.find_by_slug(params[:slug])

    # respond_with(@post);
    respond_to do |format|
      format.html
      format.json { render :json => @post }
    end
  end

end
