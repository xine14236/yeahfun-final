import React, { useCallback, useRef, useState } from 'react'
import ReactQuill from 'react-quill'

// import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css'

export default function MyComponent({value='', setValue=()=>{},blogId=2}) {
  
  const reactQuillRef = useRef(null);

  const uploadToCloudinary = async (file)=> {
    const formData = new FormData();
    formData.append("photos", file);
   
    const res = await fetch(
      `http://localhost:3005/api/blog/uploads/${blogId}`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    const url = 'http://localhost:3005/img-blog/'+data.data[0].filename;
  
    return url
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await uploadToCloudinary(file);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image'],
            [{ 'header': [ 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],

            ['clean']   
         
          ],
          handlers: {
            image: imageHandler,   // <- 
          },
        },
  };

  // theme="bubble"
  return (<>
 <style>
        {`
          .ql-editor img {
             max-width: 500px;
            max-height: 350px;
          }
        `}
      </style>
  <ReactQuill ref={reactQuillRef} theme="snow" value={value} onChange={setValue} modules={modules} />
  </>)
}
