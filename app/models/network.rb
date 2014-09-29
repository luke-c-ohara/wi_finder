class Network < ActiveRecord::Base
  belongs_to :user
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships

  attr_accessible :location, :nickname, :password, :public_private, :ssid, :user_id, :latitude, :longitude

  validates :ssid, presence: true, on: :create
  validates :password, presence: true, on: :create
  validates :location, presence: true, on: :create
  validates :nickname, presence: true, on: :create
  validates :public_private, presence: true, on: :create

  geocoded_by :location
  after_validation :geocode, :if => :location_changed?


  def shared_with?(friend)
    friends.include?(friend)
  end
end