# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  validates :name, presence: true
  validates :answer, presence: true
  validate :option_atleast_2
  validate :option_atmost_4

  accepts_nested_attributes_for :options, reject_if: proc { |attributes|
 attributes["name"].blank? }, update_only: true, allow_destroy: true

  private

    def option_atleast_2
      if options.size < 2
        errors.add(:base, "Provide atleast 2 options")
      end
    end

    def option_atmost_4
      if options.size > 4
        errors.add(:base, "Too many options, maximum only 4 options allowed")
      end
    end
end
