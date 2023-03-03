import {React, useState, useEffect} from 'react'
import Post from './Post'
import { onSnapshot, orderBy, query, collection } from 'firebase/firestore';
import {db} from '../firebase'

function Posts() {

    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const collectionRef = collection(db, 'posts');
        return onSnapshot(query(collectionRef, orderBy('timestamp', 'desc')), snapshot=>{
            setPosts(snapshot.docs)
        }) 
    }, [db])
    return (
    
        <div>
            {posts.map(post=>(
                <Post key={post.id} id={post.id} username = {post.data().username} userImg={post.data().userImg} img={post.data().image} caption={post.data().caption}/>
            ))}
        </div>
  )
}

export default Posts