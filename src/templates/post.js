import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import parse from 'html-react-parser'
import { renderToStaticMarkup } from 'react-dom/server'
import Img from 'gatsby-image'
import contentParser from 'gatsby-wpgraphql-inline-images'

const pluginOptions = {
  wordPressUrl: `https://us-central1-kigali-162302.cloudfunctions.net/function-2/`,
  uploadsUrl: `https://us-central1-kigali-162302.cloudfunctions.net/wp-content/uploads/`,
}

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
  featuredMedia,
  wpContent
}) => {
  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {console.log(featuredMedia)}
            {featuredMedia && (
              <Img
                alt={title}
                fluid={featuredMedia.localFile.childImageSharp.fluid}
              ></Img>
            )}
            {/* wp cont normal */}
            <span>Este es el bueno</span>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <span>/Este es el bueno</span>
            {/* laisy img */}
            <span>WP Cont</span>
            {console.log('wpContent', wpContent)}
            <div>{contentParser({ content: wpContent }, pluginOptions)}</div>
            {/* replace some cont */}
            <span> Cont</span>
            <div
              dangerouslySetInnerHTML={{
                __html: renderToStaticMarkup(
                  parse(content, {
                    replace: ({ attribs, name, type }) => {
                      if (!attribs) return
                      if (name === 'img' && type === 'tag') {
                        const n = attribs.src.lastIndexOf('xyz')
                        const newSrc = `http://us-central1-kigali-162302.cloudfunctions.net/function-2${attribs.src.substring(
                          n + 3,
                          attribs.src.length
                        )}`
                        return <img src={newSrc} />
                      }
                    },
                  })
                ),
              }}
            />

            <div style={{ marginTop: `4rem` }}>
              <p>
                {date} - posted by{' '}
                <Link to={`/author/${author.slug}`}>{author.name}</Link>
              </p>
              {categories && categories.length ? (
                <div>
                  <h4>Categories</h4>
                  <ul className="taglist">
                    {categories.map(category => (
                      <li key={`${category.slug}cat`}>
                        <Link to={`/categories/${category.slug}/`}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {tags && tags.length ? (
                <div>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={`${tag.slug}tag`}>
                        <Link to={`/tags/${tag.slug}/`}>{tag.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post, wpgraphql } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        content={post.content}
        wpContent={wpgraphql.post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
        featuredMedia={post.featured_media}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!, $wpId: ID!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      author {
        name
        slug
      }
      # featured_media {
      #   localFile {
      #     childImageSharp {
      #       fluid(maxWidth: 300) {
      #         ...GatsbyImageSharpFluid_withWebp
      #         originalName
      #       }
      #     }
      #   }
      # }
    }
    wpgraphql {
      post(id: $wpId) {
        content
      }
    }
  }
`
