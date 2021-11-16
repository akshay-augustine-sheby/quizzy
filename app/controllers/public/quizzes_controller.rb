# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  def show
    hash_name = {}
    hash_id = {}
    name = []
    id = []
    @quiz = Quiz.find_by(slug: params[:slug])
    if @quiz
      @questions = @quiz.questions
      @questions.each do |question|
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
      render status: :ok, json: { quiz: @quiz, name: name, id: id, options: hash_name, optionsId: hash_id }
    else
      render status: :not_found, json: { error: "Quiz not found" }
    end
  end
end
