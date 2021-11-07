# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", password: "welcome",
      password_confirmation: "welcome")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_invalid_user
    @user.first_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_first_name_should_be_present
    @user.first_name = "akshay"
    assert @user.valid?
  end

  def test_first_name_cant_be_blank
    @user.first_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_last_name_should_be_present
    @user.last_name = "akshay"
    assert @user.valid?
  end

  def test_last_name_cant_be_blank
    @user.last_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end

  def test_email_should_be_present
    @user.email = "akshay@example.com"
    assert @user.valid?
  end

  def test_email_cant_be_blank
    @user.email = ""
    assert_not @user.valid?
    assert_equal ["Email can't be blank", "Email is invalid"], @user.errors.full_messages
  end

  def test_first_name_should_be_valid_length
    @user.first_name = "a" * 100
    assert_not @user.valid?
    assert_equal ["First name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_last_name_should_be_valid_length
    @user.last_name = "a" * 100
    assert_not @user.valid?
    assert_equal ["Last name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_email_should_be_unique
    @user.save!
    test_user = @user.dup
    assert_not test_user.valid?
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
      first.last@example.in user+one@example.ac.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
      @sam-sam.com sam@sam+exam.com fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_users_with_same_emails_cant_be_created
    user2 = User.new(first_name: "John", last_name: "Xavier", email: "john@example.com")
    user2.email = "sam@example.com"
    assert user2.invalid?
  end

  def test_user_should_have_valid_role
    @user.role = 1
    assert @user.valid?
  end

  def test_user_cant_have_invalid_role
    assert_raises(ArgumentError) do
      @user.role = 2
    end
  end

  def test_password_cant_be_blank
    @user.password = nil
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_password_should_have_minimum_length
    @user.password = "welc"
    @user.password_confirmation = "welc"
    assert_not @user.save
    assert_equal @user.errors.full_messages, ["Password is too short (minimum is 6 characters)"]
  end

  def test_user_should_have_matching_password_and_password_confirmation
    @user.password_confirmation = "#{@user.password}-random"
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end
end
