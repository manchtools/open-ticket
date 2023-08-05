#!/bin/sh

./pocketbase serve --http $PUBLIC_POCKETBASE_ENDPOINT:$PUBLIC_POCKETBASE_PORT &
sleep 4
kill $(pidof pocketbase)
./pocketbase admin create $PRIVATE_POCKETBASE_ADMIN $PRIVATE_POCKETBASE_PASSWORD
./pocketbase serve --http $PUBLIC_POCKETBASE_ENDPOINT:$PUBLIC_POCKETBASE_PORT
