require 'test_helper'

class CustomMailerTest < ActionMailer::TestCase
  test "request_product" do
    mail = CustomMailer.request_product
    assert_equal "Request product", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
