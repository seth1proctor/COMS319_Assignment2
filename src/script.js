import react, { useState, version, useEffect } from "react";
import items from './products.json';
import "bootstrap/dist/css/bootstrap.css";
import './script.css';
import { useForm } from "react-hook-form";


export function App() {
    //errors in payment information hook
    const { register, handleSubmit, formState: { errors } } = useForm();
    //Payment data information hook
    const [dataF, setDataF] = useState({});


    const [View, setView] = useState(0);
    const [CartList, setCartList] = useState([]);
    const [CartTotal, setCartTotal] = useState(0);

    const formatPrice = (price) => {
        // Formats the price to have commas
        return price.toLocaleString();
    }

    //helper method to list all of the items in the cart out
    const cartItems = CartList.map((el) => (
        <div key={el.id} className="d-flex align-items-center mb-3">
            <img src={el.image} alt={el.title} width={150} className="me-3" />
            <div>
                <p className="mb-1">{el.title}</p>
                <p className="m-0">${formatPrice(el.price)}</p>
            </div>
        </div>
    ));


    function Cart() {

        // const onSubmit = data => {
        //     setDataF(data);
        //     setView(2);
        // }

        function Payment() {
            const onSubmit = data => {
                console.log(data); // log all data
                // update hooks
                setDataF(data);
                setView(2);
            }

            return (
                <div className="container mx-auto">
                    <h1 className="text-3xl mb-4">Payment information</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="col-md-6">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input {...register("fullName", { required: true })} type="text" className="form-control" id="fullName" placeholder="Full Name" />
                            {errors.fullName && <p className="text-danger">Full Name is required.</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" className="form-control" id="email" placeholder="Email" />
                            {errors.email && <p className="text-danger">Email is required.</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="creditCard" className="form-label">Credit Card</label>
                            <input {...register("creditCard", { required: true, pattern: /^(?:\d{4}-){3}\d{4}$|^\d{16}$/ })} type="text" className="form-control" id="creditCard" placeholder="Credit Card" />
                            {errors.creditCard && <p className="text-danger">Credit Card is required and should be in the format XXXX-XXXX-XXXX-XXXX or XXXXXXXXXXXXXXXX</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input {...register("address", { required: true })} type="text" className="form-control" id="address" placeholder="Address" />
                            {errors.address && <p className="text-danger">Address is required.</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="address2" className="form-label">Address 2</label>
                            <input {...register("address2")} type="text" className="form-control" id="address2" placeholder="Address 2" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="city" className="form-label">City</label>
                            <input {...register("city", { required: true })} type="text" className="form-control" id="city" placeholder="City" />
                            {errors.city && <p className="text-danger">City is required.</p>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input {...register("state", { required: true })} type="text" className="form-control" id="state" placeholder="State" />
                            {errors.state && <p className="text-danger">State is required.</p>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="zip" className="form-label">Zip</label>
                            <input {...register("zip", { required: true, pattern: /^\d{5}$/ })} type="text" className="form-control" id="zip" placeholder="Zip" />
                            {errors.zip && <p className="text-danger">Zip is required and should be a 5-digit number.</p>}
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            );
        }

        return (
            <div className="container">
                <button type="button" className="btn btn-primary mb-3" onClick={setViewBrowse}>Return</button>

                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col">
                                <h4><b>Shopping Cart</b></h4>
                            </div>
                            <div className="col align-self-center text-right text-muted">
                                Products selected: {CartList.length}
                            </div>
                        </div>
                    </div>
                    {cartItems}
                </div>
                <div className="float-end">
                    <p className="mb-0 me-5 d-flex align-items-center">
                        <span className="small text-muted me-2">Order total:</span>
                        <span className="lead fw-normal">${formatPrice(CartTotal)}</span>
                    </p>
                </div>
                <hr className="my-4" />
                <Payment />
            </div>
        );
    }



    function Browse() {

        const [search, setSearch] = useState('');

        const [vehicleCatalog, setVehicleCatalog] = useState(items);

        const addToCart = (vehicle) => {
            setCartList([...CartList, vehicle]);
        }

        const removeFromCart = (vehicle) => {
            let vehicleArray = [...CartList];
            vehicleArray = vehicleArray.filter((removeVehicle) => removeVehicle.id !== vehicle.id);
            setCartList(vehicleArray);
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

        const cartItems = CartList.map((vehicle) => (
            <div key={vehicle.id}>
                <img class="img-fluid" src={vehicle.image} width={150} />
                {vehicle.title}${formatPrice(vehicle.price)}
            </div>
        ));

        function quantity(id) {
            let total = CartList.filter((items) => items.id === id);
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
        }, [CartList]);

        const total = () => {
            let totalValue = 0;
            for (let i = 0; i < CartList.length; i++) {
                totalValue += CartList[i].price;
            }
            setCartTotal(totalValue);
        }



        return (<div>
            <header className="header">
                <div className="header-content">
                    <h1 className="header-title">Luxury Motors Co.</h1>

                    <div>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="search" value={search} onChange={handleSearch} placeholder="Search" />
                    </div>
                    <div>
                        <h3>Total: ${formatPrice(CartTotal)}</h3>
                    </div>

                    <div className="div-button">
                        <button onClick={setViewCart} className="view-cart-button">Checkout</button>
                    </div>
                </div>
            </header>

            <div className="row">
                {listVehicles}
            </div>
        </div>)


    }

    function Confirm() {

        // Function to redact the first 12 digits of the credit card number
        const redactCreditCard = (creditCard) => {
            // If credit card data is not available or invalid, return empty string
            if (!creditCard || typeof creditCard !== 'string') {
                return '';
            }
            // Redact the first 12 digits and replace them with asterisks
            const redactedPart = creditCard.slice(0, -12).replace(/\d/g, '*');
            // Keep the last 4 digits unredacted
            const last4Digits = creditCard.slice(-4);
            // Return the redacted part followed by the last 4 digits
            return redactedPart + last4Digits;
        };

        return (
            <div className="container mx-auto">
                <h1 className="text-3xl mb-4">Payment Confirmation</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-md-6">
                        <h4>Payment Information</h4>
                        <ul className="list-group mb-4">
                            <li className="list-group-item"><strong>Full Name:</strong> {dataF.fullName}</li>
                            <li className="list-group-item"><strong>Email:</strong> {dataF.email}</li>
                            <li className="list-group-item"><strong>Credit Card:</strong> {redactCreditCard(dataF.creditCard)}</li>
                            <li className="list-group-item"><strong>Address:</strong> {dataF.address}</li>
                            <li className="list-group-item"><strong>Address 2:</strong> {dataF.address2}</li>
                            <li className="list-group-item"><strong>City:</strong> {dataF.city}</li>
                            <li className="list-group-item"><strong>State:</strong> {dataF.state}</li>
                            <li className="list-group-item"><strong>Zip:</strong> {dataF.zip}</li>
                        </ul>
                        <hr />
                        <button type="button" className="btn btn-primary me-2" onClick={setViewCart}>Edit Payment Information</button>
                    </div>
                    <div className="col-md-6">
                        <h4>Order Summary</h4>
                        <div className="card">
                            <div className="card-body">
                                {CartList.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <img src={item.image} alt={item.title} className="me-2" style={{ width: "50px" }} />
                                            <span>{item.title}</span>
                                        </div>
                                        <span>${formatPrice(item.price)}</span>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <strong>Total:</strong>
                                    <strong>${formatPrice(CartTotal)}</strong>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="text-end">
                            <button type="button" className="btn btn-primary" onClick={checkout}>Confirm Purchase</button>
                        </div>
                    </div>

                </div>


            </div>
        );
    }

    const checkout = () => {
        setDataF([]);
        setCartList([]);
        setView(0);
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


        {View === 0 && <Browse />}
        {View === 1 && <Cart />}
        {View === 2 && <Confirm />}
    </div>);


}
