# frozen_string_literal: true

class QuestionsController < ApplicationController
  def show
    @question = Question.where("quiz_id = ?", params[:id])
    if @question
      render status: :ok, json: { questions: @question }
    else
      render status: :not_found, json: { error: "Question not found" }
    end
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render status: :ok,
        json: { notice: "Question is successfully created" }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def question_params
      params.require(:question).permit(
        :name, :answer, :quiz_id,
        options_attributes: [ :name ]
      )
    end
end
