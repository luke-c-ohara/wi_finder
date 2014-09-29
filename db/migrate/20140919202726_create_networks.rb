class CreateNetworks < ActiveRecord::Migration
  def change
    create_table :networks do |t|
      t.string :ssid
      t.string :password
      t.string :location
      t.integer :user_id
      t.string :nickname
      t.string :public_private

      t.timestamps
    end
  end
end
