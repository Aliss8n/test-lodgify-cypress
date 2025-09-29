export const mapRoute = name => {
  const idMap = {
    "Contact Page": "/qa-test-contact",
    "Widget Endpoint": "/api/v2/embed/29132/",
  };

  return idMap[name] || "undefined";
};
