import { addEdge, Background, Connection, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback, useState } from "react";
import '@xyflow/react/dist/style.css';
import NodeComp from "./NodeComp";
import BigNodeComp from "./BigNodeComp";
import PDFNode from "./PdfNode"
// import { initialEdges, initialNodes } from "./workflow.constants";

import { Edge, Node } from "@xyflow/react";
import PdfNodeComp from "./PdfNodeComp";
import SoundNode from "./SoundNode";
import ChatNode from "./ChatNodeNew";

const initialEdges: Edge[] = [];

const initialNodes: Node[] = [
    // {
    //     id: "",
    //     position: { x: 0, y: 0},
    //     data: {},
    //     type: "nodeComp",
    //     hidden: true,
    // }, 
    // {
    //     id: `bignode`,
    //     data: {},
    //     type: "bigNodeComp",
    //     position: { x: 0, y: 100 },
    //     hidden: false
    // }
];

export default function Workflow() {
    const [nodeName, setNodeName] = useState("");

    const [nodes, setNodes, onNodeChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgeChange] = useEdgesState(initialEdges);

    //node cordinates


    const onConnect = useCallback((connection: Connection) => {
        const edge = { ...connection, animated: true, id: `${edges.length + 1}`, };
        //@ts-ignore
        setEdges((prevEdges) => addEdge(edge, prevEdges));
    }, [setEdges])

    const nodeTypes = {
        'nodeComp': NodeComp,
        'bigNodeComp': ChatNode,
        'pdfNode': PDFNode,
        "soundNode": SoundNode
    }

    return (
        <div className="flex justify-center py-[80px] px-[12px] gap-8 bg-slate-900 h-screen flex-wrap lg:flex-nowrap">
            <div className="bg-slate-700 p-5 rounded-sm w-[350px]">
                <div className="flex flex-col pt-2 gap-2">
                    {/* <div className="flex flex-col gap-2 border-[1px] rounded-sm p-3">
                        <input type="text" className="rounded-sm p-1 text-slate-900 bg-white" placeholder="enter node name" onChange={(e) => setNodeName(e.target.value)} />

                        <button className="bg-blue-600 rounded-sm p-1" onClick={() => {
                            const xCordinates = Math.random() * 300;
                            const yCordinates = Math.random() * 600;
                            setNodes((prevNodes) => [...prevNodes, {
                                id: `${prevNodes.length + 1}`,
                                data: { name: nodeName },
                                type: "nodeComp",
                                position: { x: xCordinates, y: yCordinates },
                                hidden: false
                            }])
                            setEdges((prevEdges) => [...prevEdges, {
                                id: `${prevEdges.length + 1}`,
                                source: `${nodes.length + 1}`,
                                target: 'bignode',
                                animated: true
                            }])
                        }}>Add Node</button>
                    </div> */}

                    <button className="bg-blue-700 rounded-sm p-1 mt-3" onClick={() => {
                        const xCordinates = Math.random() * 800;
                        const yCordinates = Math.random() * 600;
                        setNodes((prevNodes) => [...prevNodes, {
                            id: `bignode`,
                            data: {},
                            type: "bigNodeComp",
                            position: { x: xCordinates, y: yCordinates },
                            hidden: false
                        }])
                    }}>Add Chat Node</button>

                    <button className="bg-blue-700 rounded-sm p-1 mt-3" onClick={() => {
                        const xCordinates = Math.random() * 800;
                        const yCordinates = Math.random() * 600;
                        setNodes((prevNodes) => [...prevNodes, {
                            id: `soundNode`,
                            data: {},
                            type: "soundNode",
                            position: { x: xCordinates, y: yCordinates },
                            hidden: false
                        }])
                    }}>Audio Node</button>

                    <button className="bg-blue-700 rounded-sm p-1 mt-3" onClick={() => {
                        const xCordinates = Math.random() * 800;
                        const yCordinates = Math.random() * 600;
                        setNodes((prevNodes) => [...prevNodes, {
                            id: `pdfNode`,
                            data: {},
                            type: "pdfNode",
                            position: { x: xCordinates, y: yCordinates },
                            hidden: false
                        }])
                    }}>Document Node</button>
                </div>
            </div>
            <div className="h-[720px] w-[1480px] bg-slate-100 text-black">
                <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodeChange} onEdgesChange={onEdgeChange} onConnect={onConnect} nodeTypes={nodeTypes}>
                    <Controls />
                    <MiniMap />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    )
}