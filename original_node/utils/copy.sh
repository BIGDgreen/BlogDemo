#!/bin/sh
cd /Projects/node/blog_demo/original_node/logs
cp access.log $(date + %Y-%m-%d).access.log
echo "" > access.log