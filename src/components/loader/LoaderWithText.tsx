interface IProps {
    text: string;
    alt?: string;
}

const LoaderWithText = (props: IProps) => {
    return (
        <div className="text-center animate-pulse">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-600 mx-auto"/>
            <h2 className="text-zinc-900 dark:text-orange-600 mt-4 font-medium">{props.text}</h2>
            {props.alt && <p className="text-zinc-600 dark:text-zinc-400 font-medium">{props.alt}</p>}
        </div>
    );
}

export default LoaderWithText;
