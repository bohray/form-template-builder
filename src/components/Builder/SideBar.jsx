"use client";

import { useDraggable } from "@dnd-kit/core";

const sectionTypes = [
  { label: "H1 Section", style: "H1" },
  { label: "H2 Section", style: "H2" },
  { label: "H3 Section", style: "H3" },
];

const fieldTypes = [
  { label: "Text", type: "text" },
  { label: "Number", type: "number" },
  { label: "Dropdown", type: "enum", variant: "dropdown" },
  { label: "Radio", type: "enum", variant: "radio" },
  { label: "Yes / No", type: "boolean" },
];

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-3">Section Styles</h2>
        <div className="grid grid-cols-2 gap-2">
          {sectionTypes.map((item) => (
            <DraggableItem
              key={item.label}
              item={{ ...item, type: "section" }}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Field Elements</h2>
        <div className="grid grid-cols-2 gap-2">
          {fieldTypes.map((item) => (
            <DraggableItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DraggableItem({ item }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.label,
    data: item,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm cursor-move text-center"
    >
      {item.label}
    </div>
  );
}
