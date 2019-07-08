<template>
  <div>
    <header class="hero kalabox-background">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'">

      <h1 class="hide" v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>

      <p class="tagline">
        {{ data.heroTagline }}
      </p>
      <p class="byline">
        {{ data.heroByline }}
      </p>
      <p class="call">
        {{ data.heroCall }}
      </p>

      <div
        class="options"
        v-if="data.options && data.options.length">
        <div
          class="option"
          v-for="(option, index) in data.options"
          :key="index">
          <h2>{{ option.title }}</h2>
          <p>{{ option.details }}</p>
          <a :href="option.actionLink">
            <div class="btn btn-large">{{option.actionText}}</div>
          </a>
        </div>
      </div>
    </header>

    <main class="home" aria-labelledby="main-title">
      <div
        class="thanks">
        <div class="thanks-item thanks-message">
          <h3>A brief history of Kalabox</h3>
          <p>
            When we started the Kalabox project in 2012 with <a href="https://github.com/kalamuna/kalaboxv1">Kalabox 1.0</a> we were just trying to solve local development for our own Drupal team.
          </p>

          <p>
            However, other people liked it too! So we decided to take things to the next level by launching a <a href="https://www.kickstarter.com/projects/kalabox/kalabox-advanced-web-tools-for-the-people">Kickstarter</a> campaign. The culmination of that effort, after much blood, sweat, whiskey and tears was <a href="https://github.com/kalabox/kalabox">Kalabox 2.0.</a>
          </p>

          <p>
            <em>Building it was a massive undertaking and we <a href="https://thinktandem.io/blog/2017/10/24/journey-to-lando-mistakes-pivots-and-vindication/">learned a ton.</a></em>
          </p>

          <p>
            Over the last year or so we've channeled those trials, tribulations and lessons into <a href="https://deviwthlando.io">Lando.</a> Not only is it the <em>only</em> dev tool you need for all your projects it is also the culimination of almost 8 years of experience making these kinds of things. We hope you like it and that it was worth the wait :)
          </p>

          <p>We'd also like to thank all the organizations, agencies and people who contributed to Kalabox and by extension Lando.</p>

          <p><strong>We could not have done it without you!</strong></p>
        </div>
        <div class="thanks-item thanks-sponsors">
          <div
            class="thanks-sponsor"
            v-for="(sponsor, index) in data.sponsors"
            :key="index">
            <a
              :href="sponsor.src">
              <img
              v-if="sponsor.title"
              :src="$withBase(sponsor.img)"
              :alt="sponsor.title">
            </a>
          </div>
        </div>
      </div>

      <div
        class="something-cute">
      </div>
    </main>

    <div
      class="footer"
      v-if="data.footer">
      <div class="footer-cols"s>
        <div class="footer-col footer-col1">
          <img class="footer-logo" src="/img/kalabox-white-name.png">
        </div>
        <div class="footer-col footer-col2">
          <h2>Resources</h2>
          <a
            class="footer-link" href="https://github.com/kalabox/kalabox">
            GitHub
          </a>
          <a
            class="footer-link" href="https://github.com/kalabox/kalabox/tree/v2.1/docs">
            Kalabox Docs
          </a>
          <a
            class="footer-link" href="https://github.com/kalabox/kalabox-app-pantheon/tree/v2.1/docs">
            Pantheon Docs
          </a>
          <a
            class="footer-link" href="https://launchpass.com/devwithlando">
            Community Support
          </a>
          <a
            class="footer-link" href="https://www.kickstarter.com/projects/kalabox/kalabox-advanced-web-tools-for-the-people">
            Kickstarter
          </a>
        </div>
        <div class="footer-col footer-col3">
          <h2>Services</h2>
          <a
            class="footer-link" href="https://thinktandem.io/contact/">
            Kalabox Migrations
          </a>
          <a
            class="footer-link" href="https://thinktandem.io/services/devops/">
            DevOps Help
          </a>
          <a
            class="footer-link" href="https://thinktandem.io/services/development/">
            Development Services
          </a>
          <a
            class="footer-link" href="https://thinktandem.io/services/training/">
            Workflow Trainings
          </a>
          <a
            class="footer-link" href="https://thinktandem.io/services/support/">
            Application Support
          </a>
        </div>
      </div>
      <div class="footer-copyright">
        {{ data.footer }}
      </div>
    </div>
  </div>
