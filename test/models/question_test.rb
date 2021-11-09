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
    @question = Question.new(
      question: "Sample Question", answer: "optionD", quiz_id: @quiz.id,
      options_attributes: [
        { option: "optA" },
        { option: "optB" },
        { option: "optC" },
        { option: "optD" }
      ])
  end

  def test_option1_should_be_present
    @question.option1 = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option1 can't be blank"
  end

  def test_option2_should_be_present
    @question.option2 = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option2 can't be blank"
  end

  def test_atleast_2_options_should_be_present
    @question.option2 = ""
    assert_not @question.valid?
  end

  def test_more_than_4_options_cant_be_present
    @question.save!
    @option3 = Option.create!(option: "optionC", question_id: @question.id)
    @option4 = Option.create!(option: "optionD", question_id: @question.id)
    @option5 = Option.new(option: "optionE", question_id: @question.id)
    assert_not @option5.valid?
    assert_includes @option5.errors.full_messages, "Option can't add more than 4"
  end
end
