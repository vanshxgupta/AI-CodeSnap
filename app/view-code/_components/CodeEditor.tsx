"use client";

import React, { useState } from "react";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { aquaBlue, gruvboxDark,sandpackDark } from "@codesandbox/sandpack-themes";
import Constants from "@/data/Constants";

function CodeEditor({ codeResp, isReady }: any) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? gruvboxDark : aquaBlue;

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="w-full">
      {/* Theme Toggle Button */}
      <div className="flex justify-end mb-4 px-2">
        <button
          onClick={toggleTheme}
          className="px-4 py-1.5 rounded-md bg-neutral-800 text-white text-sm hover:bg-neutral-700 transition-all border border-neutral-600"
        >
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {isReady ? (
        <Sandpack
          template="react"
          theme={theme}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showTabs: true,
            editorHeight: 600,
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          files={{
            "/App.js": `${codeResp}`,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={theme}
          files={{
            "/App.js": {
              code: `${codeResp}`,
              active: true,
            },
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: "70vh" }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}

export default CodeEditor;
