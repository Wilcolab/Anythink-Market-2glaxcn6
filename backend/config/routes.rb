Rails.application.routes.draw do
  root to: "application#root"

  get '/health', to: 'application#health'

  post "/api/save-avatar", to: "api#save_avatar"

  scope :api, defaults: { format: :json } do
    resource :user, only: %i[show update]

    resources :profiles, param: :username, only: [:show] do
      resource :follow, only: %i[create destroy]
    end

    resources :items, param: :slug, except: %i[edit new] do
      resource :favorite, only: %i[create destroy]
      resources :comments, only: %i[create index destroy]
      get :feed, on: :collection
    end

    resources :tags, only: [:index]

    resources :ping, only: [:index]
  end
end