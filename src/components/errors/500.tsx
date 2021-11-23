type Props = {
    message:string
}

export default function Custom500({message}:Props) {
    return <>
        <h1>500 - Server-side error occurred</h1>
        {message && <p>{message}</p>}
    </>
}
