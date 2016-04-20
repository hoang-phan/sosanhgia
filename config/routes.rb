Rails.application.routes.draw do
  resource :home, only: [:show]

  namespace :api do
    resources :prices, only: [:index]
    resources :hotels, only: [:index, :create, :update, :destroy]
    resources :hotel_links, only: [:index, :create, :update, :destroy]
    resources :competitors, only: [:index, :create, :update, :destroy]
  end

  root to: 'homes#show'
end
