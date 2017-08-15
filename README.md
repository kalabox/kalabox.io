kalabox.io
==========

Development
-----------

```bash
# Clone the site
git clone git@github.com:kalabox/kalabox.io.git kalaboxio
cd kalaboxio

# Boot up with lando
# NOTE: order is weird here because of bower
lando npm install
lando start
lando bower install
lando gulp build
```

### Nimble integration

You MAY need to reactivate the Nimble integration (and will certainly want to do
this on your local environment for testing):

1.  Got to /nimble-crm/authorization and enter in creds when asked.
2.  This will redirect to /nimble-crm/authorized. IF you are on local, you'll probably need to copy the parameters provided and manually redirect yourself to your localhost domain.

Test
----

```bash
lando gulp test
```

Deploy
------

Using [GitHub Flow](https://guides.github.com/introduction/flow/) push a branch to this project and open a pull request. If tests pass and the pull request is accepted the change is automatically deployed.

```bash
git checkout -b ISSUESNUMBER-ISSUEDESCRIPITON
git add -A
git commit -m "#ISSUENUMBER: COMMIT DESCRIPTION"
git push origin ISSUESNUMBER-ISSUEDESCRIPITON
```
