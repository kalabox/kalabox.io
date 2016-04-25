# kalabox.io

Right now this is a hot-mess which is gaining some order.

We're using...

- Express to server files
- Twig as templating engine
- SASS as css precompiler
- Gulp to concat/minify

To run...
1. Clone repo
2. npm install && bower install
3. npm start


To deploy...
1. Build the image

```
docker build -t reynoldsalec/kalabox.io .
```

2. Push to Docker Hub

```
docker push reynoldsalec/kalabox.io
```

3. Log in to Docker Cloud and redeploy the kalaboxio containers.

To test locally...

```
docker run -p 8080:80 reynoldsalec/kalabox.io
```


