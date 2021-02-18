Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :notes
      resources :users, only: [:create]
      post 'login', to: "auth#create"
      get 'persist', to: "auth#show"
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
