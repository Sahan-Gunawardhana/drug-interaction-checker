import { useField } from "formik";

function TextInput({label, ...props}){
    const [field] = useField(props);

    return (
        <div>
            <label htmlFor={props.id || props.name} className="form-label">
                {label}
            </label>
            <input className="form-control" {...field} {...props} />
        </div>
    );
}

export  default TextInput;