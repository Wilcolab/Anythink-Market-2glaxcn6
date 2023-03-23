# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# Adding 100 users
100.times do
    rand_part = Random.hex[0..10]
    user = User.create!(
        email: Faker::Internet.email,
        password: 'password',
        username: "user#{rand_part}"
    )
end

# Adding 100 items that are being sold by existing users
100.times do
    user = User.order("RANDOM()").first # Get a random user
    item = Item.create!(
        title: Faker::Commerce.product_name,
        description: Faker::Lorem.sentence,
        user: user
    )
end

# Adding 100 comments that are written about these existing items
100.times do
    user = User.order("RANDOM()").first # Get a random user
    item = Item.order("RANDOM()").first # Get a random item
    comment = Comment.create!(
        user: user,
        item: item,
        body: Faker::Lorem.sentence
    )
end