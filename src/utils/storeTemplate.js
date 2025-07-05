const TEMPLATE_KEY = "form_templates";

export function saveTemplatesToStorage(templates) {
  try {
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(templates));
  } catch (err) {
    console.error("Failed to save templates:", err);
  }
}

export function loadTemplatesFromStorage() {
  try {
    const data = localStorage.getItem(TEMPLATE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load templates: ", err);
    return [];
  }
}
