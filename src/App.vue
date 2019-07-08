<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>C#</span>
        <span class="font-weight-light">dll loader</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/loopsdteam/csharp-dll-loader"
        target="_blank"
      >
        <v-icon>exit_to_app</v-icon> &nbsp;
        <span class="mr-2">github</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
