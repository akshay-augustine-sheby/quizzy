# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resources :quizzes, only: %i[index create update destroy], param: :slug
    resources :users, only: %i[index]
    resource :sessions, only: %i[create destroy]
  end

  root to: "home#index"
  get "*path", to: "home#index", via: :all
end
