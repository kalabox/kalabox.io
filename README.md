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

To push to production:
1. git remote add production pirog@104.237.158.155:main-site
2. git push production master

This will push code to a bare repo, which in turn deploys it to the webroot. Note you'll need the appropriate ssh key to push the code.

