import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();
    const { theId } = useParams();

    useEffect(() => {
        fetch('http://localhost:8001/blogs/' + theId)
            .then(res => {
                return res.json()
            }).then((data) => { // data = db.json
                setTitle(data.title);
                setBody(data.body);
                setAuthor(data.author);
            })
    }, [theId])

    const handleSubmit = (e) => {
        e.preventDefault();
        // store form values in blog object
        const blog = {
            title,
            body,
            author
        }

        setIsPending(true);

        //* SUBMIT UPDATE BTN
        // send form data to endpoint(db) 
        fetch('http://localhost:8001/blogs/' + theId, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog) // convert blog object to json
        }).then(() => {
            console.log('updated Blog!');
            setIsPending(false);
            history('/'); // Once data to added redirect to root(home page)
        })
    }

    // ==========================================================================

    return (
        <div className="create">
            <h2>Update Blog</h2>
            {title && <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value) }
                    name="name"
                />
                <label>Blog body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value) }
                    name="body"
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value) }
                    name="author"
                >
                    <option value="sam">sam</option>
                    <option value="terauchi">terauchi</option>
                    <option value="hassan">hassan</option>
                </select>
                {!isPending && <button>Update Blog</button>}
                {isPending && <button disabled>Updating blog...</button>}
            </form>}
        </div>
    );
}

export default Update;
