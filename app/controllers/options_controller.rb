# frozen_string_literal: true

class OptionsController < ApplicationController
  def show
    @options = Option.where("question_id = ?", params[:id])
    @question = Question.where("id = ?", params[:id])
    optionsId = []
    optionsName = []
    @options.each do |option|
      optionsId.push(option.id)
      optionsName.push(option.name)
    end
    if @options
      render status: :ok, json: { optionsId: optionsId, optionsName: optionsName, question: @question }
    else
      render status: :not_found, json: { error: "Option not found" }
    end
  end

  private

    def option_params
      params.require(:option).permit(:id, :name, :question_id)
    end
end
