import "@testing-library/jest-dom";

// Polyfill Blob.prototype.arrayBuffer for jsdom, which does not implement it.
// validateImageMagicBytes calls file.slice(...).arrayBuffer() and relies on this API.
if (typeof Blob !== "undefined" && !Blob.prototype.arrayBuffer) {
  Blob.prototype.arrayBuffer = function (): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(this);
    });
  };
}

// Stub URL.createObjectURL / revokeObjectURL — jsdom does not implement them,
// but UploadZone calls them to produce blob preview URLs.
if (typeof URL.createObjectURL === "undefined") {
  URL.createObjectURL = jest.fn(() => "blob:mock-url");
}
if (typeof URL.revokeObjectURL === "undefined") {
  URL.revokeObjectURL = jest.fn();
}
