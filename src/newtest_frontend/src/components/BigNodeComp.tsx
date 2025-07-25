import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

export default function BigNodeComp() {
    const [input , setInput] = useState("")
    const [vals, setvals] = useState([{
        name: ""
    }]);

    function addVal() {
        setvals([...vals, {
            name: input
        }])
    }

    return (
        <div className="bg-slate-200 px-3 p-1 border-[1px] border-black rounded-sm">
            <p className="text-center">Chat Node</p>
            <div>
                {vals.map((val, index) => {
                    return (
                        <p key={index}>{val.name}</p>
                    )
                })}
            </div>
            <div className="flex gap-2 text-[12px]">
                <input type="text" placeholder="add text" className="rounded-sm p-1 shadow-sm" onChange={(e) => setInput(e.target.value)}></input>
                <button className="bg-blue-500 p-1 rounded-sm" onClick={addVal}>Add text</button>
            </div>
            <Handle type="target" position={Position.Left} />
        </div>
    )
}