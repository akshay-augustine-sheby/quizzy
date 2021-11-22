# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.create!(name: "Sample Quiz", user_id: @user.id)
    @question1 = Question.create!(
      name: "Sample Question 1", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ name: "optionA" },
                            { name: "optionB" },
                            { name: "optionC" },
                            { name: "optionD" }])
    @question2 = Question.create!(
      name: "Sample Question 2", answer: "optionB", quiz_id: @quiz.id,
      options_attributes: [{ name: "optionA" },
                            { name: "optionB" }
                          ])
  end

  def test_attempt_is_valid
    @attempt = Attempt.new(
      submitted: false, quiz_id: @quiz.id, user_id: @user.id, attempt_answers_attributes:
      [{ question_id: @question1.id, answer: "optionD" },
        { question_id: @question2.id, answer: "optionB" }])
    @attempt.save
    assert @attempt.valid?
  end

  def test_attempt_is_invalid
    @attempt = Attempt.new(
      submitted: false, quiz_id: @quiz.id, user_id: @user.id, attempt_answers_attributes:
      [{ question_id: @question1.id, answer: "optionD" },
        { question_id: @question2.id, answer: "" }])
    @attempt.save
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "Attempt answers answer can't be blank"
  end
end
