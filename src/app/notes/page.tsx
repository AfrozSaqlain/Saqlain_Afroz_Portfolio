import { Column, Meta, Schema, Text } from "@once-ui-system/core";
import { NotesBrowser } from "@/components/notes/NotesBrowser";

import { baseURL, about, person, notes } from "@/resources";
import { getPosts } from "@/utils/utils";


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
  const posts = getPosts(["src", "app", "notes", "posts"])
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime());

  return (
    <Column maxWidth="s">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={notes.title}
        description={notes.description}
        path={notes.path}
        image={`/api/og/generate?title=${encodeURIComponent(notes.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/notes`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* <Heading marginBottom="l" variant="display-strong-s">
        {notes.title}
      </Heading> */}
      <Text variant="body-default-m" onBackground="accent-weak" marginBottom="16">
        This section is under construction.
      </Text>
      <NotesBrowser posts={posts} />
    </Column>
  );
}
