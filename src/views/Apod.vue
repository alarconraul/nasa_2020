<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col md="6">
          <v-card
            v-if="apod.media_type != 'video'"
            class="mx-auto"
            max-width="600"
          >
            <v-img :src="apod.url" height="400px" class="white--text align-end">
              <v-card-title>{{ apod.title }}</v-card-title>
              <v-overlay :absolute="true" :value="isLoading">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
            </v-img>
            <v-card-text class="text--primary">
              <div>{{ apod.explanation }}</div>
            </v-card-text>
          </v-card>

          <iframe
            v-if="apod.media_type == 'video'"
            width="560"
            height="315"
            :src="apod.url"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
        <v-col md="4" class="mx-auto">
          <v-date-picker @click:date="getApod" v-model="picker"></v-date-picker>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    ...mapState(["apod", "isLoading"]),
  },
  methods: {
    ...mapActions(["getApod"]),
    queryApod() {
      this.getApod(this.picker);
    },
  },
  created() {
    if (!this.apod.url) {
      this.getApod(this.picker);
    }
  },
};
</script>
