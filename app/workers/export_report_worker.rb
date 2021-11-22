# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform
    attempts = Attempt.all.order("created_at DESC")
    attempts = attempts.map do |attempt|
      if attempt.submitted == true
        {
          quiz_name: Quiz.find(attempt.quiz_id).name,
          user_name: "#{User.find(attempt.user_id).first_name} #{User.find(attempt.user_id).last_name}",
          email: User.find(attempt.user_id).email,
          correct: attempt.correct_answers_count,
          incorrect: attempt.incorrect_answers_count
        }
      end
    end
    arr = attempts.reject { |dat| dat.blank? }
    reports = arr.pluck :quiz_name, :user_name, :email, :correct, :incorrect
    total reports.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    xlsx_workbook.add_worksheet(name: "Reports") do |worksheet|
      worksheet.add_row %w(Quiz\ Name User\ Name Email Correct\ Answers Incorrect\ Answers)
      reports.each.with_index(1) do |report, idx|
        worksheet.add_row report
        at idx
      end
    end
    sleep 10
    xlsx_package.serialize Rails.root.join("tmp", "reports_export_#{self.jid}.xlsx")
  end
end
