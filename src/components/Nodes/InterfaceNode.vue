<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const { updateNodeData, getConnectedEdges } = useVueFlow()


</script>

<template>
  <div class="nodeCard">

    <!--    <template #header>-->
    <p class="font-mono text-xs">{{ data?.name }}</p>
    <!--    </template>-->


    <Handle id="a" type="target" :position="Position.Bottom" />
  </div>

</template>

<style scoped>

  .nodeCard {
    min-width: 100px;
    padding: 10px;
    background: #fff;
    border: 0.1rem black solid;
    border-radius: 3px;
  }

</style>