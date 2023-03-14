# frozen_string_literal: true
require_relative "../../lib/event"
include Event

class RegistrationsController < Devise::RegistrationsController
  def create
    super
    if @user.persisted?
      sendEvent("user_created", { username: @user.username })
      avatar_url = params[:image]
      puts "Params hash: #{params.inspect}"
      if avatar_url.present?
        @user.update(image: save_avatar(avatar_url))
      end
    end
  end

  private

  def save_avatar(avatar_url)
    uri = URI.parse("http://localhost:3000/registrations/save_avatar")
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri, { 'Content-Type': 'application/json' })
    request.body = { image: avatar_url }.to_json
    response = http.request(request)
    JSON.parse(response.body)
  end
end
