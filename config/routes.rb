Rails.application.routes.draw do
  get 'staff/index'

  root 'staff#index'

  resources :staff, except: [:new, :edit]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
