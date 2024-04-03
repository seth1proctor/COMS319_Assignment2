import react, {useState} from "react";

export function App() {
    const [View, setView] = useState(0);

    function Browse(){
        return(<div>bros</div>)
    }
    
    function Cart() {
        return(<div>cart</div>)
    }
    
    function Confirm() {
    
        return(<div>Confirm</div>)

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

    return(<div>
        <button onClick={setViewBrowse}>Browse</button>
        <button onClick={setViewCart}>Cart</button>
        <button onClick={setViewConfirm}>Confirm</button>

        {View === 0 && <Browse />}
        {View === 1 && <Cart />}
        {View === 2 && <Confirm />}
        
    </div>);

}
