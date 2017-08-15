kalabox.io
==========

Local Development
-----------------

### Installing

Local development requires [lando](https://docs.lndo.io).

```bash
# Clone the site
git clone git@github.com:kalabox/kalabox.io.git kalaboxio
cd kalaboxio
lando npm install
```

### Configuration

You'll want to drop a `.env` file in the root of this repo with the relevant creds.

```bash
NIMBLE_KEY=SOMEKEY
NIMBLE_SECRET=SOMESECRET
MAILGUN_USER=SOMEUSER
MAILGUN_PASSWORD=SOMEPASSWORD
```

### Nimble Integration

You MAY need to reactivate the Nimble integration (and will certainly want to do this on your local environment for testing). That said this step is not required unless you plan on working on the nimble integration.

1.  Go to `/nimble-crm/authorization` and enter in creds when asked.
2.  This will redirect to `/nimble-crm/authorized`.

**NOTES:**

*   If you are on local, you'll probably need to copy the parameters provided and manually redirect yourself to your localhost domain.
*   You also may need to email nimble to get your local redirect URL whitelisted.

### Running Site Locally

```
# Boot up with lando
# NOTE: order is weird here because of bower
lando start
lando gulp build
lando bower install
```

Testing
-------

```bash
lando gulp test
```

Deploying
---------

Using [GitHub Flow](https://guides.github.com/introduction/flow/) push a branch to this project and open a pull request. If tests pass and the pull request is accepted the change is automatically deployed.

```bash
git checkout -b ISSUESNUMBER-ISSUEDESCRIPITON
git add -A
git commit -m "#ISSUENUMBER: COMMIT DESCRIPTION"
lando push origin ISSUESNUMBER-ISSUEDESCRIPITON
```
