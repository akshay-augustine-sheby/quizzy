# frozen_string_literal: true

class Public::QuestionsController < ApplicationController
  def show
    hash_name = {}
    hash_id = {}
    name = []
    id = []
    @question = Question.where("quiz_id = ?", params[:id])
    @question.each do |question|
      name.push(question.name)
      id.push(question.id)
      @options = question.options
      arr_name = []
      arr_id = []
      @options.each do |option|
        arr_name.push(option.name)
        arr_id.push(option.id)
      end
      hash_name[question.id] = arr_name
      hash_id[question.id] = arr_id
    end

    if @question
      render status: :ok, json: { name: name, id: id, options: hash_name, optionsId: hash_id }
    else
      render status: :not_found, json: { error: "Question not found" }
    end
  end

  private

    def question_params
      params.require(:question).permit(
        :id, :name, :answer, :quiz_id,
        options_attributes: [ :id, :name, :question_id ]
      )
    end
end
