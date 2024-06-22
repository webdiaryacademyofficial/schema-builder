import { data } from "../../data";
import { CiSquarePlus } from "react-icons/ci";

const SidebarTree = () => {
  const tableData = data;

  const handleDragStart = (event, table) => {
    event.dataTransfer.setData("table", JSON.stringify(table));
    event.dataTransfer.setData("dragType", JSON.stringify("NODE"));
  };

  return (
    <ul>
      {tableData &&
        tableData?.map(({ table_group: { id, name, tables } }) => (
          <div key={id}>
            <li className="flex gap-5 items-center">
              <CiSquarePlus />
              {name}
            </li>

            {tables ? (
              <ul>
                {tables.map(({ id, name, columns }) => (
                  <li
                    key={id}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, { id, name, columns })
                    }
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
    </ul>
  );
};

export default SidebarTree;
