"use client";

import { Button, Column, Text } from "@once-ui-system/core";

interface JupyterLiteEmbedProps {
  src?: string;
  height?: number;
}

const DEFAULT_SRC =
  "https://jupyterlite.github.io/demo/lab/index.html?path=notebooks/Intro.ipynb";

export function JupyterLiteEmbed({ src = DEFAULT_SRC, height = 720 }: JupyterLiteEmbedProps) {
  return (
    <Column
      gap="12"
      border="neutral-alpha-medium"
      radius="l"
      padding="16"
      style={{ marginTop: "12px", marginBottom: "20px" }}
    >
      <Text variant="label-default-s" onBackground="neutral-weak">
        Full Jupyter notebook UI (JupyterLite)
      </Text>

      <iframe
        title="JupyterLite Notebook"
        src={src}
        style={{
          width: "100%",
          height: `${height}px`,
          border: "1px solid var(--neutral-alpha-medium)",
          borderRadius: "10px",
          background: "var(--page-background)",
        }}
        loading="lazy"
        referrerPolicy="no-referrer"
        allow="clipboard-read; clipboard-write"
      />

      <Button href={src} target="_blank" variant="tertiary">
        Open notebook in new tab
      </Button>
    </Column>
  );
}
