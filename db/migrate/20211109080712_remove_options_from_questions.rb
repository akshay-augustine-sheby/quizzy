# frozen_string_literal: true

class RemoveOptionsFromQuestions < ActiveRecord::Migration[6.1]
  def change
    remove_column :questions, :option1, :string
    remove_column :questions, :option2, :string
  end
end
