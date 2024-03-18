import axios from "axios";
import { useForm } from "react-hook-form";

interface IFormData {
  name: string;
  username: string;
  email: string;
  posts: string[];
}

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const fetchDefaultValues = async () => {
  try {
    const userPromise = axios.get<IUser>(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const postsPromise = axios.get<IPost[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const [userResponse, postsResponse] = await Promise.all([
      userPromise,
      postsPromise,
    ]);

    const user = userResponse.data;
    const posts = postsResponse.data;

    return {
      name: user.name,
      username: user.username,
      email: user.email,
      posts: posts.map((post) => post.title),
    };
  } catch (error) {
    console.log(error);
    return {
      name: "",
      username: "",
      email: "",
      posts: [""],
    };
  }
};

export const Form = () => {
  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: async () => await fetchDefaultValues(),
  });

  return <div>my form</div>;
};
