# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.new(name: "Sample Quiz", user_id: @user.id)
  end

  def test_quiz_name_should_be_present
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Name can't be blank"
  end
end