</template>

<script>

export default {

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="css">
.kalabox-background {
  background: #4CB8C4;
  background: linear-gradient(to left,#4CB8C4,#3CD3AD);
  background-position: center top;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.hide {
  display: none;
}

header.hero {
  text-align: center;
  padding: 3.6rem 2rem;
}

header img {
  display: block;
  margin: 3rem auto 1.5rem;
}

@media (max-width: 419px) {
  header img {
    max-height: 210px;
    margin: 2rem auto 1.2rem;
  }
}

.hero .options {
  padding: 3.6rem 2rem 0;
  max-width: 960px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.hero .option {
  padding: 2rem 2rem;
  border: 4px white solid;
  flex-grow: 1;
  flex-basis: 40%;
  max-width: 40%;
  text-align: center;
}

@media (max-width: 570px) {
  .hero .options {
    padding: 0;
    margin: 1rem auto 1.2rem;
  }
  .hero .option .btn {
    max-width: 75%;
  }
}

.hero .option h2 {
  font-size: 2.4rem;
  font-weight: 500;
  padding-bottom: .5rem;
  border-bottom: 0px;
  color: #fff;
  margin-bottom: -5px;
}

.hero .option p {
  color: #efefef;
  font-size: 1.4rem;
}

.hero .tagline {
  color: #fff;
  font-size: 2.2rem;
  padding: 0;
  margin: 0;
  opacity: .75;
}

.hero .byline {
  color: #fff;
  opacity: .86;
  font-size: 2.0rem;
  font-weight: 600;
  padding: 0;
  line-height: 1;
}

.hero .call {
  color: #fff;
  font-weight: 800;
  font-size: 3.0rem;
  margin: 1.8rem auto;
}

.btn {
  background-color: #d9534f;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 0;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 6px 12px;
  line-height: 1.42857;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.btn:hover {
  background-color: #d64742;
}

.btn-large {
  padding: 12px 24px;
  width: 90%;
}

@media (max-width: 967px) {
  .hero .option {
    max-width: 100%;
    margin-bottom: 2rem;
  }
}

.thanks {
  text-align: justify;
  line-height: 1.4rem;
  padding: 0 1rem 3.6rem 0;
  max-width: 960px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.thanks .thanks-message {
  flex-grow: 1;
  flex-basis: 50%;
  max-width: 50%;
  font-size: 24px;
  font-weight: 300;
}

.thanks .thanks-sponsors {
  flex-grow: 1;
  flex-basis: 50%;
  max-width: 50%;
  text-align: center;
}

.thanks .thanks-sponsor {
  padding: 2.0rem;
}

.thanks .thanks-sponsor img {
  width: 300px;
}

@media (max-width: 967px) {
  .thanks .thanks-message {
    max-width: 100%;
  }
  .thanks .thanks-sponsor img {
    width: 500px;
  }
}

@media (max-width: 967px) {
  .thanks .thanks-message {
    max-width: 100%;
  }
  .thanks .thanks-sponsor img {
    width: 250px;
  }
}

@media (max-width: 967px) {
  .thanks .thanks-sponsors {
    max-width: 100%;
  }
}

.footer {
  color: #fff;
  text-align: center;
  padding: 3.6rem 2rem 3.6rem;
  background-color: #34495e;
}

.footer a {
  color: #fff;
  display: block;
}

.footer a:hover {
  text-decoration: underline;
}

.footer .footer-cols {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.footer .footer-col {
  flex-grow: 1;
  flex-basis: 33%;
  max-width: 33%;
}

.footer .footer-col h2 {
  font-size: 1.65rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
  margin-right: 60%;
}

.footer .footer-col2, .footer-col3  {
  text-align: left;
}

.footer .footer-copyright {
  border-top: 1px solid #eaecef;
  color: #fff;
  text-align: center;
  opacity: .75;
  margin: 2em 4rem;
  padding: 2em 4rem;
  margin-bottom: 0;
  padding-bottom: 0;
}

@media (max-width: 967px) {
  .footer .footer-cols {
    display: block;
  }
  .footer .footer-col {
    max-width: 100%;
  }
}
</style>
