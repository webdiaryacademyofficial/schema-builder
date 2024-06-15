import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

const TableNode = ({ isConnectable }) => {
  return (
    <div className="table-wrapper">
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

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TableNode;
