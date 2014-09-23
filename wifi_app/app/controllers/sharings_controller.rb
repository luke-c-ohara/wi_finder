class SharingsController < ApplicationController
  def new    
    @network = Network.find(params[:id])
    @members = (User.all - [current_user])
  end

  def create
    @network = Network.find(params[:id])
    @network.friendships.each(&:destroy)
    params[:friend_ids].each do |friend_id|
      @network.friendships.create(user_id: current_user.id, friend_id: friend_id) unless friend_id.blank?
    end

    redirect_to @network
  end
end
