Integrated::Application.routes.draw do

  root :to => "home#index"

  resources :posts
#  get "posts/:slug" => "home#view"

end
