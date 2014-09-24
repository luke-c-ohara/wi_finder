WifiApp::Application.routes.draw do
  get "sharings/new"

  get "sharings/create"

  root to: "welcome#index"

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
