import  {useState, useEffect} from 'react'
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';
import appwriteService from '../appwrite/conf';

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    // useEffect(() => {
    //     appwriteService.getPosts([]).then((posts) => {
    //         if (posts) {
    //             setPosts(posts.documents);
    //         }
    //     }).catch((error) => {
    //         console.error("Error fetching posts:", error);
    //     });
    // }, []);

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts