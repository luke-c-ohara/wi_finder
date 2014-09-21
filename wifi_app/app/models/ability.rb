class Ability
  include CanCan::Ability
 
  def initialize(user)
    user ||= User.new
    if user.role? :admin
        can :manage, :all
    elsif user.role? :basic_user
        can :read, Network
        can :create, Network
        can :read, Friendship
        can :create, Friendship
    else
        can :create, User
    end
  end
end