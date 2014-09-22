class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, :class_name => "User"
  belongs_to :network

  attr_accessible :friend_id, :network_id, :user_id

end
