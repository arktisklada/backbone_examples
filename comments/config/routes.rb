Integrated::Application.routes.draw do

  root :to => "home#index"

  resources :posts do
    resources :comments
  end
#  get "posts/:slug" => "home#view"

end
