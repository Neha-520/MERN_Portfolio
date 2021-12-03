import React, { useState, useEffect } from 'react'

export const Home = () => {
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage();
        // eslint-disable-next-line 
    }, []);

    return (
        <>
            <div className="home-page ">
            </div>
            <div className="  d-flex align-items-center justify-content-center flex-column " style={{ marginTop: "220px", position: "relative" }}>
                <p className="pt-5 " style={{ color: 'blue', zIndex: "1", fontWeight: "700" }}>WELCOME</p>
                <h1 style={{ zIndex: "1", textAlign: "center", fontWeight: "800", fontSize: "50px", marginBottom: "20px" }}>{userName}</h1>
                <h2 style={{ textAlign: "center", fontWeight: "550", fontSize: "30px" }}>{show ? 'Happy, to see you back 😃 ' : 'We Are The MERN Developer'}</h2>
            </div>
            <div className="wh" >
            </div>
        </>
    )
}
