# frozen_string_literal: true

require_relative "../../lib/event"
include Event

class RegistrationsController < Devise::RegistrationsController
  def create
    super
    # @user = User.new(user_params)
    if @user.persisted?
      sendEvent("user_created", { username: @user.username })
      avatar_url = params[:image]
      @user.update(image: avatar_url) if image.present?
    end
  end
end


class ApiController < ActionController::Base
  def save_avatar
    # save avatar URL to database
    avatar_url = params[:image]
    User.last.update(image: avatar_url) if avatar_url.present?

    render json: { message: "Avatar URL saved successfully" }
  end
end