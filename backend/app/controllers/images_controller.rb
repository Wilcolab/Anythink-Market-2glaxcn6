class ImagesController < ApplicationController
    def generate
      prompt = params[:prompt]
      size = params[:size]
      @image = OpenAI.generate_image(prompt, size)
      send_file @image.path, type: @image.content_type, disposition: 'inline'
    end
  end