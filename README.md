# Vue build
--------------------
## Step
1. docker build -t buildvue .
can use [ --progress plain ] to see detail

2. docker run --name buildvue buildvue

3. docker cp buildvue:app/CodingForum_web/dist ./dist

4. cp .htaccess ./dist