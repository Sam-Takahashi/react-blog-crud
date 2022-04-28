import { Link } from "react-router-dom";

// Home.js -> blogData={blogs} is the props
const BlogList = ({ blogData, title }) => { // destructuring props

    // const blogs = props.blogData;
    // const title = props.title;

    return (
        <div className="blog-list">
            <h1>{title}</h1>
            {blogData.map((blog) => ( // when using map() i must add a 'key' property so react can track it
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <p>Written by {blog.author}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default BlogList;