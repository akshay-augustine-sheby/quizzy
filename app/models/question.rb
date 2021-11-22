# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy

  validates :name, presence: true
  validates :answer, presence: true
  validate :should_have_atleast_2_options
  validate :can_have_atmost_4_options
  # validate :uniqueness_of_options
  validate :answer_should_present_in_options

  accepts_nested_attributes_for :options, reject_if: proc { |attributes|
 attributes["name"].blank? }, allow_destroy: true

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

    # def uniqueness_of_options
    #  errors.add(:options, "must be unique") if options.map(&:name).uniq.size != options.size
    # end

    def answer_should_present_in_options
      f = 0
      options.map do |option|
        if option.name == answer
          f = 1
        end
      end
      if f == 0
        errors.add(:base, "Answer should be present in options")
      end
    end
end
