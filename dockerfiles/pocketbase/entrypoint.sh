#!/bin/sh
./pocketbase backup
./pocketbase serve --http 0.0.0.0:8090 --automigrate=0 &
sleep 4
kill $(pidof pocketbase)
./pocketbase admin create $PRIVATE_POCKETBASE_ADMIN $PRIVATE_POCKETBASE_PASSWORD
./pocketbase serve --http 0.0.0.0:8090 --automigrate=0
