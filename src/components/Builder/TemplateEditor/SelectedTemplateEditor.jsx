"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";

const SelectedTemplateEditor = () => {
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplateId = useSelector(
    (state) => state.template.selectedTemplateId
  );

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop",
  });

  if (!selectedTemplate) {
    return <div className="mt-6 text-gray-500">No template selected.</div>;
  }

  return (
    <div
      ref={setNodeRef}
      className={`p-4 min-h-[300px] border-2 border-dashed rounded ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {selectedTemplate.sections.length === 0 && (
        <p className="text-center text-gray-400">
          Drag section styles (H1, H2, H3) here to get started
        </p>
      )}

      <div className="space-y-4 mt-2">
        {selectedTemplate.sections.map((section) => (
          <DroppableSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default SelectedTemplateEditor;

const DroppableSection = ({ section }) => {
  const { setNodeRef, isOver } = useDroppable({ id: section.id });

  const getHeadingClass = () => {
    switch (section.style) {
      case "H1":
        return "text-2xl font-bold";
      case "H2":
        return "text-xl font-semibold";
      case "H3":
        return "text-lg font-medium";
      default:
        return "text-base font-normal";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`border border-gray-300 rounded p-4 bg-white shadow-sm transition ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <h3 className={`${getHeadingClass()} mb-2`}>{section.title}</h3>
      <ul className="mt-2 space-y-2">
        {section.fields.map((field) => (
          <li key={field.id} className="bg-gray-100 p-2 rounded">
            <strong>{field.label}</strong> ({field.type})
          </li>
        ))}
      </ul>
    </div>
  );
};
