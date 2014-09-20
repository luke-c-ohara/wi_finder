class FriendshipsController < ApplicationController
  
  def index
    @friendships = Friendship.all
  end

  def show
    @friendship = Friendship.find(params[:id])
  end

  def new
    @friendship = Friendship.new
  end

  def edit
    @friendship = Friendship.find(params[:id])
  end

  def create
      @friendship = Friendship.new(params[:friendship])
    if @friendship.save
      flash[:notice] = 'Friendship was successfully created.'
      redirect_to @friendship
    else
      flash[:alert] = 'Error.'
      redirect_to new_friendship_path
    end
  end

  def update
      @friendship = Friendship.find(params[:id])
    if @friendship.update_attributes(params[:friendship])
     flash[:notice] = 'Friendship was successfully updated.'
     redirect_to @friendship
    else
      flash[:alert] = 'Error.'
      redirect_to edit_friendship_path
    end
  end

  def destroy
    @friendship = Friendship.find(params[:id])
    @friendship.destroy
    redirect_to friendship_path
  end
end
