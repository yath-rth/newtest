import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

export default function PdfNodeComp() {

    return (
        <div className="bg-slate-200 px-3 p-1 border-[1px] border-black rounded-sm">
            <p className="text-center">Upload Pdf</p>
            <div className="flex gap-2 text-[12px]">
                <button className="bg-blue-500 p-1 rounded-sm">Upload Pdf</button>
            </div>
            <Handle type="target" position={Position.Left} />
        </div>
    )
}