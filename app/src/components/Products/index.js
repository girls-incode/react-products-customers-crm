import Parser from "html-react-parser";
import React, { useContext } from "react";
import { AppContext } from "./../../store/AppContext";
import "./style.scss";

function Products() {
    const [appData] = useContext(AppContext);
    const { products, search } = appData;

    function highlight(str) {
        if (search) {
            const regex = new RegExp(search, "gim");
            return str.replace(regex, "<u>$&</u>");
        }
        return str;
    }

    return (
        <div className="row row-cols-1 row-cols-md-3 mb-3">
            {products.map(({ name, customers }) => (
                <article key={name} className="col">
                    <div className="shadow-sm card mb-3">
                        <h2 className="card-header">{name} <small>({customers.length})</small></h2>
                        <ul className="customers">
                            {customers.map(({ avatar, name, job, quote }) => (
                                <li className="customer" key={name}>
                                    <div className="customer--info">
                                        <img className="customer--avatar"
                                            src={avatar} alt={name} width="38" />
                                        <div className="mw-0">
                                            <h3 className="customer--name">{Parser(highlight(name))}</h3>
                                            <div><small>{job.title}</small></div>
                                            <div><small>@{job.company}</small></div>
                                            <blockquote className="customer--quote">
                                                {Parser(highlight(quote))}
                                            </blockquote>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default Products
