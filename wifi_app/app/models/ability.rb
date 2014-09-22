class Ability
  include CanCan::Ability
 
  def initialize(user)
    user ||= User.new
    if user.role? :admin
        can :manage, :all
    elsif user.role? :basic_user
        can :read, Network, public_private: 'Public'
        can :read, Network, user_id: user.id
        # can :read, Network, Network.shared do |network|
        #     network.friendships.present?
        # end
        
        # Find all of the friendships where the network id is this network id and map the friend_ids and check whether or not the current_user id is present in this array?

        can :create, Network
        can :update, Network, user_id: user.id
        can :destroy, Network, user_id: user.id
        can :read, Friendship
        can :create, Friendship, user_id: user.id
        can :destroy, Friendship
    else
        can :create, User
    end
  end
end
