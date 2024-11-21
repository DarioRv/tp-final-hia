#!/bin/bash
while true; do
  TIMESTAMP=$(date +"%Y%m%d%H%M%S")
  echo "Starting backup at $TIMESTAMP"
  mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD -h$MYSQL_HOST $MYSQL_DATABASE > /backups/db_$TIMESTAMP.sql
  echo "Backup completed at $TIMESTAMP"
  sleep 86400 # 24 hs
done
