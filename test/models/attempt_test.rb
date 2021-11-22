# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.create!(name: "Sample Quiz", user_id: @user.id)
    @attempt = Attempt.new(submitted: false, quiz_id: @quiz.id, user_id: @user.id)
  end

  def test_user_should_be_present
    @attempt.user_id = ""
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "User must exist"
  end

  def test_quiz_should_be_present
    @attempt.quiz_id = ""
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "Quiz must exist"
  end

  def test_user_can_attempt_different_quizzes
    @quiz2 = Quiz.create!(name: "Sample Quiz 2", user_id: @user.id)
    @attempt1 = Attempt.create!(submitted: true, quiz_id: @quiz.id, user_id: @user.id)
    @attempt2 = Attempt.new(submitted: true, quiz_id: @quiz2.id, user_id: @user.id)
    @attempt2.save
    assert @attempt2.valid?
  end
end
