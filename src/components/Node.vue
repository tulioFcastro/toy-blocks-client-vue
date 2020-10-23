<template>
  <v-expansion-panel
    >
      <v-expansion-panel-header>
        <div class="accordion-header">
          <div class="accordion-sub-header">
            {{node.name}}
            <v-badge
              class="accordion-badge"
              left
              bordered
              dot
              inline
              :color="getColor"
            >
            <span>Online</span>
            </v-badge> 
          </div>
          <span class="accordion-header-url">{{node.url}}</span>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <!-- some content -->
      </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
  name: 'node',
  props: {
    node: {
      url: String,
      online: Boolean,
      name: String,
      loading: Boolean,
    },
    expanded: Boolean,
    toggleNodeExpanded: Function,
  },
  data: () => ({
  }),
  computed: {
    getColor() {
      let badgeColor = 'red';
      if(this.node.online) {
        badgeColor = "green";
      }
      return badgeColor;
    }
  }
}
</script>
<style scoped>
.pull-left {
  justify-content: flex-start;
}
.accordion-badge {
  margin-left: auto;
  margin-right: 12px;
  margin-top: 14px;
}
.accordion-sub-header {
  display: flex;
}
.accordion-header {
  display: flex;
  flex-direction: column;
}
.accordion-header-url {
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
  color: #263238;
  opacity: 0.54;
}
</style>