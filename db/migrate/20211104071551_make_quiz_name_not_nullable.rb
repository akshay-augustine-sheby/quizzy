# frozen_string_literal: true

class MakeQuizNameNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :quizzes, :quiz_name, false
  end
end
