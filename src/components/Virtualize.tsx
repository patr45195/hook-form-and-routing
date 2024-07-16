import React, { useRef, useState } from "react";

interface VirtualizedListProps {
  itemHeight: number;
  items: string[];
  containerHeight: number;
}

interface SimpleListProps {
  items: string[];
}

const VirtualizedList = ({
  itemHeight,
  items,
  containerHeight,
}: VirtualizedListProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ overflowY: "auto", height: `${containerHeight}px` }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${totalHeight}px`, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: "absolute",
              top: `${(startIndex + index) * itemHeight}px`,
              height: `${itemHeight}px`,
              width: "100%",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const SimpleList = ({ items }: SimpleListProps) => {
  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {items.map((item, index) => (
        <div key={index} style={{ height: "35px" }}>
          {item}
        </div>
      ))}
    </div>
  );
};

function Virtualize() {
  const items = Array.from(
    { length: 50000 },
    (_, index) => `Item ${index + 1}`
  );

  return (
    // <SimpleList items={items} />
    <VirtualizedList items={items} itemHeight={35} containerHeight={800} />
  );
}

export default Virtualize;
