# Preview all emails at http://localhost:3000/rails/mailers/custom_mailer
class CustomMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/custom_mailer/request_product
  def request_product
    CustomMailer.request_product
  end

end
