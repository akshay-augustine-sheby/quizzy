# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  def show
    @quiz = Quiz.find_by(slug: params[:slug])
    if @quiz
      render status: :ok, json: { quiz: @quiz }
    else
      render status: :not_found, json: { error: "Quiz not found" }
    end
  end
end
