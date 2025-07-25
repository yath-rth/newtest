import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

interface DocxNodeProps {
  data?: any; // Using any to bypass type checks for the data prop
}

interface ApiResponse {
  text: string;
  [key: string]: any; // Allow for any additional properties
}

const handleStyle = { left: 10 };

function SoundNode({ data }: DocxNodeProps) {
    const [file, setFile] = useState<File | null>(null);
    const [finalData, setData] = useState<any>(''); // Using any to bypass type checks
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Using non-null assertion operator (!) to bypass null check
        setFile(event.target.files![0]);
    };

    useEffect(() => {
        localStorage.setItem("docx", "");
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        // Using type assertion to bypass null check
        const userId = localStorage.getItem("pid");
        formData.append('file', file as File);
        formData.append('user', String(userId));

        fetch('https://veer.echoblock.online/rag/transcribe_audio/', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((data: ApiResponse) => {
                setData(data);
                setLoading(false);
                localStorage.setItem("docx", data.text);
            })
            .catch((error: any) => { // Using any for error type
                setLoading(false);
                console.error('Error:', error);
            });
    };

    return (
        <>
            {/* <Handle type="target" position={Position.Top} /> */}
            <div style={{ border: "2px solid grey", width: 500, padding: "15px", borderRadius: "15px", minHeight: "60px" }}>
                <label htmlFor="file-input">Select a sound file:</label>
                <input 
                    type="file"
                    id="file-input"
                    onChange={handleFileChange} 
                />
                <br />
                <button onClick={handleSubmit}>{loading ? 'loading..' : 'Submit'}</button>
            </div>
            <Handle 
                type="source" 
                position={Position.Right} 
                id="right" 
                style={{ top: 60 }} 
            />
            {/* <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            /> */}
        </>
    );
}

export default SoundNode;