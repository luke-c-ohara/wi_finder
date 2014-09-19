class Network < ActiveRecord::Base
  attr_accessible :location, :nickname, :password, :public_private, :ssid, :user_id
end
