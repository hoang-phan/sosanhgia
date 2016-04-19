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

ActiveRecord::Schema.define(version: 20160415015924) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "areas", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "areas", ["name"], name: "index_areas_on_name", using: :btree

  create_table "competitors", force: :cascade do |t|
    t.string   "name"
    t.string   "base_link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "competitors", ["name"], name: "index_competitors_on_name", using: :btree

  create_table "hotel_links", force: :cascade do |t|
    t.integer  "competitor_id"
    t.integer  "hotel_id"
    t.string   "link"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "hotel_links", ["competitor_id"], name: "index_hotel_links_on_competitor_id", using: :btree
  add_index "hotel_links", ["hotel_id"], name: "index_hotel_links_on_hotel_id", using: :btree

  create_table "hotels", force: :cascade do |t|
    t.string   "name"
    t.integer  "area_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "hotels", ["area_id"], name: "index_hotels_on_area_id", using: :btree
  add_index "hotels", ["name"], name: "index_hotels_on_name", using: :btree

  add_foreign_key "hotel_links", "competitors", on_delete: :cascade
  add_foreign_key "hotel_links", "hotels", on_delete: :cascade
  add_foreign_key "hotels", "areas", on_delete: :cascade
end
