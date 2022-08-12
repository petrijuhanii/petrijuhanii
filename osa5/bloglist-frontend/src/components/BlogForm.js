const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
   }) => {
   return (
     <div>
       <h2>Create new</h2>
 
       <form onSubmit={handleSubmit}>
         <div>
           title
           <input
             type="text"
             value={title}
             onChange={handleTitleChange}
           />
         </div>
         <div>
           author
           <input
             type="text"
             value={author}
             onChange={handleAuthorChange}
           />
         </div>
         <div>
           url
           <input
             type="text"
             value={url}
             onChange={handleUrlChange}
           />
         </div>
         <button type="submit">create</button>
       </form>
     </div>
   )
 }
 
 export default BlogForm