# lib/openai.rb
require 'httparty'

module OpenAI
  def self.generate_image(prompt, size="256x256")
    api_key = ENV['OPENAI_API_KEY']
    headers = {
      'Authorization' => "Bearer #{api_key}",
      'Content-Type' => 'application/json'
    }
    body = {
      "prompt" => prompt,
      "response_format" => "url"
    }
    response = HTTParty.post('https://api.openai.com/v1/images/generations', headers: headers, body: body.to_json)
    if response.code == 200
      image_url = response.parsed_response["data"][0]["url"]
      # download and return the image file
        extension = File.extname(URI.parse(image_url).path)[1..-1]
        temp_file = Tempfile.new(['dalle', ".#{extension}"])
        temp_file.binmode
        temp_file.write HTTParty.get(image_url).parsed_response
        temp_file.close
        # temp_file
        temp_file_path = temp_file.path
    else
      raise "Failed to generate image with error code #{response.code}: #{response.parsed_response}"
    end
  end
end