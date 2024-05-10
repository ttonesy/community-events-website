import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom';

export default function Post({ title, summary, _id , content, cover, createdAt}) {

	return(      
  <div className="post">
        <div className="image">
          <Link to = {`/post/${_id}`}>
          <img src={'http://localhost:4000/'+cover} alt="" />  
          </Link>
        </div>
        <div className="texts">
          <Link to = {`/post/${_id}`}>
          <h2>{title}</h2>
          </Link>
           <p className="info">
            <a className="author"></a>
            <time>{formatISO9075(createdAt)}</time>
           </p>
        <p className = "summary"> {summary}</p>
        <p className="content" dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
      </div>
    );
}