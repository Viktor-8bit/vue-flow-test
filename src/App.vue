


<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import Icon from '@/components/Icon.vue'

import DeviceNode from '@/components/Nodes/DeviceNode.vue'
import InterfaceNode from '@/components/Nodes/InterfaceNode.vue'

const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()

import * as d3 from "d3";

import { useNodeD3ForceStore } from '@/Pinia/NodeStoreNextGet.ts'
const node3DForce = useNodeD3ForceStore()

const dark = ref(false)

console.log('начало симуляции')

onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})


// const updatedNodes = computed(() => node3DForce?.nodes.map(nod => (
//     {
//       id: nod.id,
//       type: 'device',
//       data: { name: "аааа" },
//       position: { x: nod.x * 8, y: nod.y * 8 }
//     }
// )))

const updatedNodes = ref(node3DForce?.nodes.map(nod => (
    {
      id: nod.id,
      type: 'device',
      data: { name: nod.id },
      position: { x: nod.x * 8, y: nod.y * 8 }
    })))

// эту хрень не трогаем
const updatedEdges = computed(() => node3DForce?.links.map(edg => (
    {
      id: edg.id,
      source: edg.source.id,
      target: edg.target.id,
    }
)))


function toggleDarkMode() {
  dark.value = !dark.value
}

function resetTransform() {
  console.log(updatedNodes.value)
}

onMounted(() => {
})

</script>

<template>

  <div style="" id="container"></div>

  <!--  node3DForce.simulationProgress >= 90 -->
  <!--  node3DForce.simulationEnded -->

    <VueFlow v-if="node3DForce.simulationProgress >= 90"
        :nodes="node3DForce?.nodes.map(nod => (
    {
      id: nod.id,
      type: 'device',
      data: { name: nod.id },
      position: { x: nod.x * 8, y: nod.y * 8 }
    }))"
        :edges="updatedEdges"
        :class="{ dark }"
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
    >

      <template #node-device="props" >
        <DeviceNode :id="props.id" :data="props.data" />
      </template>

      <template #node-interface="props">
        <InterfaceNode :id="props.id" :data="props.data" />
      </template>

      <Background pattern-color="#aaa" :gap="16" />

      <MiniMap />

      <Controls position="top-left">
        <ControlButton title="Reset Transform" @click="resetTransform">
          <Icon name="reset" />
        </ControlButton>

        <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
          <Icon v-if="dark" name="sun" />
          <Icon v-else name="moon" />
        </ControlButton>
      </Controls>

    </VueFlow>
    <UProgress v-else v-model="node3DForce.simulationProgress" />

</template>
