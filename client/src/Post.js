export default function Post({ title, summary, content, cover, createdAt}) {
	
	return(      
  <div className="post">
        <div className="image">
          <img src="https://d1631mxega5ah2.cloudfront.net/bandas-y-trocas-2024-2024-05-25-44bb10d4-5d0e-48ce-8ba9-84f0d66a9d8e.jpeg" alt="" />  
        </div>
        <div className="texts">
           <h2>{title}</h2>
           <p className="info">
            <a className="author">Texas Motor Speedway</a>
            <time>Time not available</time>
           </p>
        <p className = "summary"> {summary}</p>
        </div>
      </div>
    );
}