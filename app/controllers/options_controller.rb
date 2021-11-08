# frozen_string_literal: true

class OptionsController < ApplicationController
  def create
    @option = Option.new(option_params)
    if @option.save
      render status: :ok,
        json: {}
    else
      errors = @option.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def option_params
      params.require(:option).permit(:option, :question_id)
    end
end
