import {CircleAdd} from "../../../assets/svg/CircleAdd.tsx";
import type {ButtonHTMLAttributes} from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button title="Ekle" className="group cursor-pointer outline-none hover:rotate-90 duration-300" {...props}>
            <CircleAdd/>
        </button>
    );
}

export default Button;
