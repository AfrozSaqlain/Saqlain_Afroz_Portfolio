import { About, Blog, CV, Gallery, Home, Newsletter, Notes, Person, Social, Work } from "@/types";
import { Logo } from "@once-ui-system/core";

const person: Person = {
  firstName: "Saqlain",
  lastName: "Afroz",
  name: `Saqlain Afroz`,
  role: "Inspiring Astrophysicist",
  avatar: "/images/avatar.jpg",
  email: "sa20ms230@iiserkol.ac.in",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
  cv_path: "/cv",
  cv_pic_path: "/images/CV_Pic.jpg"
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.name}'s Newsletter</>,
  description: (
    <>
      I occasionally write about science, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/AfrozSaqlain",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/saqlain-afroz-7a47961b8/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/afroz_3680/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between physics and code</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">MLGW</strong>
      </>
    ),
    href: "/work/deep-learning-in-gravitational-wave-astrophysics",
  },
  subline: (
    <>
      I'm Saqlain Afroz, an aspiring astrophysicist, skilled in gravitational wave astrophysics, machine learning, and scientific computing. {/*at{" "}*/}
      {/* <Logo
        icon="/trademarks/wordmark-dark.svg"
        style={{ display: "inline-flex", top: "0.25em", marginLeft: "-0.25em" }}
      />
      , where I craft intuitive
      <br /> user experiences. After hours, I build my own projects. */}
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a BS-MS Physics graduate from IISER Kolkata, worked at the intersection of gravitational wave physics, machine learning, and quantum computing. My research focuses on fast parameter estimation, signal classification, and quantum simulations of black holes. Interested in general relativity, gravitational wave astrophysics, machine learning, quantum computation, and multi-messenger astronomy. Seeking a doctoral position at a reputable research organization to further pursue these interests and contribute to cutting-edge developments in fundamental physics.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Deep Learning Based Classification and Parameter Estimation of Various Kinds of Gravitational Wave sources.",
        timeframe: "2024 - Present",
        role: "Guide: Dr. Apratim Ganguly",
        achievements: [
          <>
            Developed a deep learning pipeline leveraging normalizing flows for rapid parameter estimation of gravitationally lensed gravitational waves, considering real noise, offering a significant speed-up over traditional Bayesian inference methods like bilby.
          </>,
          <>
            Designed and trained Convolutional Neural Networks and Vision Transformers for classifying gravitational wave signals into distinct physical categories — lensed, precessing, eccentric, and unlensed — with high accuracy.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: "Quasi-Normal Mode Computation of Black Holes via Physics-Informed Neural Networks",
        timeframe: "2025 - Present",
        role: "Guide: Prof. Ajit Kembhavi, Prof. Dawood Kothawala, Dr. Ninan Sajeeth Philip",
        achievements: [
          <>
            Developed a Physics-Informed Neural Network (PINN) framework to compute quasi-normal modes of black holes in alternative theories of gravity.
          </>,
          <>
            Contributing to a multi-institutional research effort aimed at evaluating the capabilities of PINNs in addressing complex differential equations
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Indian Institute of Science Education and Research Kolkata",
        description: <>BSMS in Physics.</>,
      },
      {
        name: "Inter-University Center for Astronomy and Astrophysics",
        description: <>Master's Thesis in Gravitational Wave Astrophysics.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        description: (
          <>Python, CUDA, Julia, Matlab, Arduino, C++, C, JavaScript, NextJS</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
          // {
          //   src: "/images/projects/project-01/cover-03.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "High Performance Computing",
        description: (
          <>HTCondor, SLURM, PBS, OpenMP, MPI</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //   src: "/images/projects/project-01/cover-04.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "Deep Learning & Machine Learning",
        description: (
          <>PyTorch, Tensorflow, normflows, nflows, CNNs, GNNs, RNNs, LSTMs, SVMs, Transformers, Autoencoders, Physics Informed Neural Network, Decision Trees, K-means, k-NN, Random Forests</>
        ),
      },
      {
        title: "Statistical Techniques",
        description: (
          <>Bayesian Inference, Maximum Likelihood Estimation, Hypothesis Testing, Markov Chain Monte Carlo (MCMC),
Regression Analysis, Time Series Analysis</>
        ),
      },
      {
        title: "Software Tools & Frameworks",
        description: (
          <>Git, Matlab, Colab, Bilby, Dingo, Linux, LATEX, Qiskit, NumPy, SciPy etc</>
        ),
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about science and code...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const cv: CV = {
  path: "/cv",
  label: "CV",
  title: "Saqlain Afroz's CV",
  description: `Read about ${person.name}'s education, work experience, and skills`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const notes: Notes = {
  path: "/notes",
  label: "Notes",
  title: "Saqlain Afroz's Academic Notes",
  description: `Read from ${person.name}'s notes on phycis and mathematics`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/ICTS_ft_Stephen_Green.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Jensen_Huang.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, cv, notes, work, gallery };
