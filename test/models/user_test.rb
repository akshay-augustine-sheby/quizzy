require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end
  
  def test_invalid_user
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_first_name_should_be_present
    @user.first_name = "akshay"
    assert @user.valid?
  end

  def test_first_name_cant_be_blank
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_last_name_should_be_present
    @user.last_name = "akshay"
    assert @user.valid?
  end

  def test_last_name_cant_be_blank
    @user.last_name = ""
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end



  
end
