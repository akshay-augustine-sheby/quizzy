# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_question, only: %i[destroy update]

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

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: "Question is successfully deleted" }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: "Question is successfully updated" }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:question).permit(
        :name, :answer, :quiz_id,
        options_attributes: [ :name ]
      )
    end

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: "Question not found" }
      end
    end
end
