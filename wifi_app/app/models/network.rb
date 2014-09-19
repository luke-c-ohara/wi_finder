class Network < ActiveRecord::Base
  belongs_to :user

  attr_accessible :location, :nickname, :password, :public_private, :ssid, :user_id
end
