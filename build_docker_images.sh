#!/bin/bash

cd author-microservice
bash mvnw package -Pprod -DskipTests dockerfile:build
cd ..

cd book-microservice
bash mvnw package -Pprod -DskipTests dockerfile:build 
cd ..

cd book-picture-microservice 
bash mvnw package -Pprod -DskipTests dockerfile:build 
cd ..

cd genre-microservice 
bash mvnw package -Pprod -DskipTests dockerfile:build 
cd ..

cd rating-microservice 
bash mvnw package -Pprod -DskipTests dockerfile:build 
cd ..

cd user-preferences-microservice 
bash mvnw package -Pprod -DskipTests dockerfile:build 
cd ..

cd book-api-gateway
bash mvnw package -Pprod -DskipTests dockerfile:build 
cd ..
