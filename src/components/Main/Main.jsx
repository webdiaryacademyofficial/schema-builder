import { useState, useCallback } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "../TableNode/TableNode";

// Custom node type
const nodeTypes = { tableNode: TableNode };

// Grid configuration
const NODE_WIDTH = 250;
const NODE_HEIGHT = 200;
const GRID_GAP = 20;
const GRID_COLUMNS = 3;

const Main = () => {
  // React flow fuctionalities
  const [droppedTable, setDroppedTable] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onInit = (instance) => {
    setReactFlowInstance(instance);
  };

  // Calculate next avilable position in the grid
  const getNextPosition = () => {
    const gridPositions = new Set(
      nodes.map((node) => `${node.position.x},${node.position.y}`)
    );
    let row = 0;
    let column = 0;

    while (true) {
      const x = column * (NODE_WIDTH + GRID_GAP);
      const y = row * (NODE_HEIGHT + GRID_GAP);
      const posKey = `${x},${y}`;

      if (!gridPositions.has(posKey)) {
        return { x, y };
      }

      column++;
      if (column >= GRID_COLUMNS) {
        column = 0;
        row++;
      }
    }
  };

  // Sidbar to grid : Drop functionalities
  const handleDrop = (event) => {
    event.preventDefault();

    const dragType = JSON.parse(event.dataTransfer.getData("dragType"));
    if (dragType !== "NODE") {
      return;
    }
    const tableData = JSON.parse(event.dataTransfer.getData("table"));

    // Check table node presence in grid
    const isNodeAlreadyAvailable = nodes?.some(
      (node) => node.id === tableData.id
    );
    if (isNodeAlreadyAvailable) {
      alert("Node already added");
      return;
    }
    setDroppedTable(tableData);

    // Get the next available position in the grid
    const position = getNextPosition();

    // Set new table nodes
    setNodes([
      ...nodes,
      {
        id: tableData?.id,
        position: position,
        data: { label: tableData?.name, columns: tableData?.columns },
        type: "tableNode",
      },
    ]);
  };

  // Drag over prevent
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
        zoomOnScroll = {false}
        snapToGrid
      />
    </main>
  );
};

export default Main;
