class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, :class_name => "User"
  belongs_to :network

  attr_accessible :friend_id, :network_id, :user_id

  validate :cannot_friend_self

  validates :friend_id, :uniqueness => {:scope => [:network_id, :user_id]}

  def cannot_friend_self
    errors.add(:friend_id, "cannot friend self") unless user_id != friend_id
  end



end
