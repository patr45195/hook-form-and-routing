import { InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";

interface IFormData {
  name: string;
  age: number;
}

interface IUser {
  id: number;
  name: string;
  age: number;
}

interface ICities {
  id: number;
  city: string;
}

interface ICountries {
  id: number;
  city: string;
}

export const fetchDefaultUserValues = async () => {
  try {
    const response = await axios.get<IUser>("http://localhost:4444/user/1");

    const userData: IUser = response.data;

    return {
      name: userData.name,
      age: userData.age,
    };
  } catch (error) {
    console.log(error);
    return {
      name: "",
      age: 0,
    };
  }
};

export const fetchAdditionalValues = async () => {
  try {
    const citiesPromise = axios.get<ICities[]>("http://localhost:4444/cities");
    const countriesPromise = axios.get<ICountries[]>(
      "http://localhost:4444/countries"
    );

    const [citiesResponse, countriesResponse] = await Promise.all([
      citiesPromise,
      countriesPromise,
    ]);

    const cities = citiesResponse.data;
    const countries = countriesResponse.data;

    return { cities, countries };
  } catch (error) {
    console.log(error);
  }
};

export const MyForm = () => {
  const [cities, setCities] = useState<any>();
  const [countries, setCountries] = useState<any>();

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchAdditionalValues();

        setCities(response?.cities);
        setCountries(response?.countries);
      } catch (error) {
        console.log(error);
      }
    };

    setData();
  }, []);

  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: async () => await fetchDefaultUserValues(),
  });

  const onSubmit = (data: IFormData) => console.log(data);

  const nameProps = useController({
    name: "name",
    control,
  });
  const ageProps = useController({
    name: "age",
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

      <InputLabel id="age">Age</InputLabel>
      <TextField
        {...ageProps.field}
        value={ageProps.field.value ?? ""}
        id="age"
      />

      <input type="submit" />
    </form>
  );
};
