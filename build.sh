#!/bin/bash

IMG_NAME="td-bot"

docker build -t $IMG_NAME:$(cat version) .
docker build -t $IMG_NAME:latest .