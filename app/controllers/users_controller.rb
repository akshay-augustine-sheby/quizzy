# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email].downcase)
    if @user.present?
      render status: :ok, json: { notice: "User already present" }
    else
      @user1 = User.new(user_params.merge(role: "standard", password: "welcome", password_confirmation: "welcome"))
      if @user1.save
        render status: :ok, json: { notice: "User is successfully entered the quiz" }
      else
        errors = @user.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(
        :first_name, :last_name, :email,
        attempt_attributes: [:submitted, :quiz_id]
      )
    end
end
