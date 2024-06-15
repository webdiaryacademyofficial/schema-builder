import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "../TableNode/TableNode";

const initialNodes = [];

const initialEdges = [];
// { id: "e1-2", source: "table_1", target: "table_2" }

const nodeTypes = { tableNode: TableNode };

const Main = () => {
  // React flow fuctionalities
  const [droppedTable, setDroppedTable] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onInit = (instance) => {
    setReactFlowInstance(instance);
  };

  // const onEdgesChange = useCallback(
  //   (changes) => {
  //     setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
  //   },
  //   [setEdges]
  // );


  // Drop functionalities
  const handleDrop = (event) => {
    event.preventDefault();
    const tableData = JSON.parse(event.dataTransfer.getData("table"));
    setDroppedTable(tableData);
    console.log(tableData, "tableData recd on handle drop");

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
      />
    </main>
  );
};

export default Main;
