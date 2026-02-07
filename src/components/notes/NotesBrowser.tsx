"use client";

import { useMemo, useState } from "react";
import { Button, Column, Flex, Heading, Text } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

type NotePost = {
  slug: string;
  content: string;
  metadata: {
    title: string;
    summary: string;
    publishedAt: string;
    images?: string[];
    team?: { avatar: string }[];
    link?: string;
    tag?: string[];
  };
};

interface NotesBrowserProps {
  posts: NotePost[];
}

const ALL_TAGS = "All";
const UNTAGGED = "Untagged";

export function NotesBrowser({ posts }: NotesBrowserProps) {
  const [selectedTag, setSelectedTag] = useState<string>(ALL_TAGS);

  const normalizedPosts = useMemo(() => {
    return posts.map((post) => {
      const tags = (post.metadata.tag || []).filter(Boolean);
      return {
        ...post,
        tags,
        primaryTag: tags[0] || UNTAGGED,
      };
    });
  }, [posts]);

  const tags = useMemo(() => {
    const discoveredTags = Array.from(
      new Set(normalizedPosts.flatMap((post) => post.tags))
    ).sort((a, b) => a.localeCompare(b));

    if (normalizedPosts.some((post) => post.tags.length === 0)) {
      discoveredTags.push(UNTAGGED);
    }

    return [ALL_TAGS, ...discoveredTags];
  }, [normalizedPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedTag === ALL_TAGS) return normalizedPosts;
    if (selectedTag === UNTAGGED) {
      return normalizedPosts.filter((post) => post.tags.length === 0);
    }
    return normalizedPosts.filter((post) => post.tags.includes(selectedTag));
  }, [normalizedPosts, selectedTag]);

  const groupedPosts = useMemo(() => {
    if (selectedTag !== ALL_TAGS) {
      return [{ tag: selectedTag, posts: filteredPosts }];
    }

    const groups = new Map<string, typeof filteredPosts>();
    for (const post of filteredPosts) {
      const existing = groups.get(post.primaryTag) || [];
      groups.set(post.primaryTag, [...existing, post]);
    }

    return Array.from(groups.entries())
      .sort(([tagA], [tagB]) => tagA.localeCompare(tagB))
      .map(([tag, grouped]) => ({ tag, posts: grouped }));
  }, [filteredPosts, selectedTag]);

  return (
    <Column fillWidth gap="24">
      <Column fillWidth gap="12">
        <Text variant="label-default-s" onBackground="neutral-weak">
          Filter by category
        </Text>
        <Flex fillWidth wrap gap="8">
          {tags.map((tag) => (
            <Button
              key={tag}
              size="s"
              variant={selectedTag === tag ? "secondary" : "tertiary"}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </Flex>
      </Column>

      <Column fillWidth gap="32">
        {groupedPosts.map((group) => (
          <Column key={group.tag} fillWidth gap="16">
            <Heading as="h2" variant="heading-strong-l">
              {group.tag}
            </Heading>
            {group.posts.map((post) => (
              <ProjectCard
                key={post.slug}
                href={`/notes/${post.slug}`}
                images={post.metadata.images || []}
                title={post.metadata.title}
                description={post.metadata.summary}
                content={post.content}
                avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
                link={post.metadata.link || ""}
              />
            ))}
          </Column>
        ))}

        {filteredPosts.length === 0 && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            No notes found for this category.
          </Text>
        )}
      </Column>
    </Column>
  );
}
