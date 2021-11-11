# frozen_string_literal: true

class OptionsController < ApplicationController
  def show
    @options = Option.where("question_id = ?", params[:id])
    arr_id = []
    @options.each do |option|
      arr_id.push(option.id)
    end
    if @options
      render status: :ok, json: { optionsId: arr_id }
    else
      render status: :not_found, json: { error: "Option not found" }
    end
  end

  private

    def option_params
      params.require(:option).permit(:id, :name, :question_id)
    end
end
