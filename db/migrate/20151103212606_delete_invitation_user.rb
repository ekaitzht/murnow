class DeleteInvitationUser < ActiveRecord::Migration
  def change
	remove_column :users, :invitation_id
    remove_column :users, :invitation_limit
	remove_column :invitations, :sender_id
	add_column :invitations, :spoiled, :boolean
  end
end
