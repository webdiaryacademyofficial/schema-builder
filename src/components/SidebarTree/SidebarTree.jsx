import { data } from "../../data";

const SidebarTree = () => {
  const tableData = data;

  const handleDragStart = (event, table) => {
    event.dataTransfer.setData("table", JSON.stringify(table));
  };

  return (
    <ul>
      {tableData &&
        tableData?.map((tabelGroup) => (
          <div key={tabelGroup?.table_group?.name}>
            <li>{tabelGroup?.table_group?.name}</li>

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
