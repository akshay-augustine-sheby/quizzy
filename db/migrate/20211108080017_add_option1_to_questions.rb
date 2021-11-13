# frozen_string_literal: true

class AddOption1ToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :option1, :string
    change_column_null :questions, :option1, false
  end
end
