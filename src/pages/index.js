import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import About from '../components/about';
import Contact from '../components/contact';
import FeaturedProjects from '../components/featured-projects';
import Hero from '../components/hero';
import Layout from '../components/layout';
import RecentPosts from '../components/recent-posts';
import SEO from '../components/seo';

const Index = ({ data }) => {
  const heroData = {
    author: data.site.siteMetadata.author,
    tagline: data.hero.frontmatter.tagline,
    description: data.hero.html,
    introduction: data.hero.frontmatter.introduction,
    ctaLabel: data.hero.frontmatter.cta_label,
    ctaLink: data.hero.frontmatter.cta_link,
  };

  return (
    <Layout>
      <SEO title="Home" />
      <Hero data={heroData} />
      <About data={data.about} />
      <FeaturedProjects featured={data.featuredProjects.nodes} unfeatured={data.projects.nodes} />
      <RecentPosts data={data.blog.edges} />
      <Contact data={data.contact} />
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  {
    site {
      siteMetadata {
        author
      }
    }

    hero: markdownRemark(fileAbsolutePath: { regex: "/content/sections/hero/" }) {
      frontmatter {
        introduction
        tagline
        cta_label
        cta_link
      }
      html
    }

    about: markdownRemark(fileAbsolutePath: { regex: "/content/sections/about/" }) {
      frontmatter {
        title
        techs
        about_image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }

    featuredProjects: allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fileAbsolutePath: { regex: "/content/projects/" }, frontmatter: { featured: { eq: true } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "D MMMM, YYYY")
          title
          repo_link
          demo_link
          techs
          cover_image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        html
      }
    }

    projects: allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fileAbsolutePath: { regex: "/content/projects/" }, frontmatter: { featured: { eq: false } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "D MMMM, YYYY")
          title
          repo_link
          demo_link
          techs
        }
        html
      }
    }

    blog: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: 4
      filter: { fileAbsolutePath: { regex: "/content/posts/" }, frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            tags
            date(formatString: "D MMMM, YYYY")
            published
            description
            cover_image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }

    contact: markdownRemark(fileAbsolutePath: { regex: "/content/sections/contact/" }) {
      frontmatter {
        phone
        email
        address
      }
      html
    }
  }
`;
