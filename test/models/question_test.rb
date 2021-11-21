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
    @quiz = Quiz.create!(name: "Sample Quiz", user_id: @user.id)
  end

  def test_option1_should_be_present
    @question = Question.new(
      name: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ name: "" }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Provide atleast 2 options"
  end

  def test_option2_should_be_present
    @question = Question.new(
      name: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ name: "optionA" }, { name: "" }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Provide atleast 2 options"
  end

  def test_atleast_2_options_should_be_present
    @question = Question.new(
      name: "Sample Question", answer: "optionA", quiz_id: @quiz.id,
      options_attributes: [{ name: "optionA" }, { name: "optionB" }])
    assert @question.valid?
  end

  def test_more_than_4_options_not_allowed
    @question = Question.new(
      name: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [{ name: "optionA" },
                            { name: "optionB" },
                            { name: "optionC" },
                            { name: "optionD" },
                            { name: "optionE" }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Too many options, maximum only 4 options allowed"
  end

  def test_options_should_be_unique
    @question = Question.new(
      name: "Sample Question", answer: "optionA", quiz_id: @quiz.id,
      options_attributes: [{ name: "optionA" },
                            { name: "optionA" },
                            { name: "optionB" }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options must be unique"
  end
end
