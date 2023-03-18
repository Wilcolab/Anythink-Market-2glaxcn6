#!/bin/sh

docker exec -it anythink-backend-rails bash -c "bin/rails db:seed"