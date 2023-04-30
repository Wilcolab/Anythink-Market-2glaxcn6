class AddIsVerifiedToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :isVerified, :boolean, default: false
  end
end
