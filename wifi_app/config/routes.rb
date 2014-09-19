WifiApp::Application.routes.draw do

  resources :friendships
  resources :networks
  
  devise_for :users

  root to: "welcome#index"

  match '/users/:id', :to => 'users#show',    :as => :user,         :via => :get
  
end
