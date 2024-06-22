const TableBodyWrapper = ({ children, onDrop, handleDragOver }) => {
  return (
    <div className="table nodrag" onDrop={onDrop} onDragOver={handleDragOver}>
      {children}
    </div>
  );
};

export default TableBodyWrapper;
