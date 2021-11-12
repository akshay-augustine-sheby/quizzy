# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  validates :name, presence: true
  validates :answer, presence: true
  validate :should_have_atleast_2_options
  validate :can_have_atmost_4_options

  accepts_nested_attributes_for :options, reject_if: proc { |attributes|
 attributes["name"].blank? }, update_only: true, allow_destroy: true

  private

    def should_have_atleast_2_options
      if options.size < 2
        errors.add(:base, "Provide atleast 2 options")
      end
    end

    def can_have_atmost_4_options
      if options.size > 4
        errors.add(:base, "Too many options, maximum only 4 options allowed")
      end
    end
end
