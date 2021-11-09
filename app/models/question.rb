# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  validates :question, presence: true
  validates :answer, presence: true
  validate :option_atleast_2

  accepts_nested_attributes_for :options, limit: 4, reject_if: proc { |attributes| attributes["option"].blank? }

  private

    def option_atleast_2
      if options.size < 2
        errors.add(:base, "Provide atleast 2 options")
      end
    end
end
