"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import TemplateTabs from "./TemplateTabs";

export default function TopBar() {
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplateId = useSelector(
    (state) => state.template.selectedTemplateId
  );

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const isDisabled =
    !selectedTemplate || selectedTemplate.sections.length === 0;

  console.log(templates);

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* Left : Tabs */}
      <TemplateTabs />

      {/* Center: Path */}
      <div className="font-medium text-sm">
        {selectedTemplate?.name || "Create New Template"}
      </div>

      {/* Right: Actions */}
      <Link
        href={isDisabled ? "#" : "/form"}
        className={`text-sm px-4 py-1.5 rounded ${
          isDisabled
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-900"
        }`}
        onClick={(e) => isDisabled && e.preventDefault()}
      >
        Fill Form
      </Link>
    </div>
  );
}
