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
        tableData?.map((tabelGroup) => (
          <div key={tabelGroup?.table_group?.name}>
            <li className="flex gap-5 items-center">
              <CiSquarePlus />
              {tabelGroup?.table_group?.name}
            </li>

            {tabelGroup?.table_group?.tables ? (
              <ul>
                {tabelGroup?.table_group?.tables.map((table) => (
                  <li
                    key={table?.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, table)}
                  >
                    {table?.name}
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
