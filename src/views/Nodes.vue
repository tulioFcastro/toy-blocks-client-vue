<template>
  <div class="blocks-wrapper">
    <h1 class="main-title">Nodes</h1>
    <v-row justify="center" class="accordion">
      <v-expansion-panels accordion 
        v-for="(item,i) in getNodes"
        :key="i">
          <node :key="i" :node="{
            name: item.name,
            online: item.online,
            url: item.url,
          }"
          />
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import Node from '../components/Node';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Nodes',
  components: {
    Node,
  },
  data: () => ({
    data: []
  }),
  computed: {
    ...mapGetters(['getNodes']),
    test() {
      return this.$store.getters.getNodes;
    }
  },
  methods: {
    ...mapActions(['getAllNodes']),
  },
  mounted() {
    this.getAllNodes(this.getNodes);
    console.log(this.getNodes);
  },
}
</script>

<style scoped>
  .blocks-wrapper {
    display: flex;
    flex-direction: column;
  }
  .main-title {
    color: #000000;
    font-style: normal;
    font-size: 34px;
    font-weight: bold;
    line-height: 40px;
    letter-spacing: .25px;
    margin-left: 25%;
  }
  .accordion {
    align-self: center;
    width: 50%;
  }
</style>