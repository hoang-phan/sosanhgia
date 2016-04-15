Rails.application.routes.draw do
  resource :home, only: [:show]

  namespace :api do
    resources :prices, only: [:index]
  end

  root to: 'homes#show'
end
