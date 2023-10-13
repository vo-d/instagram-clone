import {React, useEffect, useState} from 'react'
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import {HeartIcon as HeartIconSolid} from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import {db} from '../firebase'
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy, doc, setDoc, deleteDoc  } from 'firebase/firestore'
import Moment from 'react-moment'

function Post({id, username, userImg, img, caption}) {

  const {data:session} = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);


  // Everytime database, or id update, set comments array to the list of all comments document from database in real time
  useEffect(() => {
    const commentCollectionRef = collection(db, 'posts', id, 'comments');
    return onSnapshot(query(commentCollectionRef, orderBy('timestamp', 'desc')), (snapshot)=>{
      setComments(snapshot.docs)
    })
  }, [db, id]);

  // Everytime database, or id update, set likes array to the list of all likes document from database in real time
  useEffect(() => {
    const likeCollectionRef = collection(db, 'posts', id, 'likes')
    return onSnapshot(likeCollectionRef, (snapshot)=>{
      setLikes(snapshot.docs)
    })
  }, [db, id]);

  // this useEffect return index of like in likes array which has the id = session id. If it can't find, return -1
  // "?" is there to prevent error since session can be null"
  useEffect(() => {
    setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
  }, [likes]);

  const sendComment = async(e) =>{
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    const commentCollectionRef = collection(db, 'posts', id, 'comments');
    await addDoc(commentCollectionRef, {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    })
  }

  const likePost = async() =>{
    if(hasLiked){
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    }
    else{
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username
      })
    }
  }
  

  console.log(hasLiked)
  console.log(session)

  return (
    <div className='bg-white my-7 border rounded-sm'>
        {/* Header */}
        <div className='flex items-center p-5'>
          <img src={userImg} alt="" className='rounded-full h-12 w-12 object-contain border p-1 mr-3'/>
          <p className='flex-1 font-bold'>{username}</p>
          <EllipsisHorizontalIcon className='h-5'></EllipsisHorizontalIcon>
        </div>
        {/* img */}
        <img src={img} alt="" className='object-cover w-full'/>

        {/* buttons */}
        {session && (
          <div className='flex justify-between px-4 pt-4'>
            <div className='flex space-x-4'>
              {hasLiked? (
                <HeartIconSolid onClick={likePost} className='text-red-500 btn'/>
              ) : (
                <HeartIcon onClick={likePost} className='btn'/>

              )}
              <ChatBubbleOvalLeftEllipsisIcon className='btn'/>
              <PaperAirplaneIcon className='btn'/>
            </div>
            <BookmarkIcon className='btn'/>
          </div>
        )}
        
        
        {/* caption */}
        <p className='p-5 truncate'>
          <span className='font-bold mr-1'>{username}</span>
          {caption}
        </p>

        {/* comments */}
        {comments.length > 0 && (
          <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
            {comments.map(comment => (
              <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                <img src={comment.data().userImage} alt="" className='h-7 rounded-full'/>
                <p className='text-sm flex-1'><span className='font-bold'>{comment.data().username}</span> {comment.data().comment}</p>
                <Moment fromNow className='pr-5 text-xs'>
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        )}

        {/* input box */}
        {session && (
          <div> 
            <form action="" className='flex items-center p-4'>
              <FaceSmileIcon className='h-7'></FaceSmileIcon>
              <input type="text" className='border-none flex-1 focus-ring-0' placeholder='Add a comment...' onChange={e => setComment(e.target.value)}/>
              <button className='font-semibold text-blue-400' disabled={!comment.trim()} onClick={sendComment}>Post</button>
            </form>
          </div>
        )}
        
    </div>
  )
}

export default Post