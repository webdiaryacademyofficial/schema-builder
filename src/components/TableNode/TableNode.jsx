import { Handle, Position, useReactFlow } from "reactflow";

const TableNode = ({ id, isConnectable, data }) => {
  
  const reactFlow = useReactFlow();
  const nodes = reactFlow.getNodes();
  const index = nodes.findIndex((item) => item.data.label === data?.label);
  
  return (
    <div className="table-wrapper">
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <table className="table" border="1">
        <tbody>
          <tr>
            <td colSpan="2" align="center" border="0">
              Header
            </td>
          </tr>
          <tr>
            <td>Row 1, Column 1</td>
            <td>Row 1, Column 2</td>
          </tr>
          <tr>
            <td>Row 2, Column 1</td>
            <td>Row 2, Column 2</td>
          </tr>
          <tr>
            <td>Row 3, Column 1</td>
            <td>Row 3, Column 2</td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              Footer
            </td>
          </tr>
        </tbody>
      </table>

      {index != 0 && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
};

export default TableNode;
