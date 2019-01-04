# tag-network

## Requirements
* sh or bash
* docker
* docker-compose

## Installation
Add the following lines to you hosts file:
```
127.0.0.1 demo-frontend.test tag-api.test
```
These entries should point to the IP address of your docker host. That is in most cases your local computer.

To install this app, you need to run `sh setup/setup.sh` and `docker-compose up`.

The api is available at [http://localhost](http://localhost).

The demo frontend is available at [http://localhost:3001](http://localhost:3001) in dev.
