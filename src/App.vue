<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import Icon from '@/components/Icon.vue'

import DeviceNode from '@/components/Nodes/DeviceNode.vue'
import InterfaceNode from '@/components/Nodes/InterfaceNode.vue'

const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()
import { onMounted } from 'vue'

import {useNodeStore} from '@/Pinia/NodeStore.js'


const nodeStore = useNodeStore()

onMounted( async () => {
  await nodeStore.calculateLayout()

})



const nodes = ref([
  {
    id: '1',
    type: 'interface',
    data: { name: "WAN" },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'device',
    data: { name: "ksb" },
    position: { x: 0, y: 150 },
  },
  {
    id: '3',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
])

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },
])


const dark = ref(false)

onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

onConnect((connection) => {
  addEdges(connection)
})

function updatePos() {

}
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
  dark.value = !dark.value
}
</script>

<template>

  <VueFlow
      :nodes="nodeStore.layoutedNodes"
      :edges="nodeStore.edges"
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
</template>
