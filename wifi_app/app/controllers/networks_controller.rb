class NetworksController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  
  def index
    @networks = Network.all
    @user_networks = Network.where(user_id: current_user.id)
    @friendships = Friendship.where(friend_id: current_user.id)
    @inverse_friendships = Friendship.where(user_id: current_user.id)
    @json_networks = (Network.where(public_private: 'Public') + @user_networks + @friendships.collect { |f| Network.find(f.network_id) }).uniq

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @json_networks }
    end
  end

  def show
    @network = Network.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @json_networks }
    end
  end

  def new
    @network = Network.new
  end

  def edit
    @network = Network.find(params[:id])
  end

  def create
    @network = Network.new(params[:network])
  if @network.save
      flash[:notice] = 'Network was successfully created.'
      redirect_to @network
    else
      flash[:alert] = 'Error.'
      redirect_to new_network_path
    end
  end

  def update
      @network = Network.find(params[:id])
    if @network.update_attributes(params[:network])
      flash[:notice] = 'Network was successfully updated.'
      redirect_to @network
    else
      flash[:alert] = 'Error.'
      redirect_to edit_network_path
    end
  end

  def destroy
    @network = Network.find(params[:id])
    @network.destroy
    redirect_to networks_path
  end
end
