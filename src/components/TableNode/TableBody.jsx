import { TiTick } from "react-icons/ti";
import { Handle, Position } from "reactflow";

// eslint-disable-next-line react/prop-types
const TableBody = ({ data, handleDragStart, isConnectable }) => {
  return (
    <div className="tbody">
      {data?.columns?.map((column) => {
        return (
          <div
            key={column?.column_id}
            draggable
            style={{ position: "relative" }}
            onDragStart={(event) => handleDragStart(event, column, data)}
            className="tr draggable-row"
          >
            <Handle
              id={`${column?.column_id}_left`}
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
            />

            <div className="tr flex between gap-5 border-bottom">
              <div className="flex gap-5">
                <div className="td">
                  <TiTick />
                </div>
                <div className="td">{column?.name}</div>
              </div>
              <div className="td">{column?.column_data_type}</div>
            </div>

            <Handle
              id={`${column?.column_id}_right`}
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TableBody;
