class WelcomeController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @public_networks = Network.where(public_private: "Public")
  end

  def map
    @public_networks = Network.where(public_private: "Public")
    render :index
  end

end