# Kalabox Site

## Local Development

### Installing

Local development requires [Lando](https://docs.lndo.io).

```bash
# Clone the site
git clone git@github.com:kalabox/kalabox.io.git
cd kalabox.io
lando start
```

### Known Issues

* If you are getting a WSOD while trying to load the site in Lando check out [this issue](https://github.com/thinktandem/tandem/issues/15).

### Structure

The project follows the [normal Vuepress](https://vuepress.vuejs.org/guide/) structure but the most important things are in the `docs` directory and are non-exhaustively detailed below:

```bash
./
|-- docs
  |-- .vuepress
    |-- components
      |-- Kalabox.vue                 This is basically all you need
    |-- public
      |-- styles
        |-- overrides.css             You can put site-wide css overrides here
    |- styles
      |-- pallete.styl                Stylus constant overrides
      |-- index.styl                  Extra styles
    |-- config.js                     Vuepress config file
    |-- enhanceApp.js                 App level customization
  |-- README.md                       This contains metadata for Kalabox.vue
```

### Testing

```bash
lando lint
lando test
```

## Deploying

Using [GitHub Flow](https://guides.github.com/introduction/flow/) push a branch to this project and open a pull request. If tests pass and the pull request is accepted the change is automatically deployed.

```bash
git checkout -b ISSUESNUMBER-ISSUEDESCRIPITON
git add -A
git commit -m "#ISSUENUMBER: COMMIT DESCRIPTION"
lando push origin ISSUESNUMBER-ISSUEDESCRIPITON
```
