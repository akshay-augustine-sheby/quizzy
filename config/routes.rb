# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resources :quizzes, only: %i[index create update destroy show], param: :slug
    resources :questions, only: %i[show create destroy update]
    resources :options, only: %i[show destroy]
    resources :users, only: %i[create]
    resource :sessions, only: %i[create destroy]
    resources :attempts, only: %i[index update]
  end

  namespace :public do
    resources :quizzes, only: %i[show], param: :slug
  end

  root to: "home#index"
  get "/export" => "reports#export"
  get "/export_status" => "reports#export_status"
  get "/export_download" => "reports#export_download"
  get "*path", to: "home#index", via: :all
end
