import { IoClose } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";

// eslint-disable-next-line react/prop-types
const TableHeader = ({ label, handleNodeDelete }) => {
  return (
    <div className="table-header | flex between">
      <div className="flex items-center gap-5">
        <CiViewTable />
        <h3> {label}</h3>
      </div>
      <IoClose onClick={handleNodeDelete} className="cursor-pointer" />
    </div>
  );
};

export default TableHeader;
