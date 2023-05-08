# Vue build
--------------------
## Step
```shell
1. docker build -t buildvue .  #6mins
can use [ --progress plain ] to see detail

2. docker run --name buildvue buildvue

3. docker cp buildvue:app/CodingForum_web/dist ./dist && cp .htaccess ./dist

4. enjoy

```
