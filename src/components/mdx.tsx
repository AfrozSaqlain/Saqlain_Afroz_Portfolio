import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import Link from "next/link";
import { PythonPlayground } from "@/components/PythonPlayground";
import { JupyterLiteEmbed } from "@/components/JupyterLiteEmbed";

import { 
  Heading,
  HeadingLink,
  Text,
  InlineCode,
  CodeBlock,
  TextProps,
  MediaProps,
  Accordion,
  AccordionGroup,
  Table as OnceTable,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  Particle,
} from "@once-ui-system/core";

import { Mail, Phone, Globe } from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";


import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // 👈 required for math rendering

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  const isExternal = href?.startsWith("http") || href?.startsWith("mailto");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children, ...props }: Omit<React.ComponentProps<typeof HeadingLink>, 'as' | 'id'>) => {
    const slug = slugify(children as string);
    return (
      <HeadingLink
        marginTop="24"
        marginBottom="12"
        as={as}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as}`;
  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: children,
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }
  return <pre {...props} />;
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  table: (props: any) => {
    const isLayoutTable = props.style?.border === 'none' || props.border === '0';
    return (
      <div style={{ 
        overflowX: 'auto', 
        marginBottom: '16px', 
        border: isLayoutTable ? 'none' : '1px solid var(--neutral-alpha-medium)', 
        borderRadius: isLayoutTable ? 'none' : '8px' 
      }}>
        <table {...props} style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', ...props.style }} />
      </div>
    );
  },
  thead: (props: any) => (
    <thead {...props} style={{ backgroundColor: 'var(--neutral-alpha-weak)', borderBottom: '1px solid var(--neutral-alpha-medium)' }} />
  ),
  th: (props: any) => (
    <th {...props} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600' }} />
  ),
  td: (props: any) => (
    <td {...props} style={{ padding: '12px 16px', borderBottom: '1px solid var(--neutral-alpha-weak)' }} />
  ),
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  Mail,
  Phone,
  Particle,
  Globe,
  SiLinkedin, 
  SiGithub,
  PythonPlayground,
  JupyterLiteEmbed,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath, remarkGfm], // 👈 math and table support
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
