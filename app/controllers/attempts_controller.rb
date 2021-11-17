# frozen_string_literal: true

class AttemptsController < ApplicationController
  def index
    @attempts = Attempt.all.order("created_at DESC")
    @data = @attempts.map do |attempt|
      if attempt.submitted == true
        {
          quiz_name: Quiz.find(attempt.quiz_id).name,
          user_name: "#{User.find(attempt.user_id).first_name} #{User.find(attempt.user_id).last_name}",
          email: User.find(attempt.user_id).email,
          correct: attempt.correct_answers_count,
          incorrect: attempt.incorrect_answers_count
        }
      end
    end
    render status: :ok, json: { data: @data }
  end

  def update
    @attempt = Attempt.find_by(id: params[:id])
    puts "printed: #{attempt_params}"
    if @attempt.update(attempt_params)
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity,
        json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def attempt_params
      params.require(:attempt).permit(
        :id, :submitted, :correct_answers_count, :incorrect_answers_count,
        attempt_answers_attributes: [ :question_id, :answer ]
        )
    end
end
