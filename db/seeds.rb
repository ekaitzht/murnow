# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



 #cities = SkinProblem.create([{ name: 'acne prone' }, { name: 'sensitive' }, { name: 'eczema' }])


ekaitz = User.find_by_email('ekaitz7@gmail.com')
ulaize = User.find_by_email('ulaize@gmail.com')

ekaitz.follow(ulaize)

