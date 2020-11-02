#!/bin/bash

set -euo pipefail

docker pull jordanribera/maru-api:${BUILDKITE_COMMIT:0:7}
docker tag jordanribera/maru-api:${BUILDKITE_COMMIT:0:7} jordanribera/maru-api:latest
docker push jordanribera/maru-api:latest

docker pull jordanribera/maru-web:${BUILDKITE_COMMIT:0:7}
docker tag jordanribera/maru-web:${BUILDKITE_COMMIT:0:7} jordanribera/maru-web:latest
docker push jordanribera/maru-web:latest
