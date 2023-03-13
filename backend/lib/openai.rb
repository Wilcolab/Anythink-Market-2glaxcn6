# lib/openai.rb
require 'httparty'

module OpenAI
  def self.generate_image_url(prompt, size="256x256")
    api_key = ENV['OPENAI_API_KEY']
    headers = {
      'Authorization' => "Bearer #{api_key}",
      'Content-Type' => 'application/json'
    }
    body = {
      "prompt" => prompt,
      "size" => size,
      "response_format" => "url"
    }
    response = HTTParty.post('https://api.openai.com/v1/images/generations', headers: headers, body: body.to_json)
    if response.code == 200
      image_url = response.parsed_response["data"][0]["url"]
      # return the image url
      image_url
    else
      raise "Failed to generate image with error code #{response.code}: #{response.parsed_response}"
    end
  end
end