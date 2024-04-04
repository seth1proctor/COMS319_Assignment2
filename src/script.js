import react, { useState, version, useEffect } from "react";
import items from './products.json';
import "bootstrap/dist/css/bootstrap.css";
import './script.css';

export function App() {
    const [View, setView] = useState(0);
    const [Cart, setCart] = useState([]);
    const [CartTotal, setCartTotal] = useState(0);






    function Browse() {

        const [search, setSearch] = useState('');

        const [vehicleCatalog, setVehicleCatalog] = useState(items);

        const formatPrice = (price) => {
            // Formats the price to have commas
            return price.toLocaleString();
        }


        const addToCart = (vehicle) => {
            setCart([...Cart, vehicle]);
        }

        const removeFromCart = (vehicle) => {
            let vehicleArray = [...Cart];
            vehicleArray = vehicleArray.filter((removeVehicle) => removeVehicle.id !== vehicle.id);
            setCart(vehicleArray);
        }
        const listVehicles = vehicleCatalog.map((vehicle) => (
            <div key={vehicle.id} className="col-4 mb-4">
                <div className="card shadow-sm">
                    <h3 className="title">{vehicle.title}</h3>
                    <img className="bd-placeholder-img card-img-top max-width" height="225" src={vehicle.image} alt={vehicle.title} />
                    <div className="card-body">
                        <p className="card-text">{vehicle.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary btn-short" onClick={() => addToCart(vehicle)}>+</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary btn-short" onClick={() => removeFromCart(vehicle)}>-</button>
                                </div>
                                <p className="card-body">Price: {formatPrice(vehicle.price)}</p>
                                <p className="card-body">Rating: {vehicle.rating.rate}</p>
                                <p className="card-body">Quantity: {quantity(vehicle.id)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));

        const cartItems = Cart.map((vehicle) => (
            <div key={vehicle.id}>
                <img class="img-fluid" src={vehicle.image} width={150} />
                {vehicle.title}${vehicle.price}
            </div>
        ));

        function quantity(id) {
            let total = Cart.filter((items) => items.id === id);
            return total.length;
        }

        const handleSearch = (vehicle) => {
            setSearch(vehicle.target.value);

            const results = items.filter(allItems => {
                if (vehicle.target.value === "") return vehicleCatalog;
                return allItems.title.toLowerCase().includes(vehicle.target.value.toLowerCase())
            });
            return setVehicleCatalog(results);
        }

        useEffect(() => {
            total();
          }, [Cart]);

        const total = () => {
            let totalValue = 0;
            for(let i = 0; i < Cart.length; i++){
                totalValue += Cart[i].price;
            }
            setCartTotal(totalValue);
        }



        return (<div>
            <header className="header">
                <div className="header-content">
                    <h1 className="header-title">Luxury Motors Co.</h1>

                    <div>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        type="search" value={search} onChange={handleSearch} placeholder="Search"/>
                    </div>
                    <div>
                        <h3>Total: {formatPrice(CartTotal)}</h3>
                    </div>

                    <div className="div-button">
                        <button onClick={setViewCart} className="view-cart-button">Checkout</button>
                    </div>
                </div>
            </header>

            <div className="row">
                {listVehicles}
            </div>
            <div>
                {cartItems}
            </div>
        </div>)


    }

    function CartView() {
        return (<div>cart</div>)
    }

    function Confirm() {

        return (<div>Confirm</div>)

    }

    const setViewBrowse = () => {
        setView(0);
    }

    const setViewCart = () => {
        setView(1);
    }

    const setViewConfirm = () => {
        setView(2);
    }

    return (<div>
        <button onClick={setViewBrowse}>Browse</button>
        <button onClick={setViewConfirm}>Confirm</button>

        {View === 0 && <Browse />}
        {View === 1 && <CartView />}
        {View === 2 && <Confirm />}

    </div>);

}
