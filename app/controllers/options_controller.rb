# frozen_string_literal: true

class OptionsController < ApplicationController
  def show
    @option = Option.where("question_id = ?", params[:id])
    if @option
      render status: :ok, json: { options: @option }
    else
      render status: :not_found, json: { error: "Option not found" }
    end
  end
end
