# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.create!(quiz_name: "Sample Quiz", user_id: @user.id)
  end

  def test_option1_should_be_present
    @question = Question.new(
      question: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ option: "" }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Provide atleast 2 options"
  end

  def test_option2_should_be_present
    @question = Question.new(
      question: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ option: "optionA" }, { option: "" }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Provide atleast 2 options"
  end

  def test_atleast_2_options_should_be_present
    @question = Question.new(
      question: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ option: "optionA" }, { option: "optionB" }])
    assert @question.valid?
  end

  def test_upto_4_options_can_be_present
    @question = Question.new(
      question: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ option: "optionA" }, { option: "optionB" }, { option: "optionC" }, { option: "optionD" }])
    assert @question.valid?
  end
end
