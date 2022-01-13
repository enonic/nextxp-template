import {ServerResponse} from 'http';
import {Component} from 'react';

type ErrorProps = {
    code?: string,
    message?: string
}

export default class Error
    extends Component<ErrorProps> {

    render() {
        return <>
            <h1>
                {this.props.code
                 ? `${this.props.code} - Server Error`
                 : 'Client Side Error'}
            </h1>
            {this.props.message && <p>{this.props.message}</p>}
        </>
    }

    static async getInitialProps({res, err}: { res: ServerResponse, err: ErrorProps }): Promise<ErrorProps> {
        return err;
    }
}
