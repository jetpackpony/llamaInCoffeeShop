#!/bin/bash
cd www/sound
rm sound.json sound.mp3 sound.ogg
audiosprite -f "howler" -o "sound" -e "mp3,ogg" --loop="bgMusic" --path="sound" *.mp3
