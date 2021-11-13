# frozen_string_literal: true

class AddOption2ToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :option2, :string
    change_column_null :questions, :option2, false
  end
end
