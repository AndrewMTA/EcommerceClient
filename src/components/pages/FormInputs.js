import List from "./List"

import Shipping from "./CheckoutForm"
import useFormContext from "../../hooks/useFormContext"

const FormInputs = () => {

    const { page } = useFormContext()

    const display = {
        0: <List />,
        1: <Shipping />,
     
    }

    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )


    return content
}
export default FormInputs