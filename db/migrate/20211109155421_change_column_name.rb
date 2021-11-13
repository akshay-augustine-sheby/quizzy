# frozen_string_literal: true

class ChangeColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :quizzes, :quiz_name, :name
    rename_column :questions, :question, :name
    rename_column :options, :option, :name
  end
end
