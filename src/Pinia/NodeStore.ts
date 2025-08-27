


import { defineStore } from 'pinia'
import { ref, toRaw  } from 'vue'
import ELK from "elkjs/lib/elk.bundled.js";


export const useNodeStore = defineStore('nodeStore', () =>{


    const nodes = ref([
        {
          id: '1',
          type: 'interface',
          data: { name: "bbbb" }
        },
        {
            id: '2',
            type: 'device',
            data: { name: "аааа" },
        },
        {
            id: '3',
            type: 'device',
            data: { name: "АААА" },
        },
    ])

    for (let i = 4 ; i< 65; i++) {
        nodes.value.push(
            {
                id: i.toString(),
                type: 'device',
                data: { name: "АААА" }
            }
        )
    }

    const edges = ref([
        {
            id: '2->1',
            source: '1',
            target: '2',
        },
        {
            id: '3->2',
            source: '2',
            target: '3',
        },
    ])

    for (let i = 4 ; i< 65; i++) {
        edges.value.push(
            {
                id: i.toString() + "->1",
                source: i.toString(),
                target: '1',
            }
        )
    }


    const elk = new ELK();

    const graph = {
        id: "root",
        layoutOptions: {
            "elk.algorithm": "radial"
        },
        children: nodes.value.map(n => ({
            id: n.id,
            width: 120,
            height: 60,
            data: n.data
        })),
        edges: edges.value.map(e => ({
            id: e.id,
            sources: [e.source],
            targets: [e.target]
        }))
    };
    const layoutedNodes = ref<any[]>([])

    async function calculateLayout() {
        const graph = {
            id: 'root',
            layoutOptions: { 'elk.algorithm': 'radial' },
            children: nodes.value.map(n => ({
                id: n.id, width: 120, height: 60, data: n.data,
            })),
            edges: edges.value.map(e => ({
                id: e.id, sources: [e.source], targets: [e.target],
            })),
        }

        const layout = await elk.layout(graph)

        layoutedNodes.value = (layout.children ?? []).map((n: any) => ({
            id: n.id,
            position: { x: n.x ?? 0, y: n.y ?? 0 },
            data: n.data,
        }))
    }


    return {
        layoutedNodes,
        edges,
        calculateLayout
    }
})