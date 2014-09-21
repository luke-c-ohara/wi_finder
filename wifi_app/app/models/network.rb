class Network < ActiveRecord::Base
  belongs_to :user

  attr_accessible :location, :nickname, :password, :public_private, :ssid, :user_id, :latitude, :longitude

  geocoded_by :location
  after_validation :geocode, :if => :location_changed?

end
