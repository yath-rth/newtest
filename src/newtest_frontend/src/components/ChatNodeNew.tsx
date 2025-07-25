import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Button, Card } from 'antd';

interface ChatNodeProps {
  data?: any; // Using any to bypass type checks
}

interface ChatItem {
  message: string;
  type: string;
}

const handleStyle = { left: 10 };

function ChatNode({ data }: ChatNodeProps) {
  const [first, setfirst] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setfirst(evt.target.value);
  }, []);
  
  const onSend = () => {
  

    setChatHistory([...chatHistory, { message: first, type: "sent" }]);

    const userId = localStorage.getItem("pid");

    fetch('https://veer.echoblock.online/rag/chat/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
          },
          body: JSON.stringify({question:first,user:userId})
    })
        .then(response => response.json())
        .then((data: any) => {
            console.log("data",data)
            setChatHistory([...chatHistory, { message: data?.answer, type: "sent-not" }]);
        })
        .catch((error: any) => { // Using any for error type

            console.error('Error:', error);
        });
    setfirst('');
  }
  
  return (
    <>
      {/* <Handle type="target" position={Position.Top} /> */}
      <Card title="Ask me anything" bordered={false} style={{ width: 300 }}>
        <div>
          {chatHistory.length > 0 && chatHistory.map((item: any, index: number) => (
            <div 
              key={index} 
              style={{ 
                border: item.type == "sent" ? "" : "2px solid lightgrey", 
                background: item.type == "sent" ? "lightblue" : "", 
                color: item.type == "sent" ? "white" : "", 
                display: "inline-block", 
                padding: "5px", 
                borderRadius: "10px", 
                marginLeft: item.type == "sent" ? "130px" : "" 
              }}
            >
              {item.message}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <input 
            id="text" 
            name="text" 
            value={first} 
            style={{ 
              border: "2px solid lightgrey", 
              width: "100%", 
              height: "30px", 
              borderRadius: "10px" 
            }} 
            onChange={onChange} 
            className="nodrag" 
          />
          <Button onClick={onSend}>send</Button>
        </div>
      </Card>
      <Handle type="target" position={Position.Left} id="sdfsdf" style={{ top: 50 }} />
      <Handle type="target" position={Position.Left} id="asdfsdf" style={{ top: 80 }} />
      <Handle type="target" position={Position.Left} id="l;kjsdfasdf" style={{ top: 110 }} />
      <Handle type="target" position={Position.Left} id="asdflkjl;" style={{ top: 150 }} />
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      /> */}
    </>
  );
}

export default ChatNode;