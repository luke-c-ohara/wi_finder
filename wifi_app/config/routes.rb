WifiApp::Application.routes.draw do
  root to: "welcome#index"

  resources :friendships
  resources :networks
  
  devise_for :users

  match '/users/:id', :to => 'users#show', :as => :user, :via => :get
  
end
