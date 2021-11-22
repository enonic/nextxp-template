type Props = {
    code: number|string,
    message: string
}

export default function CustomError({code, message}:Props) {
    return <>
        <h1>Ooops</h1>
        <p>An error occurred:</p>
        <p>{code} - {message}</p>
    </>
}
