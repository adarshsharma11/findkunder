import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import {Cookies} from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    HTTP_UID: string;
};
type IUserProps = {
    created_at: string;
    email: string;
    email_verified_at: string | null;
    id: number;
    name: string;
    updated_at: string;
}

export default function Welcome() {
   const [user, setUser] = React.useState<IUserProps | null>(null);
   const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = data => makeRequest(data);
   function getAuthCookieExpiration()
   {
       let date = new Date();
       date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
       return date;
   }
   function setLogout() {
    const cookie = new Cookies();
    cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
    setUser(null);
   }
   const makeRequest = (data: Inputs) => {
    // make request first to sanctum/csrf-cookie
    axios.get('/sanctum/csrf-cookie').then(() => {
       const headers = {
        HTTP_UID: data.HTTP_UID,
        Accept: 'application/json',
       };
        axios.post('/api/login', {}, {headers: headers }).then(response => {
            console.log(response.data.user, "<<<<<<<USERSSS>>>>>>>>>>>>>");
            if(response.data.user) {
                alert('Login success');
                setUser(response.data.user);
            }
        }).catch(error => {
            alert(error.response.data.message);
            console.log(error, "<<<<<<<<<<<<ERRORRRR>>>>>>>>>>>");
        });
    });
};

    return (
        <>
            <header className="max-w-lg mx-auto">
                <h1 className="text-4xl font-bold text-white text-center">
                    Findkunder
                </h1>
            </header>

            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">{user?.email ? `${user?.name} Welcome To` : `Login To`} </h3>
                   {user?.email &&  <p className="text-gray-600 pt-2">{`Logged in user email : ${user?.email}`}</p> } 
                    <p className="text-gray-600 pt-2">
                    Findkunder
                    </p>
                </section>

                <section className="mt-10">
                    {!user && 
                        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                                htmlFor="email"
                            >
                                HTTP_UID
                            </label>
                            <input
                                {...register("HTTP_UID", { required: true })}
                                type="text"
                                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-blue-600 transition duration-500 px-3 pb-3"
                            />
                            {errors.HTTP_UID && <span className="text-sm text-red-500">This field is required *</span>}
                        </div>
                        <div className="flex justify-end">
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:text-blue-700 hover:underline mb-6"
                            >
                                Forgot your HTTP_UID?
                            </a>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                            type="submit"
                        >
                            Sign In
                        </button>
                        </form>
                    }
                    {user &&
                         <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                            onClick={() => setLogout()}
                         >
                            Logout
                        </button>}
                   
                </section>
            </main>
            <footer className="max-w-lg mx-auto flex justify-center text-white">
                <a
                    href="#"
                    className="hover:underline"
                    target="_blank"
                >
                    React Laravel Tailwind
                </a>
                <span className="mx-3">•</span>
                <a
                    href="#"
                    className="hover:underline"
                    target="_blank"
                >
                    Tailwind will makes your day
                </a>
            </footer>
        </>
    );
}

if (document.getElementById("root")) {
    const root = createRoot(document.getElementById("root")  as Element);
    root.render(<Welcome />);
}