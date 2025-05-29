import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
export function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginFailed(false);
    
    try {
      // Validation avec Yup
      await validationSchema.validate(formData, { abortEarly: false });
      
      // Appel API identique à la version mobile
      const result = await authApi.login(formData.email, formData.password);
      console.log("Login result:", result);

      if (!result.ok || !result.data?.data?.token) {
        console.error("Échec - Réponse API:", result);
        return setLoginFailed(true);
      }
     // console.log("result.data.data.token",result.data.data.token)
      // Connexion réussie - même logique que mobile
       await auth.logIn(result.data.data.token);

         if(result.data.data?.admin?.role==="Admin"){
         navigate("/dashboard/home");
      }
      if(result.data.data?.admin?.role==="gestionnaire"){
         navigate("/dashboard/home");
      }

       if(result.data.data?.admin?.role==="expert"){
         navigate("/dashboard/assures");
      }
      
      
       if(result.data.data?.admin?.role==="grage"){
         navigate("/dashboard/message");
      }
      // console.log("first")
      
      
      
    } catch (validationErrors) {
      // Gestion des erreurs de validation
      const newErrors = {};
      if (validationErrors.inner) {
        validationErrors.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
      }
      setErrors(newErrors);
    }
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
          {/* Message d'erreur global - mêmes classes que dans votre code */}
          {loginFailed && (
          <div className="text-red-500 text-center mb-4">
            Email ou mot de passe invalide.
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formData.email}
              onChange={handleChange}
            />
             {errors.email && (
              <span className='text-red-500 text-sm mt-1 block'>{errors.email}</span>
            )}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
               name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
               {errors.password && (
              <span className='text-red-500 text-sm mt-1 block'>{errors.password}</span>
            )}
          </div>
        
          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Subscribe me to newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
       
         
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
