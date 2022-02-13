export NODE_ENV='development'
export NODE_PATH=$DIR/src

export AWS_S3_ACCESS_KEY_ID='AKIAJSTO4FZXZHQCHZ6Q'
export AWS_S3_SECRET_ACCESS_KEY='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'
export AWS_S3_BUCKET='lections-bucket'
export JWT_TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZvdmsiLCJ1c2VySWQiOiIxIiwiaWF0IjoxNjQzOTI3MDM5fQ.-EYGtyyFZgG-Zu2o6O6rMx_HDqcF7Sohn3HdfhaFlNI'

docker-compose -f etc/docker/docker-compose.yml up --build -d
nodemon src/backend/server/index.js
