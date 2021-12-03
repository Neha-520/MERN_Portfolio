import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export const Signup = () => {

    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
    });

    const handleInputs = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        if (data.status === 422 || !data) {
            window.alert("Invalid Registeration");
            console.log("Invalid Registeraton");
        } else {
            window.alert("Registeration succesful");
            console.log("Registeraton succesful");

            history.push("/login");
        }
    }

    return (
        <>
            <div className="x">
                <section className="signup" >
                    <div className="container mt-4" >
                        <div className="signup-content p-lg-4" style={{ display: "flex" }}>
                            <div className="signup-form col-6" >
                                <center><h2 className="form-title mb-2">Sign up</h2></center>
                                <form method="POST" className="register-form p-4" id="reguster-form">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <i className="zmdi zmdi-account material-icons-name"></i>                                    </label>
                                        <input type="text" name="name" id="name" autoComplete="off"
                                            value={user.name}
                                            onChange={handleInputs}
                                            placeholder="Your Name"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <i className="zmdi zmdi-email material-icons-name"></i>
                                        </label>
                                        <input type="email" name="email" id="email" autoComplete="off"
                                            value={user.email}
                                            onChange={handleInputs}
                                            placeholder="Your Email"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                        </label>
                                        <input type="number" name="phone" id="phone" autoComplete="off"
                                            value={user.phone}
                                            onChange={handleInputs}
                                            placeholder="Your Phone Number"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="work">
                                            <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                        </label>
                                        <input type="text" name="work" id="work" autoComplete="off"
                                            value={user.work}
                                            onChange={handleInputs}
                                            placeholder="Your Profession"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">
                                            <i className="zmdi zmdi-lock material-icons-name"></i>
                                        </label>
                                        <input type="password" name="password" id="password" autoComplete="off"
                                            value={user.password}
                                            onChange={handleInputs}
                                            placeholder="Your Password"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpassword">
                                            <i className="zmdi zmdi-lock material-icons-name"></i>
                                        </label>
                                        <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                            value={user.cpassword}
                                            onChange={handleInputs}
                                            placeholder="Confirm Your Password"></input>
                                    </div>
                                    <div className="form-group form-button mt-4" >
                                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={postData}></input>
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image mt-2  col-6"  >
                                <figure >
                                    <img src="/register.jpg" alt="registration pic" style={{ width: "180px", height: "320px", objectFit: "cover" }}></img>
                                </figure>
                                <center><NavLink to="/login" className="signup-image-link">I am already registered</NavLink></center>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
