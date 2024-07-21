import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    // const userPosts = useSelector((state) => state.auth.userPosts); // If you have userPosts, fetch them too
    
    // const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log("userId:", post.userId);
    // console.log("userDataId:", userData.$id);
    const isAuthor = post && userData && userData.$id ? post.userId === userData.$id : false;

    // useEffect(() => {
    //     // Fetch user posts if userData exists
    //     if (userData && !userPosts.length) {
    //         dispatch(fetchUserPosts(userData.$id));
    //     }
    // }, [userData, dispatch, userPosts.length]);


    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    useEffect(() => {
        console.log("UserData from Redux:", userData); // Log user data
        console.log("isAuthor:", isAuthor); // Log isAuthor value
    }, [userData, isAuthor]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className=" flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl h-[250px] "
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}