class AddLatitudeAndLongitudeToNetworks < ActiveRecord::Migration
  def change
    add_column :networks, :latitude, :float
    add_column :networks, :longitude, :float
  end
end
