import React, { useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Footer from './../components/Footer/index';
import Header from './../components/Header/index';
import SearchBar from './../components/SearchBar/index';
import { AppContext } from './../store/AppContext';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function DefaultLayout({ children }) {
    const [reload, setReload] = useState(false);
    const [appData, dispatch] = useContext(AppContext);
    const { search } = appData;
    let query = '?limit=4';

    async function getProducts() {
        let prodList, prom;

        try {
            let res = await fetch(SERVER_URL + '/products');
            prodList = await res.json();

            prom = prodList.map(prod => {
                return fetch(SERVER_URL + '/products/' + prod.id + query).then(res => res.json())
            });
        } catch (err) { console.log(err) };

        Promise.all(prom).then(data => {
            dispatch({
                type: 'update',
                payload: { products: data }
            })
        }).catch(err => console.log(err));
    }

    async function getCustomers(term) {
        let prodList;

        try {
            let res = await fetch(SERVER_URL + '/customers/' + term);
            prodList = await res.json();
        } catch (err) { console.log(err) };

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
        const socket = socketIOClient(SERVER_URL, {
            reconnectionDelayMax: 5000,
        });

        socket.on('connect', () => {
            console.log('client socket connected');
        });
        socket.on('changeData', () => setReload(r => !r));
        socket.on('disconnect', (reason) => {
            console.log('client socket disconnected', reason);
            socket.open();
        });
        socket.on('connect_error', (error) => {
            console.log('client socket connect_error', error);
        });

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