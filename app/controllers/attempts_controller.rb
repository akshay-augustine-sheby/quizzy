# frozen_string_literal: true

class AttemptsController < ApplicationController
  def update
    @attempt = Attempt.find_by(id: params[:id])
    if @attempt.update(attempt_params)
      render status: :ok, json: { notice: "Quiz successfully submitted" }
    else
      render status: :unprocessable_entity,
        json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(
        :id, :submitted,
        attempt_answers_attributes: [ :question_id, :answer ]
        )
    end
end
