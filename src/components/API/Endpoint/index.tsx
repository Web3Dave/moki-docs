import HttpMethod from "../../HttpMethod"
import styles from "./endpoint.module.css"
import CodeBlock from '@theme/CodeBlock';

type APIDataType = "string" | "number" | "address" | "message-id";

type QueryParamType = {
    key: string,
    optional?: boolean,
    type: APIDataType,
    description?: string;
}

type HeaderType = {
    key: string,
    optional?: boolean,
    type: APIDataType,
    description?: string;
}

type EndpointProps = {
    method: "POST" | "GET" | "DELETE" | "PUT",
    endpoint: string,
    description: string,
    queryParams?: QueryParamType[]
    headers?: HeaderType[];
    response?: object;
}

export default function Endpoint({ method, endpoint, description, queryParams, headers, response }: EndpointProps) {
    return <div>
        <HttpMethod method={method} /><code>{endpoint}</code>
        <br /><br />
        <p>{description}</p>
        {headers && headers.length > 0 ? <><table className={`${styles.endpointTable} ${styles.header}`}>
            <caption >Headers</caption>
            <colgroup>
                <col style={{ width: "150px" }} />
                <col style={{ width: "120px" }} />
                <col style={{ width: "380px" }} />
            </colgroup>
            <thead><tr>
                <th scope="col" >Content-Type</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th >
            </tr></thead>
            <tbody>
                {
                    headers.map(param => {
                        return <tr>
                            <td>{param.key}</td>
                            <td>{param.type ?? ""}</td>
                            <td>{param.description ?? "-"}</td>
                        </tr>
                    })
                }
            </tbody>
        </table></> : <></>}

        {queryParams && queryParams.length > 0 ? <><table className={`${styles.endpointTable} ${styles.query}`}>
            <caption >Query Parameters</caption>
            <colgroup>
                <col style={{ width: "150px" }} />
                <col style={{ width: "120px" }} />
                <col style={{ width: "380px" }} />
            </colgroup>
            <thead><tr>
                <th scope="col" >Key</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th >
            </tr></thead>
            <tbody>
                {
                    queryParams.map(param => {
                        return <tr>
                            <td>{param.key}</td>
                            <td>{param.type ?? ""}</td>
                            <td>{param.description ?? "-"}</td>
                        </tr>
                    })
                }
            </tbody>
        </table></> : <></>}

        {response ?
            <>
                <CodeBlock className="language-json" title="Example Response">
                    {JSON.stringify(response, null, 2)}
                </CodeBlock></> : <></>}
    </div>
}