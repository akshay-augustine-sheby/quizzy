# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[update destroy show]

  def index
    quizzes = Quiz.all.as_json(only: %i[quiz_name slug user_id])
    render status: :ok, json: { quizzes: quizzes }
  end

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

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Quiz is successfully updated" }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Quiz is successfully deleted" }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def show
    if @quiz
      render status: :ok, json: { quiz: @quiz }
    else
      render status: :not_found, json: { error: "Quiz not found" }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:quiz_name, :user_id)
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
    end
end
