# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user

  validates :quiz_name, presence: true
end
