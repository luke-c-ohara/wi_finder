class UsersController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource

  def index
    if params[:q]
      @users = User.search(params[:q])
    else
      @users = User.all
    end
    respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @users }
    end
  end

  def show
    @user = User.find(params[:id])
  end
end

