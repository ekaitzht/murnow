class Users::RegistrationsController < Devise::RegistrationsController
	def update_resource(resource, params)
		  logger.info "Updating without password!!!"
		  logger.info params.inspect
		resource.update_without_password(params)
  	end
end

