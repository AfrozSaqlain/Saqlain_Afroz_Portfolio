import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, notes } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: notes.title,
    description: notes.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(notes.title)}`,
    path: notes.path,
  });
}

export default function Notes() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={notes.path}
        title={notes.title}
        description={notes.description}
        image={`/api/og/generate?title=${encodeURIComponent(notes.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {/* <Projects /> */}
      <p style={{ textAlign: "center" }}>To be developed in near future.</p>
    </Column>
  );
}
