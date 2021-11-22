# frozen_string_literal: true

require "test_helper"

class QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome",
      role: "administrator"
    )
    @quiz = Quiz.new(
      name: "test",
      user_id: @user.id
    )
  end

  def test_user_should_create_valid_quiz
    post quizzes_url, params: { quiz: { name: "test", user_id: @user.id } },
      headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], "Quiz is successfully created"
  end

  def test_valid_user_can_update_quiz_name
    @quiz.save
    new_quiz_name = "#{@quiz.name}test"
    quiz_params = { quiz: { name: new_quiz_name } }
    put "/quizzes/#{@quiz.slug}", params: quiz_params,
      headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    @quiz.reload
    assert_equal @quiz.name, new_quiz_name
  end

  def test_should_list_all_quizzes_for_valid_user
    get quizzes_url, headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["quizzes"].length, Quiz.count
  end

  def test_valid_user_can_view_quiz
    @quiz.save
    get "/quizzes/#{@quiz.slug}",
      headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
  end

  def test_valid_user_should_be_able_to_destroy_quiz
    @quiz.save
    initial_quiz_count = Quiz.all.size
    delete "/quizzes/#{@quiz.slug}",
      headers: { "X-Auth-Token" => @user.authentication_token, "X-Auth-Email" => @user.email }
    assert_response :success
    assert_equal Quiz.all.size, initial_quiz_count - 1
  end
end
