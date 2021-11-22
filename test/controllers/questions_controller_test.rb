# frozen_string_literal: true

require "test_helper"

class QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.create!(name: "Sample Quiz", user_id: @user.id)
    @question = Question.new(
      name: "Sample Question", answer: "optionA", quiz_id: @quiz.id, options_attributes:
      [{ name: "optionA" }, { name: "optionB" }, { name: "optionC" }])
  end

  def test_should_create_question
    post questions_url, params: {
      question: {
        name: "Sample Question", answer: "optionA", quiz_id: @quiz.id, options_attributes:
      [{ name: "optionA" }, { name: "optionB" }, { name: "optionC" }]
      }
    }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "Question is successfully created"
  end

  def test_should_update_question
    @question.save
    new_question_name = "#{@question.name}test"
    question_params = {
      question: {
        name: new_question_name, answer: "optionC", quiz_id: @quiz.id
      }
    }
    put "/questions/#{@question.id}", params: question_params
    assert_response :success
    @question.reload
    assert_equal @question.name, new_question_name
  end

  def test_should_destroy_question
    @question.save
    initial_question_count = Question.all.size
    delete "/questions/#{@question.id}"
    assert_response :success
    assert_equal Question.all.size, initial_question_count - 1
  end

  def test_should_view_question
    @question.save
    get "/questions/#{@question.id}"
    assert_response :success
  end

  def test_should_show_questions
    get "/questions/#{@quiz.id}"
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["questions"].length, Question.count
  end
end
