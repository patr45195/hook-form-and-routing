import { Button, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useController, useForm } from "react-hook-form";

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

  const onSubmit = (data: IFormData) => {
    console.log(data);
  };

  const nameProps = useController({
    name: "name",
    control,
  });
  const userNameProps = useController({
    name: "username",
    control,
  });
  const titleProps = useController({
    name: "email",
    control,
  });
  const postsProps = useController({
    name: "posts",
    control,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputLabel id="name">Name</InputLabel>
      <TextField
        {...nameProps.field}
        value={nameProps.field.value ?? ""}
        id="name"
      />

      <InputLabel id="userName">UserName</InputLabel>
      <TextField
        {...userNameProps.field}
        value={userNameProps.field.value ?? ""}
        id="userName"
      />

      <InputLabel id="title">Name</InputLabel>
      <TextField
        {...titleProps.field}
        value={titleProps.field.value ?? ""}
        id="title"
      />

      <InputLabel id="posts">Posts</InputLabel>
      <TextField
        {...postsProps.field}
        value={postsProps.field.value[0] ?? ""}
        id="posts"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};
