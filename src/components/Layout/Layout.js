import React from 'react';
import Header from '../Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export function Layout(props) {



    return (
        <>
            <Header />
            <main style={{ minHeight: "86vh" }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}


