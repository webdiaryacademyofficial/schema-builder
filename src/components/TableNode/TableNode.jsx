import { TiTick } from "react-icons/ti";
import { CiViewTable } from "react-icons/ci";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdResize } from "react-icons/io";
import { PiResizeFill } from "react-icons/pi";
import {
  Handle,
  Position,
  useReactFlow,
  NodeResizer,
  NodeResizeControl,
} from "reactflow";
import { PiMouseScroll } from "react-icons/pi";
import "react-resizable/css/styles.css";

const TableNode = ({ id, isConnectable, data }) => {
  const reactFlowInstance = useReactFlow();

  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();

  // Table drag operations
  const onDrop = (event) => {
    event.preventDefault();

    const columnData = JSON.parse(event.dataTransfer.getData("column"));
    const tableData = JSON.parse(event.dataTransfer.getData("table"));
    const dragType = JSON.parse(event.dataTransfer.getData("dragType"));
    const parentNodeId = event.dataTransfer.getData("nodeId");

    if (dragType !== "COLUMN") {
      return;
    }

    event.dataTransfer.effectAllowed = "move";

    if (tableData.label === data.label) {
      alert("You cannot move column to same table");
      return;
    }

    const edgeSource = columnData.column_id;
    columnData.column_id = `${data.label}_${data.columns.length + 1}`;

    const updatedNodes = nodes.map((node) => {
      if (node.id === id) {
        console.log("if condition", node.id, id);
        const updatedColumns = [...node.data.columns, columnData];

        return {
          ...node,
          data: {
            ...node.data,
            columns: updatedColumns,
          },
        };
      } else if (node.id === parentNodeId) {
        console.log("else condition", node.id, parentNodeId);
        const updatedColumns = [...node.data.columns, columnData];

        return {
          ...node,
          data: {
            ...node.data,
            columns: updatedColumns,
          },
        };
      }

      return node;
    });

    const newEdge = {
      id: `${edgeSource}-${columnData.column_id}`,
      source: parentNodeId,
      sourceHandle: `${edgeSource}_right`,
      target: id,
      targetHandle: `${columnData.column_id}_left`,
    };

    reactFlowInstance.setNodes(updatedNodes);
    reactFlowInstance.addEdges(newEdge);

    console.log(newEdge, "newEdge");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Table columns drag operations
  const handleDragStart = (event, column, table) => {
    event.dataTransfer.setData("column", JSON.stringify(column));
    event.dataTransfer.setData("table", JSON.stringify(table));
    event.dataTransfer.setData("dragType", JSON.stringify("COLUMN"));
    event.dataTransfer.setData("nodeId", id);
  };

  const handleNodeDelete = () => {
    reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  return (
    <>
      <NodeResizeControl isVisible>
      <PiResizeFill />
      </NodeResizeControl>
      <div className="table-wrapper">
        <div className="table-header | flex between">
          <div className="flex items-center gap-5">
            <CiViewTable />
            <h3> {data?.label}</h3>
          </div>
          <IoClose onClick={handleNodeDelete} className="cursor-pointer" />
        </div>

        <table
          className="table nodrag"
          onDrop={onDrop}
          onDragOver={handleDragOver}
        >
          <tbody>
            {data?.columns?.map((column) => {
              return (
                <tr
                  key={column?.column_id}
                  draggable
                  style={{ position: "relative" }}
                  onDragStart={(event) => handleDragStart(event, column, data)}
                  className="draggable-row"
                >
                  <Handle
                    id={`${column?.column_id}_left`}
                    type="target"
                    position={Position.Left}
                    isConnectable={isConnectable}
                  />
                  <td>
                    <TiTick />
                  </td>
                  <td>{column?.name}</td>
                  <td>{column?.column_data_type}</td>

                  <Handle
                    id={`${column?.column_id}_right`}
                    type="source"
                    position={Position.Right}
                    isConnectable={isConnectable}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="table-footer">
          <span> Scroll to see more columns</span>
        </div>
      </div>
    </>
  );
};

export default TableNode;
