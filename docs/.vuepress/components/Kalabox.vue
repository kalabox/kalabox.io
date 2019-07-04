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
          <a
            class="btn btn-large"
            :href="option.actionLink">{{option.actionText}}
          </a>
        </div>
      </div>
    </header>

    <main class="home" aria-labelledby="main-title">
      <div
        class="thanks">
        <div class="thanks-item thanks-message">
          <p>Kalabox and Lando are open-source projects developed by Tandem, a software strategy company that gets your stuff done.</p>
          <p>It is also made posssible with generous contributions from our Kickstarter backers, Pantheon, and countless other individuals.</p>
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
          stuffwefwefwefwefwefweffwfwfwefwefwefewweffwefewwefwefw
        </div>
        <div class="footer-col footer-col2">
          COLUMN 1 - Resources
          GitHub
          Kalabox Docs
          Pantheon Docs
          Community Support
          Downloads?wefwefwefwefwefwefwefwefwefwefwefwefwefwefwefwef
          Kickstarterfwefwefwefwef
        </div>
        <div class="footer-col footer-col3">
          COLUMN 2 - Services
          TANDEM STUFFwefwefwefwefwefwefwefwewefwefwefwefwefwefwefwef
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
  white-space: nowrap;
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

@media (max-width: 967px) {
  .footer .footer-col {
    max-width: 100%;
  }
}
</style>
