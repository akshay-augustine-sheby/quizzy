# frozen_string_literal: true

class AddPublishedToQuizzes < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :published, :boolean, default: false, null: false
  end
end
