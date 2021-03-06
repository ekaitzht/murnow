# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160205170011) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "invitations", force: true do |t|
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "spoiled"
  end

  create_table "products", force: true do |t|
    t.string   "product_name"
    t.string   "upvotes",                 default: "0"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "brand_name"
    t.string   "category"
    t.float    "product_stars",           default: 0.0
    t.integer  "number_reviews",          default: 0
    t.string   "hash_url_image"
    t.text     "long_description"
    t.string   "sku_price"
    t.integer  "buyers",                  default: 0
    t.integer  "not_buyers",              default: 0
    t.string   "ref_elastic"
    t.float    "rating"
    t.string   "tags"
    t.string   "subcategory"
    t.string   "slug"
    t.string   "sku"
    t.string   "prod_id"
    t.string   "retailer"
    t.string   "original_url"
    t.boolean  "bit_to_remove",           default: true
    t.string   "levels"
    t.integer  "original_number_reviews"
    t.decimal  "sum_rating"
  end

  add_index "products", ["prod_id", "retailer"], name: "index_products_on_prod_id_and_retailer", unique: true, using: :btree
  add_index "products", ["slug"], name: "index_products_on_slug", using: :btree

  create_table "relationships", force: true do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "relationships", ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
  add_index "relationships", ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
  add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id", using: :btree

  create_table "reviews", force: true do |t|
    t.text     "body"
    t.integer  "product_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.boolean  "repurchase", null: false
    t.float    "stars",      null: false
  end

  add_index "reviews", ["product_id", "user_id"], name: "index_reviews_on_product_id_and_user_id", unique: true, using: :btree
  add_index "reviews", ["product_id"], name: "index_reviews_on_product_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "skin_problems", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "skin_problems", ["name"], name: "index_skin_problems_on_name", unique: true, using: :btree

  create_table "user_skin_problems", force: true do |t|
    t.integer "user_id"
    t.integer "skin_problem_id"
  end

  add_index "user_skin_problems", ["skin_problem_id"], name: "index_user_skin_problems_on_skin_problem_id", using: :btree
  add_index "user_skin_problems", ["user_id"], name: "index_user_skin_problems_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "",   null: false
    t.string   "encrypted_password",     default: "",   null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,    null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username",                              null: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "provider"
    t.string   "uid"
    t.text     "bio"
    t.string   "skin_type"
    t.string   "favourite_brand"
    t.string   "skin_tone"
    t.string   "hash_url_image"
    t.string   "eye_color"
    t.string   "instagram_profile"
    t.string   "youtube_channel"
    t.datetime "age"
    t.integer  "followers_count",        default: 0
    t.integer  "following_count",        default: 0
    t.boolean  "notification_followers", default: true
    t.boolean  "notification_likes",     default: true
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "votes", force: true do |t|
    t.integer  "user_id"
    t.integer  "review_id"
    t.boolean  "is_sent",    default: false
    t.boolean  "is_liked",   default: true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["review_id"], name: "index_votes_on_review_id", using: :btree
  add_index "votes", ["user_id", "review_id"], name: "index_votes_on_user_id_and_review_id", unique: true, using: :btree
  add_index "votes", ["user_id"], name: "index_votes_on_user_id", using: :btree

end
