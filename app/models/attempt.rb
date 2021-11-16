# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_one :attempt_answer, dependent: :destroy

  # validates :submitted, presence: true
end
