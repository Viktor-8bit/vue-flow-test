<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import Icon from '@/components/Icon.vue'

import DeviceNode from '@/components/Nodes/DeviceNode.vue'
import InterfaceNode from '@/components/Nodes/InterfaceNode.vue'

const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()

import * as d3 from "d3";

import { useNodeD3ForceStore } from '@/Pinia/NodeStoreNextGet.js'
const node3DForce = useNodeD3ForceStore()


// const nodes = ref([
//   {
//     id: '1',
//     type: 'interface',
//     data: { name: "WAN" },
//     position: { x: 0, y: 50 },
//   },
//   {
//     id: '2',
//     type: 'device',
//     data: { name: "ksb" },
//     position: { x: 0, y: 150 },
//   },
//   {
//     id: '3',
//     position: { x: 100, y: 100 },
//     data: { label: 'Node 2' },
//   },
// ])
//
// const edges = ref([
//   {
//     id: 'e1->2',
//     source: '1',
//     target: '2',
//   },
// ])


const dark = ref(false)

onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}


const nodesUpdated = (nodes) => {

  if (nodes === undefined) { return [] }

  const newNodes = ref(Array())

  nodes.forEach((nod) => {
    newNodes.value.push({
          id: nod.id,
          type: 'device',
          data: { name: "аааа" },
          position: { x: nod.x * 8, y: nod.y * 8 },
        }
    )
  })

  return newNodes.value
}

const edgesUpdated = (links) => {

  if (links === undefined) { return [] }

  const edges = ref(Array())

  links.forEach((edg) => {
    edges.value.push({
      id: edg.id,
      source: edg.source.id,
      target: edg.target.id,
    })
  })

  return edges.value
}




function toggleDarkMode() {
  dark.value = !dark.value
}

onMounted(() => {

  let nodes = [
    {
      id: "Myriel",
      group: 1,
      type: "device"
    },
    {
      id: "Napoleon",
      group: 1,
      type: "device"
    },
    {
      id: "Mlle.Baptistine",
      group: 1,
      type: "device"
    },
    {
      id: "Gervais",
      group: 1,
      type: "device"
    },
    {
      id: "CountessdeLo",
      group: 1,
      type: "device"
    },
    {
      id: "Geborand",
      group: 1,
      type: "device"
    },
    {
      id: "Champtercier",
      group: 1,
      type: "device"
    },
    {
      id: "Cravatte",
      group: 1,
      type: "device"
    },
    {
      id: "Count",
      group: 1,
      type: "device"
    },
    {
      id: "OldMan",
      group: 1,
      type: "device"
    },
    {
      id: "Labarre",
      group: 2,
      type: "device"
    },
    {
      id: "Valjean",
      group: 2,
      type: "device"
    },
    {
      id: "Marguerite",
      group: 3,
      type: "device"
    },
    {
      id: "Mme.deR",
      group: 2,
      type: "device"
    },
    {
      id: "Mme.Magloire",
      group: 2,
      type: "device"
    },
  ]

  let links = [
    {
      source: "Napoleon",
      target: "Myriel",
      value: 1,
      id: 1
    },
    {
      source: "Mlle.Baptistine",
      target: "Myriel",
      value: 8,
      id: 2
    },
    {
      source: "Mme.Magloire",
      target: "Myriel",
      value: 1,
      id: 3
    },
    {
      source: "Mme.Magloire",
      target: "Mlle.Baptistine",
      value: 6,
      id: 4
    },
    {
      source: "CountessdeLo",
      target: "Myriel",
      value: 1,
      id: 5
    },
    {
      source: "Geborand",
      target: "Myriel",
      value: 1,
      id: 6
    },
    {
      source: "Champtercier",
      target: "Myriel",
      value: 1,
      id: 7
    },
    {
      source: "Cravatte",
      target: "Myriel",
      value: 1,
      id: 8
    },
    {
      source: "Count",
      target: "Myriel",
      value: 2,
      id: 9
    },
    {
      source: "OldMan",
      target: "Myriel",
      value: 1,
      id: 10
    },
    {
      source: "Valjean",
      target: "Labarre",
      value: 1,
      id: 12
    },
    {
      source: "Valjean",
      target: "Mme.Magloire",
      value: 3,
      id: 13
    },
    {
      source: "Valjean",
      target: "Mlle.Baptistine",
      value: 3,
      id: 14
    },
    {
      source: "Valjean",
      target: "Myriel",
      value: 5,
      id: 15
    },
    {
      source: "Marguerite",
      target: "Valjean",
      value: 1,
      id: 16
    },
    {
      source: "Mme.deR",
      target: "Valjean",
      value: 1,
      id: 17
    },
    {
      source: "Mme.deR",
      target: "Valjean",
      value: 1,
      id: 18
    },
    {
      source: "Gervais",
      target: "Valjean",
      value: 1,
      id: 19
    },
    {
      source: "Gervais",
      target: "OldMan",
      value: 4,
      id: 20
    },
    {
      source: "Gervais",
      target: "OldMan",
      value: 4,
      id: 21
    }
  ]

  const width = 1000;
  const height = 1000;

// Specify the color scale.
  const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create a simulation with several forces.
  const simulation = d3.forceSimulation([...nodes])
      .force("link", d3.forceLink([...links]).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

// Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

// Add a line for each link, and a circle for each node.
  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", d => color(d.group));

  node.append("title")
      .text(d => d.id);


// Set the position attributes of links and nodes each time the simulation ticks.
  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  }
  // container.append(svg.node());
})


</script>



<template>

  <div id="container"></div>


  <VueFlow
      :nodes="nodesUpdated(node3DForce.nodes)"
      :edges="edgesUpdated(node3DForce.links)"
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
