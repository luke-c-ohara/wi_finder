class NetworksController < ApplicationController
  
  def index
    @networks = Network.all
  end

  def show
    @network = Network.find(params[:id])
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
