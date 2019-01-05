#!/usr/bin/env bash

if [  -f /run/secrets/mongodb/password ] && [  -f /run/secrets/mongodb/username ]; then
    USER=$(</run/secrets/mongodb/username)
    USER_PASSWD=$(</run/secrets/mongodb/password)
else
    USER=admin
    USER_PASSWD=secret
fi

mongo admin --eval "db.createUser({user: '$USER', pwd: '$USER_PASSWD', roles: [ 'dbAdmin' ] } );"
mongo tag_network --eval "db"
mongo tag_network --eval "db.createUser({user: '$USER', pwd: '$USER_PASSWD', roles: [ 'dbAdmin' ] } );"
