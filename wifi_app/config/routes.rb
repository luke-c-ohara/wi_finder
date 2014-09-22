WifiApp::Application.routes.draw do
  root to: "welcome#index"

  resources :networks do
    resources :friendships
  end 

  devise_for :users

  match '/users/:id', :to => 'users#show', :as => :user, :via => :get
  
end
