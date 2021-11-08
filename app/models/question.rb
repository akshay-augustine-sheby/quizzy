# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  validates :question, presence: true
  validates :answer, presence: true
  validates :option1, presence: true
  validates :option2, presence: true
end
