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
              {data?.label}
            </td>
          </tr>
          {data?.columns?.map((data) => (
            <tr key={data?.column_id}>
              <td>{data?.name}</td>
              <td>{data?.column_data_type}</td>
            </tr>
          ))}
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
