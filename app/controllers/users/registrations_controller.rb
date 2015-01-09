class Users::RegistrationsController < Devise::RegistrationsController
	def update_resource(resource, params)
		  logger.info "Updating without password!!!"
		resource.update_without_password(params)
  	end
end

