"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDF = void 0;
const core_1 = require("@react-pdf-viewer/core");
const default_layout_1 = require("@react-pdf-viewer/default-layout");
require("@react-pdf-viewer/core/lib/styles/index.css");
require("@react-pdf-viewer/default-layout/lib/styles/index.css");
const react_1 = require("react");
const PDF = ({ fileUrl }) => {
    const defaultLayoutPluginInstance = (0, default_layout_1.defaultLayoutPlugin)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    return (<div>
      {isLoading && <p>Loading PDF...</p>}
      <core_1.Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js`}>
        <core_1.Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} onDocumentLoad={() => setIsLoading(false)}/>
      </core_1.Worker>
    </div>);
};
exports.PDF = PDF;
exports.default = exports.PDF;
