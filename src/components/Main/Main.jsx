import { useState, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "../TableNode/TableNode";

const nodeTypes = { tableNode: TableNode };

const Main = () => {
  // React flow fuctionalities
  const [droppedTable, setDroppedTable] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onInit = (instance) => {
    setReactFlowInstance(instance);
  };

  const isValidConnection = (connection) => connection.target === 'target';

  // Drop functionalities
  const handleDrop = (event) => {
    event.preventDefault();
    const tableData = JSON.parse(event.dataTransfer.getData("table"));
    setDroppedTable(tableData);

    // Calculate table node position
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Set new table nodes
    setNodes([
      ...nodes,
      {
        id: tableData?.id,
        position: { x: position.x, y: position.y },
        data: { label: tableData?.name, columns: tableData?.columns },
        type: "tableNode",
      },
    ]);
  };

  // Drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <main className="main" onDrop={handleDrop} onDragOver={handleDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={onInit}
        snapToGrid
      />
    </main>
  );
};

export default Main;