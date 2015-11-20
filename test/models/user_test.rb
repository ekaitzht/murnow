require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should follow and unfollow a user" do
    ekaitz  = users(:ekaitz)
    ulaize   = users(:ulaize)
    assert_not ekaitz.following?(ulaize)
    ekaitz.follow(ulaize)
    assert ekaitz.following?(ulaize)
    assert ulaize.followers.include?(ekaitz)
    ekaitz.unfollow(ulaize)
    assert_not ekaitz.following?(ulaize)
  end
end


