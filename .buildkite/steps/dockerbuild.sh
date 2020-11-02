#!/bin/bash

set -euo pipefail

COMMIT=`git rev-parse --short HEAD`

docker build ./api -t jordanribera/maru-api:${COMMIT}
docker push jordanribera/maru-api:${COMMIT}

docker build ./web -t jordanribera/maru-web:${COMMIT}
docker push jordanribera/maru-web:${COMMIT}
