import React from 'react'
import Post from './Post'

function Posts() {
    const posts = [
        {
            id: '123',
            username:"Dai Dai Vo",
            userImg:"https://links.papareact.com/3ke",
            img:"https://links.papareact.com/jjm",
            caption:"I hate this shit"
        },
        {
            id: '123',
            username:"Dai Dai Vo",
            userImg:"https://links.papareact.com/3ke",
            img:"https://links.papareact.com/jjm",
            caption:"I hate this shit"
        }
    ]
  return (
    <div>
        {posts.map(post=>(
            <Post key={post.id} id={post.id} username = {post.username} userImg={post.userImg} img={post.img} caption={post.caption}/>
        ))}
    </div>
  )
}

export default Posts