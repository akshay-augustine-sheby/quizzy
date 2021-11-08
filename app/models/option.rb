# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question

  validates :option, presence: true
  validate :option_atmost_4

  private

    def option_atmost_4
      count_hash = Option.group(:question_id).count
      f = 0
      count_hash.each do |key, value|
        if value >= 2
          f = 1
          break
        end
      end
      if f == 1
        errors.add(:option, "can't add more than 4")
      end
    end
end
