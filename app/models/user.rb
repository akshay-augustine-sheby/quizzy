class User < ApplicationRecord
    validates :first_name, presence: true, length: {maximum: Constants::MAX_NAME_LENGTH}
    validates :last_name, presence: true, length: {maximum: Constants::MAX_NAME_LENGTH}
    validates :email, presence: true, uniqueness: true
end
