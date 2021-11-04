# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def create
    @quiz = Quiz.new(quiz_params)
    if @quiz.save
      render status: :ok,
        json: { notice: "Quiz is successfully created" }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:quiz_name, :user_id)
    end
end
