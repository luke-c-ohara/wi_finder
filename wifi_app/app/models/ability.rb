class Ability
  include CanCan::Ability
 
  def initialize(user)
    user ||= User.new
    if user.role? :admin
        can :manage, :all
    elsif user.role? :basic_user
        can :read, Network, user_id: user.id
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
