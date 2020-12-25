import React, { useContext, useEffect, useState } from 'react';
import env from "react-dotenv";
import socketIOClient from 'socket.io-client';
import Footer from './../components/Footer/index';
import Header from './../components/Header/index';
import SearchBar from './../components/SearchBar/index';
import { AppContext } from './../store/AppContext';
const ENDPOINT = 'http://127.0.0.1:9000';

function DefaultLayout({ children }) {
    const [reload, setReload] = useState(false);
    const [appData, dispatch] = useContext(AppContext);
    const { search } = appData;
    let query = '?limit=4';

    async function getProducts() {
        let res = await fetch('/products');
        let prodList = await res.json();

        let prom = prodList.map(prod => {
            return fetch('/products/' + prod.id + query).then(res => res.json())
        });
        Promise.all(prom).then(data => {
            dispatch({
                type: 'update',
                payload: { products: data }
            })
        }).catch(err => console.log(err));
    }

    async function getCustomers(term) {
        let res = await fetch('/customers/' + term);
        let prodList = await res.json();
        dispatch({
            type: 'update',
            payload: {
                products: prodList,
                search: term
            }
        });
    }

    async function searchHandler(ev) {
        let term = ev.target.value.trim().toLowerCase();
        if (term.length >= 3) {
            await getCustomers(term);
        } else if (term === '') {
            dispatch({
                type: 'update',
                payload: {
                    search: '',
                }
            });
            await getProducts();
        }
    };

    async function getData() {
        if (search !== '') {
            await getCustomers(search)
        } else {
            await getProducts()
        }
    }

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('changeData', () => setReload(r => !r));

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        getData();
    }, [reload]);

    return (
        <>
            <Header />
            <main className='min-vh-100 container'>
                <SearchBar searchHandler={searchHandler} />
                {children}
            </main>
            <Footer />
        </>
    )
}

export default DefaultLayout;