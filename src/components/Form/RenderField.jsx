import React from "react";

const LabelField = ({ label }) => {
  if (label.startsWith("H1:"))
    return <h1 className="text-3xl font-bold">{label.slice(3)}</h1>;
  if (label.startsWith("H2:"))
    return <h2 className="text-2xl font-semibold">{label.slice(3)}</h2>;
  if (label.startsWith("H3:"))
    return <h3 className="text-xl font-medium">{label.slice(3)}</h3>;
  return <h3 className="text-lg font-normal">{label}</h3>;
};

const RenderField = ({ field, formData, handleInputChange }) => {
  const id = field.id;

  switch (field.type) {
    case "label":
      return <LabelField label={field.label} />;

    case "text":
    case "number":
      return (
        <>
          <label className="font-medium">{field.label}</label>
          <input
            type={field.type}
            className="border p-3 rounded-md w-full"
            value={formData[id] || ""}
            onChange={(e) => handleInputChange(id, e.target.value)}
            required
          />
        </>
      );

    case "boolean":
      return (
        <label className="inline-flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={formData[id] || false}
            onChange={(e) => handleInputChange(id, e.target.checked)}
          />
          {field.label}
        </label>
      );

    case "enum":
      if (field.variant === "dropdown") {
        return (
          <>
            <label className="font-medium">{field.label}</label>
            <select
              className="border p-3 rounded-md w-full"
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              required
            >
              <option value="">Select an option</option>
              {field.options?.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </>
        );
      } else {
        // render as radio group
        return (
          <>
            <label className="font-medium">{field.label}</label>
            <div className="flex flex-col gap-2 mt-1">
              {field.options?.map((opt, i) => (
                <label key={i} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name={id}
                    value={opt}
                    checked={formData[id] === opt}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          </>
        );
      }

    default:
      return null;
  }
};

export default RenderField;
