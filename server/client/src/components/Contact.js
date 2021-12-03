import React, { useState, useEffect } from 'react'

export const Contact = () => {
    const [userData, setUserData] = useState({
        name: "", email: "", phone: "", message: ""
    });

    const callContactPage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone })

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callContactPage();
        // eslint-disable-next-line 
    }, []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }

    //send data to backend
    const contactForm = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;
        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });
        const data = await res.json();
        if (!data) {
            console.log("message not sent");
        } else {
            alert("Message sent successfully")
            setUserData({ ...userData, message: "" })
        }
    }

    return (
        <>
            <div className="contact_info">
                <div className="container-fluid">
                    <div className="row mt-5">
                        <div className="col-lg-10 col-md-10  offset-lg-1 d-flex justify-content-between  z">
                            <div className="contact_info_item d-flex  align-items-center ">
                                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone"></img>
                                <div className="contact_info_content " style={{ marginLeft: "1rem" }}>
                                    <div className="contact_info_title">
                                        <b> Phone</b>
                                    </div>
                                    <div className="contact_info_text">
                                        +91 9878993462
                                    </div>
                                </div>
                            </div>

                            <div className="contact_info_item d-flex  align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/email.png" alt="phone"></img>
                                <div className="contact_info_content" style={{ marginLeft: "1rem" }}>
                                    <div className="contact_info_title">
                                        <b> Email</b>
                                    </div>
                                    <div className="contact_info_text">
                                        neha17@gmail.com
                                    </div>
                                </div>
                            </div>

                            <div className="contact_info_item d-flex  align-items-center">
                                <img src="https://img.icons8.com/office/24/000000/address.png" alt="phone"></img>
                                <div className="contact_info_content" style={{ marginLeft: "1rem" }}>
                                    <div className="contact_info_title">
                                        <b> Address</b>
                                    </div>
                                    <div className="contact_info_text">
                                        Sunam,India
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="contact_form" >
                <div className="container">
                    <div className="row mt-5 ">
                        <div className=" col-lg-10 col-md-10 col-sm-10 offset-lg-1 d-flex justify-content-between align-self-center">
                            <div className="contact_form_container py-5 ">
                                <div className="contact_form_title">
                                    <h3 style={{ fontWeight: "600", fontSize: "26px" }}>Get In Touch</h3></div>
                                <form method="POST" id="contact_form" className="mt-4">
                                    <div className="contact_form_name d-flex  ">
                                        <input type="text" id="contact_form_name" name="name" className="contact_form_name input_field col-4" onChange={handleInputs} value={userData.name} placeholder="Your Name" required="true">
                                        </input>

                                        <input type="email" id="contact_form_email" name="email" className="contact_form_email input_field col-4" onChange={handleInputs} value={userData.email} placeholder="Your Email" required="true">
                                        </input>

                                        <input type="number" id="contact_form_phone" name="phone" className="contact_form_phone input_field col-4" onChange={handleInputs} value={userData.phone} placeholder="Your Phone Number" required="true">
                                        </input>
                                    </div>

                                    <div className="contact_form_text mt-4">
                                        <textarea className="text_field contact_form_message col-lg-12 col-md-12" name="message" onChange={handleInputs} value={userData.message} style={{ color: "#17a2b8" }} placeholder="Message"></textarea>
                                    </div>
                                    <div className="contact_form_button mt-3">
                                        <button type="submit" className="btn btn-primary " onClick={contactForm}>
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
