# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform
    @attempts = Attempt.all.order("created_at DESC")
    reports = @attempts.map do |attempt|
      if attempt.submitted == true
        [ Quiz.find(attempt.quiz_id).name,
          "#{User.find(attempt.user_id).first_name} #{User.find(attempt.user_id).last_name}",
          User.find(attempt.user_id).email,
          attempt.correct_answers_count,
          attempt.incorrect_answers_count
        ]
      end
    end
    total reports.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    xlsx_workbook.add_worksheet(name: "Reports") do |worksheet|
      worksheet.add_row %w(QuizName UserName Email CorrectAnswers IncorrectAnswers)
      reports.each.with_index(1) do |report, idx|
        worksheet.add_row report
        at idx
        sleep 0.5
      end
    end
    xlsx_package.serialize Rails.root.join("tmp", "reports_export_#{self.jid}.xlsx")
  end
end
