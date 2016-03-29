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
1. docker build -t reynoldsalec/kalabox.io .
2. docker push reynoldsalec/kalabox.io
3. Log in to docker cloud and redeploy the kalaboxio containers.



