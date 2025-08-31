import {defineStore} from "pinia";
import { ref } from 'vue'

import * as d3 from "d3";


export const useNodeD3ForceStore = defineStore('nodeStoreD3Force', () => {

    const simulationEnded = ref(false)
    const simulationProgress = ref(0.0)

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

    const width = 928;
    const height = 50;

    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked)
        .on("end", () => {
            simulationEnded.value = true
            console.log("Симуляция завершена!");
        });;

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

        const alpha = simulation.alpha();
        simulationProgress.value = (1 - (alpha - simulation.alphaMin()) / (1 - simulation.alphaMin())) * 100
    }



    return {
        nodes,
        simulationProgress,
        links,
        simulationEnded,
        svg
    }
})
