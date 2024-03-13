import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: children.props.property.id },
    collect: (monitor) => ({
      // Check if the item is currently being dragged
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
