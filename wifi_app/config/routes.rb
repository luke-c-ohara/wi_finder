WifiApp::Application.routes.draw do

  resources :friendships
  resources :networks
  
  devise_for :users

  root to: "welcome#index"
  
end
