class ApplicationController < ActionController::Base
  protect_from_forgery

  # protected
  # def after_sign_in_path_for(resource)
  #   s_path
  # end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, alert: "Sorry - You do not have permission to view this page"
  end
end
