# frozen_string_literal: true

class QuestionsController < ApplicationController
  def create
    @question = Question.new(question_params)
    if @question.save
      render status: :ok,
        json: { notice: "Question is successfully created", dat: @question }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def question_params
      params.require(:question).permit(:question, :answer, :quiz_id)
    end
end