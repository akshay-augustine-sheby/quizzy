# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[update destroy show]

  def index
    quizzes = @current_user.quizzes.all.as_json(only: %i[name slug user_id])
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    @quiz = @current_user.quizzes.new(quiz_params)
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
      params.require(:quiz).permit(:name)
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
    end
end
