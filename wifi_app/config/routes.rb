WifiApp::Application.routes.draw do
  
  root to: "welcome#index"

  get "sharings/new"
  get "sharings/create"
  get "/map", to: "welcome#map"

  resources :networks do
    member do
      get 'sharings/new'
      post 'sharings', to: 'sharings#create'
    end
  end 

  devise_for :users

  match '/users/:id', :to => 'users#show', :as => :user, :via => :get
  match '/users', :to => 'users#index', :as => :all_users, :via => :get
  
end
