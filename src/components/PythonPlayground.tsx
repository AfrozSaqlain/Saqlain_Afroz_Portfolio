"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Column, Flex, Text } from "@once-ui-system/core";

type PyodideLike = {
  loadPackage: (name: string) => Promise<void>;
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (msg: string) => void }) => void;
  setStderr: (options: { batched: (msg: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideLike>;
  }
}

interface PythonPlaygroundProps {
  initialCode?: string;
}

const DEFAULT_CODE = `print("Hello from Python in your blog!")\nfor i in range(3):\n    print("Step", i + 1)`;

function appendLog(setter: React.Dispatch<React.SetStateAction<string>>, message: string) {
  setter((prev) => `${prev}${message.endsWith("\n") ? message : `${message}\n`}`);
}

export function PythonPlayground({ initialCode = DEFAULT_CODE }: PythonPlaygroundProps) {
  const pyodideRef = useRef<PyodideLike | null>(null);
  const [code, setCode] = useState(initialCode);
  const [packageName, setPackageName] = useState("");
  const [output, setOutput] = useState("");
  const [plotImages, setPlotImages] = useState<string[]>([]);
  const [status, setStatus] = useState("Loading Python runtime...");
  const [running, setRunning] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        if (!window.loadPyodide) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
          script.async = true;
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Pyodide script"));
            document.head.appendChild(script);
          });
        }

        if (!window.loadPyodide) {
          throw new Error("loadPyodide is not available on window");
        }

        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
        });

        if (cancelled) return;

        pyodide.setStdout({
          batched: (msg) => appendLog(setOutput, msg),
        });
        pyodide.setStderr({
          batched: (msg) => appendLog(setOutput, msg),
        });

        pyodideRef.current = pyodide;
        setStatus("Python ready");
      } catch (error) {
        setStatus("Failed to load Python runtime");
        appendLog(setOutput, `Error: ${(error as Error).message}`);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const runCode = async () => {
    if (!pyodideRef.current) return;
    setRunning(true);
    setOutput("");
    setPlotImages([]);
    try {
      // Reset any existing matplotlib figures from the previous run.
      await pyodideRef.current.runPythonAsync(`
try:
    import matplotlib.pyplot as plt
    plt.close("all")
except Exception:
    pass
      `);

      if (code.includes("matplotlib")) {
        await pyodideRef.current.loadPackage("matplotlib");
        await pyodideRef.current.runPythonAsync(`
import matplotlib
matplotlib.use("module://matplotlib_pyodide.wasm_backend")
        `);
      }

      const result = await pyodideRef.current.runPythonAsync(code);
      if (result !== undefined && result !== null) {
        appendLog(setOutput, String(result));
      }

      const plotsJson = await pyodideRef.current.runPythonAsync(`
import json
import io
import base64

plots = []
try:
    import matplotlib.pyplot as plt
    from matplotlib._pylab_helpers import Gcf

    for manager in Gcf.get_all_fig_managers():
        fig = manager.canvas.figure
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight")
        buf.seek(0)
        plots.append("data:image/png;base64," + base64.b64encode(buf.read()).decode("utf-8"))

    plt.close("all")
except Exception:
    pass

json.dumps(plots)
      `);

      if (typeof plotsJson === "string") {
        const parsed = JSON.parse(plotsJson) as string[];
        setPlotImages(parsed);
      }
    } catch (error) {
      appendLog(setOutput, `Runtime error: ${(error as Error).message}`);
    } finally {
      setRunning(false);
    }
  };

  const installPackage = async () => {
    if (!pyodideRef.current || !packageName.trim()) return;

    setInstalling(true);
    appendLog(setOutput, `Installing ${packageName.trim()}...`);
    try {
      await pyodideRef.current.loadPackage("micropip");
      const escapedName = packageName.trim().replace(/'/g, "\\'");
      await pyodideRef.current.runPythonAsync(`
import micropip
await micropip.install('${escapedName}')
print("Installed ${escapedName}")
      `);
    } catch (error) {
      appendLog(setOutput, `Install error: ${(error as Error).message}`);
    } finally {
      setInstalling(false);
    }
  };

  return (
    <Column
      gap="12"
      border="neutral-alpha-medium"
      radius="l"
      padding="16"
      style={{ marginTop: "12px", marginBottom: "20px" }}
    >
      <Text variant="label-default-s" onBackground="neutral-weak">
        Browser Python Playground ({status})
      </Text>

      <textarea
        value={code}
        onChange={(event) => setCode(event.target.value)}
        rows={10}
        style={{
          width: "100%",
          borderRadius: "10px",
          border: "1px solid var(--neutral-alpha-medium)",
          background: "var(--page-background)",
          color: "var(--neutral-on-background-strong)",
          fontFamily: "var(--font-code)",
          padding: "12px",
          resize: "vertical",
        }}
      />

      <Flex gap="8" wrap>
        <Button onClick={runCode} disabled={!pyodideRef.current || running}>
          {running ? "Running..." : "Run Python"}
        </Button>
        <input
          value={packageName}
          onChange={(event) => setPackageName(event.target.value)}
          placeholder="package name (e.g. sympy)"
          style={{
            flex: 1,
            minWidth: "220px",
            borderRadius: "10px",
            border: "1px solid var(--neutral-alpha-medium)",
            background: "var(--page-background)",
            color: "var(--neutral-on-background-strong)",
            padding: "8px 10px",
          }}
        />
        <Button
          variant="tertiary"
          onClick={installPackage}
          disabled={!pyodideRef.current || installing || !packageName.trim()}
        >
          {installing ? "Installing..." : "Install package"}
        </Button>
      </Flex>

      <pre
        style={{
          margin: 0,
          whiteSpace: "pre-wrap",
          borderRadius: "10px",
          border: "1px solid var(--neutral-alpha-medium)",
          padding: "10px",
          minHeight: "64px",
          fontFamily: "var(--font-code)",
          fontSize: "0.9rem",
        }}
      >
        {output || "Output will appear here"}
      </pre>

      {plotImages.length > 0 && (
        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Plots
          </Text>
          {plotImages.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={`Python plot ${index + 1}`}
              style={{
                width: "100%",
                border: "1px solid var(--neutral-alpha-medium)",
                borderRadius: "10px",
                background: "white",
              }}
            />
          ))}
        </Column>
      )}
    </Column>
  );
}
