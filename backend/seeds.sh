#!/bin/sh

docker exec -it anythink-backend-rails bash -c "backend/bin/rails db:seed"
