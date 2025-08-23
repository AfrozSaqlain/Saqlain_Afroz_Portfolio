// import { Flex, Meta, Schema } from "@once-ui-system/core";
// import { baseURL, cv, person } from "@/resources";
// import { getPosts } from "@/utils/utils";

// export async function generateMetadata() {
//   return Meta.generate({
//     title: cv.title,
//     description: cv.description,
//     baseURL: baseURL,
//     image: `/api/og/generate?title=${encodeURIComponent(cv.title)}`,
//     path: cv.path,
//   });
// }

// export default function CV() {
//   let allProjects = getPosts(["src", "app", "cv", "cvs"]);
    
//   return (
//     <Flex maxWidth="s">
//       <Schema
//         as="webPage"
//         baseURL={baseURL}
//         title={cv.title}
//         description={cv.description}
//         path={cv.path}
//         author={{
//           name: person.name,
//           url: `${baseURL}${cv.path}`,
//           image: `${baseURL}${person.avatar}`,
//         }}
//       />
//       <p>Hello</p>
//     </Flex>
//   );
// }

import { Flex, Meta, Schema } from "@once-ui-system/core";
import { baseURL, cv, person } from "@/resources";
import { CustomMDX } from "@/components";
import fs from "fs";
import path from "path";

export async function generateMetadata() {
  return Meta.generate({
    title: cv.title,
    description: cv.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(cv.title)}`,
    path: cv.path,
  });
}

export default async function CV() {
  // read the MDX file as plain text
  const filePath = path.join(process.cwd(), "src/app/cv/cvs/my_cv.mdx");
  const source = fs.readFileSync(filePath, "utf-8");

  return (
    <Flex maxWidth="m" direction="column" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={cv.title}
        description={cv.description}
        path={cv.path}
        author={{
          name: person.name,
          url: `${baseURL}${cv.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {/* render your CV */}
      <CustomMDX source={source} />
    </Flex>
  );
}


