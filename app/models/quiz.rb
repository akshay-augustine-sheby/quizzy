# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user

  validates :quiz_name, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  private

    def set_slug
      quiz_name_slug = quiz_name.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_quiz_slug = Quiz.where(
        regex_pattern,
        "#{quiz_name_slug}$|#{quiz_name_slug}-[0-9]+$"
      ).order(slug: :desc).first&.slug
      slug_count = 0
      if latest_quiz_slug.present?
        slug_count = latest_quiz_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{quiz_name_slug}-#{slug_count + 1}" : quiz_name_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, "is immutable!")
      end
    end
end
