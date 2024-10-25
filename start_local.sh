#!/bin/bash

docker-compose up -d


# sleep 2 # maybe need this if pinecone takes a while to be usable

npm run build

echo $'\n-----------'

node local.js