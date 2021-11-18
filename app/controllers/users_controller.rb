# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email].downcase)
    if @user.present?
      @attempts = Attempt.where(
        "user_id = ? AND quiz_id = ?", @user.id,
        user_params[:attempts_attributes][0]["quiz_id"]).first
      if @attempts.present?
        if @attempts.submitted == true
          render status: :unprocessable_entity, json: { error: "Quiz already submitted" }
        end
      else
        @attempt = @user.attempts.new(
          submitted: user_params[:attempts_attributes][0][:submitted],
          quiz_id: user_params[:attempts_attributes][0][:quiz_id])
        if @attempt.save
          render status: :ok, json: { notice: "Welcome to the Quiz", attemptId: @attempt.id }
        else
          errors = @attempt.errors.full_messages.to_sentence
          render status: :unprocessable_entity, json: { error: errors }
        end
      end

    else
      @user1 = User.new(user_params.merge(role: "standard", password: "welcome", password_confirmation: "welcome"))
      if @user1.save
        render status: :ok, json: { notice: "Welcome to the Quiz", attemptId: @user1.attempts[0].id }
      else
        errors = @user1.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(
        :first_name, :last_name, :email,
        attempts_attributes: [:submitted, :quiz_id]
      )
    end
end
