import { Handle, Position, useReactFlow } from "@xyflow/react";

export default function NodeComp({ data, id }: any) {
    const {setNodes} = useReactFlow();
    return (
        <div className="bg-slate-200 px-3 p-1 border-[1px] border-black rounded-sm">
            <div className="flex gap-3">
                <p>{data.name}</p>
                <button className="text-red-600 hover:text-red-500" onClick={() => {
                    setNodes(prevNodes => prevNodes.filter((node) => node.id !== id))
                }}>x</button>
            </div>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}