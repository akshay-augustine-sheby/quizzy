# frozen_string_literal: true

class AddSlugToQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :slug, :string
    add_index :quizzes, :slug, unique: true
    change_column_null :quizzes, :slug, false
  end
end
