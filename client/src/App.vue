<template>
<div id="app">
  <nav class="navbar is-light has-shadow is-spaced" role="navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <h1 class="title">Tasks Manager</h1>
      </a>

      <a role="button" @click="toggleNavbar"
        :class="[ 'navbar-burger burger', { 'is-active': menuToggled } ]" >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="menu" :class="[ 'navbar-menu', { 'is-active': menuToggled } ]">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
      </div>
    </div>
  </nav>
  <section class="section">
    <router-view />
  </section>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Application extends Vue {
  menuToggled = false;

  toggleNavbar(): void {
    this.menuToggled = !this.menuToggled;
  }
}
</script>
