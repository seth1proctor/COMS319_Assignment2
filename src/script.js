import react, { useState } from "react";
import { useForm } from "react-hook-form";


export function App() {
    //errors in payment information hook
    const { register, handleSubmit, formState: { errors } } = useForm();
    //Payment data information hook
    const [dataF, setDataF] = useState({});


    const [View, setView] = useState(0);
    const [CartList, setCartList] = useState([]);
    const [CartTotal, setCartTotal] = useState(0);


    function Browse() {
        return (<div>bros</div>)
    }

    function Cart() {

        const cartItems = CartList.map((el) => (
            <div key={el.id}>
                <img class="img-fluid" src={el.image} width={150} />
                {el.title}
                ${el.price}
            </div>
        ));

        function Payment() {
            const onSubmit = data => {
                console.log(data); // log all data
                // update hooks
                setDataF(data);
                setView(2);
            }

            return (
                <div className="container">
                    <h1>Payment information</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
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




        return (<div>
            <button type="primary" className="btn btn-primary" onClick={setViewBrowse}>Return</button>

            <div class="col-md-8 cart">
                <div class="title">
                    <div class="row">
                        <div class="col">
                            <h4>
                                <b>Shopping Cart</b>
                            </h4>
                        </div>
                        <div class="col align-self-center text-right text-muted">
                            Products selected {CartList.length}
                        </div>
                    </div>
                </div>
                <div>{cartItems}</div>
            </div>
            <div class="float-end">
                <p class="mb-0 me-5 d-flex align-items-center">
                    <span class="small text-muted me-2">Order total:</span>
                    <span class="lead fw-normal">${CartTotal}</span>
                </p>
            </div>
            <hr className="my-4" />
            <Payment />
        </div>)
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
        <button onClick={setViewCart}>Cart</button>
        <button onClick={setViewConfirm}>Confirm</button>

        {View === 0 && <Browse />}
        {View === 1 && <Cart />}
        {View === 2 && <Confirm />}

    </div>);

}
