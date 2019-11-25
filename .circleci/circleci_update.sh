#! /bin/bash

echo ">>> Remove Existing Folder"
if [ -d /usr/share/nginx/dcard_deploy ]; then
    rm -rf /usr/share/nginx/dcard_deploy
fi
if [ -d /usr/share/nginx/dcard_backup ]; then
    rm -rf /usr/share/nginx/dcard_backup
fi

echo ">>> Create Temp Folder if Exists, And backup folder"
mkdir /usr/share/nginx/dcard_deploy

echo ">>> Unzipping files into the folder"
tar -xf dcard-code.tar.gz -C /usr/share/nginx/dcard_deploy

echo ">>> Modify previous code to dcard_backup"
if [ -d /usr/share/nginx/dcard ]; then
    sudo mv /usr/share/nginx/dcard /usr/share/nginx/dcard_backup
fi

echo ">>> Move the new code Over"
sudo mv /usr/share/nginx/dcard_deploy /usr/share/nginx/dcard

cd  /usr/share/nginx/dcard

make reload

# Run Migration
make migrate-prod