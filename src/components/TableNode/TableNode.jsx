import { PiResizeFill } from "react-icons/pi";
import { useReactFlow, NodeResizeControl } from "reactflow";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import TableBodyWrapper from "./TableBodyWrapper";
import TableWrapper from "./TableWrapper";

// eslint-disable-next-line react/prop-types
const TableNode = ({ id, isConnectable, data }) => {
  const reactFlowInstance = useReactFlow();

  // Grid: Table columns drag operations
  const handleDragStart = (event, column, table) => {
    event.dataTransfer.setData("column", JSON.stringify(column));
    event.dataTransfer.setData("table", JSON.stringify(table));
    event.dataTransfer.setData("dragType", JSON.stringify("COLUMN"));
    event.dataTransfer.setData("nodeId", id);
    event.dataTransfer.effectAllowed = "move";
  };

  // Grid: Table columns drop operations
  const onDrop = (event) => {
    event.preventDefault();

    const columnData = JSON.parse(event.dataTransfer.getData("column"));
    const tableData = JSON.parse(event.dataTransfer.getData("table"));
    const dragType = JSON.parse(event.dataTransfer.getData("dragType"));
    const parentNodeId = event.dataTransfer.getData("nodeId");

    if (dragType !== "COLUMN") {
      return;
    }

    if (tableData.label === data.label) {
      alert("You cannot move column to same table");
      return;
    }

    // Get current column
    const currentNode = reactFlowInstance.getNode(id);
    const getTableId = `${currentNode?.id.split('_')}`
    const tableNumber = getTableId[getTableId.length - 1]

    const edgeSource = columnData.column_id;
    columnData.column_id = `${currentNode?.id}_column_${tableNumber}_${data?.columns?.length + 1}`
    
    // Check column already exists
    const columnExists = currentNode.data.columns.some(
      (item) => item.name === columnData.name
    );
    if (columnExists) {
      alert(`Column ${columnData.name} already moved`);
      return;
    }

    // Make a copy of current table: for backward drop compatability (Table 2 to Table 1)
    const updatedNode = {
      id: currentNode?.id,
      position: currentNode?.position,
      data: currentNode?.data,
      type: currentNode?.type,
      style: currentNode?.style,
    };

    // Update target table with new column
    updatedNode.data.columns.unshift(columnData);

    // Remove target table
    reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== id));

    // Add target table as updated table
    reactFlowInstance.addNodes(updatedNode);


    // Create new edge
    const newEdge = {
      id: `${edgeSource}-${columnData.column_id}`,
      source: parentNodeId,
      sourceHandle: `${edgeSource}_right`,
      target: id,
      targetHandle: `${columnData.column_id}_left`,
    };

    reactFlowInstance.addEdges(newEdge);
  };

  // Delete table node
  const handleNodeDelete = () => {
    reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== id));
    reactFlowInstance.setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  // Dragover prevent
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <NodeResizeControl isVisible minWidth={250} minHeight={200}>
        <PiResizeFill />
      </NodeResizeControl>

      <TableWrapper>
        <TableHeader label={data?.label} handleNodeDelete={handleNodeDelete} />

        <TableBodyWrapper onDrop={onDrop} handleDragOver={handleDragOver}>
          <TableBody
            data={data}
            handleDragStart={handleDragStart}
            isConnectable={isConnectable}
          />
        </TableBodyWrapper>

        <TableFooter />
      </TableWrapper>
    </>
  );
};

export default TableNode;
