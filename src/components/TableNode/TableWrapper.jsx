const TableWrapper = ({ children }) => {
  return (
    <div className="table-wrapper nowheel" style={{ overflowY: "scroll" }}>
      {children}
    </div>
  );
};

export default TableWrapper;
